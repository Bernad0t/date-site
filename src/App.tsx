import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css"
import { PathMains, PathPagesAuth, profileCharacteristics } from './sqhemas/enums';
import AuthorizationPage from './pages/Authorization/Authorization';
import Ankets from './pages/ankets/ankets';
import FillUserDataReg from './pages/FillUserData/FillUserDataReg';
import CharacteristicReg from './pages/ChooseCharacteristic/CharacteristicReg/CharacteristicReg';
import Profile from './pages/profile/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathPagesAuth.auth + "/:do"} Component={AuthorizationPage}/>
        <Route path={"/"} Component={Ankets}/>
        <Route path={PathPagesAuth.reg} Component={FillUserDataReg}/>
        <Route path={profileCharacteristics.reg} Component={CharacteristicReg}/>Profile
        <Route path={PathMains.profile} Component={Profile}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
