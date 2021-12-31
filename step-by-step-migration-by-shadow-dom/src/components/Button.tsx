import Barrier from "../Barrier";
import ButtonNewGen from "../new-gen/components/Button";
import { type ComponentProps } from "react";

/** Component Level Coexistence */
function Button(props: ComponentProps<typeof ButtonNewGen>) {
  return (
    <Barrier>
      <ButtonNewGen {...props} />
    </Barrier>
  );
}

export default Button;
