import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSpinner = ({className}) => {
  return (
    <div className="row">
      {Array(8)
        .fill("")
        ?.map((data, i) => (
          <div className={className} key={i}>
            <Skeleton style={{ borderRadius: 5 }} height={435} />
          </div>
        ))}
    </div>
  );
};

export default LoadingSpinner;
