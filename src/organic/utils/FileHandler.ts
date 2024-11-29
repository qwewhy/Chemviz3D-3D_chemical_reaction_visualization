/**
 * @file FileHandler.ts
 * @description 处理.chemx文件的拖放和导出，增加了更强大的验证和错误处理
 */

import { ChemxParser } from '../parsers/ChemxParser';
import { ChemxFile } from '../types/ChemxTypes';

export class FileHandler {
  private dropZone: HTMLElement;
  private onFileLoaded?: (data: ChemxFile) => void;
  private onError?: (error: string) => void;

  constructor(dropZoneElement: HTMLElement) {
    this.dropZone = dropZoneElement;
  }

  /**
   * 设置文件加载回调
   */
  public setFileLoadedCallback(callback: (data: ChemxFile) => void) {
    this.onFileLoaded = callback;
  }

  /**
   * 设置错误处理回调
   */
  public setErrorCallback(callback: (error: string) => void) {
    this.onError = callback;
  }

  /**
   * 验证文件格式
   */
  private validateFile(file: File): boolean {
    // 检查文件扩展名
    if (!file.name.toLowerCase().endsWith('.chemx') && 
        !file.name.toLowerCase().endsWith('.json')) {
      throw new Error('请上传.chemx或.json格式的文件');
    }

    // 检查文件大小 (例如限制为10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('文件大小不能超过10MB');
    }

    return true;
  }

  /**
   * 处理文件拖放
   */
  public async handleFile(file: File): Promise<ChemxFile> {
    try {
      // 验证文件
      this.validateFile(file);

      // 读取文件内容
      const content = await this.readFile(file);
      
      // 尝试解析JSON
      let jsonData: any;
      try {
        jsonData = JSON.parse(content);
      } catch (e) {
        throw new Error('文件格式不正确，请确保是有效的JSON格式');
      }

      // 通过ChemxParser解析和验证数据结构
      const data = ChemxParser.parse(content);
      
      // 调用成功回调
      this.onFileLoaded?.(data);
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '文件处理失败';
      this.onError?.(errorMessage);
      throw error;
    }
  }

  /**
   * 读取文件内容
   */
  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          resolve(content);
        } else {
          reject(new Error('文件读取失败'));
        }
      };
      
      reader.onerror = () => reject(new Error('文件读取错误'));
      reader.readAsText(file);
    });
  }

  /**
   * 导出.chemx文件
   */
  public exportChemxFile(data: ChemxFile, filename: string) {
    try {
      const content = ChemxParser.stringify(data);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.chemx') ? filename : `${filename}.chemx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '文件导出失败';
      this.onError?.(errorMessage);
      throw error;
    }
  }
}