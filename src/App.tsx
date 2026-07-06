import { useState, useEffect } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { PageHeader } from "./components/sections/PageHeader";
import { PerformanceOverview } from "./components/sections/PerformanceOverview";
import { FeedbackPatterns } from "./components/sections/FeedbackPatterns";
import { ProjectsAssigned } from "./components/sections/ProjectsAssigned";
import { GoalSetting } from "./components/sections/GoalSetting";
import { Achievements } from "./components/sections/Achievements";
import { CoachingOverlay } from "./components/sections/CoachingOverlay";
import { CoachingSessionsPage } from "./components/sections/CoachingSessionsPage";
import { PreJoinScreen } from "./components/sections/PreJoinScreen";
import { MeetingCallScreen } from "./components/sections/MeetingCallScreen";
import { SessionDetailOverlay } from "./components/sections/SessionDetailOverlay";
import {
  initialSessions,
  type CoachingSession,
  type MeetingBoard,
  type SuggestionPattern,
} from "./data/dashboard";

type View = "dashboard" | "coaching";
type ActiveMeeting = { session: CoachingSession; goBy: string; transcript: boolean };

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [coachingOpen, setCoachingOpen] = useState(false);
  const [overlaySuggestions, setOverlaySuggestions] = useState<SuggestionPattern[]>([]);
  const [sessions, setSessions] = useState<CoachingSession[]>(initialSessions);
  const [joiningSession, setJoiningSession] = useState<CoachingSession | null>(null);
  const [meeting, setMeeting] = useState<ActiveMeeting | null>(null);
  const [detailSession, setDetailSession] = useState<CoachingSession | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const upcomingCount = sessions.filter((s) => s.status === "upcoming").length;
  const pendingCount = sessions.filter((s) => s.status === "pending").length;
  const coachingCount = upcomingCount + pendingCount;

  // Auto accept pending coaching requests 20s after opening the Coaching tab.
  useEffect(() => {
    if (view !== "coaching") return;
    const hasPending = sessions.some((s) => s.status === "pending");
    if (!hasPending) return;

    const timer = window.setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) => (s.status === "pending" ? { ...s, status: "upcoming" } : s))
      );
    }, 20_000);

    return () => window.clearTimeout(timer);
  }, [view, pendingCount]);

  const openOverlay = (suggestions: SuggestionPattern[] = []) => {
    setOverlaySuggestions(suggestions);
    setCoachingOpen(true);
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

  // Pre-join -> live call.
  const startMeeting = (
    session: CoachingSession,
    opts: { transcript: boolean; goBy: string }
  ) => {
    setMeeting({ session, goBy: opts.goBy, transcript: opts.transcript });
    setJoiningSession(null);
  };

  // Meeting ended: save board and move session to History.
  const endMeeting = (board: MeetingBoard) => {
    if (!meeting) return;
    const id = meeting.session.id;
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "history", board } : s))
    );
    setMeeting(null);
  };

  const onNavigate = (id: string) => {
    if (id === "home") setView("dashboard");
    else if (id === "coaching") setView("coaching");
    setMenuOpen(false);
  };

  const activeNavId = view === "coaching" ? "coaching" : "home";

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
            title={view === "coaching" ? "Coaching" : "My performance"}
          />

          <main className="w-full flex-1 p-4 sm:p-6 lg:p-10">
            {view === "dashboard" ? (
              <div className="mx-auto w-full max-w-5xl space-y-5">
                <PageHeader />
                <PerformanceOverview />
                <FeedbackPatterns onInitiateCoaching={openOverlay} />
                <ProjectsAssigned />
                <GoalSetting />
                <Achievements />
              </div>
            ) : (
              <CoachingSessionsPage
                sessions={sessions}
                onAddRequest={() => openOverlay()}
                onCancel={cancelSession}
                onJoin={(s) => setJoiningSession(s)}
                onDetails={(s) => setDetailSession(s)}
              />
            )}
          </main>
        </div>
      </div>

      <CoachingOverlay
        open={coachingOpen}
        onClose={() => setCoachingOpen(false)}
        initialSuggestions={overlaySuggestions}
        onSubmit={addSession}
      />

      <SessionDetailOverlay
        session={detailSession}
        onClose={() => setDetailSession(null)}
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
