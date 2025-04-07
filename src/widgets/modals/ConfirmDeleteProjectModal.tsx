import type { Dispatch, SetStateAction } from "react";

import Button from "@/shared/components/Button";
import ModalBackground from "@/shared/components/ModalBackground";
import ModalContainer from "@/shared/components/ModalContainer";
import { deleteProject } from "@/shared/configs/supabase";
import { INITIAL_MODAL } from "@/shared/constants";
import type { Modal } from "@/types";
import type { ProjectId } from "@/types/project";

interface ConfirmDeleteProjectModalProps {
  action: string;
  description: string;
  projectDeleteConfirmed: { projectId: ProjectId; projectName: string };
  setIsOpenModal: Dispatch<SetStateAction<Modal>>;
}

function ConfirmDeleteProjectModal({
  action,
  description,
  projectDeleteConfirmed,
  setIsOpenModal,
}: ConfirmDeleteProjectModalProps): JSX.Element {
  async function handleDeleteProjectClick(projectId: ProjectId) {
    try {
      const deleteError = await deleteProject(projectId);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setIsOpenModal(INITIAL_MODAL);
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
