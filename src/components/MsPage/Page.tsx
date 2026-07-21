import type { DefaultPostRes } from '../types';
import MsBasePage from './components/BasePage';
import type { MsPageProps } from './types';

function MsPage<P, R, D = DefaultPostRes<R>>(props: MsPageProps<P, R, D>) {
  return <MsBasePage<P, R, D> pageType="page" backButton {...props} />;
}

export default MsPage;
