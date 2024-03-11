import axios from 'axios';
import NavBar from '../../../components/NavBar/index.tsx'
import './style.tsx'
import { ContentContainer, PageContainer, ProcessContainer, ProcessItem, Title } from './style.tsx'

import { Button, Form, Input, Modal, Space } from 'antd';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type Area = {
  title: string;
  id: number;
};

export type Process = {
  name: string;
  id: number;
};

function ViewArea() {
  const [processes, setProcesses] = useState<Process[]>();
  const [areas, setAreas] = useState<Area[]>();  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { title } = useParams();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/processes/${title}`).then(response => {
      setProcesses(response.data);
    });
  }, [title]);

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  function openProcess(ev: SyntheticEvent, id: number) {
    navigate(`/processo/${id}`);
  }

  return <PageContainer>
    {areas && <NavBar areas={areas} />}
    <ContentContainer>
      <Title>Processos</Title>
      <ProcessContainer>
        {processes?.map(process => <ProcessItem key={process.id} onClick={(ev) => openProcess(ev, process.id)}>{process.name}</ProcessItem>)}
        {processes && processes.length === 0 && <p>Nenhum processo nesta área</p>}
      </ProcessContainer>
    </ContentContainer>

    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      Modal content
    </Modal>
  </PageContainer>
}

export default ViewArea
