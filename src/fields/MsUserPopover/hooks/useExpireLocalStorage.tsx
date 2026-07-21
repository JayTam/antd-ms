import { useLocalStorageState } from 'ahooks';
import type { DataType, UserPopoverProps } from '../types';

type ContactsType = {
  expiry?: number;
  value?: DataType[];
};

/**
 *
 * @param key 存储在localStorage的key值
 * @param defaultValue 默认值
 * @param time 过期时间，单位是ms
 * @returns
 */
const useExpireLocalStorageState = (
  key: string,
  options: any,
  time: UserPopoverProps['frequentContactsExpired'],
) => {
  const [state, setState] = useLocalStorageState<ContactsType>(key, options);

  const getContacts = () => {
    let contacts: DataType[] = [];
    if (state?.expiry && Date.now() > state?.expiry) {
      localStorage.removeItem(key);
    } else {
      contacts = state?.value || [];
    }

    return contacts || [];
  };

  const setWithExpiry = (newValue: DataType[]) => {
    const now = new Date();
    const item = {
      value: newValue,
      expiry: time === 'infinite' ? undefined : now.getTime() + (time || 7 * 24 * 60 * 60 * 1000), // 设置新的过期时间
    };
    setState(item);
  };

  return {
    frequentContacts: getContacts(),
    setFrequentContacts: setWithExpiry,
    getContacts,
  };
};

export default useExpireLocalStorageState;
