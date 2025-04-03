import React, { useEffect, useRef } from 'react';
import CornerLink from './CornerLink';

/**
 * React版本的CornerLink组件
 */
const ReactCornerLink = ({ url, text, styles, target, id }) => {
  const cornerLinkRef = useRef(null);
  
  useEffect(() => {
    // 组件挂载时创建CornerLink
    cornerLinkRef.current = CornerLink({
      url,
      text,
      styles,
      target,
      id
    });
    
    // 组件卸载时移除CornerLink
    return () => {
      if (cornerLinkRef.current) {
        cornerLinkRef.current.remove();
      }
    };
  }, []); // 仅在挂载和卸载时执行
  
  // 当props变化时更新CornerLink
  useEffect(() => {
    if (cornerLinkRef.current) {
      cornerLinkRef.current.update({
        url,
        text,
        styles,
        target
      });
    }
  }, [url, text, styles, target]);
  
  // React组件不渲染任何内容，因为链接是通过DOM操作添加的
  return null;
};

export default ReactCornerLink;