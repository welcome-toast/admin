import PropTypes from "prop-types";
import Button from "../../shared/Button";
import ModalBackground from "../../shared/ModalBackground";
import ModalContainer from "../../shared/ModalContainer";
import { deleteProject } from "../../shared/supabase";

function ConfirmDeleteProjectModal({
  action,
  description,
  projectDeleteConfirmed,
  setIsOpenModal,
}) {
  async function handleDeleteProjectClick(projectId) {
    try {
      const deleteError = await deleteProject(projectId);

      if (deleteError) {
        throw new Error(deleteError);
      }

      setIsOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalBackground setIsOpenModal={setIsOpenModal}>
      <ModalContainer modalTitle={action} setIsOpenModal={setIsOpenModal}>
        <div className="my-8 flex flex-col gap-5">
          <span className="rounded bg-red-50 p-2 font-semibold text-lg">
            {projectDeleteConfirmed.projectName}
          </span>
          <span className="text-center">{description}</span>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            text={action}
            onClick={() => handleDeleteProjectClick(projectDeleteConfirmed.projectId)}
          />
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ConfirmDeleteProjectModal;

ConfirmDeleteProjectModal.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectDeleteConfirmed: PropTypes.object.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
};
