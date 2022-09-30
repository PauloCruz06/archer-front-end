import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GameContext from '../../contexts/GameContext';
import Main from '../Game/Main';
import Home from '../Home/Home';

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
        </Routes>
      </BrowserRouter>
    </GameContext.Provider>
  )
}
