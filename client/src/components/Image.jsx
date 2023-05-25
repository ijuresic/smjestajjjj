import React from 'react';

const Image = ({ src, ...rest }) => {
  return <img src={src} {...rest} alt={''} width={400} height={400} />;
};

export default Image;
