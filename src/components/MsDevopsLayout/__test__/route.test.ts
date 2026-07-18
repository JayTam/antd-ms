import { matchPath } from '../router';

describe('测试react-router matchPath 引入', () => {
  it('测试matchPath正常运行', async () => {
    const path = matchPath('/businessMonitor/edit/:id', '/businessMonitor/edit/23123123');
    expect(path).not.toBeNull();
  });
});
