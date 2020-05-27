import React, { useState, useCallback, useEffect } from 'react';
import {
  Form,
  Button,
  PageHeader,
  Input,
  Row,
  Col,
  notification,
  Spin,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { LAY_THONG_TIN_CA_NHAN, CAP_NHAT_THONG_TIN } from '../Util';
import axios from 'axios';

const EditUserForm = ({ isAuth }) => {
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState({});
  const [form] = Form.useForm();
  const history = useHistory();
  const handleEdit = useCallback(() => setEditable(true), []);
  const handleChangePass = (mode) => {
    const nhapLaiInput = document.querySelector('#editUser_nhapLai');
    nhapLaiInput.disabled = !mode;
    mode && nhapLaiInput.classList.remove('ant-input-disabled');
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { nhapLai, matKhau } = values;
        if (userData.matKhau !== matKhau && nhapLai !== matKhau) {
          form.setFields([
            { name: 'nhapLai', errors: ['Mật khẩu không khớp'] },
          ]);
        } else {
          form.setFields([{ name: 'nhapLai', errors: [], value: '' }]);
          const store = localStorage.getItem('tokenKhandemy');
          const { accessToken } = JSON.parse(store);
          const { taiKhoan, email, soDT, hoTen } = values;
          const { maNhom, maLoaiNguoiDung } = userData;
          axios
            .put(
              CAP_NHAT_THONG_TIN,
              {
                taiKhoan,
                matKhau,
                email,
                hoTen,
                soDT: soDT || '',
                maNhom,
                maLoaiNguoiDung,
              },
              {
                headers: {
                  Authorization: 'Bearer' + accessToken,
                },
              }
            )
            .then(
              (r) =>
                notification.success({
                  message: 'Chỉnh sửa thông tin cá nhân thành công',
                  placement: 'bottomRight',
                }) ||
                handleChangePass(false) ||
                setEditable(false)
            )
            .catch((err) =>
              notification.error({
                message: err.message,
                placement: 'bottomRight',
              })
            );
        }
      })
      .catch((err) =>
        notification.error({
          message: err.message,
          placement: 'bottomRight',
        })
      );
  };
  useEffect(() => {
    if (isAuth) {
      const store = localStorage.getItem('tokenKhandemy');
      const { taiKhoan, accessToken } = JSON.parse(store);
      axios
        .post(
          LAY_THONG_TIN_CA_NHAN,
          { taiKhoan },
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          }
        )
        .then((response) => {
          setUserData(response.data);
          const {
            chiTietKhoaHocGhiDanh,
            maLoaiNguoiDung,
            maNhom,
            ...initialValues
          } = response.data;
          form.setFieldsValue(initialValues);
        })
        .catch(
          () =>
            localStorage.removeItem('tokenKhandemy') ||
            notification.error({
              message: 'Token hết hạn, vui lòng đăng nhập lại',
            }) ||
            history.push('/dangNhap')
        );
    } else {
      history.push('/dangNhap');
    }
  }, [isAuth]);
  return userData.maNhom ? (
    <>
      <PageHeader
        title='Thông tin cá nhân'
        extra={<Button onClick={handleEdit}>Chỉnh sửa</Button>}
      />
      <Form name='editUser' form={form} labelCol={{ span: 8 }}>
        <Row gutter={8}>
          <Col sm={24} md={12}>
            <Form.Item label='Email' name='email' required>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Họ tên' name='hoTen' required>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Số điện thoại' name='soDT'>
              <Input disabled={!editable} />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item label='Tài khoản' name='taiKhoan' required>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Mật khẩu' name='matKhau' required>
              <Input
                disabled={!editable}
                type='password'
                onChange={() => handleChangePass(true)}
              />
            </Form.Item>
            <Form.Item label='Nhập lại mật khẩu' name='nhapLai'>
              <Input type='password' disabled />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
              {editable && (
                <Button className='mr-2' type='primary' onClick={handleSubmit}>
                  Lưu
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  ) : (
    <Spin />
  );
};

export default React.memo(EditUserForm);
