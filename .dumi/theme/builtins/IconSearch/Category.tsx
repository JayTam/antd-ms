import * as React from 'react';
import { message } from 'antd';
import './style.less';
import CopyableIcon from './CopyableIcon';
import type { CategoriesEnumKeys } from './fields';
import type { ThemeType } from './IconSearch';

interface CategoryProps {
  title: CategoriesEnumKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const { icons, title, newIcons, theme } = props;
  const [justCopied, setJustCopied] = React.useState<string | null>(null);
  const copyId = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCopied = React.useCallback((type: string, text: string) => {
    message.success(
      <span>
        <code className="copiedCode">{text}</code> copied 🎉
      </span>,
    );
    setJustCopied(type);
    copyId.current = setTimeout(() => {
      setJustCopied(null);
    }, 2000);
  }, []);
  React.useEffect(
    () => () => {
      if (copyId.current) {
        clearTimeout(copyId.current);
      }
    },
    [],
  );
  return (
    <div>
      <div className="markdownH3">{title}</div>
      <ul className="anticonsList">
        {icons.map((name) => (
          <CopyableIcon
            key={name}
            name={name}
            theme={theme}
            isNew={newIcons.includes(name)}
            justCopied={justCopied}
            onCopied={onCopied}
          />
        ))}
      </ul>
    </div>
  );
};

export default Category;
