import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Pagination } from 'antd';
import {
  HUY_DANG_KY_KHOA_HOC,
  LAY_THONG_TIN_KHOA_HOC,
  successBar,
  errorBar,
} from '../Util';
import axios from 'axios';
import CourseWideList from '../CourseWideList';

const EditCourse = ({ userData, layThongTinCaNhan }) => {
  const [mangKhoaHoc, setMangKhoaHoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { taiKhoan, chiTietKhoaHocGhiDanh } = userData;
  const mangHienThi =
    mangKhoaHoc.length > 0
      ? mangKhoaHoc.filter(
          (item) =>
            item.tenKhoaHoc.toLowerCase().search(searchTerm.toLowerCase()) !==
            -1
        )
      : [];
  const layChiTietKhoaHoc = () =>
    Promise.all(
      chiTietKhoaHocGhiDanh.map((course) =>
        axios.get(`${LAY_THONG_TIN_KHOA_HOC}${course.maKhoaHoc}`)
      )
    )
      .then((res) => setMangKhoaHoc(res.map((it) => it.data)))
      .catch(({ response }) => errorBar(response.data));
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
      .then((r) => successBar(r.data) || layThongTinCaNhan())
      .catch(({ response }) => errorBar(response.data));
  };

  useEffect(() => {
    layChiTietKhoaHoc();
  }, [userData]);
  return (
    <>
      <PageHeader
        title='Các khóa học đã tham gia'
        extra={
          <Input.Search
            onChange={({ target }) => setSearchTerm(target.value)}
          />
        }
      />
      <Pagination
        className='mb-1 pl-4'
        pageSize={2}
        total={mangHienThi.length}
        onChange={(r) => setCurrentPage(r)}
      />
      {mangHienThi.length ? (
        <CourseWideList
          items={mangHienThi.slice(2 * (currentPage - 1), 2 * currentPage)}
          handleAbortCourse={handleAbortCourse}
        />
      ) : (
        <div className='d-flex justify-content-center p-5'>
          <p>Bạn chưa đăng kí khóa học nào</p>
        </div>
      )}
    </>
  );
};

export default EditCourse;
