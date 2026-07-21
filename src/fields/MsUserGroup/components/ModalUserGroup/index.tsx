import { UserOutlined } from '@ant-design/icons';
import { ModalHolder } from '@jaytam/antd-ms/components/NiceModal';
import type { SelectProps } from 'antd';
import { Button, Select } from 'antd';
import { find, isEmpty } from 'lodash-es';
import { forwardRef, useMemo, useRef, useState } from 'react';
import type { DataType, LabelValue, UserGroupProps, UserPropsType } from '../../types';
import MsUserGroupPropsModal from './MsUserGroupModal';
import { useDebounceFn, useDeepCompareEffect } from 'ahooks';
import useUserGroupRequest from '../../hooks/useUserGroupRequest';

const ModalUserGroup = forwardRef<any, UserGroupProps>((props, ref) => {
  const {
    searchTypeEnum,
    maxCount,
    disabled,
    value,
    onChange,
    style,
    debounceTime = 300,
    selectProps,
  } = props;
  const [options, setOptions] = useState<DataType[]>();

  // 保存弹窗中选择的人员和团队
  const [modalValues, setModalValues] = useState<DataType[]>();

  const userProps: UserPropsType = find(searchTypeEnum, ['type', 'user'])?.props || {};

  const userGroupButtonRef = useRef<HTMLButtonElement>(null);

  // 超过maxCount时，需要禁用多余的选项
  const withMaxCountOptions = useMemo(() => {
    if (maxCount && value?.length) {
      if (value.length >= maxCount) {
        const valList = value.map((i) => i.value);
        return options?.map((i) => {
          if (valList.includes(i.value)) {
            return i;
          }
          return {
            ...i,
            disabled: true,
          };
        });
      }
    }
    return options;
  }, [maxCount, options, value]);

  // 获取用户的options
  const {
    options: _options,
    loading,
    userLoading,
    requestUserOptions,
  } = useUserGroupRequest({
    ...userProps,
    id: props?.id + 'user',
  });

  useDeepCompareEffect(() => {
    setOptions(_options);
  }, [_options]);

  // 搜索的回调
  const { run: handleSearch } = useDebounceFn(
    async (searchValue: string) => {
      if (searchValue) {
        const userOpts = await requestUserOptions(searchValue);
        setOptions(userOpts);
      } else {
        setOptions(_options);
      }
    },
    { wait: debounceTime },
  );

  // 失去焦点的回调
  const handleBlur = () => {
    setOptions(_options);
  };

  const modalHandler: any = {};

  const clickOpenModal = () => {
    modalHandler
      .show({ ...props, userGroupButtonRef })
      .then((res: DataType[]) => setModalValues(res));
  };

  const handleChange = (e: LabelValue[], option: any) => {
    if (maxCount && (e?.length || 0) > maxCount) return false;

    const list = e?.map((item, index) => {
      // 判断是否在弹窗中选择的
      const inModalValue = modalValues?.find((val) => val?.value === item?.value);

      if (!isEmpty(inModalValue)) return inModalValue;
      if (!isEmpty(option[index])) return { ...option[index], searchType: 'user' };
      return { ...item, searchType: 'user' };
    });

    onChange?.(list);
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Select
        ref={ref}
        loading={disabled ?? (loading || userLoading)}
        value={value}
        onChange={handleChange}
        style={{ flex: 1, ...style }}
        options={withMaxCountOptions as SelectProps['options']}
        showSearch
        allowClear
        onSearch={handleSearch}
        onBlur={handleBlur}
        filterOption={false}
        mode="multiple"
        labelInValue={true}
        disabled={disabled}
        placeholder={props?.placeholder}
        {...selectProps}
      />
      <Button
        type="text"
        disabled={disabled ?? loading}
        icon={<UserOutlined />}
        onClick={clickOpenModal}
        ref={userGroupButtonRef}
      />
      {/* 在 MsTable 的 filter 场景下，需要渲染气泡弹窗中，不然会导致弹窗交互混乱 */}
      <ModalHolder modal={MsUserGroupPropsModal} handler={modalHandler} />
    </div>
  );
});

export default ModalUserGroup;
