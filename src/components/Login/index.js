import React from 'react';
import './index.scss';
import LoginForm from '../LoginForm';
import DropDown from "../MenuDropDown";
const Login = (props) => {
  return (
    <>
    <DropDown />
    <div className='login__container container-fluid p-0'>
      <div className='text-center pt-2 login__form col-lg-4 col-md-5 col-sm-12'>
        <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào </h2>
        <h3> ĐĂNG NHẬP </h3>
        <LoginForm isLogin={true} className='mt-2 bg-primary' history={props.history}/>
      </div>
    </div>
    </>
  );
};

export default Login;
