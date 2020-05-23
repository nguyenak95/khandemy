import React, { useCallback, useState } from "react";
import { Redirect } from "react-router-dom";

function Course({ data, numberStar }) {
  const [redirect, setRedirect] = useState(false)
  const handleXemChiTiet = useCallback(() => {
    setRedirect(true)
  }, [])
  return redirect ? <Redirect to={`/Chitiet/${data.maKhoaHoc}`} /> : (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-5 ">
      <div className="card">
        <img
          className="card-img-top"
          src={data.hinhAnh}
          height={180}
          alt="Card cap"
        />
        <div className="card-body">
          <h6 className="card-title">{data.tenKhoaHoc.length > 50
              ? data.tenKhoaHoc.slice(0,50) + "..."
              : data.tenKhoaHoc}</h6>
          {/* <p className="card-text">
            {data.moTa.length > 40
              ? data.moTa.slice(0,40) + "..."
              : Array(40).fill("_").join("")}
          </p> */}
          <p className="card-text">
            {data.moTa}
          </p>
          <p className="card-text">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star ${numberStar - i > 0 ? "yellow" : ""}`}
                ></i>
              ))}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn registerCourse__btn p-2" onClick={handleXemChiTiet}>Đăng ký</button>
            <span className="font-italic">
              Lượt xem: {data.luotXem || numberStar * 999}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Course);
