import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className='flex flex-col justify-center items-center absolute inset-1/2'>
      <TailSpin
        height={100}
        width={200}
        color="#ADD8E6"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
