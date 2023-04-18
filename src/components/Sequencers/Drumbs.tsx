import useRockStore from "../../store/RockStore";
import Sequencer from "./Sequencer";
import { DRUMBS } from "../../store/constants";
import * as Tone from "tone";
import Hideable from "../UI/Hideable";

export default function Drumbs() {
  const drumbSequence = useRockStore((s) => s.drumbSequence);
  const setDrumbSequence = useRockStore((s) => s.setDrumbSequence);
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
    <Hideable title="Drumbs" defaultIsVisible={false}>
      <Sequencer
        notes={DRUMBS}
        setSequence={setDrumbSequence}
        sequence={drumbSequence}
        instrument={getDrumbInstrument}
      />
    </Hideable>
  );
}
