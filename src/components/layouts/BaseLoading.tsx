import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

export default function BaseLoading() {
  return <div className='w-full h-full flex-1 flex items-center justify-center text-4xl'>
    <LoadingOutlined />
  </div>;
}
