import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';

import useRockStore from './store/RockStore';
import Sequencer from './components/Sequencer';
import StepControl from './components/StepControl';
import PlayButton from './components/PlayButton';
import BPMControl from './components/BPMControl';
import Volume from './components/Volume';


function getQueryVariable(variable: string): string | undefined {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return;
}

function App() {
  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
  } = useRockStore();

  const [roomId, setRoomId] = useState<string>();

  useEffect(() => {
    let room = getQueryVariable('room');
    if (!room) {
      room = nanoid();
      const url = new URL(window.location.href);
      url.searchParams.set("room", nanoid());
      window.history.pushState({}, "", url);
    }
    setRoomId(room);
  }, []);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    enterRoom(roomId);
    return () => {
      leaveRoom(roomId);
    };
  }, [roomId, enterRoom, leaveRoom]);

  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen">
      {isStorageLoading ? null : <Sequencer />}
      <div className="flex flex-row items-center justify-center gap-8">
        {isStorageLoading ? null : <><BPMControl /><StepControl /></>}
        <PlayButton />
      </div>
      <Volume />
    </div>
  )
}

export default App
