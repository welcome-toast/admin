import PropTypes from "prop-types";
import CodeBlock from "../../shared/CodeBlock";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";

function GuideInstallProjectModal({ text, apiKeyInstallModal, setIsOpenModal }) {
  const installCode = `
    <script>
      window.welcometoastConfig = {
        apiKey: "${apiKeyInstallModal}",
        init: function() {
          window.welcometoast.getProject(window.welcometoastConfig.apiKey);
        }
      };
    </script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/welcome-toast/welcome-toast@refs/heads/main/src/main.js"></script>
  `;

  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={"연동 스크립트"} setIsOpenModal={setIsOpenModal}>
        <div className="my-5 flex justify-center text-center">{text}</div>
        <CodeBlock code={installCode} />
      </ModalContainer>
    </ModalBackground>
  );
}

export default GuideInstallProjectModal;

GuideInstallProjectModal.propTypes = {
  text: PropTypes.string.isRequired,
  apiKeyInstallModal: PropTypes.string.isRequired,
  setIsOpenModal: PropTypes.func,
};
