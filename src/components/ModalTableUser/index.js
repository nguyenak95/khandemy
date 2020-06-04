import React from 'react';
import { Table, Button } from 'antd';

const ModalTableUser = ({
  dataSource,
  deleteUser,
  verifyUser,
  isWaitingTable = false,
}) => {
  const title = () =>
    isWaitingTable ? 'Người dùng chờ xác thực' : 'Người dùng đã ghi danh';
  const pagination = {
    pageSize: 2,
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      width: 20,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 60,
    },
    {
      title: 'Chờ xác nhận',
      key: 'choXacNhan',
      width: 120,
      render: (a) => (
        <Button.Group className='d-flex'>
          {isWaitingTable ? (
            <button
              className='btn btn-dark mr-1'
              onClick={() => verifyUser(a.taiKhoan)}>
              Xác thực
            </button>
          ) : null}
          <button
            onClick={() => deleteUser(a.taiKhoan)}
            className='btn btn-danger mr-1'>
            Hủy
          </button>
        </Button.Group>
      ),
    },
  ];
  return (
    <Table
      title={title}
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      size='small'
    />
  );
};

export default ModalTableUser;
