import { useEffect, useRef } from "react";
import type { TourAppState, TourStep } from "./tourTypes";

export function useTourAdvance(
  active: boolean,
  step: TourStep | undefined,
  appState: TourAppState,
  onAdvance: () => void
) {
  const wasSatisfied = useRef(false);

  useEffect(() => {
    wasSatisfied.current = false;
  }, [step?.id]);

  useEffect(() => {
    if (!active || !step || step.advance !== "clickTarget" || !step.satisfiesAdvance) {
      wasSatisfied.current = false;
      return;
    }

    const satisfied = step.satisfiesAdvance(appState);
    if (satisfied && !wasSatisfied.current) {
      wasSatisfied.current = true;
      onAdvance();
    } else if (!satisfied) {
      wasSatisfied.current = false;
    }
  }, [active, step, appState, onAdvance]);
}
