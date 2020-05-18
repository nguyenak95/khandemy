import React, { useEffect, useState } from "react";
import { LAY_KHOA_HOC_THEO_DANH_MUC, generateRandomStar } from "../../common";
import Course from "../Course";

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
    <>
      <h1 className='text-center font__dancing mt-5'>{state[0].danhMucKhoaHoc.tenDanhMucKhoaHoc.toUpperCase()}</h1>
      <div className='container'>
        <div className='row'>
        {state.map((item, idx) => (
          <Course data={item} key={idx} numberStar={generateRandomStar()}/>
          ))}
        </div>
      </div>
    </>
  ) : null;
};

export default DanhMucKhoaHoc;
