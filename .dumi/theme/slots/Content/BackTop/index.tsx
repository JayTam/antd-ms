import { useEffect, useRef, type FC, type ReactNode } from 'react';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './index.less';

const BackTop = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleScroll() {
      // 当滚动距离 > 视口高度时显示按钮
      const shouldShow = window.scrollY > window.innerHeight;
      if (ref.current) {
        ref.current.style.display = shouldShow ? 'block' : 'none';
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      ref={ref}
      className="back-top"
      size="large"
      icon={<VerticalAlignTopOutlined />}
      shape="circle"
      style={{ display: 'none' }}
      onClick={() => {
        document.getElementById('root')?.scrollIntoView({
          behavior: 'smooth', // 平滑滚动
          block: 'start', // 对齐到视口顶部
        });
      }}
    />
  );
};

export default BackTop;
