import "./Header.css";
import logo from "../../logo.svg";

export const Header = (props: {
  userName: string;
  onChangeUserName: (userName: string) => void;
}) => (
  <header className="Header-base">
    <img src={logo} className="Header-logo" alt="logo" />
    <p>
      Edit <code>src/Index.tsx</code> and save to reload.
    </p>
    <a
      className="Header-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <div>
      Name:{" "}
      <input
        type="text"
        value={props.userName}
        onChange={(event) => props.onChangeUserName(event.target.value)}
      />
    </div>
  </header>
);
