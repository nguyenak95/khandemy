import React from 'react';
const CourseWideMobile = ({ data, handleAbortCourse }) => {
  return (
    <div>
      <div className='card'>
        <img
          className='card-img-top'
          src={data.hinhAnh}
          height={180}
          alt='Card cap'
        />
        <div className='card-body'>
          <h6 className='card-title'>
            {data.tenKhoaHoc.length > 40
              ? data.tenKhoaHoc.slice(0, 40) + '...'
              : data.tenKhoaHoc}
          </h6>
          <p className='card-text'>{data.moTa.slice(0, 50) + '...'}</p>
        </div>
        <div className='card-footer'>
          <div className='d-flex justify-content-between align-items-center'>
            <button
              className='btn btn-danger btn-sm p-2'
              onClick={() => handleAbortCourse(data.maKhoaHoc)}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWideMobile;
