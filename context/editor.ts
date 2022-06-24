import React from 'react'
import { EditorConfig, EditorPosition, PreviewMode } from '../const/editor'

export interface IEditorConfigContext {
  // 编辑器宽度
  width?: number;
  // 编辑器高度
  height?: number;
  // 预览模式
  previewMode?: PreviewMode;
  // 布局位置
  position?: EditorPosition;
  // 保存配置
  handleSave?(type: EditorConfig, value: any): void;
}

const EditorConfigContext = React.createContext<IEditorConfigContext>({})

export default EditorConfigContext
