import { useRef } from 'react';
import type { MsFormProps } from '../../../types';
import { MsFormContext } from '../../../contexts/form';
import { forOwn } from 'lodash-es';

type CollapseRegisterType = Record<
  string,
  { collapse: boolean; setCollapse: React.Dispatch<React.SetStateAction<boolean>> }
>;

function MsFormProvider<D, P, R>(props: MsFormProps<D, P, R>) {
  const { rowProps = { gutter: 32 }, valuesNormal, children, getPopupContainer } = props;

  const collapseRegisterRef = useRef<CollapseRegisterType>({});

  return (
    <MsFormContext.Provider
      value={{
        openAllCollapse() {
          if (collapseRegisterRef.current) {
            forOwn(collapseRegisterRef.current, (item) => {
              item.setCollapse(false);
            });
          }
        },
        closeAllCollapse() {
          if (collapseRegisterRef.current) {
            forOwn(collapseRegisterRef.current, (item) => {
              item.setCollapse(true);
            });
          }
        },
        registCollapse: (key, collapse, setCollapse) => {
          if (collapseRegisterRef.current) {
            collapseRegisterRef.current[key] = { collapse, setCollapse };
          }
        },
        rowProps,
        valuesNormal,
        getPopupContainer,
      }}
    >
      {children}
    </MsFormContext.Provider>
  );
}

export default MsFormProvider;
