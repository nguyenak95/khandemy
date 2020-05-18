import React, { useEffect, useState } from "react";
import { LAY_THONG_TIN_KHOA_HOC } from "../../common";
import { Skeleton } from "antd";

const ChiTiet = (props) => {
  const [data, setData] = useState();
  useEffect(() => {
    const {
      match: { params },
      history,
    } = props;
    if (params.maKhoaHoc) {
      fetch(`${LAY_THONG_TIN_KHOA_HOC}${params.maKhoaHoc}`)
        .then(r => r.json().then(khoaHoc => setData(khoaHoc)))
        .catch(err => history.push("/404"));
    } else {
      history.push("/404");
    }
  }, []);
  return (
    data ? (
      <div>
        <img src={data.hinhAnh} alt='hinh anh khoa hoc' />
      </div>
    ) : <Skeleton />
  );
};

export default ChiTiet;
