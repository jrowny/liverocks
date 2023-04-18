
import useRockStore from "../../store/RockStore";
import Sequencer from "./Sequencer";
import { KEYS } from "../../store/constants";
import * as Tone from "tone";
import Hideable from "../UI/Hideable";

export default function Keys() {
  const keysSequence = useRockStore((s) => s.keysSequence);
  const setKeysSequence = useRockStore((s) => s.setKeysSequence);
  const volume = useRockStore((s) => s.volume);

  const getKeyboardInstrument = () => {
    const dist = new Tone.Distortion(0.8);
    return new Tone.AMSynth().connect(volume);
  };

  return (
    <Hideable title="Keys" defaultIsVisible={true}>
      <Sequencer
        notes={KEYS}
        setSequence={setKeysSequence}
        sequence={keysSequence}
        instrument={getKeyboardInstrument}
      />
    </Hideable>
  );
}
