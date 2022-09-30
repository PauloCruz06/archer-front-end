import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../../contexts/GameContext';
import reactLogo from '../../assets/react.svg';
import './Home.css';

export default function Home() {
    const { score, setGameInstance, setScore } = useContext(GameContext);
    const navigate = useNavigate();
    
    function goMenu() {
      setGameInstance([]); 
      navigate('/menu');
    }

    return (
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setScore((score) => score + 1)}>
            score is {score}
          </button>
          <button onClick={goMenu}>
            Link to game 
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    )
  }