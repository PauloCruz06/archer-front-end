import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GameContext from '../../contexts/GameContext';
import Home from '../Home/Home';
import Main from '../Game/Scenes/Main';
import Ranking from '../Game/Scenes/Ranking';
import Game from '../Game/Scenes/Game';

export default function App() {
  const [gameInstance, setGameInstance] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider value={{
      gameInstance,
      setGameInstance,
      score,
      setScore
    }}>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Main />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameContext.Provider>
  )
}
