import axios from 'axios';
import './style.tsx'
import { ProcessItem } from './style.tsx'
import { Menu, Modal } from 'antd';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteFilled, EditFilled, EllipsisOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Area, Process } from '../../pages/Areas/ViewArea/index.tsx';
import { ProcessForm } from '../../pages/Areas/ViewArea/ProcessForm.tsx';
import { Action } from '../NavBar/index.tsx';

type CardItemProps = {
    process: Process;
    area: Area;
}

export default function CardItem({ process, area }: CardItemProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const hideModal = (type: 'edit' | 'delete') => {
        if (type === 'edit') {
            return setIsEditModalOpen(false);
        }
        setIsDeleteModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    function fn(action: Action) {
        action.domEvent.stopPropagation();

        if (action.key === 'edit') {
            return showEditModal();
        }

        showDeleteModal();
    }

    const cardMenuOptions: ItemType[] = [
        {
            key: "options", children: [
                { key: "edit", icon: <EditFilled />, label: "Editar", onClick: fn },
                { key: "delete", icon: <DeleteFilled />, label: "Excluir", onClick: fn, danger: true },
            ],
            onTitleClick: (ev) => {
                console.log(ev);
                ev.domEvent.stopPropagation();
            }
        }
    ];

    function deleteProcess() {
        axios.delete(`http://localhost:3000/processes/${process.id}`).then(response => {
            //TODO: avisar com sucesso
            hideModal('delete');
            //TODO: reload na pagina
        });
    }

    return <>
        <ProcessItem onClick={(ev: SyntheticEvent) => {
            ev.stopPropagation();
            navigate(`/processo/${process.id}`)
        }}>
            <p>{process.name}</p>
            <Menu theme='dark' items={cardMenuOptions} expandIcon={<EllipsisOutlined />} />
        </ProcessItem >

        <Modal
            title="Editar Processo"
            open={isEditModalOpen}
            destroyOnClose={true}
            onOk={() => console.log("aee")}
            onCancel={() => hideModal('edit')}
        >
            <ProcessForm process={process} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} area={area} />
        </Modal>

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