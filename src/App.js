import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginRegister from './components/admiLoginReg';
import Intro from './components/intro';
import CreatePlayer from './components/createPlayer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/" exact render={() => <Intro />} />
        <Route path="/admi" exact render={() => <LoginRegister />} />
        <Route path="/player" exact render={() => <CreatePlayer />} />


        {/* <Route path="/login" render={()=> <LoginRegistro/> } />
        <Route path="/" exact render={() => <AllAutors />} />
        <Route path="/new" exact render={() => <NuevoAutor />} />
        <Route path="/edit/:id" exact render={() => <UpdateAutor />} />
        <Route path="/error" exact render={() => <Error/>} />
        <Route path="*" render={() => <Error /> } /> */}
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
