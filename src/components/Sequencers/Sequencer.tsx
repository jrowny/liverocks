import React, { useEffect, useState } from "react";
import clsx from 'clsx';

import * as Tone from 'tone'

import useRockStore from "../../store/RockStore";
import TriggerButton from "./TriggerButton";

type Instrument = Tone.AMSynth | Tone.FMSynth | Tone.Synth | Tone.Sampler;

interface SequencerProps {
  notes: string[];
  setSequence: (sequence: number[][]) => void;
  sequence: number[][];
  instrument: () => Instrument;
}


export default function Sequencer({ notes, setSequence, sequence, instrument }: SequencerProps) {
  const playIndex = useRockStore((s) => s.playIndex);
  const setPlayIndex = useRockStore((s) => s.setPlayIndex);
  const isAudioReady = useRockStore((s) => s.isAudioReady);
  const isPlaying = useRockStore((s) => s.isPlaying);
  const volume = useRockStore((s) => s.volume);
  const [sequencer, setSequencer] = useState<Tone.Sequence>();
  const [synth, setSynth] = useState<Instrument[]>();

  const toggle = (row: number, column: number) => {
    const current = sequence[row][column];
    setSequence([
      ...sequence.slice(0, row),
      [
        ...sequence[row].slice(0, column),
        current ? 0 : 1,
        ...sequence[row].slice(column + 1),
      ],
      ...sequence.slice(row + 1),
    ]);
  };

  useEffect(() => {
    setSynth(notes.map(() => instrument().connect(volume)));
    () => {
      if (synth) {
        synth.forEach((s) => s.dispose());
      }
    }
  }, []);

  // todo: move to hook
  useEffect(() => {
    if (sequencer) {
      sequencer.dispose();
    }
    if (isAudioReady) {
      setSequencer(new Tone.Sequence(
        (time, index) => {
          Tone.Draw.schedule(() => {
            setPlayIndex(index);
          }, time);
          if (synth) {
            sequence[index].forEach((value, noteIndex) => {
              if (value === 1) {
                synth[noteIndex].triggerAttackRelease(notes[noteIndex], `${sequence.length}n`, time);
              }
            });
          }
        }, [...Array(sequence.length).keys()], `8n`
      ).start(0));
    }
  }, [sequence, synth, isAudioReady]);



  return (
    <div className="flex flex-row">


      {sequence.map((row, rowIndex) => {
        const classes = clsx([
          'flex', 'flex-col', 'justify-between', 'p-4', 'gap-4'
        ], {
          'bg-slate-700': isPlaying && rowIndex === playIndex,
        });
        return (
          <div className={classes} key={rowIndex}>
            {row.map((column, columnIndex) => <TriggerButton key={columnIndex} isActive={column === 1} columnIndex={columnIndex} rowIndex={rowIndex} toggle={toggle} />)}
          </div>
        );
      })}
    </div>
  );
}
