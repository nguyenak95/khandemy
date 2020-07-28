import React, { useState, useEffect, useCallback } from 'react';
import { Button, PageHeader, Input, notification } from 'antd';
import { TIM_KIEM_NGUOI_DUNG } from '../components/Util';
import axios from 'axios';
import UserTable from '../components/UserTable';
import EditUserFormAdmin from '../components/EditUserFormAdmin';
import RegisterCourseByUserModal from '../components/RegisterCourseByUserModal';

const ManageUserPage = () => {
  const [edit, setEdit] = useState({
    isEdit: false,
    dataEdit: {},
  });
  const [modalData, setModalData] = useState({
    isVisible: false,
    taiKhoan: '',
  });
  const [userList, setUserList] = useState([]);
  const { isEdit, dataEdit } = edit;
  const { isVisible, taiKhoan } = modalData;
  const closeModal = useCallback(
    () =>
      setModalData({
        isVisible: false,
        taiKhoan: '',
      }),
    []
  );
  const openModal = (taiKhoan) =>
    setModalData({
      isVisible: true,
      taiKhoan,
    });
  const handleEdit = (user) =>
    setEdit({
      isEdit: true,
      dataEdit: user.taiKhoan ? user : {},
    });
  const handleSearch = (e = { target: '' }) => {
    axios
      .get(
        `${TIM_KIEM_NGUOI_DUNG}${
          e.target.value ? `&tuKhoa=${e.target.value}` : ''
        }`
      )
      .then((r) =>
        setUserList(
          r.data.map((item, idx) => ({ ...item, STT: idx + 1, key: idx }))
        )
      )
      .catch((e) =>
        notification.error({
          message: e.message,
        })
      );
  };
  const handleExitEdit = () =>
    setEdit({ isEdit: false, dataEdit: {} }) || handleSearch();
  useEffect(() => handleSearch(), []);
  return !isEdit ? (
    <>
      <PageHeader
        title='Quản lý người dùng'
        extra={<Button onClick={handleEdit}>Thêm</Button>}
      />
      <div className='d-flex mb-5'>
        <Input.Search
          width={200}
          onChange={handleSearch}
          placeholder='Nhập vào tài khoản hoặc họ tên người dùng'
        />
      </div>
      <UserTable
        openModal={openModal}
        handleEdit={handleEdit}
        dataSource={userList}
        handleSearch={handleSearch}
        loading={false}
      />
      <RegisterCourseByUserModal
        closeModal={closeModal}
        visible={isVisible}
        taiKhoan={taiKhoan}
      />
    </>
  ) : (
    <EditUserFormAdmin userData={dataEdit} handleExitEdit={handleExitEdit} />
  );
};

export default ManageUserPage;
