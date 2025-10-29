import React from "react";

const Datas = ({icon,label,data,val}) => {
  return (
    <div className=" backdrop-blur-2xl bg-white/70 pb-6 p-2 rounded-xl text-center  min-w-[45%]">
      <span className="flex items-center gap-1 mb-3">
        {icon}
        {label}
      </span>
      <span>{data}{val==1? '°' :val==2?'%':val==3?'hPa':''}</span>
    </div>
  );
};

export default Datas;
