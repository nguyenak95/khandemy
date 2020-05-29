import React from 'react';
import { Table, Button } from 'antd';

const UserList = ({ loading, dataSource }) => {
  const pagination = {
    current: 1,
    pageSize: 10,
    hideOnSinglePage: true,
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
      width: '20px',
      render: (matKhau, i) => (
        <input
          key={i}
          type='password'
          defaultValue={matKhau}
          className='border-0'
        />
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      key: 'soDT',
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      render: (...a) => (
        console.log(a) ||
        <div>
          <Button.Group>
            <button className='btn btn-dark mr-1'>Ghi danh</button>
            <button className='btn btn-warning mr-1'>Sửa</button>
            <button className='btn btn-danger mr-1'>X</button>
          </Button.Group>
        </div>
      ),
    },
  ];
  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      size='small'
    />
  );
};

export default UserList;
