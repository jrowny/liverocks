import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params';
import { nanoid } from 'nanoid';

import useRockStore from './store/RockStore';
import Sequencer from './components/Sequencer';
import StepControl from './components/StepControl';
import PlayButton from './components/PlayButton';
import BPMControl from './components/BPMControl';




function App() {
  const [room, setRoom] = useQueryParam('room', StringParam);

  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
  } = useRockStore();

  useEffect(() => {
    const roomId = room ? room : nanoid();
    if (!room) {
      console.log("Setting roomId ", roomId);
      setRoom(roomId);
    }
    enterRoom(roomId);
    return () => {
      leaveRoom(roomId);
    };
  }, [room, enterRoom, leaveRoom]);

  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen">
      {isStorageLoading ? null : <Sequencer />}
      <div className="flex flex-row items-center justify-center gap-8">
        {isStorageLoading ? null : <><BPMControl /><StepControl /></>}
        <PlayButton />
      </div>
    </div>
  )
}

export default App
