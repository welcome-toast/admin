import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";

function RedirectModal({ text, route }) {
  const navigate = useNavigate();

  function handleRedirectButtonClick(redirectRoute) {
    navigate(`${redirectRoute}`);
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

RedirectModal.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
