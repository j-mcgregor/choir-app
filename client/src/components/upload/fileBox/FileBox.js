import React from 'react';
import './FileBox.scss';

const fileBox = props => {
  const xStyle = {
    marginLeft: '-80%',
    color: 'green'
  };

  let size =
    (Math.round((parseFloat(props.size) / 1000000) * 100) / 100).toString() +
    ' MB'; /* show size in MBs with two digits after point*/
  if (size === '0 MB') {
    size =
      (Math.round((parseFloat(props.size) / 1000) * 100) / 100).toString() +
      ' KB';
  }

  return (
    <div className="file-box">
      <span
        className="remove-file-box"
        onClick={e => {
          props.onRemove.call(this, e, props.index);
        }}
        style={xStyle}
      >
        X
      </span>
      <p>{props.fileName.slice(0, 20) + '...'}</p>
      <p>{size}</p>
    </div>
  );
};

export default fileBox;
