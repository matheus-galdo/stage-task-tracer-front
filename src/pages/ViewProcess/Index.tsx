import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import './style.tsx'
import { PageContainer, PageContent, SubProcessItem } from './style.tsx'
import { Breadcrumb, Button, Drawer, Timeline } from 'antd';
import { HomeFilled, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import processesService from '../../services/processesService.ts';
import { useParams } from 'react-router-dom';
import { Area, Process } from '../Areas/ViewArea/index.tsx';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';

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
  const [selectedSubProcess, setSelectedSubProcess] = useState<number>()

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

  return <PageContainer>
    <NavBar />
    <PageContent>
      <Breadcrumb items={breadcrumItems} />
      <Title>{process?.name}</Title>
    </PageContent>

    {process && <SubProcessTimeLine
      subProcesses={process.subProcesses}
      selectedSubProcess={selectedSubProcess}
      onSelectSubProcess={selectSubProcess}
    />}

  </PageContainer>
}

export type SubProcessTimeLineProps = {
  subProcesses: SubProcess[];
  selectedSubProcess: number | undefined;
  onSelectSubProcess: (item: SubProcess) => void;
};

function SubProcessTimeLine({ subProcesses, selectedSubProcess, onSelectSubProcess }: SubProcessTimeLineProps) {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  function isSelected(item: SubProcess) {
    return item.id === selectedSubProcess;
  }

  return <><Drawer
    title="Sub Processos"
    onClose={onClose}
    open={open}
    forceRender={true}
    mask={false}
    closeIcon={<MenuOutlined />}
  >
    {subProcesses.map(subProcess => <SubProcessItem
      onClick={() => onSelectSubProcess(subProcess)}
      selected={isSelected(subProcess)}
    >
      {subProcess.name}
    </SubProcessItem>)}
  </Drawer>

    <div>
      <Button onClick={showDrawer}>
        <MenuOutlined />
      </Button>
    </div>
  </>;
}
export default ViewProcess;
