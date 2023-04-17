import React, { useEffect, useState } from "react";
import clsx from "clsx";

import useRockStore from "../store/RockStore";
import { NOTES } from "../store/constants";

export default function StepControl() {
  const sequence = useRockStore((s) => s.sequence);
  const setSequence = useRockStore((s) => s.setSequence);
  const setSteps = (steps: number) => {
    if (steps < sequence.length) {
      setSequence([...sequence.slice(0, steps)]);
    } else {
      const diff = steps - sequence.length;
      setSequence([
        ...sequence,
        ...Array.from(Array(diff), (_) => Array(NOTES.length).fill(0)),
      ]);
    }
  };
  return (
    <input
      type="number"
      min="8"
      max="16"
      value={sequence.length}
      onChange={(e) => setSteps(parseInt(e.target.value, 10))}
    />
  );
}
