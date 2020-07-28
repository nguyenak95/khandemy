import React from 'react';
import './LoginPage.scss';
import LoginForm from '../components/LoginForm';

const LoginPage = (props) => {
  return (
    <>
      <div className='login__container'>
        <div
          style={{ minHeight: '100vh' }}
          className='text-center d-flex flex-column login__form col-lg-4 col-md-5 col-sm-12'>
          <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào </h2>
          <h3> ĐĂNG NHẬP </h3>
          <LoginForm
            isLogin={true}
            className='bg-primary'
            history={props.history}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
