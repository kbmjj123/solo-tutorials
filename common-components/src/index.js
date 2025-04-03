import CornerLink from './CornerLink';
import ReactCornerLink from './ReactCornerLink';

// 检测环境
const isReactAvailable = typeof React !== 'undefined';

// 导出适合当前环境的组件
export default isReactAvailable ? ReactCornerLink : CornerLink;

// 同时导出两个版本，让用户可以明确选择
export { CornerLink, ReactCornerLink };