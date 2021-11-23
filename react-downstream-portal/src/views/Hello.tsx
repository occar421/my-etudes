import "./Hello.css";

export const Hello = (props: { userName: string }) => (
  <div className="Hello-base">Hello, {props.userName || "there"}!</div>
);
