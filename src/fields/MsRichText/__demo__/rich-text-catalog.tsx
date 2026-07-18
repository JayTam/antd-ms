/**
 * title: 渲染文档
 * description:
 */
import { MsField, MsRichText, setField } from '@jaytam/antd-ms';
import type { IDomEditor } from '@wangeditor/editor';
import './style.less';

setField('richText', MsRichText);

export default () => {
  const parseHeadings = (html: string, editor: IDomEditor) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const headings = Array.from(div.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const headers = editor.getElemsByTypePrefix('header');
    return headings.map((heading, index) => {
      return {
        level: parseInt(heading.tagName.charAt(1)),
        text: heading.textContent,
        id: `${headers[index]?.id}`,
      };
    });
  };

  // 渲染目录UI
  const renderToc = (tocList: any[], editor: IDomEditor) => {
    const tocContainer = document.getElementById('header-container');
    tocContainer!.innerHTML = ''; // 清空旧目录
    tocList.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-type', item?.level);
      listItem.textContent = item.text;
      listItem.onclick = (e) => {
        e.preventDefault();
        // 滚动到标题
        editor.scrollToElem(item.id);
      };
      tocContainer!.appendChild(listItem);
    });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div id="header-container" style={{ width: '200px' }} />
        <MsField
          valueType="richText"
          fieldProps={{
            onCreated: (editorInstance) => {
              if (editorInstance) {
                const tocList = parseHeadings(editorInstance.getHtml(), editorInstance);
                renderToc(tocList, editorInstance);
              }
            },
            editorChange: (editorInstance) => {
              console.log(editorInstance);
            },
            style: { flex: 1, border: 'none' },
            defaultValue:
              '<h1>标题</h1><h2 >标题A</h2><p>文本</p><p>文本</p><p>文本</p><h3 >标题A1</h3><p>文本</p><p>文本</p><p>文本</p><h3 >标题A2</h3><p>文本</p><p>文本</p><p>文本</p><h2 >标题B</h2><p>文本</p><p>文本</p><p>文本</p><h3 >标题B1</h3><p>文本</p><p>文本</p><p>文本</p><h3 >标题B2</h3><p>文本</p><p>文本</p><p>文本</p>',
            editorStyle: {
              height: '400px',
            },
            toolbar: false,
            readOnly: true,
          }}
        />
      </div>
    </>
  );
};
