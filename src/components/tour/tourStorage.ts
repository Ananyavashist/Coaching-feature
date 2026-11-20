export const TOUR_PROMPT_ANSWERED_KEY = "aude-tour-prompt-answered";
export const TOUR_COMPLETED_KEY = "aude-tour-completed";

export function readPromptAnswered(): boolean {
  try {
    return localStorage.getItem(TOUR_PROMPT_ANSWERED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writePromptAnswered(): void {
  try {
    localStorage.setItem(TOUR_PROMPT_ANSWERED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function readTourCompleted(): boolean {
  try {
    return localStorage.getItem(TOUR_COMPLETED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeTourCompleted(): void {
  try {
    localStorage.setItem(TOUR_COMPLETED_KEY, "1");
  } catch {
    /* ignore */
  }
}
