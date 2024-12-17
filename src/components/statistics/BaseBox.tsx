import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

export default function BaseBox({
  title,
  number,
  compareTo,
}: {
  title: string;
  number: number;
  compareTo?: number;
}) {
  const showCompare = () => {
    if (compareTo) {
      if (number >= compareTo) {
        const percent = ((number / compareTo) * 100 - 100).toFixed(0);
        return (
          <div className="text-success flex gap-2">
            <ArrowUpOutlined /> {percent} %
            <Tooltip
              placement="bottom"
              title={'Compare to yesterday'}
              arrow={true}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        );
      } else {
        const percent = (100 - (compareTo / number) * 100).toFixed(0);
        return (
          <div className="text-error flex gap-2">
            <ArrowDownOutlined /> {percent} %
            <Tooltip
              placement="bottom"
              title={'Compare to yesterday'}
              arrow={true}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        );
      }
    } else {
      return '';
    }
  };

  return (
    <div className=" py-4 px-6 bg-white rounded-md flex-1 shadow-md">
      <div className="text-xl mb-4 border-b">{title}</div>
      <div className="flex items-center justify-between">
        <div className="font-bold text-2xl">{number}</div>
        {compareTo && showCompare()}
      </div>
    </div>
  );
}
