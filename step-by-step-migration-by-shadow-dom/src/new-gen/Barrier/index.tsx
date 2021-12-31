import { type ReactNode, useRef } from "react";
import "./index.css";

type Props = {
  children: ReactNode;
};

function Barrier({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className="Barrier">
      {children}
    </div>
  );
}

export default Barrier;
