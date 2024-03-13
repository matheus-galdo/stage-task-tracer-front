import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { Breadcrumb } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PageContainer, PageContent } from './style.tsx'
import NavBar from '../../components/NavBar/index.tsx'
import processesService from '../../services/processesService.ts';
import { Area, Process } from '../Areas/ViewArea/index.tsx';
import SubProcessEditModalContextProvider from '../../contexts/SubProcessEditModalContext.tsx';
import SubProcessTimelineContextProvider from '../../contexts/SubProcessTimelineContext.tsx';
import SubProcessDeleteModalContextProvider from '../../contexts/SubProcessDeleteModalContext.tsx';
import ProcessTimeLine from '../../components/ProcessTimeline/ProcessTimeLine.tsx';
import ProcessContent from './ProcessContent.tsx';
import TimelineModalForm from '../../components/ProcessTimeline/TimelineModalForm.tsx';
import TimelineModalDelete from '../../components/ProcessTimeline/TimelineModalDelete.tsx';



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
  const { processId } = useParams();

  useEffect(() => {
    if (processId) {
      getProcess(Number(processId));
    }
  }, [processId]);

  function getProcess(processId: number) {
    processesService.getProcess(processId).then(response => setProcess(response.data));
  }

  const breadcrumItems: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
    { title: <HomeFilled />, href: "/" },
    { title: process?.area.title, href: `/areas/${process?.area.id}` },
    { title: process?.name, href: `/processo/${process?.id}` },
  ];

  return <PageContainer>
    <NavBar />

    <PageContent>
      <SubProcessTimelineContextProvider>
        <SubProcessEditModalContextProvider>
          <SubProcessDeleteModalContextProvider>
            <Breadcrumb items={breadcrumItems} />

            {process && <>
              <ProcessContent process={process} />
              <ProcessTimeLine subProcesses={process.subProcesses} />
              <TimelineModalForm process={process} onCreateOrUpdate={getProcess} />
              <TimelineModalDelete onDelete={getProcess} />
            </>}

          </SubProcessDeleteModalContextProvider>
        </SubProcessEditModalContextProvider>
      </SubProcessTimelineContextProvider>
    </PageContent >
  </PageContainer>
}



export default ViewProcess;