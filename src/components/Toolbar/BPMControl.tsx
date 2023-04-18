import * as Tone from "tone";

import useRockStore from "../../store/RockStore";
import { useEffect } from "react";
import NumberInput from "../UI/NumberInput";

export default function BPMControl() {
  const bpm = useRockStore((s) => s.bpm);
  const setBPM = useRockStore((s) => s.setBPM);
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
  return (
    <NumberInput
      name="bpm"
      label="BPM"
      setValue={setBPM}
      value={bpm}
      min={1}
      max={300}
    />
  );
}
