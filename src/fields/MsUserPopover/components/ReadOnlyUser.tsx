import { isEmpty } from 'lodash-es';
import { useUserPopover } from '../contexts/userPopover';
import type { UserPopoverProps } from '../types';
import FoldList from './FoldList';
import UserShow from './UserShow';

const ReadOnlyUser = (props: UserPopoverProps) => {
  const { showInOneLine, style, fontSize } = props;

  const { foldList = [], selectedList } = useUserPopover();

  if (!selectedList || selectedList.length <= 0) {
    return '-';
  }

  return (
    <div
      className={`user-popover ${showInOneLine ? 'one-line' : ''}`}
      style={{ ...style, fontSize: fontSize }}
    >
      <UserShow {...props} readonly={true} />
      {foldList && !isEmpty(foldList) && (
        <div className="extra-warp">
          <FoldList {...props} readOnly={true}>
            <a
              style={{
                color: '#2695f1',
                marginRight: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              全部
            </a>
          </FoldList>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyUser;
