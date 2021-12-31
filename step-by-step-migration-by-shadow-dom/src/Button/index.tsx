import Barrier from "../new-gen/Barrier";
import ButtonNewGen from "../new-gen/Button";
import { type ComponentProps } from "react";

function Button(props: ComponentProps<typeof ButtonNewGen>) {
  return (
    <Barrier>
      <ButtonNewGen {...props} />
    </Barrier>
  );
}

export default Button;
