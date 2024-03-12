import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import './style.tsx'
import { HomeContainer, HomeContent } from './style.tsx'
import { Breadcrumb } from 'antd';
import { HomeFilled } from '@ant-design/icons';

function Process() {
  const title = '';

  return <HomeContainer>
    <NavBar />
    <HomeContent>
      <Breadcrumb items={[{ title: <HomeFilled />, href: "/" }, { title: title, href: `/${title}` }, { title: title, href: `/${title}` }]} />

      <Title>Nome do Processo</Title>

    </HomeContent>
  </HomeContainer>
}

export default Process
