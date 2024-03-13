import { TimelineMarker, TimelinePipe, TimelineCardContainer, TimelinePipeContainer, TimelineCardContent } from './style.tsx'
import { Badge, Button, Col } from 'antd';
import { useContext } from 'react';
import { Action } from '../NavBar/index.tsx';
import { SubProcessEditModalContext } from '../../contexts/SubProcessEditModalContext.tsx';
import { SubProcessDeleteModalContext } from '../../contexts/SubProcessDeleteModalContext.tsx';
import { SubProcessTimelineContext } from '../../contexts/SubProcessTimelineContext.tsx';
import CardOptionsMenu from '../CardOptionsMenu/Index.tsx';
import { ProcessWithSubProcess } from '../../pages/Areas/ViewArea/index.tsx';
import { Link } from 'react-router-dom';

export type TimelineCardProps = {
    subProcess: ProcessWithSubProcess;
};

function TimelineCard({ subProcess }: TimelineCardProps) {
    const { openEditModal } = useContext(SubProcessEditModalContext);
    const { showDeleteModal } = useContext(SubProcessDeleteModalContext);
    const { selectedSubProcess, setSelectedSubProcess } = useContext(SubProcessTimelineContext);

    const subProcessHasChildren = subProcess.children.length > 0;

    function isSelected(item: ProcessWithSubProcess) {
        return item.id === selectedSubProcess?.id;
    }

    function openDeleteModal(action: Action, value?: ProcessWithSubProcess) {
        action.domEvent.stopPropagation();
        setSelectedSubProcess(value);
        showDeleteModal();
    }

    function showEditModal(action: Action, value?: ProcessWithSubProcess) {
        action.domEvent.stopPropagation();
        setSelectedSubProcess(value);
        return openEditModal();
    }

    return <TimelineCardContainer
        onClick={() => setSelectedSubProcess(subProcess)}
        selected={isSelected(subProcess)}
    >
        <TimelinePipeContainer>
            <TimelinePipe />

            {subProcessHasChildren ? <Badge count={subProcess.children.length} color="gold" size='default'>
                <TimelineMarker selected={isSelected(subProcess)} />
            </Badge>
                :
                <TimelineMarker selected={isSelected(subProcess)} />
            }
        </TimelinePipeContainer>

        <TimelineCardContent>
            <Col>
                <div>{subProcess.name}</div>
            </Col>
            <Col>
                <CardOptionsMenu cardItem={subProcess} onDeleteSelected={openDeleteModal} onEditSelected={showEditModal} />

                {subProcessHasChildren && <Link to={ `/processo/${subProcess.id}`}>
                    <Button type="primary" size='small'>
                        Ver sub processos
                    </Button>
                </Link>}
            </Col>
        </TimelineCardContent>
    </TimelineCardContainer>
}

export default TimelineCard;