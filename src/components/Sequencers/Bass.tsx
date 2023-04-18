import useRockStore from "../../store/RockStore";
import Sequencer from "./Sequencer";
import { BASS } from "../../store/constants";
import * as Tone from "tone";
import Hideable from "../UI/Hideable";

export default function Bass() {
  const bassSequence = useRockStore((s) => s.bassSequence);
  const setBassSequence = useRockStore((s) => s.setBassSequence);
  const volume = useRockStore((s) => s.volume);

  const getBassInstrument = () => {
    const synth = new Tone.FMSynth().connect(volume);
    // synth.oscillator.type = "fmsawtooth"
    synth.oscillator.modulationType = "triangle";
    return synth;
  };

  return (
    <Hideable title="Bass" defaultIsVisible={false}>
      <Sequencer
        notes={BASS}
        setSequence={setBassSequence}
        sequence={bassSequence}
        instrument={getBassInstrument}
      />
    </Hideable>
  );
}
