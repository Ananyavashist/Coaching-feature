import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TOUR_STEPS } from "./tourSteps";
import {
  readPromptAnswered,
  writePromptAnswered,
  writeTourCompleted,
} from "./tourStorage";
import type { TourAppState } from "./tourTypes";
import { TourOverlay } from "./TourOverlay";
import { TourWelcomePrompt } from "./TourWelcomePrompt";
import { useTourAdvance } from "./useTourAdvance";

type TourPhase = "idle" | "prompt" | "active" | "done";

type TourContextValue = {
  phase: TourPhase;
  isActive: boolean;
  startTour: () => void;
  requestPromptIfNeeded: () => void;
};

const TourContext = createContext<TourContextValue | null>(null);

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within TourProvider");
  return ctx;
}

export function TourProvider({
  children,
  appState,
  onPrepareForStep,
  onRestartTour,
}: {
  children: ReactNode;
  appState: TourAppState;
  onPrepareForStep?: (needsSidebarNav: boolean) => void;
  onRestartTour?: () => void;
}) {
  const [phase, setPhase] = useState<TourPhase>(() =>
    readPromptAnswered() ? "idle" : "prompt"
  );
  const [stepIndex, setStepIndex] = useState(0);

  const step = TOUR_STEPS[stepIndex];
  const isActive = phase === "active";

  useEffect(() => {
    if (!isActive || !step?.needsSidebarNav) return;
    onPrepareForStep?.(true);
  }, [isActive, step?.id, step?.needsSidebarNav, onPrepareForStep]);

  const advance = useCallback(() => {
    setStepIndex((i) => {
      const next = i + 1;
      if (next >= TOUR_STEPS.length) {
        writeTourCompleted();
        setPhase("done");
        return i;
      }
      return next;
    });
  }, []);

  useTourAdvance(isActive, step, appState, advance);

  const startTour = useCallback(() => {
    writePromptAnswered();
    onRestartTour?.();
    setStepIndex(0);
    setPhase("active");
  }, [onRestartTour]);

  const handleLater = useCallback(() => {
    writePromptAnswered();
    setPhase("idle");
  }, []);

  const handleSkip = useCallback(() => {
    writeTourCompleted();
    setPhase("done");
  }, []);

  const handleNext = useCallback(() => {
    if (stepIndex >= TOUR_STEPS.length - 1) {
      writeTourCompleted();
      setPhase("done");
      return;
    }
    advance();
  }, [advance, stepIndex]);

  const requestPromptIfNeeded = useCallback(() => {
    if (!readPromptAnswered()) setPhase("prompt");
  }, []);

  const value = useMemo(
    () => ({
      phase,
      isActive,
      startTour,
      requestPromptIfNeeded,
    }),
    [phase, isActive, startTour, requestPromptIfNeeded]
  );

  return (
    <TourContext.Provider value={value}>
      {children}
      <TourWelcomePrompt
        open={phase === "prompt"}
        onStart={startTour}
        onLater={handleLater}
      />
      {isActive && step ? (
        <TourOverlay
          step={step}
          stepIndex={stepIndex}
          totalSteps={TOUR_STEPS.length}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      ) : null}
    </TourContext.Provider>
  );
}
