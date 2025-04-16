'use client';

import { useEffect, useState } from 'react';
import { useTheme } from "next-themes"

// 避免SSR，确保组件只在客户端渲染
const MermaidWrapper = ({ code, containerId }: { code: string, containerId: string }) => {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>('');
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    const renderMermaid = async () => {
      try {
        // 动态导入mermaid库
        const mermaid = (await import('mermaid')).default;
        
        // 初始化配置
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'neutral',
          securityLevel: 'loose',
        });
        
        // 使用API方式渲染，避免直接操作DOM
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).substring(2)}`, 
          code
        );
        
        setSvg(svg);
        setIsRendered(true);
        
        // 渲染完成后，将SVG内容放入原始容器
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = svg;
        }
      } catch (error) {
        console.error('Mermaid渲染错误:', error);
      }
    };
    
    renderMermaid();
  }, [code, containerId, theme]);
  
  // 这个组件不再直接渲染SVG，而是通过副作用更新DOM
  return null;
};

// 全局Mermaid客户端组件
export const MermaidClient = () => {
  const [mermaidBlocks, setMermaidBlocks] = useState<{code: string, id: string}[]>([]);
  
  useEffect(() => {
    // 客户端执行，查找所有Mermaid块
    const mermaidElements = document.querySelectorAll('.mermaid');
		console.info(mermaidElements)
    
    // 收集所有图表代码和对应的容器ID
    const blocks = Array.from(mermaidElements).map((el, index) => {
      const code = decodeURIComponent(el.getAttribute('data-mermaid') || '');
      const id = `mermaid-container-${index}`;
      
      // 不隐藏原始元素，而是将其作为渲染容器
      el.id = id;
      
      return { code, id };
    }).filter(item => item.code); // 过滤空代码
    
    setMermaidBlocks(blocks);
  }, []);

  return (
    <>
      {mermaidBlocks.map(({ code, id }) => (
        <MermaidWrapper key={id} code={code} containerId={id} />
      ))}
    </>
  );
};