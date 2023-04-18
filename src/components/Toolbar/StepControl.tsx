import React, { useEffect, useState } from "react";
import clsx from "clsx";

import useRockStore from "../../store/RockStore";
import { BASS, DRUMBS, KEYS } from "../../store/constants";
import NumberInput from "../UI/NumberInput";

export default function StepControl() {
  const kSequence = useRockStore((s) => s.keysSequence);
  const bSequence = useRockStore((s) => s.bassSequence);
  const dSequence = useRockStore((s) => s.drumbSequence);
  const setKeysSequence = useRockStore((s) => s.setKeysSequence);
  const setBassSequence = useRockStore((s) => s.setBassSequence);
  const setDrumbSequence = useRockStore((s) => s.setDrumbSequence);
  const setSteps = (steps: number) => {
    if (steps < kSequence.length) {
      setKeysSequence([...kSequence.slice(0, steps)]);
      setBassSequence([...bSequence.slice(0, steps)]);
      setDrumbSequence([...dSequence.slice(0, steps)]);
    } else {
      const diff = steps - kSequence.length;
      setKeysSequence([
        ...kSequence,
        ...Array.from(Array(diff), (_) => Array(KEYS.length).fill(0)),
      ]);
      setBassSequence([
        ...bSequence,
        ...Array.from(Array(diff), (_) => Array(BASS.length).fill(0)),
      ]);
      setDrumbSequence([
        ...dSequence,
        ...Array.from(Array(diff), (_) => Array(DRUMBS.length).fill(0)),
      ]);

    }
  };
  return (
    <NumberInput
      name="steps"
      label="Steps"
      setValue={setSteps}
      value={kSequence.length}
      min={8}
      max={16}
    />
  );
}
