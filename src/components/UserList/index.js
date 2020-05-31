import React from 'react';
import { Table, Button, notification } from 'antd';
import './index.scss';
import { XOA_NGUOI_DUNG } from '../Util';
import axios from 'axios';

const UserList = ({
  loading,
  dataSource,
  handleSearch,
  handleEdit,
  openModal,
}) => {
  const pagination = {
    pageSize: 7,
  };
  const { accessToken } = JSON.parse(
    localStorage.getItem('tokenKhandemy') || '{}'
  );
  const handleDeleteUser = (taiKhoan) =>
    axios
      .delete(`${XOA_NGUOI_DUNG}${taiKhoan}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(
        (r) =>
          notification.success({
            message: `Xóa người dùng ${taiKhoan} thành công`,
            placement: 'bottomRight',
          }) || handleSearch()
      )
      .catch((e) =>
        notification.error({
          message: e.response.data,
          placement: 'bottomRight',
        })
      );
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      width: 20,
      fixed: 'left',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: 60,
      fixed: 'left',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      ellipsis: 'enable',
      key: 'matKhau',
      width: 60,
      render: (matKhau, i) => (
        <input
          key={i}
          disabled
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
      width: 80,
      ellipsis: 'enable',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      ellipsis: 'enable',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      width: 50,
      ellipsis: 'enable',
    },
    {
      title: 'Thao tác',
      key: 'thaoTac',
      width: 120,
      fixed: 'right',
      render: (a) => (
        <Button.Group>
          <button
            className='btn btn-sm btn-dark mr-1'
            onClick={() => openModal(a.taiKhoan)}>
            Ghi danh
          </button>
          <button
            className='btn btn-sm btn-warning mr-1'
            onClick={() => handleEdit(a)}>
            Sửa
          </button>
          <button
            onClick={() => handleDeleteUser(a.taiKhoan)}
            className='btn btn-sm btn-danger mr-1'>
            X
          </button>
        </Button.Group>
      ),
    },
  ];
  return (
    <Table
      id='user__list'
      bordered
      scroll={{ x: '100vw', y: 400 }}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      size='small'
    />
  );
};

export default UserList;
