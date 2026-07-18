import { UserOutlined } from '@ant-design/icons';
import { useControllableValue, useDebounceFn, useDeepCompareEffect } from 'ahooks';
import { Button, Select } from 'antd';
import { cloneDeep, find, includes, omit, take, uniq, uniqBy } from 'lodash-es';
import { forwardRef, useState } from 'react';
import { TagsReadSkeleton, DefaultReadSkeleton } from '../MsSelect/skeletons';

import useModeRender from '../../hooks/useModeRender';
import useFetchAllOptions from './hooks/useFetchAllOptions';

import type { dataType, MsUserProps, MsUserRef, OptionsType } from './types';
import UserModal from './UserModal';
import { filterBySearchCode } from './utils/searchUser';

import { ModalHolder } from '@jaytam/antd-ms/components/NiceModal';
import enhanceField from '../enhanceField';
import './index.less';
import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';

const EXTEND_FIELD_PROPS = [
  'defaultSelectFirst',
  'userButton',
  'style',
  'requestEmail',
  'emailEnum',
  'requestGroup',
  'groupEnum',
  'selectType',
  'userModalTitle',
  'options',
  'value',
  'onChange',
  'defaultValue',
];

const MsUser = forwardRef((props: MsUserProps, ref: MsUserRef) => {
  const { options, loading, userList, emailList, groupList, label } = useFetchAllOptions(props);
  const { fieldProps } = props;
  const {
    defaultValue,
    userButton,
    style = {},
    onSearch,
    requestEmail,
    emailPostRes,
    emailEnum,
    requestGroup,
    groupPostRes,
    groupEnum,
    labelInValue,
    mode,
    userSearchCode,
    ...resetField
  } = fieldProps ?? {};

  const { mode: fieldMode, enumLoadingType } = useFieldModeContext(props);
  const { getPopupContainer } = useFieldPopupContainer();

  // 筛选结果的下拉框options
  const [myOptions, setMyOptions] = useState<dataType[]>([]);

  const [value, setValue] = useControllableValue(fieldProps);

  const updateMyOptions = (_opts: dataType[]): void => {
    // 取前100条
    setMyOptions(take(_opts, 100));
  };

  // options和value更新
  useDeepCompareEffect(() => {
    // 转换value为string或者string[]
    const userValue = mode
      ? value?.map?.((user: any) => user?.value ?? user)
      : value?.value ?? value;
    // 查找value对应的options
    const _opts = cloneDeep(options)?.filter((userInfo) => {
      // 单选
      if (!mode) {
        return labelInValue ? userInfo?.value === userValue : userInfo?.value === userValue;
      } else {
        // 多选
        return labelInValue
          ? find(value, [userValue, userInfo?.value])?.value
            ? true
            : false
          : includes(userValue, userInfo?.value);
      }
    });
    updateMyOptions(_opts);
  }, [options, value]);

  // 搜索调用的方法
  const { run: handleSearch } = useDebounceFn(
    (val: string) => {
      if (val) {
        const _opts = filterBySearchCode(userList, val, userSearchCode);
        updateMyOptions(_opts ?? []);
      } else {
        updateMyOptions([]);
      }
      onSearch?.(val);
    },
    { wait: 300 },
  );

  const userModalOk = (res: dataType[]) => {
    const list = cloneDeep(res ?? []);
    // 单选
    if (!mode) {
      // 最后一个人员
      const lastUser = list?.[list?.length - 1];
      const val = labelInValue ? lastUser : lastUser?.value;
      setValue(val);
    } else {
      // 多选
      const val = list?.map((item) => (labelInValue ? item : item.value));
      // 合并value
      const mergeValues = [...(value ?? []), ...val];
      // 去重
      const _newValue = labelInValue ? uniqBy(mergeValues, 'value') : uniq(mergeValues);
      setValue(_newValue);
    }
    updateMyOptions(list);
  };

  const modalHandler: any = {};

  const clickOpenModal = () => {
    modalHandler
      .show({
        ...fieldProps,
        userList: userList,
        emailList: emailList,
        groupList: groupList,
      })
      .then((selectRows: any) => {
        userModalOk(selectRows);
      });
  };

  const selectDom = (
    <Select
      ref={ref}
      value={value}
      mode={mode}
      labelInValue={labelInValue}
      loading={loading}
      disabled={resetField?.disabled ?? loading}
      optionFilterProp={'label'}
      showSearch
      allowClear
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={null}
      options={myOptions as OptionsType}
      onChange={setValue}
      getPopupContainer={getPopupContainer}
      {...omit(resetField, EXTEND_FIELD_PROPS)}
      style={userButton ? { width: '100%' } : { width: '100%', ...style }}
    />
  );

  const editDom = (
    <>
      {userButton ? (
        <div
          style={{
            display: 'flex',
            ...style,
          }}
        >
          <div className="ms-user-select-warp">{selectDom}</div>
          <Button
            type="text"
            disabled={resetField?.disabled ?? loading}
            icon={<UserOutlined />}
            onClick={clickOpenModal}
          />
          {/* 在 MsTable 的 filter 场景下，需要渲染气泡弹窗中，不然会导致弹窗交互混乱 */}
          <ModalHolder modal={UserModal} handler={modalHandler} />
        </div>
      ) : (
        selectDom
      )}
    </>
  );

  const readDom = label;

  const dom = useModeRender(props, editDom, readDom);

  if (fieldMode === 'read' && loading) {
    if (enumLoadingType === 'tags') {
      return <TagsReadSkeleton />;
    }
    return <DefaultReadSkeleton />;
  }

  return dom;
});

export default enhanceField(MsUser);
