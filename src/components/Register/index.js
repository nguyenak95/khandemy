import React, { useCallback } from 'react';
import LoginForm from '../LoginForm';

const Register = (props) => {
  return (
    <div className='login__container'>
      <div className='text-center p-5 d-flex flex-column login__form col-lg-4 col-md-5 col-sm-12'>
        <h2> Nền tảng giáo dục trực tuyến lớn nhất Đông Lào</h2>
        <h3> ĐĂNG KÝ </h3>
        <div>
          <LoginForm isLogin={false} history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default Register;
