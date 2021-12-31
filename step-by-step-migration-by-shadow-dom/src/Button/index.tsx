import { type ReactNode } from "react";
import "./index.css";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: Props) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
