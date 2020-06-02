import React, { useState, useEffect } from 'react';
import CourseWide from '../CourseWide';
import { Skeleton } from 'antd';
import { generateRandomStar } from '../Util';
import CourseWideMobile from '../CourseWideMobile';

const CourseWideList = ({ items, handleAbortCourse }) => {
  // eslint-disable-next-line no-restricted-globals
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    console.log(window.innerWidth < 500);
    setIsMobile(window.innerWidth < 500);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return items[0] ? (
    <div className='container'>
      {items.map((item, idx) => (
        <div className='row mb-2 justify-content-center' key={idx}>
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
