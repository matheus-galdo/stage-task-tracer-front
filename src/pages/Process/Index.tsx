import axios from 'axios';
import NavBar from '../../components/NavBar/index.tsx'
import { Title } from '../Areas/ViewArea/style.tsx'
import './style.tsx'
import { HomeContainer, HomeContent } from './style.tsx'
import { useEffect, useState } from 'react';

function Process() {
  const [areas, setAreas] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  return <HomeContainer>
    {areas && <NavBar areas={areas} />}
    <HomeContent>
      <Title>Nome do Processo</Title>

    </HomeContent>
  </HomeContainer>
}

export default Process
