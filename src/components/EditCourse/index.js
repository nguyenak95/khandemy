import React from 'react';
import { PageHeader, Input } from 'antd';
import { HUY_DANG_KY_KHOA_HOC } from '../Util';
import axios from 'axios';
import CourseWideList from '../CourseWideList';

const EditCourse = ({ userData, dispatch }) => {
  const { taiKhoan, chiTietKhoaHocGhiDanh } = userData;
  const handleAbortCourse = (maKhoaHoc) => {
    const { accessToken } = JSON.parse(localStorage.getItem('tokenKhandemy'));
    axios
      .post(
        HUY_DANG_KY_KHOA_HOC,
        { taiKhoan, maKhoaHoc },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      )
      .then((r) => dispatch({ type: 'setUserData', payload: null }));
  };
  return (
    <>
      <PageHeader
        title='Các khóa học đã tham gia'
        // className='site-page-header'
        // subTitle='This is a subtitle'
        // tags={<Input.Search />}
        extra={[<Input.Search />]}
      />
      {chiTietKhoaHocGhiDanh.length ? (
        <CourseWideList items={chiTietKhoaHocGhiDanh} />
      ) : (
        <div className='d-flex justify-content-center p-5'>
          <p>Bạn chưa đăng kí khóa học nào</p>
        </div>
      )}
    </>
  );
};

export default EditCourse;
