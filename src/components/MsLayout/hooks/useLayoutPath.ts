import * as tmp from 'react-router';

const rc = tmp as any;

function useLayoutPath() {
  // react-router v5
  const history = rc.useHistory?.();
  // react-router v6
  const navigate = rc.useNavigate?.();

  // 使用react-router方式跳转链接
  const routeChangeLink = (url: string) => {
    if (history) {
      return history.push(url);
    }
    if (navigate) {
      return navigate(url);
    }
  };

  return { routeChangeLink };
}

export default useLayoutPath;
