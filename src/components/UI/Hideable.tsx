
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import clsx from "clsx";

type HideableProps = {
  title: string;
  children?: JSX.Element | JSX.Element[];
  defaultIsVisible?: boolean
};

export default function Hideable({ children, title, defaultIsVisible = true }: HideableProps) {
  const [isVisible, setIsVisible] = useState(defaultIsVisible);
  return (
    <>
      <div className="flex flex-row text-slate-200 cursor-pointer mt-8" onClick={() => setIsVisible(!isVisible)}>
        <h2 className="uppercase font-bold" >{title}</h2>
        {isVisible ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      <div className={clsx([isVisible ? 'block' : 'hidden'])}>
        {children}
      </div>
    </>
  );
}
