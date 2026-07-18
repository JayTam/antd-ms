import { useTablePopoverContext } from '@jaytam/antd-ms/components/MsTable/contexts/popover';
import { Tabs } from 'antd';
import { cloneDeep } from 'lodash-es';
import { useState } from 'react';
import MsModal from '../../components/MsModal';
import ModalSelectedInfo from './components/ModalSelectedInfo';
import OaEmail from './components/OaEmailTab';
import Organization from './components/OrganizationTab';
import UserList from './components/UserListTab';
import type { UserModalProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

type T = Record<string, any>;

const UserModal = MsModal.create((props: UserModalProps) => {
  const { userList, emailList, groupList, userModalTitle } = props;
  const modal = MsModal.useModal();

  const { popoverRef } = useTablePopoverContext();
  const { currentLocale } = useLocale('MsUser');

  const [selectRows, setSelectedRows] = useState<T[]>([]);

  const handleModalOk = () => {
    modal.resolve(selectRows);
    modal.close();
  };

  const changeSelectRows = (res: T[]) => {
    setSelectedRows([...cloneDeep(res)]);
  };

  const tabsItems = () => {
    const items = [
      {
        hideInTabs: !userList || userList?.length < 1,
        option: {
          label: currentLocale.users,
          key: '1',
          children: (
            <UserList
              {...props}
              list={userList}
              tabsId="1"
              selectRows={selectRows}
              changeSelectRows={changeSelectRows}
            />
          ),
        },
      },
      {
        hideInTabs: !emailList || emailList?.length < 1,
        option: {
          label: currentLocale.emailGroup,
          key: '2',
          children: (
            <OaEmail
              {...props}
              list={emailList}
              tabsId="2"
              selectRows={selectRows}
              changeSelectRows={changeSelectRows}
            />
          ),
        },
      },
      {
        hideInTabs: !groupList || groupList?.length < 1,
        option: {
          label: currentLocale.organization,
          key: '3',
          children: (
            <Organization
              {...props}
              list={groupList}
              tabsId="3"
              selectRows={selectRows}
              changeSelectRows={changeSelectRows}
            />
          ),
        },
      },
    ];

    return items.filter((item) => !item.hideInTabs).map((it) => it.option) ?? [];
  };
  return (
    <MsModal
      {...modal.props}
      zIndex={2000}
      width={900}
      className="user-modal"
      onOk={handleModalOk}
      title={userModalTitle}
      getContainer={() => popoverRef?.current ?? document.body}
    >
      <Tabs items={tabsItems()} />
      <ModalSelectedInfo selectRows={selectRows} changeSelectRows={changeSelectRows} />
    </MsModal>
  );
});

export default UserModal;
