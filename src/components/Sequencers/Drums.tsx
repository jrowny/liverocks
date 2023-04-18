import useRockStore from "../../store/RockStore";
import Sequencer from "./Sequencer";
import { DRUMBS } from "../../store/constants";
import * as Tone from "tone";
import Hideable from "../UI/Hideable";

export default function Drumbs() {
  const drumbSequence = useRockStore((s) => s.drumSequence);
  const setDrumSequence = useRockStore((s) => s.setDrumSequence);
  const volume = useRockStore((s) => s.volume);

  const getDrumbInstrument = () => {
    const sampler = new Tone.Sampler({
      urls: {
        "A1": "RDM_Analog_SR88-Kick.wav",
        "B1": "RDM_Analog_SR88-Snr.wav",
        "C1": "RDM_Analog_SR88-OpHat.wav",
        "D1": "RDM_Analog_SR88-ClHat.wav",
      },
      baseUrl: "/",
    }).connect(volume);
    return sampler;
  }

  return (
    <Hideable title="Drums" defaultIsVisible={false}>
      <Sequencer
        notes={DRUMBS}
        setSequence={setDrumSequence}
        sequence={drumbSequence}
        instrument={getDrumbInstrument}
      />
    </Hideable>
  );
}
