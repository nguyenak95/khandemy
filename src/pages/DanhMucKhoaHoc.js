import React, { useEffect, useState } from 'react';
import { LAY_KHOA_HOC_THEO_DANH_MUC } from '../components/Util';
import { Pagination } from 'antd';
import CourseList from '../components/CourseList';
import "./DanhMucKhoaHoc.scss";

const DanhMucKhoaHoc = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState([]);
  useEffect(() => {
    const { history, match, location } = props;
    let { maDanhMuc, maNhom } = match.params;
    const params = new URLSearchParams(location.search);
    maDanhMuc = maDanhMuc || params.get('maDanhMuc');
    maNhom = maNhom || params.get('maNhom') || 'GP08';
    if (!maDanhMuc) {
      history.push('/404');
      return;
    } else {
      fetch(
        `${LAY_KHOA_HOC_THEO_DANH_MUC}?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`
      )
        .then((r) => r.json().then((data) => setState(data)))
        .catch((err) => history.push('/404'));
    }
  }, [props]);
  return state[0] ? (
    <div id='course__category'>
      <h1 className='text-center font__dancing'>
        {state[0].danhMucKhoaHoc.tenDanhMucKhoaHoc.toUpperCase()}
      </h1>
      <CourseList items={state.slice(4 * (currentPage - 1), 4 * currentPage)} />
      <Pagination
        pageSize={4}
        total={state.length}
        onChange={(r) => setCurrentPage(r)}
      />
    </div>
  ) : null;
};

export default DanhMucKhoaHoc;
