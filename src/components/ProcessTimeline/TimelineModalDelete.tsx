import { Modal } from 'antd';
import { useContext } from 'react';
import { SubProcessTimelineContext } from '../../contexts/SubProcessTimelineContext.tsx';
import { SubProcessDeleteModalContext } from '../../contexts/SubProcessDeleteModalContext.tsx';
import { ProcessWithSubProcess } from '../../pages/Areas/ViewArea/index.tsx';
import processesService from '../../services/processesService.ts';

type SubProcessDeleteModalProps = {
  onDelete: (processId: number) => void;
}

function TimelineModalDelete({ onDelete }: SubProcessDeleteModalProps) {
  const { selectedSubProcess, setSelectedSubProcess } = useContext(SubProcessTimelineContext);
  const { isDeleteModalOpen, closeDeleteModal } = useContext(SubProcessDeleteModalContext);

  function deleteSubProcess(subProcess: ProcessWithSubProcess) {
    processesService.deleteProcess(subProcess.id).then(() => {
      closeDeleteModal();
      if (subProcess.parentId) {
        onDelete(subProcess.parentId);
      }
      setSelectedSubProcess(undefined);
    });
  }

  return <>
    {selectedSubProcess && <Modal
      okButtonProps={{ danger: true, }}
      title="Confirmar ação"
      open={isDeleteModalOpen}
      onOk={() => deleteSubProcess(selectedSubProcess)}
      onCancel={closeDeleteModal}
    >
      Tem certeza que desejar excluir o processo "{selectedSubProcess.name}"?
    </Modal>}
  </>;
}

export default TimelineModalDelete;