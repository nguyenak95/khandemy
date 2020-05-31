import React from 'react';
import { generateRandomStar } from '../Util';
import './index.scss';
const CourseWide = ({ data, handleAbortCourse }) => {
  const numberStar = generateRandomStar();
  return (
    <div className='card-wide'>
      <div style={{ flex: 1 }}>
        <img
          className='card-img-top'
          src={data.hinhAnh}
          height='100%'
          alt='Card cap'
        />
      </div>
      <div
        style={{ flex: 3 }}
        className='d-flex flex-column justify-content-between'>
        <div className='card-body'>
          <h5 className='card-title'>{data.tenKhoaHoc}</h5>
          <p className='card-text'>{data.moTa}</p>
        </div>
        <div className='card-footer pb-1'>
          <div className='d-flex justify-content-between align-items-center'>
            <button
              className='btn btn-danger btn-sm'
              onClick={() => handleAbortCourse(data.maKhoaHoc)}>
              Hủy
            </button>
            <span className='font-italic'>
              Lượt xem: {data.luotXem || numberStar * 999}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWide;
