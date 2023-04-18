import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import { useKeyPressEvent } from 'react-use';
import * as Tone from "tone";

import useRockStore from "../../store/RockStore";


function PlayButton() {
  const isAudioReady = useRockStore((s) => s.isAudioReady);
  const setIsAudioReady = useRockStore((s) => s.setIsAudioReady);
  const isPlaying = useRockStore((s) => s.isPlaying);
  const setIsPlaying = useRockStore((s) => s.setIsPlaying);
  const setPlayIndex = useRockStore((s) => s.setPlayIndex);

  const togglePlay = async () => {
    if (!isAudioReady) {
      await Tone.start();
      setIsAudioReady(true);
    }
    if (isPlaying) {
      Tone.Transport.stop();
      setPlayIndex(0); // without this, you'll get a flash of wherever the index left off
    } else {
      Tone.Transport.start();
    }
    setIsPlaying(!isPlaying);
  };

  useKeyPressEvent(' ', togglePlay); // this is a bit weird, but you need an actual space ' ' for spacebar to trigger

  return <button onClick={togglePlay} className="text-slate-200">{isPlaying ? <IconPlayerStop size={48} /> : <IconPlayerPlay size={48} />}</button>;
}

export default PlayButton;
