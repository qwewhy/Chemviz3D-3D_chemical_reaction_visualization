/**
 * @file Panel.jsx
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the Panel component, providing a generic panel container.
 */

// Panel组件：通用面板容器
// Panel component: Generic panel container
const Panel = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Panel; 