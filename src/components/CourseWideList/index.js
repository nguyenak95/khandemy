import React from 'react';
import CourseWide from '../CourseWide';
import { Skeleton } from 'antd';
import { generateRandomStar } from '../Util';
import CourseWideMobile from '../CourseWideMobile';

const CourseWideList = ({ items, handleAbortCourse }) => {
  // eslint-disable-next-line no-restricted-globals
  const isMobile = screen.width < 500;
  return items[0] ? (
    <div className='container pb-5'>
      {items.map((item, idx) => (
        <div className='row mb-2' key={idx}>
          {isMobile ? (
            <CourseWideMobile
              data={item}
              handleAbortCourse={handleAbortCourse}
              numberStar={generateRandomStar()}
            />
          ) : (
            <CourseWide
              data={item}
              handleAbortCourse={handleAbortCourse}
              numberStar={generateRandomStar()}
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <Skeleton />
  );
};

export default CourseWideList;
