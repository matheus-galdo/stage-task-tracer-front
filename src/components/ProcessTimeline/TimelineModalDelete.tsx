import { Modal } from 'antd';
import { useContext } from 'react';
import { SubProcessTimelineContext } from '../../contexts/SubProcessTimelineContext.tsx';
import { SubProcessDeleteModalContext } from '../../contexts/SubProcessDeleteModalContext.tsx';
import subProcessesService from '../../services/subProcessesService.ts';
import { SubProcess } from '../../pages/ViewProcess/Index.tsx';

type SubProcessDeleteModalProps = {
  onDelete: (processId: number) => void;
}

function TimelineModalDelete({ onDelete }: SubProcessDeleteModalProps) {
  const { selectedSubProcess, setSelectedSubProcess } = useContext(SubProcessTimelineContext);
  const { isDeleteModalOpen, closeDeleteModal } = useContext(SubProcessDeleteModalContext);

  function deleteSubProcess(subProcess: SubProcess) {
    subProcessesService.deleteProcess(subProcess.id).then(() => {
      closeDeleteModal();
      onDelete(subProcess.processId);
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