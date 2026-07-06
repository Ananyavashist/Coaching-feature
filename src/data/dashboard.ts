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

/** AI fills captured fields from the transcript — user reviews before saving. */
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
  },
];
