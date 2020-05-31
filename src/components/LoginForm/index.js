import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Form, Input, notification } from 'antd';
import { rules, DANG_NHAP, DANG_KY } from '../Util';
import { GlobalContext } from '../../global';
import axios from 'axios';
const LoginForm = (props) => {
  const [form] = Form.useForm();
  const { dispatch, isAuth } = useContext(GlobalContext);
  const [maLoaiNguoiDung, setMaLoaiNguoiDung] = useState('');
  const { isLogin, history } = props;
  const route = isLogin ? 'dangKy' : 'dangNhap';
  const callAPI = useCallback((isLogin = false, values) => {
    const { taiKhoan, matKhau, hoTen, email, soDT } = values;
    return isLogin
      ? axios.post(DANG_NHAP, { taiKhoan, matKhau })
      : axios.post(DANG_KY, {
          taiKhoan,
          matKhau,
          hoTen,
          email,
          maNhom: 'GP08',
          maLoaiNguoiDung: 'HV',
          soDT: soDT || '',
        });
  }, []);
  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        callAPI(isLogin, values)
          .then(({ data: { taiKhoan, accessToken, maLoaiNguoiDung } }) => {
            setMaLoaiNguoiDung(maLoaiNguoiDung);
            dispatch({ type: 'login', payload: { taiKhoan, accessToken } });
          })
          .catch(
            (errorRes) =>
              console.log(errorRes) ||
              form.setFields([
                {
                  name: 'matKhau',
                  errors: [errorRes.response.data],
                },
              ])
          );
      })
      .catch(() =>
        notification.error({
          message: 'Một số trường bị sai định dạng, vui lòng kiểm tra lại ',
          placement: 'bottomRight',
        })
      );
  };
  useEffect(() => {
    isAuth &&
      history.push(
        maLoaiNguoiDung === 'HV'
          ? '/thongTinTaiKhoan'
          : '/admin/quanLyNguoiDung'
      );
  }, [isAuth, maLoaiNguoiDung]);
  return (
    <Form form={form} layout='horizontal' labelCol={{ span: isLogin ? 5 : 8 }}>
      <Form.Item label='Tài khoản' name='taiKhoan' rules={rules.required}>
        <Input placeholder='Please input your username' />
      </Form.Item>
      <Form.Item label='Mật khẩu' name='matKhau' rules={rules.required}>
        <Input placeholder='Please input your password' type='password' />
      </Form.Item>
      {isLogin ? null : (
        <>
          <Form.Item
            label='Nhập lại mật khẩu'
            name='kiemTraMatKhau'
            type='password'
            rules={rules.required}>
            <Input placeholder='Retype your password' />
          </Form.Item>
          <Form.Item label='Họ tên' name='hoTen' rules={rules.required}>
            <Input placeholder='Please input your full name' />
          </Form.Item>
          <Form.Item label='Email' name='email' rules={rules.required}>
            <Input placeholder='Please input your email' />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='soDT'>
            <Input placeholder='Please input your phone number' />
          </Form.Item>
        </>
      )}
      <button className='btn btn-primary btn-sm' onClick={handleSubmit}>
        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
      </button>
      <p className='pt-5 text-left'>
        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
        <button
          className='btn btn-danger ml-1 btn-sm'
          onClick={() => history.push(route)}>
          {isLogin ? 'Đăng ký' : 'Đăng nhập'}
        </button>
        <button
          className='btn btn-outline-light ml-1 btn-sm'
          onClick={() => history.push('/')}>
          Trang chủ
        </button>
      </p>
    </Form>
  );
};
export default LoginForm;
