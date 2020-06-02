import React, { useState, useEffect, useCallback } from 'react';
import { Button, PageHeader, Input, notification, Pagination } from 'antd';
import { TIM_KIEM_KHOA_HOC } from '../components/Util';
import axios from 'axios';
import CourseTable from '../components/CourseTable';
import EditUserFormAdmin from '../components/EditUserFormAdmin';
import RegisterCourseModal from '../components/RegisterCourseModal';

const ManageCoursePage = () => {
  const [edit, setEdit] = useState({
    isEdit: false,
    dataEdit: {},
  });
  const [modalData, setModalData] = useState({
    isVisible: false,
    taiKhoan: '',
  });
  const [courseList, setCourseList] = useState([]);

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
        `${TIM_KIEM_KHOA_HOC}${
          e.target.value ? `&tuKhoa=${e.target.value}` : ''
        }`
      )
      .then((r) =>
        setCourseList(
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
        title='Quản lý khóa học'
        extra={<Button onClick={handleEdit}>Thêm</Button>}
      />
      <div className='d-flex mb-5'>
        <Input.Search
          width={200}
          onChange={handleSearch}
          placeholder='Nhập vào khóa học'
        />
      </div>
      <CourseTable
        openModal={openModal}
        handleEdit={handleEdit}
        dataSource={courseList}
        handleSearch={handleSearch}
        loading={false}
      />
      <RegisterCourseModal
        closeModal={closeModal}
        visible={isVisible}
        taiKhoan={taiKhoan}
      />
    </>
  ) : (
    <EditUserFormAdmin userData={dataEdit} handleExitEdit={handleExitEdit} />
  );
};

export default ManageCoursePage;
