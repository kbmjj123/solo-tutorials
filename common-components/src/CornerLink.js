// 默认样式
const defaultStyles = {
  padding: '10px 15px',
  backgroundColor: '#3498db',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  marginLeft: '10px' // 添加按钮间距
};

// 悬停样式
const hoverStyles = {
  backgroundColor: '#2980b9',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  transform: 'translateY(-2px)'
};

// 容器样式
const containerStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
	gap: '12px',
  zIndex: 1000
};

// 多语言文本映射
const textMap = {
  'view-source': {
    'zh-CN': '查看源码',
    'en-US': 'View Source',
    'default': 'View Source'
  },
  'built-by-solo': {
    'zh-CN': '由SoloMakerStudio构建',
    'en-US': 'Built by SoloMakerStudio',
    'default': 'Built by SoloMakerStudio'
  }
};

// 全局容器元素
let container = null;

/**
 * CornerLink - 在页面右下角添加一个可配置的链接
 * 
 * @param {Object} options - 配置选项
 * @param {string} options.url - 链接地址
 * @param {string} options.type - 链接类型，可选值：'view-source' | 'built-by-solo'
 * @param {Object} options.styles - 自定义样式
 * @param {string} options.target - 链接目标，默认为'_blank'
 * @param {string} options.id - 元素ID，默认为'corner-link'
 * @returns {Object} 包含remove方法的对象
 */
function CornerLink(options = {}) {
  // 获取浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  const lang = browserLang.startsWith('zh') ? 'zh-CN' : 'en-US';

  // 默认配置
  const config = {
    url: options.url || 'https://example.com',
    type: options.type || 'view-source',
    styles: { ...defaultStyles, ...(options.styles || {}) },
    target: options.target || '_blank',
    id: options.id || 'corner-link'
  };

  // 获取对应语言的文本
  const getText = (type) => {
    return textMap[type]?.[lang] || textMap[type]?.default || textMap['view-source'].default;
  };

  // 创建或获取容器
  if (!container) {
    container = document.createElement('div');
    container.id = 'corner-links-container';
    Object.assign(container.style, containerStyles);
    document.body.appendChild(container);
  }

  // 检查是否已存在
  let existingLink = document.getElementById(config.id);
  if (existingLink) {
    container.removeChild(existingLink);
  }

  // 创建链接元素
  const link = document.createElement('a');
  link.id = config.id;
  link.href = config.url;
  link.textContent = getText(config.type);
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
  
  // 添加到容器
  container.appendChild(link);
  
  // 返回控制对象
  return {
    // 移除链接的方法
    remove: () => {
      const linkElement = document.getElementById(config.id);
      if (linkElement) {
        container.removeChild(linkElement);
        // 如果容器为空，则移除容器
        if (container.children.length === 0) {
          document.body.removeChild(container);
          container = null;
        }
      }
    },
    // 更新链接的方法
    update: (newOptions = {}) => {
      const linkElement = document.getElementById(config.id);
      if (linkElement) {
        if (newOptions.url) linkElement.href = newOptions.url;
        if (newOptions.type) {
          config.type = newOptions.type;
          linkElement.textContent = getText(newOptions.type);
        }
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