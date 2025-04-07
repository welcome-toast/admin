import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button";
import ModalBackground from "@/shared/components/ModalBackground";
import ModalContainer from "@/shared/components/ModalContainer";

type Route = string;

interface RedirectModalProps {
  text: string;
  route: Route;
}

function RedirectModal({ text, route }: RedirectModalProps): JSX.Element {
  const navigate = useNavigate();

  function handleRedirectButtonClick(route: Route) {
    navigate(`${route}`);
  }

  return (
    <ModalBackground canCloseBackgroundClick={false}>
      <ModalContainer modalTitle={"안내"} hasCloseButton={false}>
        <div className="my-5 flex justify-center text-center">{text}</div>
        <div className="flex justify-center">
          <Button text={"확인"} onClick={() => handleRedirectButtonClick(route)} />
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default RedirectModal;
