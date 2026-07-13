import { useState, useEffect, useRef } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar, type AppNotification } from "./components/layout/Topbar";
import { PageHeader } from "./components/sections/PageHeader";
import { PerformanceOverview } from "./components/sections/PerformanceOverview";
import { FeedbackPatterns } from "./components/sections/FeedbackPatterns";
import { ProjectsAssigned } from "./components/sections/ProjectsAssigned";
import { GoalSetting } from "./components/sections/GoalSetting";
import { Achievements } from "./components/sections/Achievements";
import { CoachingOverlay } from "./components/sections/CoachingOverlay";
import { CoachingSessionsPage } from "./components/sections/CoachingSessionsPage";
import { SessionsArchivePage } from "./components/sections/SessionsArchivePage";
import { PreJoinScreen } from "./components/sections/PreJoinScreen";
import { MeetingCallScreen } from "./components/sections/MeetingCallScreen";
import { SessionDetailOverlay } from "./components/sections/SessionDetailOverlay";
import { SessionBoardResumeOverlay } from "./components/sections/SessionBoardResumeOverlay";
import { TranscriptArchiveOverlay } from "./components/sections/TranscriptArchiveOverlay";
import {
  initialSessions,
  type BoardApprovalStatus,
  type CoachingSession,
  type MeetingBoard,
  type MeetingTranscript,
  type SuggestionPattern,
} from "./data/dashboard";

type View = "dashboard" | "coaching" | "sessions";
type ActiveMeeting = { session: CoachingSession; goBy: string; transcript: boolean };

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [overlaySuggestions, setOverlaySuggestions] = useState<SuggestionPattern[]>([]);
  const [overlayPatternsOnly, setOverlayPatternsOnly] = useState(false);
  const [sessions, setSessions] = useState<CoachingSession[]>(initialSessions);
  const [joiningSession, setJoiningSession] = useState<CoachingSession | null>(null);
  const [meeting, setMeeting] = useState<ActiveMeeting | null>(null);
  const [detailSession, setDetailSession] = useState<CoachingSession | null>(null);
  const [archiveBoardSession, setArchiveBoardSession] = useState<CoachingSession | null>(null);
  const [archiveTranscriptSession, setArchiveTranscriptSession] = useState<CoachingSession | null>(
    null
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const prevPendingIdsRef = useRef<Set<string>>(
    new Set(
      initialSessions
        .filter((s) => s.status === "pending" && s.submittedViaForm)
        .map((s) => s.id)
    )
  );

  const upcomingCount = sessions.filter((s) => s.status === "upcoming").length;
  const pendingCount = sessions.filter((s) => s.status === "pending").length;
  const formPendingCount = sessions.filter(
    (s) => s.status === "pending" && s.submittedViaForm
  ).length;
  const coachingCount = upcomingCount + pendingCount;

  useEffect(() => {
    const currentPendingIds = new Set(
      sessions
        .filter((s) => s.status === "pending" && s.submittedViaForm)
        .map((s) => s.id)
    );
    const accepted = sessions.filter(
      (s) => s.status === "upcoming" && prevPendingIdsRef.current.has(s.id)
    );

    if (accepted.length > 0) {
      setNotifications((prev) => [
        ...accepted.map((s) => ({
          id: `notif-${s.id}-${Date.now()}`,
          title: "Coaching request accepted",
          message: `${s.managerName} has accepted your coaching request. Your session is now upcoming.`,
          read: false,
        })),
        ...prev,
      ]);
    }

    prevPendingIdsRef.current = currentPendingIds;
  }, [sessions]);

  useEffect(() => {
    if (view !== "coaching") return;
    if (formPendingCount === 0) return;

    const timer = window.setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.status === "pending" && s.submittedViaForm ? { ...s, status: "upcoming" } : s
        )
      );
    }, 20_000);

    return () => window.clearTimeout(timer);
  }, [view, formPendingCount]);

  const openOverlay = (
    suggestions: SuggestionPattern[] = [],
    patternsOnly = false
  ) => {
    setOverlaySuggestions(suggestions);
    setOverlayPatternsOnly(patternsOnly);
    setCoachingOpen(true);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addSession = (session: CoachingSession) => {
    setSessions((prev) => [session, ...prev]);
    setCoachingOpen(false);
  };

  const addSessionFromMeeting = (session: CoachingSession) => {
    setSessions((prev) => [session, ...prev]);
  };

  const cancelSession = (id: string) =>
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "cancelled" } : s))
    );

  const startMeeting = (
    session: CoachingSession,
    opts: { transcript: boolean; goBy: string }
  ) => {
    setMeeting({ session, goBy: opts.goBy, transcript: opts.transcript });
    setJoiningSession(null);
  };

  const endMeeting = (payload: {
    board: MeetingBoard;
    transcript: MeetingTranscript;
    approvalStatus: BoardApprovalStatus;
  }) => {
    if (!meeting) return;
    const id = meeting.session.id;
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "history",
              board: payload.board,
              transcript: payload.transcript,
              boardApprovalStatus: payload.approvalStatus,
              savedToSessionsAt: new Date().toISOString(),
            }
          : s
      )
    );
    setMeeting(null);
  };

  const updateSessionBoard = (sessionId: string, board: MeetingBoard) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, board } : s))
    );
    setArchiveBoardSession((current) =>
      current?.id === sessionId ? { ...current, board } : current
    );
  };

  const sendBoardForApproval = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, boardApprovalStatus: "pending" as const } : s
      )
    );
    setArchiveBoardSession((current) =>
      current?.id === sessionId
        ? { ...current, boardApprovalStatus: "pending" }
        : current
    );
  };

  const updateSessionTranscript = (sessionId: string, transcript: MeetingTranscript) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, transcript } : s))
    );
    setArchiveTranscriptSession((current) =>
      current?.id === sessionId ? { ...current, transcript } : current
    );
  };

  const onNavigate = (id: string) => {
    if (id === "home") setView("dashboard");
    else if (id === "coaching") setView("coaching");
    else if (id === "sessions") setView("sessions");
    setMenuOpen(false);
  };

  const activeNavId =
    view === "coaching" ? "coaching" : view === "sessions" ? "sessions" : "home";

  const topbarTitle =
    view === "coaching" ? "Coaching" : view === "sessions" ? "Sessions" : "My performance";

  const openArchiveBoard = (s: CoachingSession) => {
    setArchiveBoardSession(sessions.find((x) => x.id === s.id) ?? s);
  };

  const openArchiveTranscript = (s: CoachingSession) => {
    setArchiveTranscriptSession(sessions.find((x) => x.id === s.id) ?? s);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          mobileOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          activeId={activeNavId}
          onNavigate={onNavigate}
          coachingCount={coachingCount}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onOpenMenu={() => setMenuOpen(true)}
            title={topbarTitle}
            notifications={notifications}
            onMarkNotificationsRead={markNotificationsRead}
          />

          <main className="w-full flex-1 p-4 sm:p-6 lg:p-10">
            {view === "dashboard" ? (
              <div className="mx-auto w-full max-w-5xl space-y-5">
                <PageHeader />
                <PerformanceOverview />
                <FeedbackPatterns
                  onInitiateCoaching={(selected) => openOverlay(selected, true)}
                />
                <ProjectsAssigned />
                <GoalSetting />
                <Achievements />
              </div>
            ) : view === "coaching" ? (
              <CoachingSessionsPage
                sessions={sessions}
                onAddRequest={() => openOverlay()}
                onCancel={cancelSession}
                onJoin={(s) => setJoiningSession(s)}
                onDetails={(s) => setDetailSession(s)}
              />
            ) : (
              <SessionsArchivePage
                sessions={sessions}
                onOpenBoard={openArchiveBoard}
                onOpenTranscript={openArchiveTranscript}
              />
            )}
          </main>
        </div>
      </div>

      <CoachingOverlay
        open={coachingOpen}
        onClose={() => setCoachingOpen(false)}
        initialSuggestions={overlaySuggestions}
        patternsOnly={overlayPatternsOnly}
        onSubmit={addSession}
      />

      <SessionDetailOverlay
        session={detailSession}
        onClose={() => setDetailSession(null)}
      />

      <SessionBoardResumeOverlay
        session={
          archiveBoardSession
            ? sessions.find((s) => s.id === archiveBoardSession.id) ?? archiveBoardSession
            : null
        }
        onClose={() => setArchiveBoardSession(null)}
        onSaveBoard={updateSessionBoard}
        onSendForApproval={sendBoardForApproval}
      />

      <TranscriptArchiveOverlay
        session={
          archiveTranscriptSession
            ? sessions.find((s) => s.id === archiveTranscriptSession.id) ??
              archiveTranscriptSession
            : null
        }
        onClose={() => setArchiveTranscriptSession(null)}
        onUpdateTranscript={updateSessionTranscript}
      />

      {joiningSession ? (
        <PreJoinScreen
          session={joiningSession}
          onBack={() => setJoiningSession(null)}
          onJoin={(opts) => startMeeting(joiningSession, opts)}
        />
      ) : null}

      {meeting ? (
        <MeetingCallScreen
          session={meeting.session}
          goBy={meeting.goBy}
          initialTranscript={meeting.transcript}
          onEnd={endMeeting}
          onCreateSession={addSessionFromMeeting}
          previousBoard={
            sessions.find((s) => s.status === "history" && s.board)?.board
          }
        />
      ) : null}
    </div>
  );
}
