import { useState, useCallback } from 'react';

/**
 * 历史记录管理钩子
 * History State Management Hook
 * 用于管理状态的历史记录，支持撤销操作
 * @template T 状态类型 / State type
 */
const useHistoryState = (initialState) => {
  // 当前状态 / Current state
  const [state, setState] = useState(initialState);
  // 历史记录 / History records
  const [history, setHistory] = useState([]);
  // 当前是否可以撤销 / Whether can undo
  const [canUndo, setCanUndo] = useState(false);

  /**
   * 更新状态
   * Update state
   * @param {T | ((prev: T) => T)} newState - 新状态或更新函数
   */
  const updateState = useCallback((newState) => {
    console.log('updateState called', { 
      currentState: state,
      newState: typeof newState === 'function' ? 'function' : newState,
      historyLength: history.length 
    });

    setState(prev => {
      const nextState = typeof newState === 'function' ? newState(prev) : newState;
      
      // 保存当前状态到历史记录
      setHistory(hist => {
        const newHistory = [...hist, prev];
        console.log('History updated', { 
          previousState: prev,
          newHistoryLength: newHistory.length 
        });
        return newHistory;
      });
      
      setCanUndo(true);
      return nextState;
    });
  }, [state, history]);

  /**
   * 撤销操作
   * Undo operation
   */
  const undo = useCallback(() => {
    console.log('undo called', { historyLength: history.length });
    
    if (history.length === 0) {
      console.log('No history to undo');
      return;
    }

    setHistory(hist => {
      const newHistory = [...hist];
      const previousState = newHistory.pop();
      console.log('Restoring previous state', { 
        previousState,
        newHistoryLength: newHistory.length 
      });
      
      setState(previousState);
      setCanUndo(newHistory.length > 0);
      return newHistory;
    });
  }, [history]);

  return [state, updateState, undo, canUndo];
};

export default useHistoryState; 