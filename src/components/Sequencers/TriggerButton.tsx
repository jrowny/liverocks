import React from 'react';
import clsx from 'clsx';

interface Props {
  isActive: boolean;
  columnIndex: number;
  rowIndex: number;
  toggle: (rowIndex: number, columnIndex: number) => void;
}

const TriggerButton: React.FC<Props> = ({ isActive, columnIndex, rowIndex, toggle }) => {
  const classes = clsx(
    'block',
    'w-10',
    'h-10',
    'rounded-md',
    'cursor-pointer',
    isActive
      ? ['bg-emerald-400', 'shadow-lg', 'shadow-emerald-500/50']
      : 'bg-slate-400'
  );

  return (
    <div
      className={classes}
      onClick={() => {
        toggle(rowIndex, columnIndex);
      }}
    />
  );
};

export default TriggerButton;