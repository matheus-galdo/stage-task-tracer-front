import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import { PageContainer, PageContent } from './style.tsx'
import { Breadcrumb } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import processesService from '../../services/processesService.ts';
import { useParams } from 'react-router-dom';
import { Area, Process } from '../Areas/ViewArea/index.tsx';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import SubProcessTimeLine from './subProcessTimeLineProps.tsx';
import { SubProcessForm } from './SubProcessForm.tsx';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  function openModal() {
    setIsModalOpen(true);
  }

  function findSelectedSubProcess() {
    return process?.subProcesses.find(subProcess => subProcess.id == selectedSubProcess);
  }

  const content = selectedSubProcess ? findSelectedSubProcess()?.description : process?.description;

  return <PageContainer>
    <NavBar />
    <PageContent>
      <Breadcrumb items={breadcrumItems} />
      <Title>{process?.name}</Title>

      <div>
        {content}
      </div>
    </PageContent>

    {process && <SubProcessTimeLine
      subProcesses={process.subProcesses}
      selectedSubProcess={selectedSubProcess}
      onSelectSubProcess={selectSubProcess}
      onNewSubProcessClick={openModal}
    />}

    {process && <SubProcessForm process={process} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}

  </PageContainer>
}

export default ViewProcess;
