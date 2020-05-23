import React from "react";

function NotFound() {
  return (
    <div>
      <p className="notfound text-center">
      <i className="fa fa-exclamation-triangle"></i>
        Dữ liệu bạn đang tìm kiếm
      </p>
      <p className="notfound text-center">
       không tồn tại trên hệ thống
       <i className="fa fa-exclamation-triangle"></i>
      </p>
    </div>
  );
}

export default NotFound;
