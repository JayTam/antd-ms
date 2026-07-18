import enhanceField from '../enhanceField';

/**
 * 空组件，用于占位
 * @param props 这个any类型很关键，有它MsField中的类型推导才不会报错
 * @returns
 */
const MsFieldEmpty = (props: any) => {
  return <></>;
};

export default enhanceField(MsFieldEmpty);
