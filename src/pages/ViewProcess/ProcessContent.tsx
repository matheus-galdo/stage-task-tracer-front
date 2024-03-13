import { Title } from '../Areas/ViewArea/style.tsx'
import { Button, Row } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { SubProcessTimelineContext } from '../../contexts/SubProcessTimelineContext.tsx';
import { Process } from '../Areas/ViewArea/index.tsx';

export type ProcessContentProps = {
  process: Process;
}

function ProcessContent({ process }: ProcessContentProps) {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const { selectedSubProcess } = useContext(SubProcessTimelineContext);

  function editContent() {
    setIsEditingContent(true);
  }

  const content = selectedSubProcess ? selectedSubProcess.description : process?.description;

  return <div>
    <Row>
      <Title>{process?.name}</Title>
      <Button onClick={editContent}>
        <EditFilled />
      </Button>
    </Row>

    {isEditingContent ? <textarea>Editar Conteúdo</textarea> : content}
  </div>
}

export default ProcessContent;