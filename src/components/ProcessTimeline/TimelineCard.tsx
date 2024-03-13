import { TimelineMarker, TimelinePipe, TimelineCardContainer, TimelinePipeContainer } from './style.tsx'
import { Menu, Row } from 'antd';
import { DeleteFilled, EditFilled, EllipsisOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { SubProcess } from '../../pages/ViewProcess/Index.tsx';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Action } from '../NavBar/index.tsx';
import { SubProcessEditModalContext } from '../../contexts/SubProcessEditModalContext.tsx';
import { SubProcessDeleteModalContext } from '../../contexts/SubProcessDeleteModalContext.tsx';
import { SubProcessTimelineContext } from '../../contexts/SubProcessTimelineContext.tsx';

export type TimelineCardProps = {
    subProcess: SubProcess;
};

function TimelineCard({ subProcess }: TimelineCardProps) {
    const { openEditModal } = useContext(SubProcessEditModalContext);
    const { showDeleteModal } = useContext(SubProcessDeleteModalContext);
    const { selectedSubProcess, setSelectedSubProcess } = useContext(SubProcessTimelineContext);

    function isSelected(item: SubProcess) {
        return item.id === selectedSubProcess?.id;
    }

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
        setSelectedSubProcess(subProcess);
        action.domEvent.stopPropagation();

        if (action.key === 'edit') {
            return openEditModal();
        }

        showDeleteModal();
    }

    return <TimelineCardContainer
        onClick={() => setSelectedSubProcess(subProcess)}
        selected={isSelected(subProcess)}
    >
        <TimelinePipeContainer>
            <TimelinePipe />
            <TimelineMarker selected={isSelected(subProcess)} />
        </TimelinePipeContainer>

        <Row justify='space-between' align='middle'>
            <div>{subProcess.name}</div>
            <Menu theme='dark' items={getCardMenuOptions(subProcess)} expandIcon={<EllipsisOutlined />} />
        </Row>
    </TimelineCardContainer>
}

export default TimelineCard;