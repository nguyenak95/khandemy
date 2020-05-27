import React, { useState, useCallback } from 'react';
import { Form, Button, PageHeader, Input, Row, Col } from 'antd';

const EditUserForm = () => {
  const [editable, setEditable] = useState(false);
  const [form] = Form.useForm();
  const handleEdit = useCallback(() => setEditable(true), []);
  const handleSubmit = () => {
    setEditable(false);
  };
  return (
    <>
      <PageHeader
        title='Thông tin cá nhân'
        // className='site-page-header'
        // subTitle='This is a subtitle'
        // tags={<Input.Search />}
        extra={[<Button onClick={handleEdit}>Chỉnh sửa</Button>]}
      />
      <Form
        name='editUser'
        form={form}
        labelCol={{ span: 8 }}
        contentEditable={false}>
        <Row gutter={8}>
          <Col sm={24} md={10}>
            <Form.Item label='Email' name='email'>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Họ tên' name='hoTen'>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Số điện thoại' name='soDT'>
              <Input disabled={!editable} />
            </Form.Item>
          </Col>
          <Col sm={24} md={10}>
            <Form.Item label='Tài khoản' name='taiKhoan'>
              <Input disabled={!editable} />
            </Form.Item>
            <Form.Item label='Mật khẩu' name='matKhau'>
              <Input disabled={!editable} />
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

export default EditUserForm;
