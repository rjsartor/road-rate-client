import React from 'react';
const Spacer = ({
  height = 0,
  width = 0,
  style = {},
  ...rest
}) => {
  const _width = width * 8;
  const _height = height * 8;
  return (
    <span
      style={{
        display: 'block',
        width: _width,
        minWidth: _width,
        height: _height,
        minHeight: _height,
        ...rest,
      }}
      {...rest}
    />
  );
};
export default Spacer; 