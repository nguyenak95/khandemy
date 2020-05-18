import React from 'react';
import 'antd/dist/antd.css';
import './index.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeTemplate } from './templates/templateHome';
import DanhMucKhoaHoc from './components/DanhMucKhoaHoc';
import TrangChu from './components/TrangChu';
import NotFound from './components/NotFound'
import ChiTiet from './components/ChiTiet';
import LoginTemplate from './components/Login';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <HomeTemplate exact path='/DanhMucKhoaHoc/:maDanhMuc?/:maNhom?' Component={DanhMucKhoaHoc} />
          <HomeTemplate exact path='/Chitiet/:maKhoaHoc' Component={ChiTiet} />
          <HomeTemplate exact path='/' Component={TrangChu} />
          <Route exact path='/dangNhap' render={(props) => <LoginTemplate {...props}/>} />
          <HomeTemplate Component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
