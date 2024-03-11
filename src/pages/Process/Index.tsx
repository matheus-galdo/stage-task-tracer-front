import axios from 'axios';
import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import './style.tsx'
import { HomeContainer, HomeContent } from './style.tsx'
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { HomeFilled } from '@ant-design/icons';

function Process() {
  const [areas, setAreas] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  const title = '';

  return <HomeContainer>
    {areas && <NavBar areas={areas} />}
    <HomeContent>
      <Breadcrumb items={[{ title: <HomeFilled />, href: "/" }, { title: title, href: `/${title}` }, { title: title, href: `/${title}` }]} />

      <Title>Nome do Processo</Title>

    </HomeContent>
  </HomeContainer>
}

export default Process
