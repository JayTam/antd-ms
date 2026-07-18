/**
 * title: 灵活控制
 * description: ipInputs 是输入框的 props； ipSelects 是选择器的 props；ipInputRef.current?.ips 是四个输入框的 ref，可对其每个输入框灵活控制；cidrPrefixSelectProps 是对选择器的控制属性。
 */

import type { MsFormColumns, MsIpRef } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const ipInputRef = useRef<MsIpRef>(null);

  const handleClick = (index: number) => {
    ipInputRef.current?.ips[index].focus();
  };

  const columns: MsFormColumns = [
    {
      title: 'props',
      dataIndex: 'disableIndex',
      valueType: 'radio',
      initialValue: 0,
      valueEnum: [
        {
          label: '禁用第 1 项',
          value: 0,
        },
        {
          label: '禁用第 2 项',
          value: 1,
        },
        {
          label: '禁用第 3 项',
          value: 2,
        },
        {
          label: '禁用第 4 项',
          value: 3,
        },
      ],
    },
    {
      title: 'ref',
      dataIndex: 'ipInputRef',
      valueType: 'radio',
      dependencies: ['disableIndex'],
      fieldRender: ({ getFieldValue }) => {
        const disabledIndex = getFieldValue('disableIndex');
        return (
          <Button.Group>
            <Button onClick={() => handleClick(0)} disabled={disabledIndex == 0}>
              聚焦第 1 项
            </Button>
            <Button onClick={() => handleClick(1)} disabled={disabledIndex == 1}>
              聚焦第 2 项
            </Button>
            <Button onClick={() => handleClick(2)} disabled={disabledIndex == 2}>
              聚焦第 3 项
            </Button>
            <Button onClick={() => handleClick(3)} disabled={disabledIndex == 3}>
              聚焦第 4 项
            </Button>
          </Button.Group>
        );
      },
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      valueType: 'ip',
      dependencies: ['disableIndex'],
      fieldProps: ({ getFieldValue }) => {
        const disabledIndex = getFieldValue('disableIndex');
        return {
          ref: ipInputRef,
          style: { width: 300 },
          defaultValue: '192.168.0.1',
          ipInputs: [
            {
              disabled: disabledIndex == 0,
            },
            {
              disabled: disabledIndex == 1,
            },
            {
              disabled: disabledIndex == 2,
            },
            undefined,
          ],
          ipSelects: [
            undefined,
            undefined,
            undefined,
            {
              disabled: disabledIndex == 3,
            },
          ],
          cidrPrefixRange: [16, 32],
          cidrPrefixSelectProps: { disabled: true },
        };
      },
    },
  ];

  return <MsForm noCard submitter={{ render: () => null }} columns={columns} />;
};
