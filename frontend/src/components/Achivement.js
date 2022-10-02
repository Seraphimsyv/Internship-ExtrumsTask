import React from 'react';


function Achievement(props) {
  return (
    <div className="achievement">
      <div className="circle">{props.count}</div>
      <p>{props.type}</p>
    </div>
  );
};

export default Achievement;