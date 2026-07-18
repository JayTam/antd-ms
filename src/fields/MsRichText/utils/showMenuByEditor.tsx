import type { IDomEditor } from '@wangeditor/editor';

/**
 * 显示隐藏富文本编辑器工具栏的key
 * @param editor 编辑器实例
 * @param menuKey 菜单的key
 * @param show 是否显示
 * @returns
 */
export const showToolbarMenu = async (editor: IDomEditor, menuKey: string, show = true) => {
  const container = await editor.getEditableContainer();

  if (editor == null) return;

  const richTextDom = await container?.parentElement?.parentElement;

  const screenButton = await richTextDom?.querySelector(`[data-menu-key=${menuKey}]`);

  const screenEle = await screenButton?.parentElement;

  if (screenEle) screenEle.style.display = show ? 'block' : 'none';
};
