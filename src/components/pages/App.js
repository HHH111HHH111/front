import { Routes, Route } from 'react-router-dom'; 
import axios from "axios";

import LoginForm from './user/LoginForm';
import JoinForm from './user/JoinForm';
import KakaoRedirectPage from './user/KakaoRedirectPage';
import Main from "./main";
import ToursListApi from "./tours/toursListApi";
import CheckData from "./tours/zcheckAndTest/checkData";
import TourDetailPageApi from "./tourDetailPage/tourDetailPageApi";
import Logout from './user/Logout';
import FindPwd from './user/FindPwd';
import FindId from './user/FindId';
import ModifyPwd from './user/ModifyPwd';
import CheckPwd from './user/CheckPwd';
import ModifyNickName from './user/ModifyNickName';

function App() {



  return (
    <div className="App">

        <Routes>
        <Route index element={<Main />}/>
          <Route path="/toursMain" element={<ToursListApi />}></Route>
          <Route path="/checkData" element={<CheckData />}></Route>
          <Route path="/tourDetail" element={<TourDetailPageApi/>}></Route>
          <Route path='/LoginForm' element={<LoginForm />}/>
          <Route path='/JoinForm' element={<JoinForm />}/>
          <Route path="/Logout" element={<Logout/>}/>
          <Route path='/login/oauth2/code/kakao' element={<KakaoRedirectPage />}/>
          <Route path='/FindId' element={<FindId/>}/>
          <Route path='/FindPwd' element={<FindPwd/>}/>
          <Route path='/CheckPwd' element={<CheckPwd/>}/>
          <Route path='/ModifyPwd' element={<ModifyPwd/>}/>
          <Route path='/ModifyNickName' element={<ModifyNickName/>}/>
        </Routes>
    
    </div>

  );
}

export default App;
