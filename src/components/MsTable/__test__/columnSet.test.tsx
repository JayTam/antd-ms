import type { MsTableColumns } from '@jaytam/antd-ms';
import { act, fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { ColumnStateListType } from '../components/MsTableColumnContainer/types';
import { sortColumnStateByFixed } from '../components/MsTableColumnContainer/utils/state';
import setup from './setup';

describe('sortColumnStateByFixed', () => {
  test('should return an empty array if the input is an empty array', () => {
    const input: ColumnStateListType = [];
    const expectedOutput: ColumnStateListType = [];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should return the same single element array if the input has only one element', () => {
    const input: ColumnStateListType = [{ id: '操作', fixed: 'right' }];

    const expectedOutput = [{ id: '操作', fixed: 'right' }];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should sort columns with "left" and "right" fixed properties correctly', () => {
    const input: ColumnStateListType = [
      { id: '操作', fixed: 'right' },
      { id: '操作1', fixed: 'right' },
      { id: 'id' },
      { id: 'status', fixed: 'left' },
    ];

    const expectedOutput = [
      { id: 'status', fixed: 'left' },
      { id: 'id' },
      { id: '操作', fixed: 'right' },
      { id: '操作1', fixed: 'right' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle all columns with "left" fixed property', () => {
    const input: ColumnStateListType = [
      { id: 'status1', fixed: 'left' },
      { id: 'status2', fixed: 'left' },
    ];

    const expectedOutput = [
      { id: 'status1', fixed: 'left' },
      { id: 'status2', fixed: 'left' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle all columns with "right" fixed property', () => {
    const input: ColumnStateListType = [
      { id: '操作1', fixed: 'right' },
      { id: '操作2', fixed: 'right' },
    ];

    const expectedOutput = [
      { id: '操作1', fixed: 'right' },
      { id: '操作2', fixed: 'right' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle no columns with fixed property', () => {
    const input: ColumnStateListType = [{ id: 'name' }, { id: 'age' }];

    const expectedOutput = [{ id: 'name' }, { id: 'age' }];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle a mix of fixed and non-fixed columns', () => {
    const input: ColumnStateListType = [
      { id: 'name' },
      { id: 'status', fixed: 'left' },
      { id: '操作', fixed: 'right' },
      { id: 'age' },
    ];

    const expectedOutput = [
      { id: 'status', fixed: 'left' },
      { id: 'name' },
      { id: 'age' },
      { id: '操作', fixed: 'right' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle elements with the same id but different fixed properties', () => {
    const input: ColumnStateListType = [
      { id: 'sameId', fixed: 'left' },
      { id: 'sameId', fixed: 'right' },
      { id: 'sameId' },
    ];

    const expectedOutput = [
      { id: 'sameId', fixed: 'left' },
      { id: 'sameId' },
      { id: 'sameId', fixed: 'right' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });

  test('should handle a complex case with multiple fixed properties', () => {
    const input: ColumnStateListType = [
      { id: 'left1', fixed: 'left' },
      { id: 'none1' },
      { id: 'right1', fixed: 'right' },
      { id: 'left2', fixed: 'left' },
      { id: 'none2' },
      { id: 'right2', fixed: 'right' },
    ];

    const expectedOutput = [
      { id: 'left1', fixed: 'left' },
      { id: 'left2', fixed: 'left' },
      { id: 'none1' },
      { id: 'none2' },
      { id: 'right1', fixed: 'right' },
      { id: 'right2', fixed: 'right' },
    ];

    expect(sortColumnStateByFixed(input)).toEqual(expectedOutput);
  });
});

describe('MsTable 列设置', () => {
  test('打开列设置弹窗', async () => {
    await setup({});
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'setting' }));
    });
    expect(screen.getByText('设置显示字段')).toBeInTheDocument();
  });

  test('点击可选字段的 "1列"，隐藏已选字段的 "1列"', async () => {
    const columns: MsTableColumns = [
      {
        title: '1列',
        dataIndex: 'column1',
      },
      {
        title: '2列',
        dataIndex: 'column2',
      },
      {
        title: '3列',
        dataIndex: 'column3',
      },
    ];
    await setup({ columns });
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'setting' }));
    });

    await act(async () => {
      fireEvent.click(screen.getByDisplayValue('column1'));
    });

    expect(screen.queryByTestId('column1')).not.toBeInTheDocument();
  });

  test('移动列', async () => {
    const columns: MsTableColumns = [
      {
        title: '1列',
        dataIndex: 'column1',
      },
      {
        title: '2列',
        dataIndex: 'column2',
      },
    ];
    await setup({ columns });
    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'setting' }));
    });

    const els = Array.from(
      document.querySelectorAll(
        '.column-sort-group-content > .column-sort-item .column-sort-item-text',
      ),
    ).map((el) => el.innerHTML);

    expect(els).toEqual(['1列', '2列']);

    const draggable = screen.getByTestId('column1');

    const initialRect = draggable.getBoundingClientRect();
    const initialX = initialRect.left + initialRect.width / 2;
    const initialY = initialRect.top + initialRect.height / 2;

    await act(async () => {
      // 模拟鼠标按下
      await userEvent.pointer([
        { target: draggable, coords: { x: initialX, y: initialY } },
        { target: draggable, coords: { x: initialX, y: initialY + 80 } },
      ]);
    });

    const movedEls = Array.from(
      document.querySelectorAll(
        '.column-sort-group-content > .column-sort-item .ant-space-item:nth-child(2)',
      ),
    ).map((el) => el.innerHTML);

    // expect(movedEls).toEqual(['2列', '1列']);
  });
});
