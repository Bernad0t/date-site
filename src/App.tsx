import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css"
import { PathPagesAuth } from './sqhemas/enums';
import AuthorizationPage from './pages/Authorization/Authorization';
import Ankets from './pages/ankets/ankets';
import FillUserDataReg from './pages/FillUserData/FillUserDataReg';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathPagesAuth.auth + "/:do"} Component={AuthorizationPage}/>
        <Route path={"/"} Component={Ankets}/>
        <Route path={PathPagesAuth.reg + "/:id"} Component={FillUserDataReg}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
