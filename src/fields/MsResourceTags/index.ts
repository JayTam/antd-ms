import CreateFormListField from './components/CreateFormListField';
import {
  mergeResourceRequest,
  mergeResourceRequestList,
  mergeResourceRequestMatrix,
} from './utils';

type CompoundedComponent = {
  mergeResourceRequest: typeof mergeResourceRequest;
  mergeResourceRequestList: typeof mergeResourceRequestList;
  mergeResourceRequestMatrix: typeof mergeResourceRequestMatrix;
  CreateFormListField: typeof CreateFormListField;
};

const MsResourceTags = {} as CompoundedComponent;

MsResourceTags.mergeResourceRequest = mergeResourceRequest;
MsResourceTags.mergeResourceRequestList = mergeResourceRequestList;
MsResourceTags.mergeResourceRequestMatrix = mergeResourceRequestMatrix;
MsResourceTags.CreateFormListField = CreateFormListField;

export type { MsResourceTagsProps, ResourceType } from './types';

export default MsResourceTags;
