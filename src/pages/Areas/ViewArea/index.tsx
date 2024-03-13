import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Breadcrumb, Button, Row, Space } from 'antd';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/index.tsx'
import CardItem from '../../../components/CardItem/CardItem.tsx';
import areasService from '../../../services/areasService.ts';
import { ContentContainer, PageContainer, ProcessContainer, Title } from './style.tsx'
import { ProcessForm } from './ProcessForm.tsx';

export type Area = {
  title: string;
  id: number;
};

export type Process = {
  id: number;
  name: string;
  areaId: number;
  description?: string;
  parentId?: number;
  childProcessOrder: number;
  isProcessRoot: boolean;
};

export type ProcessWithSubProcess = Process & {
  children: ProcessWithSubProcess[];
  area: Area;
}

function ViewArea() {
  const [processes, setProcesses] = useState<Process[]>();
  const [area, setArea] = useState<Area>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { areaId } = useParams();

  useEffect(() => {
    if (areaId) {
      getProcesses(Number(areaId));
    }
  }, [areaId]);

  function getProcesses(areaId: number) {
    areasService.getAreaProcesses(areaId).then(response => {
      setArea(response.data);
      setProcesses(response.data.processes);
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  return <PageContainer>
    <NavBar defaultActiveOption={areaId} />
    {area && <>
      <ContentContainer>
        <Breadcrumb items={[{ title: <HomeFilled />, href: "/" }, { title: area?.title, href: `/${areaId}` }]} />

        <Row justify="space-between" >
          <Title>Processos</Title>
          <Button type='primary' onClick={showModal}>
            <Space size="small">
              <PlusOutlined />
              Criar Processo
            </Space>
          </Button>
        </Row>

        <ProcessContainer>
          {processes?.map(process => <CardItem
            key={process.id}
            process={process}
            area={area}
            getProcesses={getProcesses}
          />)}
          {processes && processes.length === 0 && <p>Nenhum processo nesta área</p>}
        </ProcessContainer>
      </ContentContainer>

      <ProcessForm area={area} getProcesses={getProcesses} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>}
  </PageContainer >
}

export default ViewArea
