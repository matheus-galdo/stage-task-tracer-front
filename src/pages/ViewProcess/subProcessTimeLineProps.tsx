import { CustomPlusCircle, SubProcessItem, TimelineContainer, TimelineMarker, TimelinePipe } from './style.tsx'
import { Button, Drawer, Menu, Modal, Row } from 'antd';
import { DeleteFilled, EditFilled, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { SubProcess } from './Index.tsx';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Action } from '../../components/NavBar/index.tsx';
import subProcessesService from '../../services/subProcessesService.ts';
import { SubProcessEditModalContext } from '../../contexts/SubProcessEditModalContext.tsx';
import { SubProcessDeleteModalContext, SubProcessDeleteModalContextProvider } from '../../contexts/SubProcessDeleteModalContext.tsx';

export type SubProcessTimeLineProps = {
  subProcesses: SubProcess[];
  selectedSubProcessId: number | undefined;
  onSelectSubProcess: (item: SubProcess) => void;
};

function SubProcessTimeLine({ subProcesses, selectedSubProcessId, onSelectSubProcess }: SubProcessTimeLineProps) {
  const [open, setOpen] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clickedSubProcess, setClickedSubProcess] = useState<SubProcess>();

  const { openEditModal, closeEditModal } = useContext(SubProcessEditModalContext);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const hideModal = (type: 'edit' | 'delete') => {
    if (type === 'edit') {
      return closeEditModal();
    }
    setIsDeleteModalOpen(false);
  };

  function deleteSubProcess(subProcess: SubProcess) {
    subProcessesService.deleteProcess(subProcess.id.toString()).then(() => {
      //TODO: avisar com sucesso
      hideModal('delete');
      //TODO: reload na pagina
    });
  }

  return <SubProcessDeleteModalContextProvider>
    <Drawer
      title={<Row justify='space-between'>
        Sub Processos
        <Button type='text' size='small' onClick={openEditModal}>
          <CustomPlusCircle />
        </Button>
      </Row>}
      onClose={onClose}
      open={open}
      forceRender={true}
      mask={false}
      closeIcon={<MenuOutlined />}
    >
      {subProcesses.map(subProcess => <SubProcessCard
        subProcess={subProcess}
        onSelectSubProcess={onSelectSubProcess}
        setClickedSubProcess={setClickedSubProcess}
        selectedSubProcessId={selectedSubProcessId}
      />)}
    </Drawer>

    {clickedSubProcess && <Modal
      okButtonProps={{ danger: true, }}
      title="Confirmar ação"
      open={isDeleteModalOpen}
      onOk={() => deleteSubProcess(clickedSubProcess)}
      onCancel={() => hideModal('delete')}
    >
      Tem certeza que desejar excluir o processo "{clickedSubProcess.name}"?
    </Modal>}

    <div>
      <Button onClick={showDrawer}>
        <MenuOutlined />
      </Button>
    </div>
  </SubProcessDeleteModalContextProvider>;
}




function SubProcessCard({ subProcess, onSelectSubProcess, setClickedSubProcess, selectedSubProcessId }) {
  function isSelected(item: SubProcess) {
    return item.id === selectedSubProcessId;
  }

  const { openEditModal } = useContext(SubProcessEditModalContext);
  const { showDeleteModal } = useContext(SubProcessDeleteModalContext);


  function getCardMenuOptions(subProcess: SubProcess): ItemType[] {
    return [{
      key: "options", children: [
        { key: "edit", icon: <EditFilled />, label: "Editar", onClick: (action) => fn(action, subProcess) },
        { key: "delete", icon: <DeleteFilled />, label: "Excluir", onClick: (action) => fn(action, subProcess), danger: true },
      ],
      onTitleClick: (ev) => {
        ev.domEvent.stopPropagation();
      }
    }];
  }

  function fn(action: Action, subProcess: SubProcess) {
    setClickedSubProcess(subProcess);
    action.domEvent.stopPropagation();

    if (action.key === 'edit') {
      return openEditModal();
    }

    showDeleteModal();
  }

  return <SubProcessItem
    key={subProcess.id}
    onClick={() => onSelectSubProcess(subProcess)}
    selected={isSelected(subProcess)}
  >
    <TimelineContainer>
      <TimelinePipe />
      <TimelineMarker selected={isSelected(subProcess)} />
    </TimelineContainer>
    <Row justify='space-between' align='middle'>
      <div>{subProcess.name}</div>
      <Menu theme='dark' items={getCardMenuOptions(subProcess)} expandIcon={<EllipsisOutlined />} />
    </Row>
  </SubProcessItem>
}

export default SubProcessTimeLine;