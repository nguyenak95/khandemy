import React, { useEffect, useState, useCallback } from 'react';
import { Carousel } from 'antd';
import { Img01, Img02, Img03, Img04 } from '../../assets/img';
import { LAY_KHOA_HOC_PHAN_TRANG } from '../../common';
import CourseList from '../CourseList';
const TrangChu = () => {
  const [data, setData] = useState({
    items: [],
    page: 0,
    totalCount: 0,
  });
  const { items, totalCount } = data;
  const handleChangePage = useCallback(
    (page = 1) => {
      data.page !== page &&
        fetch(`${LAY_KHOA_HOC_PHAN_TRANG}page=${page}`)
          .then((r) =>
            r.json().then((data) =>
              setData({
                items: data.items,
                page,
                totalCount: data.totalCount,
              })
            )
          )
          .catch((err) => console.log(err));
    },
    [data.page]
  );

  useEffect(() => {
    handleChangePage();
  }, []);

  return (
    <>
      <Carousel autoplay dotPosition='right'>
        <img src={Img01} alt='Carousel1' className='carousel__img' />
        <img src={Img02} alt='Carousel2' className='carousel__img' />
        <img src={Img03} alt='Carousel3' className='carousel__img' />
        <img src={Img04} alt='Carousel4' className='carousel__img' />
      </Carousel>
      <h1 className='text-center mt-5 font__dancing'>Các khóa học mới nhất</h1>
      <CourseList items={items} />
      <div className='container'>
        <div className='row mb-5 mt-5 d-flex justify-content-center'>
          <button className='btn nav__page__btn'>
            <i className='fa fa-chevron-left'></i>
          </button>
          {Array(Math.ceil(totalCount / 8))
            .fill(0)
            .map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleChangePage(idx + 1)}
                className={`btn page__btn m-1 ${
                  idx + 1 === data.page ? 'slt__page__btn' : ''
                }`}>
                {idx + 1}
              </button>
            ))}
          <button className='btn nav__page__btn'>
            <i className='fa fa-chevron-right'></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(TrangChu);
