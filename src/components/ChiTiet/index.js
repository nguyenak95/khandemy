import React, { useEffect, useState } from 'react';
import { LAY_THONG_TIN_KHOA_HOC, generateRandomStar } from '../Util';
import { Skeleton, notification } from 'antd';
import './index.scss';
import { loremIpsum } from 'lorem-ipsum';
import axios from 'axios';

const ChiTiet = (props) => {
  const [data, setData] = useState();
  const numberStar = generateRandomStar();
  useEffect(() => {
    const {
      match: { params },
      history,
    } = props;
    if (params.maKhoaHoc) {
      axios
        .get(`${LAY_THONG_TIN_KHOA_HOC}${params.maKhoaHoc}`)
        .then((r) => console.log(r.data) || setData(r.data))
        .catch(
          (err) =>
            notification.error({
              message: err.message,
              placement: 'bottomRight',
            }) || history.push('/404')
        );
    } else {
      history.push('/404');
    }
  }, []);
  return data ? (
    <div id='course__page'>
      <div id='course__image'>
        <div>
          <img src={data.hinhAnh} alt='hinh anh khoa hoc' />
          <div id='overlay'></div>
        </div>
        <div id='course__rating'>
          <h6>{data.tenKhoaHoc.toUpperCase()}</h6>
          <p>
            Đánh giá khóa học:{' '}
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
          <button className='btn btn-outline-light'>Đăng ký</button>
        </div>
      </div>
      <div id='course__info' className='container pt-5 pb-5'>
        <h3>Giới thiệu khóa học</h3>
        <p>{data.moTa}</p>
        <p>{loremIpsum({ count: 10 })}</p>
        <p>{loremIpsum({ count: 7 })}</p>
        <p>{loremIpsum({ count: 5 })}</p>
        <p>{loremIpsum({ count: 3 })}</p>
        <p>{loremIpsum({ count: 5 })}</p>
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default ChiTiet;
