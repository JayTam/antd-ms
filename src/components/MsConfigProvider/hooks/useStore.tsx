import LocalForage from 'localforage';
import { useMemo } from 'react';

export const DB_NAME = 'ms';

function useStore(nameSpace?: string) {
  const localforage = useMemo(
    () => LocalForage.createInstance({ name: DB_NAME, storeName: nameSpace }),
    [nameSpace],
  );

  return localforage;
}

export default useStore;
