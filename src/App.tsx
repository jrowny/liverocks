import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';

import useRockStore from './store/RockStore';
import Sequencer from './components/Sequencers/Sequencer';
import StepControl from './components/Toolbar/StepControl';
import PlayButton from './components/Toolbar/PlayButton';
import BPMControl from './components/Toolbar/BPMControl';
import Volume from './components/Toolbar/Volume';
import { BASS, DRUMBS, KEYS } from './store/constants';
import * as Tone from 'tone'
import Keys from './components/Sequencers/Keys';
import Bass from './components/Sequencers/Bass';
import Drumbs from './components/Sequencers/Drumbs';


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
    <div className="flex flex-col items-center justify-center h-screen">
      <Keys />
      <Bass />
      <Drumbs />
      <div className="flex flex-row items-center justify-center gap-8 mt-8">
        {isStorageLoading ? null : <><BPMControl /><StepControl /></>}
        <PlayButton />
      </div>
      <Volume />
    </div>
  )
}

export default App
