import create from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import { NOTES } from "./constants";

type State = {
  sequence: number[][];
  isAudioReady: boolean;
  isPlaying: boolean;
  playIndex: number;
  bpm: number;
  setIsAudioReady: (isAudioReady: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSequence: (sequence: number[][]) => void;
  setPlayIndex: (playIndex: number) => void;
  setBPM: (bpm: number) => void;
};

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_API_KEY,
});

const defaultState = {
  steps: 16,
  sequence: Array.from(Array(16), (_) => Array(NOTES.length).fill(0)),
  isPlaying: false,
  isAudioReady: false,
  playIndex: 0,
  bpm: 120,
};

const useRockStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      ...defaultState,
      setSequence: (sequence: number[][]) => {
        set(() => ({ sequence }));
      },
      setIsAudioReady: (isAudioReady: boolean) => {
        set(() => ({ isAudioReady }));
      },
      setIsPlaying: (isPlaying: boolean) => {
        set(() => ({ isPlaying }));
      },
      setPlayIndex: (playIndex: number) => {
        set(() => ({ playIndex }));
      },
      setBPM: (bpm: number) => {
        set(() => ({ bpm }));
      },
    }),
    {
      client,
      storageMapping: {
        bpm: true,
        sequence: true,
      },
    }
  )
);

export default useRockStore;
