import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DropDown = (props) => {
  const { danhMucKhoaHoc } = props;
  return (
    <div className='dropdown nav-item'>
      <button
        className='btn dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'>
        Danh mục khóa học
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        {(danhMucKhoaHoc || []).map(({ maDanhMuc, tenDanhMuc }) => (
          <Link to={`/DanhMucKhoaHoc?maDanhMuc=${maDanhMuc}&maNhom=GP08`} key={maDanhMuc} className='dropdown-item'>
            {tenDanhMuc}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
