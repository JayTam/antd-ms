import type { CheckboxProps } from 'antd';
import { Checkbox, Typography } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';
import type { ResourceTypeOption } from './types';

type ProductCheckboxProps = {
  selectResourceTypes?: string[];
  setSelectResourceTypes?: (value: string[]) => void;
  currentProductCode?: string;
  setCurrentProductCode?: React.Dispatch<React.SetStateAction<string | undefined>>;
  product?: ResourceTypeOption;
};

function ProductCheckbox(props: ProductCheckboxProps) {
  const {
    selectResourceTypes: value,
    setSelectResourceTypes: onChange,
    product,
    currentProductCode,
    setCurrentProductCode,
  } = props;

  /**
   * 资源类型编码列表
   */
  const resourceTypeCodes = product?.children?.map((item) => item.value);

  /**
   * 选中态：value 包含所有 resourceTypeCodes
   * 中间态：value 包含部分 resourceTypeCodes
   * 未选中：value 一个都没有 resourceTypeCodes
   */
  const checkboxStatus = useMemo(() => {
    const someChecked = resourceTypeCodes?.some((code) => value?.includes(code));
    const allChecked = resourceTypeCodes?.every((code) => value?.includes(code));
    const checked = someChecked;
    const indeterminate = allChecked ? false : someChecked;
    return { checked, indeterminate };
  }, [resourceTypeCodes, value]);

  const handleChange: CheckboxProps['onChange'] = () => {
    // 选中态，取消所有项
    if (checkboxStatus.checked && checkboxStatus.indeterminate === false) {
      const newValue = value?.filter((item) => !resourceTypeCodes?.includes(item)) ?? [];
      onChange?.(newValue);
    }
    // 中间态，选中所有项
    if (checkboxStatus.checked && checkboxStatus.indeterminate === true) {
      const newValue = value?.filter((item) => !resourceTypeCodes?.includes(item));
      onChange?.([...(newValue ?? []), ...(resourceTypeCodes ?? [])]);
    }
    // 未选中，选中所有项
    if (checkboxStatus.checked === false) {
      const newValue = value?.filter((item) => !resourceTypeCodes?.includes(item));
      onChange?.([...(newValue ?? []), ...(resourceTypeCodes ?? [])]);
    }
  };

  return (
    <div
      className={classNames(
        'product-item',
        currentProductCode === product?.productCode ? 'selected' : undefined,
      )}
      onClick={() => {
        if (product?.productCode) {
          setCurrentProductCode?.(product.productCode);
        }
      }}
    >
      <Checkbox
        checked={checkboxStatus.checked}
        indeterminate={checkboxStatus.indeterminate}
        onChange={handleChange}
      />
      <Typography.Text ellipsis className="product-name">
        {product?.productName}
      </Typography.Text>
    </div>
  );
}

export default ProductCheckbox;
