import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import { PageContainer, PageContent } from './style.tsx'
import { Breadcrumb, Button, Row } from 'antd';
import { EditFilled, HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import processesService from '../../services/processesService.ts';
import { useParams } from 'react-router-dom';
import { Area, Process } from '../Areas/ViewArea/index.tsx';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import SubProcessTimeLine from './subProcessTimeLineProps.tsx';
import { SubProcessForm } from './SubProcessForm.tsx';
import SubProcessModalContextProvider from '../../contexts/SubProcessEditModalContext.tsx';

export type ProcessWithSubProcess = Process & {
  subProcesses: SubProcess[];
  area: Area;
}

export type SubProcess = {
  id: number;
  name: string;
  processId: number;
  description?: string;
}

function ViewProcess() {
  const [process, setProcess] = useState<ProcessWithSubProcess>();
  const [selectedSubProcess, setSelectedSubProcess] = useState<number>();
  const [isEditingContent, setIsEditingContent] = useState(false);

  const { processId } = useParams();

  useEffect(() => {
    if (processId) {
      processesService.getProcess(processId).then(response => setProcess(response.data));
    }
  }, [processId]);

  const breadcrumItems: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
    { title: <HomeFilled />, href: "/" },
    { title: process?.area.title, href: `/areas/${process?.area.id}` },
    { title: process?.name, href: `/processo/${process?.id}` },
  ];

  function selectSubProcess(item: SubProcess) {
    setSelectedSubProcess(item.id);
  }

  function editContent() {
    setIsEditingContent(true);
  }

  function findSelectedSubProcess() {
    return process?.subProcesses.find(subProcess => subProcess.id == selectedSubProcess);
  }

  const content = selectedSubProcess ? findSelectedSubProcess()?.description : process?.description;

  return <PageContainer>
    <SubProcessModalContextProvider>
      <NavBar />
      <PageContent>
        <Breadcrumb items={breadcrumItems} />

        <div>
          <Row>
            <Title>{process?.name}</Title>
            <Button onClick={editContent}>
              <EditFilled />
            </Button>
          </Row>

          {isEditingContent ? <textarea>Editar Conteúdo</textarea> : content}
        </div>
      </PageContent>

      {process && <SubProcessTimeLine
        subProcesses={process.subProcesses}
        selectedSubProcessId={selectedSubProcess}
        onSelectSubProcess={selectSubProcess}
      />}

      {process && <SubProcessForm process={process} />}
    </SubProcessModalContextProvider>
  </PageContainer>
}

export default ViewProcess;