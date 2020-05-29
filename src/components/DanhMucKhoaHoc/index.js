import React, { useEffect, useState } from "react";
import { LAY_KHOA_HOC_THEO_DANH_MUC } from "../Util";
import CourseList from "../CourseList";
const DanhMucKhoaHoc = (props) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const { history, match, location } = props
    let { maDanhMuc, maNhom } = match.params;
    const params = new URLSearchParams(location.search);
    maDanhMuc = maDanhMuc || params.get("maDanhMuc");
    maNhom = maNhom || params.get("maNhom") || "GP08";
    if (!maDanhMuc) {
      history.push("/404");
      return;
    } else {
      fetch(
        `${LAY_KHOA_HOC_THEO_DANH_MUC}?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`
      )
        .then((r) => r.json().then((data) => setState(data)))
        .catch((err) => history.push("/404"));
    }
  }, [props]);
  return state[0] ? (
    <div id='course__category'>
      <h1 className='text-center font__dancing'>{state[0].danhMucKhoaHoc.tenDanhMucKhoaHoc.toUpperCase()}</h1>
      <CourseList items={state} />
    </div>
  ) : null;
};

export default DanhMucKhoaHoc;
