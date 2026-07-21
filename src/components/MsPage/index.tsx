import Page from './Page';
import SubPage from './SubPage';
import type { MsPageActionType, MsPageProps } from './types';

type CompoundedComponent = typeof Page & { SubPage: typeof SubPage };

const MsPage = Page as CompoundedComponent;

MsPage.SubPage = SubPage;

export default MsPage;

export type { MsPageActionType, MsPageProps };
