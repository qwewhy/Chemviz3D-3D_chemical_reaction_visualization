import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Axes = ({ size = 2 }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {

      // 清除之前的内容,在每次重新渲染坐标轴组件时，清除掉所有已存在的3D对象，避免重复叠加。
      while(groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }

      // 创建箭头 - 箭头大小为轴长的2%
      const arrowSize = size * 0.01;
      const arrowGeometry = new THREE.ConeGeometry(arrowSize, arrowSize * 2, 8);

      // 创建材质 - 使用半透明的颜色
      const xMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff0000, // 红色 - X轴
        transparent: true,
        opacity: 0.7
      });
      const yMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, // 绿色 - Y轴
        transparent: true,
        opacity: 0.7
      });
      const zMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0000ff, // 蓝色 - Z轴
        transparent: true,
        opacity: 0.7
      });

      // 创建箭头网格
      const xArrow = new THREE.Mesh(arrowGeometry, xMaterial);
      const yArrow = new THREE.Mesh(arrowGeometry, yMaterial);
      const zArrow = new THREE.Mesh(arrowGeometry, zMaterial);

      // 设置箭头位置 - 放置在轴的末端
      xArrow.position.set(size, 0, 0);
      yArrow.position.set(0, size, 0);
      zArrow.position.set(0, 0, size);

      // 设置箭头旋转 - 使箭头指向正确方向
      xArrow.rotation.z = -Math.PI / 2;
      zArrow.rotation.x = Math.PI / 2;

            // 创建轴线（正方向）
            const createLine = (start, end, color) => {
                const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ 
                  color, 
                  transparent: true, 
                  opacity: 0.7 
                });
                return new THREE.Line(geometry, material);
              };
        
              // 创建虚线（负方向）
              const createDashedLine = (start, end, color) => {
                const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineDashedMaterial({ 
                  color, 
                  transparent: true, 
                  opacity: 0.7,
                  dashSize: 0.2,
                  gapSize: 0.2
                });
                const line = new THREE.Line(geometry, material);
                line.computeLineDistances();
                return line;
              };
        
              // 创建轴标签
              const createLabel = (text, position, color) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 64;
                canvas.height = 64;
        
                context.fillStyle = color;
                context.font = 'bold 48px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(text, 32, 32);
        
                const texture = new THREE.CanvasTexture(canvas);
                const spriteMaterial = new THREE.SpriteMaterial({ 
                  map: texture,
                  transparent: true
                });
                const sprite = new THREE.Sprite(spriteMaterial);
                sprite.position.set(...position);
                sprite.scale.set(0.3, 0.3, 0.3);
                return sprite;
              };
        
              // 添加正向轴线
              const xLine = createLine([0, 0, 0], [size, 0, 0], 0xff0000);
              const yLine = createLine([0, 0, 0], [0, size, 0], 0x00ff00);
              const zLine = createLine([0, 0, 0], [0, 0, size], 0x0000ff);
        
              // 添加负向虚线
              const xNegLine = createDashedLine([0, 0, 0], [-size, 0, 0], 0xff0000);
              const yNegLine = createDashedLine([0, 0, 0], [0, -size, 0], 0x00ff00);
              const zNegLine = createDashedLine([0, 0, 0], [0, 0, -size], 0x0000ff);
        
              // 创建轴标签
              const xLabel = createLabel('X', [size + 0.2, 0, 0], '#ff0000');
              const yLabel = createLabel('Y', [0, size + 0.2, 0], '#00ff00');
              const zLabel = createLabel('Z', [0, 0, size + 0.2], '#0000ff');
        
              // 将所有元素添加到组中
              groupRef.current.add(xLine, yLine, zLine);
              groupRef.current.add(xNegLine, yNegLine, zNegLine);
              groupRef.current.add(xArrow, yArrow, zArrow);
              groupRef.current.add(xLabel, yLabel, zLabel);

      // 清理函数
      return () => {
        // 清除所有网格和材质
        groupRef.current.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
        while(groupRef.current.children.length > 0) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
      };
    }
  }, [size]);

  return <group ref={groupRef} />;
};

export default Axes;