import axios from 'axios';
import NavBar from '../../components/NavBar'
import './style.tsx'
import { HomeContainer, HomeContent } from './style.tsx'
import { useEffect, useState } from 'react';

function Home() {
  const [areas, setAreas] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  return <HomeContainer>
    {areas && <NavBar areas={areas} />}
    <HomeContent>

    </HomeContent>
  </HomeContainer>
}

export default Home
