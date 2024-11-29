/**
 * @file ChemxParser.ts
 * @description 化学反应动画文件(.chemx)的解析器，负责解析和验证文件格式
 * Parser for chemical reaction animation files (.chemx), responsible for parsing and validating file format
 */

import { Vector3 } from 'three';
import { ChemxFile, Keyframe, AtomState, BondState } from '../types/ChemxTypes';

export class ChemxParser {
  /**
   * 验证.chemx文件的数据结构是否符合规范
   * 检查必要的字段是否存在，数据类型是否正确
   * Validate if .chemx file structure meets the specification
   * Check if required fields exist and data types are correct
   * 
   * @param data 待验证的数据对象 Data object to be validated
   * @returns 验证结果 Validation result
   */
  private static validateChemxFile(data: any): boolean {
    // 验证基础属性：版本号、元数据、动画时长、关键帧数组
    // Validate basic properties: version, metadata, duration, keyframes array
    if (!data.version || !data.metadata || !data.duration || !Array.isArray(data.keyframes)) {
      return false;
    }

    // 验证每个关键帧的结��
    // Validate structure of each keyframe
    return data.keyframes.every((keyframe: any) => {
      return typeof keyframe.timestamp === 'number' &&
             Array.isArray(keyframe.atoms) &&
             Array.isArray(keyframe.bonds);
    });
  }

  /**
   * 解析三维向量数据，将JSON对象转换为Three.js的Vector3对象
   * Parse 3D vector data, convert JSON object to Three.js Vector3 object
   * 
   * @param data 包含x,y,z坐标的对象 Object containing x,y,z coordinates
   * @returns Vector3实例 Vector3 instance
   */
  private static parseVector3(data: any): Vector3 {
    return new Vector3(
      parseFloat(data.x) || 0,
      parseFloat(data.y) || 0,
      parseFloat(data.z) || 0
    );
  }

  /**
   * 解析.chemx文件内容，将JSON字符串转换为结构化的动画数据
   * Parse .chemx file content, convert JSON string to structured animation data
   * 
   * @param content .chemx文件的文本内容 Text content of .chemx file
   * @returns 解析后的动画数据对象 Parsed animation data object
   * @throws 当解析失败时抛出错误 Throws error when parsing fails
   */
  public static parse(content: string): ChemxFile {
    try {
      const data = JSON.parse(content);

      if (!this.validateChemxFile(data)) {
        throw new Error('Invalid .chemx file format');
      }

      const keyframes: Keyframe[] = data.keyframes.map((kf: any) => ({
        timestamp: kf.timestamp,
        atoms: Object.fromEntries(
          kf.atoms.map((atom: any) => [
            atom.id,
            {
              ...atom,
              position: this.parseVector3(atom.position)
            }
          ])
        ),
        bonds: kf.bonds
      }));

      return {
        version: data.version,
        metadata: data.metadata,
        duration: data.duration,
        keyframes
      };
    } catch (error) {
      throw new Error(`Failed to parse .chemx file: ${error.message}`);
    }
  }

  /**
   * 将动画数据序列化为.chemx文件格式的JSON字符串
   * Serialize animation data to JSON string in .chemx file format
   * 
   * @param data 动画数据对象 Animation data object
   * @returns 格式化的JSON字符串 Formatted JSON string
   */
  public static stringify(data: ChemxFile): string {
    return JSON.stringify(data, null, 2);
  }
} 