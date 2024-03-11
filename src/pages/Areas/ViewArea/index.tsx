import axios, { AxiosError } from 'axios';
import NavBar from '../../../components/NavBar/index.tsx'
import './style.tsx'
import { ContentContainer, PageContainer, ProcessContainer, ProcessItem, Title } from './style.tsx'

import { Breadcrumb, Button, Form, Input, Modal, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

export type Area = {
  title: string;
  id: number;
};

export type Process = {
  name: string;
  id: number;
};

type FieldsTypes = {
  processName: string;
}

function ViewArea() {
  const [processes, setProcesses] = useState<Process[]>();
  const [areas, setAreas] = useState<Area[]>();
  const [area, setArea] = useState<Area>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { areaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/processes/${areaId}`).then(response => {
      setArea(response.data);
      setProcesses(response.data.processes);
    });
  }, [areaId]);

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return <PageContainer>
    {areas && <NavBar areas={areas} />}
    <ContentContainer>
      <Breadcrumb items={[{ title: <HomeFilled />, href: "/" }, { title: area?.title, href: `/${areaId}` }]} />

      <Row justify="space-between" >
        <Title>Processos</Title>
        <Button type='primary' onClick={showModal}>Criar Processo</Button>
      </Row>

      <ProcessContainer>
        {processes?.map(process => <ProcessItem
          key={process.id}
          onClick={() => navigate(`/processo/${process.id}`)}>
          {process.name}
        </ProcessItem>)}
        {processes && processes.length === 0 && <p>Nenhum processo nesta área</p>}
      </ProcessContainer>
    </ContentContainer>

    {area && <CreateProcessForm area={area} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
  </PageContainer >
}


type CreateProcessFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  area: Area;
}

function CreateProcessForm({ isModalOpen, setIsModalOpen, area }: CreateProcessFormProps) {
  function handleSubmit(formData: FieldsTypes) {
    const formRequestBody = { name: formData.processName, areaId: area?.id };
    console.log(formRequestBody);

    axios.post('http://localhost:3000/processes', formRequestBody).then(() => {
      hideModal();
    }).catch((error: AxiosError) => {
      alert(error.response?.data);
    });
  }

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return <Modal title="Criar Processo" open={isModalOpen} footer={false} onCancel={hideModal} destroyOnClose={true}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="processName"
        label="Nome"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="end" align="top">
        <Space size="small">
          <Button type="default" onClick={hideModal}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Space>
      </Row>
    </Form>
  </Modal>
}

export default ViewArea
