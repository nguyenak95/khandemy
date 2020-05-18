import React from "react";
import Course from '../Course'
import { generateRandomStar } from '../../common'
import { Skeleton } from "antd";
const CourseList = (props) => {
  const { items } = props
  return items[0] ?
    <div className="container">
      <div className="row">
        {items.map((item, idx) => (
          <Course data={item} key={idx} numberStar={generateRandomStar()} />
        ))}
      </div>
    </div> : <Skeleton />
}

export default React.memo(CourseList);
