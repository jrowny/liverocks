import create from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import * as Tone from "tone";

import { KEYS, BASS, DRUMBS } from "./constants";

type State = {
  keysSequence: number[][];
  bassSequence: number[][];
  drumSequence: number[][];
  isAudioReady: boolean;
  isPlaying: boolean;
  playIndex: number;
  bpm: number;
  volume: Tone.Volume;
  setIsAudioReady: (isAudioReady: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setKeysSequence: (keysSequence: number[][]) => void;
  setBassSequence: (bassSequence: number[][]) => void;
  setDrumSequence: (drumSequence: number[][]) => void;
  setPlayIndex: (playIndex: number) => void;
  setBPM: (bpm: number) => void;
  setVolume: (volume: number) => void;
};

const client = createClient({
  publicApiKey: import.meta.env.VITE_LIVEBLOCKS_API_KEY,
});

const DEFAULT_STEPS = 16;
const DEFAULT_BPM = 120;

const defaultState = {
  keysSequence: Array.from(Array(DEFAULT_STEPS), (_) =>
    Array(KEYS.length).fill(0)
  ),
  bassSequence: Array.from(Array(DEFAULT_STEPS), (_) =>
    Array(BASS.length).fill(0)
  ),
  drumSequence: Array.from(Array(DEFAULT_STEPS), (_) =>
    Array(DRUMBS.length).fill(0)
  ),
  isPlaying: false,
  isAudioReady: false,
  playIndex: 0,
  bpm: DEFAULT_BPM,
  volume: new Tone.Volume(0).toDestination(),
};

const useRockStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      ...defaultState,
      setKeysSequence: (keysSequence: number[][]) => {
        set(() => ({ keysSequence }));
      },
      setBassSequence: (bassSequence: number[][]) => {
        set(() => ({ bassSequence }));
      },
      setDrumSequence: (drumSequence: number[][]) => {
        set(() => ({ drumSequence }));
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
      setVolume: (volume: number) => {
        set((s) => {
          s.volume.volume.value = volume;
          return s;
        });
      },
    }),
    {
      client,
      storageMapping: {
        bpm: true,
        keysSequence: true,
        bassSequence: true,
        drumSequence: true,
      },
    }
  )
);

export default useRockStore;
