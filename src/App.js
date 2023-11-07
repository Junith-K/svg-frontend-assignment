import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateGame  from './components/CreateGame';
import LoginForm from './components/Login';
import GetAllGames from './components/GetAllGames';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={CreateGame}/>
        <Route path='/login' Component={LoginForm}/>
        <Route path='/getall' Component={GetAllGames}/>
      </Routes>
    </Router>
  );
}

export default App;
