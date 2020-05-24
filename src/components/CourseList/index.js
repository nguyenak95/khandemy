import React from "react";
import Course from '../Course'
import { generateRandomStar } from '../Util'
import { Skeleton } from "antd";
const CourseList = (props) => {
  const { items } = props
  return items[0] ?
    <div className="container-fluid pb-5">
      <div className="row">
        {items.map((item, idx) => (
          <Course data={item} key={idx} numberStar={generateRandomStar()} />
        ))}
      </div>
    </div> : <Skeleton />
}

export default React.memo(CourseList);
