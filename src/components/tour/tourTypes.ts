export type TourView = "home" | "my-performance" | "coaching" | "sessions";

export type TourAppState = {
  view: TourView;
  coachingOpen: boolean;
  joiningSession: boolean;
  meeting: boolean;
};

export type TourAdvanceMode = "next" | "clickTarget";

export type TourStep = {
  id: string;
  title: string;
  body: string;
  /** data-tour attribute value; omit for centered steps */
  target?: string;
  advance: TourAdvanceMode;
  /** When true, advance when app state satisfies `satisfiesAdvance` */
  satisfiesAdvance?: (state: TourAppState) => boolean;
  /** Expand sidebar / open mobile nav before showing step */
  needsSidebarNav?: boolean;
  centered?: boolean;
};
