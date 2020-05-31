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
import { CAP_NHAT_THONG_TIN } from '../Util';
import axios from 'axios';

const EditUserForm = ({ userData }) => {
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(userData);
  });
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
                  Authorization: 'Bearer ' + accessToken,
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

  return (
    <>
      <PageHeader
        title='Thông tin cá nhân'
        extra={<Button onClick={handleEdit}>Chỉnh sửa</Button>}
      />
      <Form name='editUser' form={form} labelCol={{ span: 10 }}>
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
  );
};

export default React.memo(EditUserForm);
