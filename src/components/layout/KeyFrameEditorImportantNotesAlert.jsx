/**
 * @file KeyFrameEditorImportantNotesAlert.jsx
 * @author [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const KeyFrameEditorImportantNotesAlert = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  // 读取是否显示重要提示信息 / Read whether to show important notes
  useEffect(() => {
    const shouldShow = localStorage.getItem('showImportantNotes');
    if (shouldShow === 'false') {
      setIsVisible(false);
    }
  }, []);

  // 处理关闭提示信息 / Handle closing the prompt 
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('showImportantNotes', 'false');
  };

  // 如果不可见，返回null
  if (!isVisible) {
    return (
      <div className="absolute top-16 right-4 z-10">
        <button
          onClick={() => {
            setIsVisible(true);
            localStorage.setItem('showImportantNotes', 'true');
          }}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        >
          ⚠️
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-10 right-2 z-10 w-128">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm p-4">
        <div className="flex items-start space-x-2">
          <span className="text-xl text-yellow-600 mt-0.5">⚠️</span>
          <div className="flex-1">
            <div className="flex items-center justify-between w-128">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-left flex-1"
              >
                <span className="font-medium text-yellow-800">{t('keyframeEditor.importantNotes.title')}</span>
                <span className="text-yellow-600 text-lg ml-2">
                  {isExpanded ? '▼' : '▶'}
                </span>
              </button>
              <button
                onClick={handleClose}
                className="text-yellow-600 hover:text-yellow-800 ml-2 p-1"
                title="关闭提示"
              >
                ✕
              </button>
            </div>
            
            {isExpanded && (
              <div className="mt-2 text-yellow-700 space-y-2">
                <p className="flex items-start">
                  <span className="font-medium mr-2">1.</span>
                  <span>{t('keyframeEditor.importantNotes.note1')}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">2.</span>
                  <span>{t('keyframeEditor.importantNotes.note2')}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">3.</span>
                  <span>{t('keyframeEditor.importantNotes.note3')}</span>
                </p>
                <p className="flex items-start">
                  <span className="font-medium mr-2">4.</span>
                  <span>{t('keyframeEditor.importantNotes.note4')}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFrameEditorImportantNotesAlert;