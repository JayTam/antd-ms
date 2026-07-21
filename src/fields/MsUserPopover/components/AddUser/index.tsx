import { PlusOutlined } from '@ant-design/icons';
import { useUserPopover } from '../../contexts/userPopover';
import type { UserPopoverProps } from '../../types';
import FoldList from '../FoldList';
import { useLocale } from '@jaytam/antd-ms/locale';

type AddUserProps = UserPopoverProps & { changeOpen?: () => void };

const AddUser = (props: AddUserProps) => {
  const { optionalLimit, changeOpen } = props;

  const { selectedList = [] } = useUserPopover();
  const { globalLocale } = useLocale();

  // 判断是否显示添加按钮， 超过限制的个数，添加按钮不显示
  const showAddButton = optionalLimit && optionalLimit <= selectedList?.length ? false : true;

  return (
    <div className="extra-warp">
      <FoldList {...props}>
        <a
          style={{
            color: '#006EFF',
            marginRight: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          {globalLocale.all}
        </a>
      </FoldList>

      {showAddButton && (
        <a onClick={() => changeOpen?.()} style={{ whiteSpace: 'nowrap' }}>
          <PlusOutlined />
          <span style={{ margin: '0 4px', whiteSpace: 'nowrap' }}>{globalLocale.create}</span>
        </a>
      )}
    </div>
  );
};

export default AddUser;
