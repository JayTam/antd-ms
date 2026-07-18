import MsBasePage from './components/BasePage';

import type { DefaultPostRes } from '../types';
import type { MsPageProps } from './types';

const MsSubPage = <P, R, D = DefaultPostRes<R>>(props: MsPageProps<P, R, D>) => {
  const { titleType = 'gradient', ...restProps } = props;

  return (
    <MsBasePage
      pageType="subPage"
      backButton={false}
      noCard={true}
      titleType={titleType}
      {...restProps}
    />
  );
};

export default MsSubPage;
