export type NavItem = {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
};

export const primaryNav: NavItem[] = [
  { id: "home", label: "Overview", icon: "Home01", active: true },
  { id: "my-performance", label: "My Performance", icon: "BarChartSquare02" },
  { id: "teams", label: "My Teams", icon: "Users01" },
  { id: "coaching", label: "Coaching", icon: "GraduationHat01" },
  { id: "sessions", label: "Sessions", icon: "FileCheck02" },
  { id: "evaluation-criteria", label: "Evaluation criteria", icon: "FileCheck02" },
  { id: "yearly-insights", label: "Yearly Insights", icon: "LineChartUp03" },
];

export const adminNav: NavItem[] = [
  { id: "management", label: "Management", icon: "UsersCheck" },
  { id: "integrations", label: "Integrations", icon: "Grid01" },
  { id: "peer-forms", label: "Peer Forms", icon: "ClipboardCheck" },
  { id: "help", label: "Help and Support", icon: "LifeBuoy01" },
  { id: "settings", label: "Settings", icon: "Settings01" },
];

export const employee = {
  name: "Bonnie Green",
  role: "Software Engineer at Aude.ai",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
};

export type PerformanceCategory = {
  id: string;
  label: string;
  value: number;
  summary: string;
};

export const performancePeriod = "Jun 1, 2026, Jun 15, 2026";

export const performanceCategories: PerformanceCategory[] = [
  {
    id: "engineering",
    label: "Engineering Excellence",
    value: 73,
    summary:
      "Bonnie Green's performance in Engineering Excellence during this period demonstrates a strong focus on code quality, reliable delivery, and consistent PR practices across the analytics and platform workstreams.",
  },
  {
    id: "trust",
    label: "Trust & Integrity",
    value: 79,
    summary:
      "Bonnie Green communicates openly with her team, follows through on commitments, and builds trust through transparent updates in Slack and standups, with room to share blockers earlier in the sprint.",
  },
  {
    id: "innovation",
    label: "Innovation & Strategic Thinking",
    value: 68,
    summary:
      "Bonnie Green brings creative problem solving to backend features and mentors peers on implementation patterns, while longer term strategic scoping for large initiatives could benefit from more upfront design alignment.",
  },
];

/** @deprecated use performanceCategories */
export type PerformanceMetric = {
  label: string;
  value: number;
};

export const performanceMetrics: PerformanceMetric[] = performanceCategories.map((c) => ({
  label: c.label,
  value: c.value,
}));

export const performanceSummary: string[] = [
  performanceCategories[0].summary,
];

export type FeedbackPattern = {
  id: string;
  label: string;
  /** Diameter in px at desktop scale — proportional to number of feedbacks. */
  size: number;
  /** Bubble center as a percentage of the plot area. */
  x: number;
  y: number;
  /** Optional pixel nudge from the computed center. */
  offsetX?: number;
  offsetY?: number;
  /** Where the label tag sits relative to the bubble. */
  labelPos: "top" | "bottom" | "bottom-right" | "top-left";
  /** Competency this feedback maps to. */
  category: string;
  tone: "brand" | "warning" | "success";
  /** Longer text surfaced as the coaching suggestion when selected. */
  detail: string;
};

export const feedbackPatterns: FeedbackPattern[] = [
  {
    id: "p1",
    label: "Improve documentation on PRs",
    size: 132,
    x: 36,
    y: 40,
    offsetX: -20,
    labelPos: "top",
    category: "Engineering Excellence",
    tone: "warning",
    detail:
      "Reviewers repeatedly ask for more context on pull requests. Add clear descriptions, screenshots, and testing notes so changes are easy to review.",
  },
  {
    id: "p2",
    label: "Share updates earlier in the sprint",
    size: 92,
    x: 14,
    y: 76,
    offsetY: -26,
    labelPos: "bottom",
    category: "Trust and Integrity",
    tone: "brand",
    detail:
      "Progress is often shared late in the sprint. Post smaller, earlier updates so the team can plan and unblock work sooner.",
  },
  {
    id: "p3",
    label: "Developer hands off clarity",
    size: 86,
    x: 54,
    y: 28,
    labelPos: "top",
    category: "Innovative and Strategic Thinking",
    tone: "success",
    detail:
      "Hand-offs between developers lack shared context. Document decisions and next steps so ownership transfers cleanly.",
  },
  {
    id: "p4",
    label: "Communicate blockers sooner",
    size: 66,
    x: 66,
    y: 82,
    labelPos: "bottom-right",
    category: "Trust and Integrity",
    tone: "brand",
    detail:
      "Blockers surface too late. Raise them in daily standup as soon as they appear instead of waiting until the end of the week.",
  },
  {
    id: "p5",
    label: "Follow consistent code formatting",
    size: 74,
    x: 86,
    y: 46,
    labelPos: "top-left",
    category: "Engineering Excellence",
    tone: "warning",
    detail:
      "Formatting varies across files. Use the shared linter and coding guidelines checklist before marking a PR ready for review.",
  },
];

export type ActionItem = {
  id: string;
  label: string;
  done: boolean;
};

export const feedbackActions: ActionItem[] = [
  {
    id: "a1",
    label: "Break larger tasks into smaller tickets and share what you will pick up first.",
    done: true,
  },
  {
    id: "a2",
    label: "Bring up blockers during daily standup instead of waiting until the end of the week.",
    done: false,
  },
  {
    id: "a3",
    label: "Use the team's coding guidelines checklist before marking a PR as ready for review.",
    done: false,
  },
];

export const projects: string[] = [
  "GitHub Pull Requests Section Functionality",
  "CI/CD Workflow Refactoring and Secret Management",
  "Google Calendar Connection Flow Documentation",
  "Implement GitHub Pull Request Statistics",
];

export type Goal = {
  id: string;
  title: string;
  description: string;
  category: string;
  tone: "brand" | "warning" | "success";
};

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Learning advanced python programming using github library",
    description:
      "Learn advanced Python concepts to strengthen and take on more complex work. Apply these techniques to real deliverables in code review and downstream tasks.",
    category: "Engineering Excellence",
    tone: "brand",
  },
  {
    id: "g2",
    title:
      "Consistently demonstrate honesty, transparency, and accountability in all work interactions",
    description:
      "Build integrity and accountability into every working relationship you have. Earn trust through clear, honest, and consistent communication and follow-through on all commitments.",
    category: "Trust and Integrity",
    tone: "warning",
  },
];

export type Achievement = {
  id: string;
  value: string;
  label: string;
  icon: string;
};

export const achievements: Achievement[] = [
  { id: "ach1", value: "50", label: "Number of action items completed", icon: "Star01" },
  { id: "ach2", value: "644", label: "Days since you started working at Aude.ai", icon: "Flag01" },
  { id: "ach3", value: "20", label: "Number of issues resolved", icon: "CheckSquare" },
];

/* ------------------------------ Coaching form ----------------------------- */

export type Person = {
  id: string;
  name: string;
  avatar: string;
  designation: string;
};

export const coaches: Person[] = [
  {
    id: "mikel",
    name: "Mikel Williams",
    designation: "Project Manager",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop",
  },
  {
    id: "sarah",
    name: "Sarah Connor",
    designation: "Team Lead",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop",
  },
  {
    id: "bruce",
    name: "Bruce Wayne",
    designation: "Project Lead",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=128&auto=format&fit=crop",
  },
];

export const currentUser = {
  name: "Bonnie Green",
  email: "bonnie@aude.ai",
  designation: "Software Engineer",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
};

export const timeSlots: string[] = [
  "1:30pm, 2:00pm",
  "2:00pm, 2:30pm",
  "3:00pm, 3:30pm",
  "4:00pm, 4:30pm",
];

export type Priority = { id: string; label: string; tone: "gray" | "warning" | "error" };

export const priorities: Priority[] = [
  { id: "low", label: "Low", tone: "gray" },
  { id: "medium", label: "Medium", tone: "warning" },
  { id: "high", label: "High", tone: "error" },
];

export type SuggestionPattern = {
  id: string;
  tag: string;
  tone: "brand" | "warning" | "success";
  text: string;
};

export const suggestionPatterns: SuggestionPattern[] = [
  {
    id: "s1",
    tag: "Engineering Excellence",
    tone: "warning",
    text: "Detected repeated structural refactoring across the last three backend features due to large, combined logic blocks and unclear module boundaries",
  },
];

export const coachingDefaults = {
  description:
    "Detected repeated structural refactoring across the last three backend features due to large, combined logic blocks and unclear module boundaries. Detected repeated structural refactoring across the last three backend features due to large, combined logic blocks and unclear module boundaries",
  meetingGoals: [
    "Detected repeated structural refactoring across the last three backend",
    "",
  ],
};

/* ---------------------------- Coaching sessions --------------------------- */

export const managerRole = "Senior Manager";

export const sessionDates: string[] = [
  "Tue, July 27th",
  "Wed, July 28th",
  "Thu, July 29th",
  "Mon, August 2nd",
];

export const coachingCategories: string[] = [
  "Engineering Excellence",
  "Trust and Integrity",
  "Innovative and Strategic Thinking",
];

export type CoachingStatus = "upcoming" | "pending" | "active" | "history" | "cancelled";

export type SessionType = "first" | "follow-up";
export type MeetingFormat = "in-person" | "remote";
export type AlignmentStatus = "agreed" | "open";
export type AttendanceStatus = "both-present" | "no-show" | "rescheduled";

export type BoardChecklistItem = { id: string; text: string; done: boolean };
export type BoardMilestone = {
  id: string;
  text: string;
  owner: string;
  checkIn: string;
  done: boolean;
};
export type BoardTask = {
  id: string;
  text: string;
  owner: string;
  due: string;
  done: boolean;
};

export type BoardApprovalStatus = "draft" | "pending" | "approved";

export type TranscriptSpeaker = "manager" | "engineer";

export type TranscriptLine = {
  id: string;
  speaker: TranscriptSpeaker;
  speakerName: string;
  text: string;
  timestamp: string;
};

export type TranscriptSummaryBullet = {
  id: string;
  text: string;
  sourceQuote: string;
  sourceSpeaker: string;
};

export type TranscriptSummarySection = {
  id: string;
  heading: string;
  bullets: TranscriptSummaryBullet[];
};

export type TranscriptChatMessage = {
  id: string;
  role: "user" | "assistant";
  question?: string;
  bullets?: TranscriptSummaryBullet[];
  intro?: string;
};

export type MeetingTranscript = {
  lines: TranscriptLine[];
  summary?: TranscriptSummarySection[];
  chatHistory: TranscriptChatMessage[];
  summarizedAt?: string;
};

export type MeetingBoard = {
  /* Carried into the meeting */
  challenge: string;
  description: string;
  attachedPatterns: SuggestionPattern[];
  desiredOutcome: string;
  sessionType: SessionType;
  priorItems: BoardChecklistItem[];
  previousSummary: string;
  aiAgenda: string[];
  format: MeetingFormat;
  /* Captured during / after */
  problemStatement: string;
  alignment: AlignmentStatus;
  milestones: BoardMilestone[];
  tasks: BoardTask[];
  attendance: AttendanceStatus;
  notes: string;
};

export type CoachingSession = {
  id: string;
  managerId: string;
  managerName: string;
  role: string;
  date: string;
  timeSlot: string;
  priorityId: string;
  description: string;
  category: string;
  suggestions: SuggestionPattern[];
  goals: string[];
  status: CoachingStatus;
  board?: MeetingBoard;
  /** Milestones and tasks selected for the next session discussion. */
  discussMilestones?: BoardMilestone[];
  discussTasks?: BoardTask[];
  /** Follow-up session booked during a live coaching call. */
  createdDuringMeeting?: boolean;
  /** Submitted through the coaching request form — eligible for manager auto-accept demo. */
  submittedViaForm?: boolean;
  /** Seed/demo card that always stays in pending. */
  isPermanentDemo?: boolean;
  boardApprovalStatus?: BoardApprovalStatus;
  transcript?: MeetingTranscript;
  savedToSessionsAt?: string;
};

let boardSeq = 0;
export const bid = (p: string) => `${p}-${(boardSeq += 1)}`;

/** Seed a board from a session: carried-in filled, captured section empty for live calls. */
export function buildBoard(session: CoachingSession, forLiveMeeting = false): MeetingBoard {
  const engineer = currentUser.name;
  const goals = session.goals.filter(Boolean);
  const challenge = session.description.split(". ")[0];
  const discussPrior: BoardChecklistItem[] = [
    ...(session.discussMilestones ?? []).map((m) => ({
      id: m.id,
      text: `Milestone: ${m.text}`,
      done: m.done,
    })),
    ...(session.discussTasks ?? []).map((t) => ({
      id: t.id,
      text: `Task: ${t.text}`,
      done: t.done,
    })),
  ];
  return {
    challenge,
    description: session.description,
    attachedPatterns: session.suggestions,
    desiredOutcome: goals.join(". ") || "Clearer approach and concrete next steps.",
    sessionType: discussPrior.length > 0 ? "follow-up" : "first",
    priorItems: discussPrior,
    previousSummary: "",
    aiAgenda:
      goals.length > 0
        ? goals
        : [
            "Walk through the attached patterns and the engineer's challenge.",
            "Agree on a shared problem statement.",
            "Define next milestones and owners.",
          ],
    format: "remote",
    problemStatement: "",
    alignment: "agreed",
    milestones: forLiveMeeting
      ? []
      : goals.map((g) => ({
          id: bid("m"),
          text: g,
          owner: engineer,
          checkIn: session.date,
          done: false,
        })),
    tasks: [],
    attendance: "both-present",
    notes: "",
  };
}

/** Empty transcript state for a new live meeting. */
export function createEmptyTranscript(): MeetingTranscript {
  return { lines: [], chatHistory: [] };
}

/** Mock live transcript script — timed delivery during the call. */
export function buildLiveTranscriptScript(session: CoachingSession): Omit<TranscriptLine, "id">[] {
  const manager = session.managerName;
  const engineer = currentUser.name;
  return [
    {
      speaker: "manager",
      speakerName: manager,
      text: `Thanks for joining, ${engineer}. Let's start with the agenda you shared on PR documentation.`,
      timestamp: "2:01 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "Sounds good. I have the patterns and challenge pulled up on the board.",
      timestamp: "2:02 PM",
    },
    {
      speaker: "manager",
      speakerName: manager,
      text: "Walk me through a recent pull request where reviewers asked for more context.",
      timestamp: "2:03 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "Last week I shipped the analytics export endpoint. Reviewers needed three rounds because the PR description didn't explain the data shape or test coverage.",
      timestamp: "2:04 PM",
    },
    {
      speaker: "manager",
      speakerName: manager,
      text: "That's a good example. What would a lightweight template look like for your team?",
      timestamp: "2:06 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "I'm thinking: summary, screenshots, test notes, and any API contract changes. Maybe a checklist before opening the PR.",
      timestamp: "2:07 PM",
    },
    {
      speaker: "manager",
      speakerName: manager,
      text: "Agreed. Let's also talk about sharing blockers earlier — that's come up in peer feedback.",
      timestamp: "2:09 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "Fair point. I tend to post updates late in the sprint when I'm deep in implementation.",
      timestamp: "2:10 PM",
    },
    {
      speaker: "manager",
      speakerName: manager,
      text: "Try mid-sprint check-ins in Slack. Even a two-line status helps the team plan.",
      timestamp: "2:11 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "I'll commit to posting blocker updates by Wednesday each sprint.",
      timestamp: "2:12 PM",
    },
    {
      speaker: "manager",
      speakerName: manager,
      text: "Great. Let's capture milestones and tasks on the board before we wrap.",
      timestamp: "2:14 PM",
    },
    {
      speaker: "engineer",
      speakerName: engineer,
      text: "I'll draft the PR template and share it with the team by end of week.",
      timestamp: "2:15 PM",
    },
  ];
}

/** Generate categorized summary from transcript lines. */
export function generateTranscriptSummary(
  session: CoachingSession,
  _lines: TranscriptLine[]
): TranscriptSummarySection[] {
  const manager = session.managerName;
  const engineer = currentUser.name;
  return [
    {
      id: "ctx",
      heading: "Session context",
      bullets: [
        {
          id: "ctx-1",
          text: `${manager} and ${engineer} reviewed ${session.category.toLowerCase()} coaching goals around PR documentation and sprint communication.`,
          sourceQuote: `Thanks for joining, ${engineer}. Let's start with the agenda you shared on PR documentation.`,
          sourceSpeaker: manager,
        },
        {
          id: "ctx-2",
          text: `Session focused on ${session.goals.join(" and ").toLowerCase() || "concrete next steps"}.`,
          sourceQuote: session.description.split(". ")[0] + ".",
          sourceSpeaker: manager,
        },
      ],
    },
    {
      id: "problem",
      heading: "Problem discussed",
      bullets: [
        {
          id: "prob-1",
          text: "PR descriptions lack enough context before review, causing repeated reviewer questions and slower turnaround.",
          sourceQuote:
            "Last week I shipped the analytics export endpoint. Reviewers needed three rounds because the PR description didn't explain the data shape or test coverage.",
          sourceSpeaker: engineer,
        },
        {
          id: "prob-2",
          text: "Progress and blockers are shared late in the sprint, limiting the team's ability to plan and unblock work.",
          sourceQuote: "I tend to post updates late in the sprint when I'm deep in implementation.",
          sourceSpeaker: engineer,
        },
      ],
    },
    {
      id: "milestones",
      heading: "Milestones agreed",
      bullets: [
        {
          id: "ms-1",
          text: "Agree on a shared PR description template for the team.",
          sourceQuote: "What would a lightweight template look like for your team?",
          sourceSpeaker: manager,
        },
        {
          id: "ms-2",
          text: "Reduce average PR review turnaround time over the next sprint.",
          sourceQuote: "Let's capture milestones and tasks on the board before we wrap.",
          sourceSpeaker: manager,
        },
      ],
    },
    {
      id: "tasks",
      heading: "Tasks and next steps",
      bullets: [
        {
          id: "tk-1",
          text: "Draft PR template (summary, screenshots, test notes, API changes) and share with the team.",
          sourceQuote: "I'll draft the PR template and share it with the team by end of week.",
          sourceSpeaker: engineer,
        },
        {
          id: "tk-2",
          text: "Post mid-sprint blocker updates in Slack by Wednesday each sprint.",
          sourceQuote: "I'll commit to posting blocker updates by Wednesday each sprint.",
          sourceSpeaker: engineer,
        },
        {
          id: "tk-3",
          text: "Apply the new template on the next three pull requests.",
          sourceQuote:
            "I'm thinking: summary, screenshots, test notes, and any API contract changes.",
          sourceSpeaker: engineer,
        },
      ],
    },
    {
      id: "notes",
      heading: "Notes",
      bullets: [
        {
          id: "n-1",
          text: `${manager} recommended mid-sprint check-ins even when work is still in progress.`,
          sourceQuote: "Try mid-sprint check-ins in Slack. Even a two-line status helps the team plan.",
          sourceSpeaker: manager,
        },
      ],
    },
  ];
}

/** Mock chatbot Q&A over transcript content. */
export function answerTranscriptQuestion(
  session: CoachingSession,
  transcript: MeetingTranscript,
  question: string
): TranscriptChatMessage {
  const q = question.toLowerCase();
  const summary = transcript.summary ?? [];

  const findBullets = (keywords: string[]) => {
    const bullets: TranscriptSummaryBullet[] = [];
    for (const section of summary) {
      for (const b of section.bullets) {
        if (keywords.some((k) => b.text.toLowerCase().includes(k) || section.heading.toLowerCase().includes(k))) {
          bullets.push(b);
        }
      }
    }
    return bullets.slice(0, 4);
  };

  let bullets: TranscriptSummaryBullet[] = [];
  let intro = "Here's what I found in the transcript:";

  if (q.includes("milestone") || q.includes("agree")) {
    bullets = findBullets(["milestone", "template", "turnaround"]);
    intro = "Milestones discussed in this session:";
  } else if (q.includes("task") || q.includes("next") || q.includes("step")) {
    bullets = findBullets(["task", "draft", "template", "blocker", "apply"]);
    intro = "Tasks and next steps from the conversation:";
  } else if (q.includes("problem") || q.includes("issue") || q.includes("pr")) {
    bullets = findBullets(["problem", "pr", "context", "review", "blocker"]);
    intro = "Problems and themes raised:";
  } else if (q.includes("manager") || q.includes(session.managerName.toLowerCase())) {
    const managerLines = transcript.lines.filter((l) => l.speaker === "manager");
    bullets = managerLines.slice(0, 3).map((l, i) => ({
      id: `mgr-${i}`,
      text: l.text,
      sourceQuote: l.text,
      sourceSpeaker: l.speakerName,
    }));
    intro = `Key points from ${session.managerName}:`;
  } else {
    bullets = summary.flatMap((s) => s.bullets).slice(0, 4);
    intro = "Based on the full transcript summary:";
  }

  if (bullets.length === 0) {
    bullets = [
      {
        id: "fallback",
        text: "No specific match found. Try asking about milestones, tasks, problems, or what the manager said.",
        sourceQuote: transcript.lines[0]?.text ?? session.description,
        sourceSpeaker: transcript.lines[0]?.speakerName ?? session.managerName,
      },
    ];
  }

  return {
    id: `chat-${Date.now()}`,
    role: "assistant",
    question,
    intro,
    bullets,
  };
}

/** @deprecated Board is filled manually — no auto-draft from transcript. */
export function draftBoardFromTranscript(
  session: CoachingSession,
  board: MeetingBoard
): MeetingBoard {
  const engineer = currentUser.name;
  return {
    ...board,
    problemStatement:
      board.problemStatement ||
      "PR documentation lacks enough context before review, slowing turnaround and causing repeated reviewer questions.",
    milestones: board.milestones.length
      ? board.milestones
      : [
          {
            id: bid("m"),
            text: "Agree on a PR description template",
            owner: engineer,
            checkIn: session.date,
            done: false,
          },
          {
            id: bid("m"),
            text: "Reduce review turnaround time",
            owner: session.managerName,
            checkIn: session.date,
            done: false,
          },
        ],
    tasks: board.tasks.length
      ? board.tasks
      : [
          {
            id: bid("t"),
            text: "Draft PR template and share with the team",
            owner: engineer,
            due: session.date,
            done: false,
          },
          {
            id: bid("t"),
            text: "Apply the template on the next three pull requests",
            owner: engineer,
            due: session.date,
            done: false,
          },
        ],
    notes: board.notes.trim() ? board.notes : draftNotesFromTranscript(session),
  };
}

/** AI-drafted notes produced from the "transcript" — must be reviewed before saving. */
export function draftNotesFromTranscript(session: CoachingSession): string {
  return [
    "AI draft — review before saving.",
    `• Reviewed ${session.managerName}'s guidance on ${session.category.toLowerCase()}.`,
    "• Walked through the attached patterns alongside the engineer's own challenge description.",
    "• Agreed on a shared problem statement and confirmed alignment.",
    "• Captured next milestones and tasks with owners and check-in dates.",
  ].join("\n");
}

export const initialSessions: CoachingSession[] = [
  {
    id: "cs-upcoming-1",
    managerId: "sarah",
    managerName: "Sarah Connor",
    role: "Team Lead",
    date: "Mon, August 2nd",
    timeSlot: "2:00pm, 2:30pm",
    priorityId: "medium",
    description:
      "Deep dive on improving PR documentation and review turnaround. We'll walk through recent pull requests, agree on a lightweight template, and set expectations for context and testing notes.",
    category: "Engineering Excellence",
    suggestions: [
      {
        id: "p1",
        tag: "Engineering Excellence",
        tone: "warning",
        text: "Reviewers repeatedly ask for more context on pull requests. Add clear descriptions, screenshots, and testing notes so changes are easy to review.",
      },
      {
        id: "p2",
        tag: "Trust and Integrity",
        tone: "brand",
        text: "Progress is often shared late in the sprint. Post smaller, earlier updates so the team can plan and unblock work sooner.",
      },
    ],
    goals: ["Agree on a PR description template", "Reduce review turnaround time"],
    status: "upcoming",
  },
  {
    id: "cs-history-1",
    managerId: "bruce",
    managerName: "Bruce Wayne",
    role: "Project Lead",
    date: "Fri, July 18th",
    timeSlot: "3:00pm, 3:30pm",
    priorityId: "high",
    description:
      "Reviewed strategic scoping for the analytics initiative. Agreed on a phased rollout and clearer ownership boundaries between teams.",
    category: "Innovative and Strategic Thinking",
    suggestions: [
      {
        id: "p3",
        tag: "Innovative and Strategic Thinking",
        tone: "brand",
        text: "Hand-offs between developers lack shared context. Document decisions and next steps so ownership transfers cleanly.",
      },
    ],
    goals: ["Define phase milestones", "Clarify cross-team ownership"],
    status: "history",
    board: {
      challenge: "Struggling with code organization in large features",
      description:
        "Struggling to break down large backend features into smaller, predictable units of work. When moving from design to implementation, the structure becomes unclear, causing rework and delays in PR reviews.",
      attachedPatterns: [
        {
          id: "p3",
          tag: "Innovative and Strategic Thinking",
          tone: "brand",
          text: "Hand-offs between developers lack shared context. Document decisions and next steps so ownership transfers cleanly.",
        },
      ],
      desiredOutcome:
        "A repeatable way to break down large features and communicate design decisions before implementation.",
      sessionType: "follow-up",
      previousSummary:
        "Reviewed Pavan's initial implementation of Feature X. Discussed issues caused by merging validation + business logic. Identified reasons for mid-feature rewrite and added delays.",
      priorItems: [
        { id: "pi-1", text: "Establish a consistent branching + commit strategy", done: true },
        {
          id: "pi-2",
          text: "Create a short pre-implementation outline for each major feature",
          done: false,
        },
        {
          id: "pi-3",
          text: "Communicate design decisions proactively (trade-offs, API shapes, data flows)",
          done: false,
        },
      ],
      aiAgenda: [
        "Share the outline for the next backend feature and get feedback on structure.",
        "Ask for examples of good pre-implementation breakdowns from past projects.",
        "Confirm expectations for clarity checkpoints before starting future work.",
      ],
      format: "remote",
      problemStatement:
        "Large features are implemented before the structure is agreed, leading to mid-feature rewrites.",
      alignment: "agreed",
      milestones: [
        {
          id: "ms-1",
          text: "Create a high-level module outline before coding the next feature",
          owner: "Bruce Wayne",
          checkIn: "Fri, July 25th",
          done: false,
        },
      ],
      tasks: [
        {
          id: "tk-1",
          text: "For the next feature, create a high-level module outline before coding",
          owner: currentUser.name,
          due: "Wed, July 23rd",
          done: true,
        },
        {
          id: "tk-2",
          text: 'Add a short "Design summary" section to the next PR explaining key decisions',
          owner: currentUser.name,
          due: "Thu, July 24th",
          done: false,
        },
        {
          id: "tk-3",
          text: "Document the common edge cases that usually cause refactoring during late review",
          owner: currentUser.name,
          due: "Fri, July 25th",
          done: false,
        },
      ],
      attendance: "both-present",
      notes:
        "Reviewed the initial implementation and the causes of the mid-feature rewrite. Agreed to introduce a lightweight design outline step and a design-summary section in PRs.",
    },
    boardApprovalStatus: "pending",
    savedToSessionsAt: "2026-07-18T15:00:00.000Z",
    transcript: {
      lines: buildLiveTranscriptScript({
        id: "cs-history-1",
        managerId: "bruce",
        managerName: "Bruce Wayne",
        role: "Project Lead",
        date: "Fri, July 18th",
        timeSlot: "3:00pm, 3:30pm",
        priorityId: "high",
        description: "Reviewed strategic scoping for the analytics initiative.",
        category: "Innovative and Strategic Thinking",
        suggestions: [],
        goals: ["Define phase milestones"],
        status: "history",
      }).map((l, i) => ({ ...l, id: `tl-h-${i}` })),
      summary: generateTranscriptSummary(
        {
          id: "cs-history-1",
          managerId: "bruce",
          managerName: "Bruce Wayne",
          role: "Project Lead",
          date: "Fri, July 18th",
          timeSlot: "3:00pm, 3:30pm",
          priorityId: "high",
          description: "Reviewed strategic scoping for the analytics initiative.",
          category: "Innovative and Strategic Thinking",
          suggestions: [],
          goals: ["Define phase milestones"],
          status: "history",
        },
        []
      ),
      chatHistory: [],
      summarizedAt: "2026-07-18T15:30:00.000Z",
    },
  },
  {
    id: "cs-archive-draft-1",
    managerId: "sarah",
    managerName: "Sarah Connor",
    role: "Team Lead",
    date: "Mon, July 7th",
    timeSlot: "2:00pm, 2:30pm",
    priorityId: "medium",
    description:
      "PR documentation coaching session — partial board saved as draft after leaving without sending approval.",
    category: "Engineering Excellence",
    suggestions: [],
    goals: ["Agree on PR template"],
    status: "history",
    boardApprovalStatus: "draft",
    savedToSessionsAt: "2026-07-07T14:30:00.000Z",
    board: {
      challenge: "PR documentation needs more context before review",
      description:
        "Deep dive on improving PR documentation and review turnaround with Sarah Connor.",
      attachedPatterns: [],
      desiredOutcome: "Agree on a PR description template",
      sessionType: "first",
      priorItems: [],
      previousSummary: "",
      aiAgenda: ["Walk through recent PRs", "Agree on template"],
      format: "remote",
      problemStatement: "Reviewers need more context on pull requests before review.",
      alignment: "agreed",
      milestones: [],
      tasks: [],
      attendance: "both-present",
      notes: "",
    },
    transcript: {
      lines: buildLiveTranscriptScript({
        id: "cs-archive-draft-1",
        managerId: "sarah",
        managerName: "Sarah Connor",
        role: "Team Lead",
        date: "Mon, July 7th",
        timeSlot: "2:00pm, 2:30pm",
        priorityId: "medium",
        description: "PR documentation coaching",
        category: "Engineering Excellence",
        suggestions: [],
        goals: ["Agree on PR template"],
        status: "history",
      }).map((l, i) => ({ ...l, id: `tl-d-${i}` })),
      summary: generateTranscriptSummary(
        {
          id: "cs-archive-draft-1",
          managerId: "sarah",
          managerName: "Sarah Connor",
          role: "Team Lead",
          date: "Mon, July 7th",
          timeSlot: "2:00pm, 2:30pm",
          priorityId: "medium",
          description: "PR documentation coaching",
          category: "Engineering Excellence",
          suggestions: [],
          goals: ["Agree on PR template"],
          status: "history",
        },
        []
      ),
      chatHistory: [],
      summarizedAt: "2026-07-07T14:25:00.000Z",
    },
  },
  {
    id: "cs-pending-booked-1",
    managerId: "mikel",
    managerName: "Mikel Williams",
    role: "Project Manager",
    date: "Thu, August 7th",
    timeSlot: "3:00pm, 3:30pm",
    priorityId: "high",
    description:
      "Booked follow-up to review sprint planning habits and earlier blocker communication. We'll walk through recent standups and agree on a lightweight update cadence.",
    category: "Trust and Integrity",
    suggestions: [
      {
        id: "p2",
        tag: "Trust and Integrity",
        tone: "brand",
        text: "Progress is often shared late in the sprint. Post smaller, earlier updates so the team can plan and unblock work sooner.",
      },
    ],
    goals: ["Share blockers earlier", "Post mid-sprint progress updates"],
    status: "pending",
    isPermanentDemo: true,
  },
  {
    id: "cs-active-followup-1",
    managerId: "sarah",
    managerName: "Sarah Connor",
    role: "Team Lead",
    date: "Wed, August 6th",
    timeSlot: "1:30pm, 2:00pm",
    priorityId: "medium",
    description:
      "Follow-up on PR template adoption — review progress on the last three pull requests and adjust the template if reviewers still need more context.",
    category: "Engineering Excellence",
    suggestions: [],
    goals: ["Confirm template is working", "Identify remaining gaps"],
    status: "pending",
    isPermanentDemo: true,
  },
];
