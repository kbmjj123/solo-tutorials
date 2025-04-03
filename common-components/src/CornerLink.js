// 默认样式
const defaultStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 15px',
  backgroundColor: '#3498db',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

// 悬停样式
const hoverStyles = {
  backgroundColor: '#2980b9',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  transform: 'translateY(-2px)'
};

/**
 * CornerLink - 在页面右下角添加一个可配置的链接
 * 
 * @param {Object} options - 配置选项
 * @param {string} options.url - 链接地址
 * @param {string} options.text - 链接文本
 * @param {Object} options.styles - 自定义样式
 * @param {string} options.target - 链接目标，默认为'_blank'
 * @param {string} options.id - 元素ID，默认为'corner-link'
 * @returns {Object} 包含remove方法的对象
 */
function CornerLink(options = {}) {
  // 默认配置
  const config = {
    url: options.url || 'https://example.com',
    text: options.text || '访问链接',
    styles: { ...defaultStyles, ...(options.styles || {}) },
    target: options.target || '_blank',
    id: options.id || 'corner-link'
  };

  // 检查是否已存在
  let existingLink = document.getElementById(config.id);
  if (existingLink) {
    document.body.removeChild(existingLink);
  }

  // 创建链接元素
  const link = document.createElement('a');
  link.id = config.id;
  link.href = config.url;
  link.textContent = config.text;
  link.target = config.target;
  link.rel = 'noopener noreferrer';
  
  // 应用样式
  Object.assign(link.style, config.styles);
  
  // 添加悬停效果
  link.addEventListener('mouseenter', () => {
    Object.assign(link.style, hoverStyles);
  });
  
  link.addEventListener('mouseleave', () => {
    Object.assign(link.style, config.styles);
  });
  
  // 添加到DOM
  document.body.appendChild(link);
  
  // 返回控制对象
  return {
    // 移除链接的方法
    remove: () => {
      const linkElement = document.getElementById(config.id);
      if (linkElement) {
        document.body.removeChild(linkElement);
      }
    },
    // 更新链接的方法
    update: (newOptions = {}) => {
      const linkElement = document.getElementById(config.id);
      if (linkElement) {
        if (newOptions.url) linkElement.href = newOptions.url;
        if (newOptions.text) linkElement.textContent = newOptions.text;
        if (newOptions.target) linkElement.target = newOptions.target;
        if (newOptions.styles) {
          Object.assign(linkElement.style, { ...config.styles, ...newOptions.styles });
          config.styles = { ...config.styles, ...newOptions.styles };
        }
      }
    }
  };
}

export default CornerLink;