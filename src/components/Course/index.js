import React, { useCallback } from 'react';
import { useHistory, } from 'react-router-dom';

function Course({ data, numberStar }) {
  const history = useHistory();
  const handleXemChiTiet = useCallback(() => {
    history.push(`/Chitiet/${data.maKhoaHoc}`);
  }, []);
  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 mt-5 site__course'>
      <div className='card'>
        <img
          className='card-img-top'
          src={data.hinhAnh}
          height={180}
          alt='Card cap'
        />
        <div className='card-body'>
          <h6 className='card-title'>
            {data.tenKhoaHoc.length > 50
              ? data.tenKhoaHoc.slice(0, 50) + '...'
              : data.tenKhoaHoc}
          </h6>
          <p className='card-text'>{data.moTa.slice(0, 90) + '...'}</p>
        </div>
        <div className='card-footer'>
          <p className='card-text'>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star ${
                    numberStar - i > 0 ? 'yellow' : ''
                  }`}></i>
              ))}
          </p>
          <div className='d-flex justify-content-between align-items-center'>
            <button
              className='btn registerCourse__btn p-2'
              onClick={handleXemChiTiet}>
              Đăng ký
            </button>
            <span className='font-italic'>
              Lượt xem: {data.luotXem || numberStar * 999}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Course);
