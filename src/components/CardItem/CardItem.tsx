import { ProcessItem } from './style.tsx'
import { Modal } from 'antd';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Area, Process } from '../../pages/Areas/ViewArea/index.tsx';
import { ProcessForm } from '../../pages/Areas/ViewArea/ProcessForm.tsx';
import { Action } from '../NavBar/index.tsx';
import processesService from '../../services/processesService.ts';
import CardOptionsMenu from '../CardOptionsMenu/Index.tsx';

type CardItemProps = {
    process: Process;
    area: Area;
    getProcesses: (areaId: string) => void;
}

export default function CardItem({ process, area, getProcesses }: CardItemProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const hideModal = (type: 'edit' | 'delete') => {
        if (type === 'edit') {
            return setIsEditModalOpen(false);
        }
        setIsDeleteModalOpen(false);
    };

    function showEditModal(action: Action) {
        action.domEvent.stopPropagation();
        setIsEditModalOpen(true);
    }

    function showDeleteModal(action: Action) {
        action.domEvent.stopPropagation();
        setIsDeleteModalOpen(true);
    }

    function deleteProcess() {
        processesService.deleteProcess(process.id).then(() => {
            getProcesses(area.id.toString());
            hideModal('delete');
        });
    }

    return <>
        <ProcessItem onClick={(ev: SyntheticEvent) => {
            ev.stopPropagation();
            navigate(`/processo/${process.id}`)
        }}>
            <p>{process.name}</p>

            <CardOptionsMenu cardItem={process} onDeleteSelected={showDeleteModal} onEditSelected={showEditModal} />
        </ProcessItem >

        <ProcessForm
            process={process}
            getProcesses={getProcesses}
            isModalOpen={isEditModalOpen}
            setIsModalOpen={setIsEditModalOpen}
            area={area}
        />

        <Modal
            okButtonProps={{ danger: true, }}
            title="Confirmar ação"
            open={isDeleteModalOpen}
            onOk={deleteProcess}
            onCancel={() => hideModal('delete')}
        >
            Tem certeza que desejar excluir o processo "{process.name}"?
        </Modal>
    </>;
}
