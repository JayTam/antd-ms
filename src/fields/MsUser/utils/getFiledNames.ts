import { forIn, pick } from 'lodash-es';

type DataType = Record<string, any>;

const BASE_FILED_NAMES = {
  label: 'cname',
  value: 'email',
  children: 'groupList',
  userList: 'userList',
  userFiledNames: { label: 'cname', value: 'email' },
};

const gerUserField = (field?: DataType, userFiledNames?: DataType) => {
  if (field) {
    field.label = field.label || userFiledNames?.label;
    field.value = field.value || userFiledNames?.value;
    return field;
  }
  return pick(userFiledNames, 'label', 'value');
};

export const getFiledNames = (FiledNames?: DataType, userFiledNames?: DataType) => {
  if (FiledNames) {
    forIn(BASE_FILED_NAMES, (value, key) => {
      if (key === 'userFiledNames') {
        FiledNames[key] = gerUserField(FiledNames[key], userFiledNames);
      } else if (!FiledNames[key]) {
        FiledNames[key] = value;
      }
    });
    return FiledNames as typeof BASE_FILED_NAMES;
  }
  return BASE_FILED_NAMES;
};
