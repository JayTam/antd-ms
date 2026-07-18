import type { IButtonMenu } from '@wangeditor/editor';
import { showToolbarMenu } from './showMenuByEditor';
import type { LocaleType } from '@jaytam/antd-ms/locale';

const fullScreen = (props?: { locale?: LocaleType }): IButtonMenu => {
  return {
    title: props?.locale?.global?.fullscreen || '',
    tag: 'button',
    alwaysEnable: true,
    iconSvg: `<svg t="1698829532736" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5533" width="200" height="200"><path d="M1024 0.031999l0 383.988-138.267679-138.267679-211.993375 211.993375-107.484641-107.484641 211.993375-211.993375-138.267679-138.267679zM245.75232 138.299678l211.993375 211.993375-107.484641 107.484641-211.993375-211.993375-138.267679 138.267679 0-383.988 383.988 0zM885.732321 778.279679l138.267679-138.267679 0 383.988-383.988 0 138.267679-138.267679-211.993375-211.993375 107.484641-107.484641zM457.745695 673.738946l-211.993375 211.993375 138.267679 138.267679-383.988 0 0-383.988 138.267679 138.267679 211.993375-211.993375z" fill="#444444" p-id="5534"></path></svg>`,
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(): string | boolean {
      return '';
    },

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(): boolean {
      return false;
    },

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(): boolean {
      return false;
    },

    // 点击菜单时触发的函数
    exec(editor) {
      // 编辑区域
      const container = editor.getEditableContainer();
      if (!container) return;

      // 整个富文本
      const editorDom = container?.parentElement?.parentElement;
      try {
        editorDom?.requestFullscreen();
      } catch (err) {
        console.log('fullscreen failed', err);
      }
      showToolbarMenu(editor, 'ms-full-screen', false);
      showToolbarMenu(editor, 'ms-reduce-screen', true);
    },
  };
};
const reduceScreen = (props?: { locale?: LocaleType }): IButtonMenu => {
  return {
    title: props?.locale?.MsRichText?.exitFullscreen || '',
    tag: 'button',
    alwaysEnable: true,
    iconSvg: `<svg t="1698837354434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5644" width="200" height="200"><path d="M304.4416 806.976l-149.9328 149.5616L64 866.0288l149.5936-146.2912H112.4416V588.8h320v316.5376h-128v-98.368z m0-593.408V111.7312h128v320h-320v-128h101.152L64 154.5088 154.5088 64 304.448 213.568zM716.8 808.1792v98.0608H595.2V588.8h313.6v131.8464h-98.9376L960 866.9376 869.4912 957.44 716.8 808.1856z m0-594.9248L869.4912 64 960 154.5088l-150.1376 150.1376H908.8v128H595.2v-320h121.6v100.6144z" fill="#4A4A4A" p-id="5645"></path></svg>`,
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(): string | boolean {
      return '';
    },

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(): boolean {
      return false;
    },

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(): boolean {
      return false;
    },

    // 点击菜单时触发的函数
    async exec(editor) {
      try {
        // 退出全屏
        await document?.exitFullscreen?.();
      } catch (err) {
        console.log('exit fullscreen failed', err);
      }
      showToolbarMenu(editor, 'ms-full-screen', true);
      showToolbarMenu(editor, 'ms-reduce-screen', false);
    },
  };
};
export { fullScreen, reduceScreen };
