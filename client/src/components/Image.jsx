import React from 'react';

const Image = ({ src, ...rest }) => {
  return <img src={src} {...rest} alt={''} width={200} height={200} />;
};

export default Image;
