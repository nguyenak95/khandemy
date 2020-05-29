import React from 'react'
import { PageHeader } from "antd";

const AddUserForm = () => {
  return (
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
  )
}

export default AddUserForm
