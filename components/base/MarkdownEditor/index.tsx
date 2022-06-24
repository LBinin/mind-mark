import { Editor } from '@toast-ui/react-editor'
import classNames from 'classnames'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { configStore } from '../../../store'
import { debounce } from 'lodash'
import { DragSizing } from 'react-drag-sizing'
import { SPACING_BETWEEN} from '../../../const'

import styles from './style.module.scss'
import '@toast-ui/editor/dist/toastui-editor.css'
import { EditorConfig, EditorIntroContent, EditorPosition } from '../../../const/editor'
import EditorConfigContext from '../../../context/editor'

enum EditorDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * 获取编辑器高度（获取 LocalStorage 数据或合适高度）
 */
const getEditorHeight = (editorDirection: EditorDirection) => {
  // 20: 上下 margin
  const localSavedHeight = Number(configStore.getUserConfigByKey(EditorConfig.EditorHeight))
  const documentHeight = document.body.clientHeight

  if (localSavedHeight && editorDirection === EditorDirection.VERTICAL) {
    // 考虑到体验，留出一点空白（一般也不会有人这么做）
    return Math.min(localSavedHeight, documentHeight - 200)
  }

  return editorDirection === EditorDirection.HORIZONTAL
    ? '100%' // documentHeight - SPACING_BETWEEN * 2
    : documentHeight * 0.3
}

/**
 * 获取编辑器宽度（获取 LocalStorage 数据或合适宽度）
 */
const getEditorWidth = (editorDirection: EditorDirection) => {
  // 20: 上下 margin
  const localSavedWidth = Number(configStore.getUserConfigByKey(EditorConfig.EditorWidth))
  const documentWidth = document.body.clientWidth

  if (localSavedWidth && editorDirection === EditorDirection.HORIZONTAL) {
    // 考虑到体验，留出一点空白（一般也不会有人这么做）
    return Math.min(localSavedWidth, documentWidth - 200)
  }

  console.log({ editorDirection })

  return editorDirection === EditorDirection.HORIZONTAL
    ? documentWidth * 0.3
    : '100%' // documentWidth - SPACING_BETWEEN * 2
}

const MarkdownEditor: React.FC<{
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  onSave?: (saveTime: Date) => void;
  saveDebounce?: number; // 保存 Markdown 时间间隔（单位 s，默认 3s）
}> = props => {
  // 编辑器实例
  const editorRef = useRef<Editor>(null)

  const { defaultValue, onChange, onSave, saveDebounce = 3 } = props

  // 当前编辑器位于何处（上下左右）
  // const editorPosition = configStore.editorPosition.get()
  const { position: editorPosition } = useContext(EditorConfigContext)

  // 当前编辑器置放方式（水平、竖直）
  const editorDirection = useMemo<EditorDirection>(() => {
    switch (editorPosition) {
      case EditorPosition.TOP:
      case EditorPosition.BOTTOM:
        return EditorDirection.VERTICAL
      case EditorPosition.RIGHT:
      case EditorPosition.LEFT:
      default:
        return EditorDirection.HORIZONTAL
    }
  }, [editorPosition])

  // 当前拖拽器所处方位
  const dragHandlePosition = useMemo(() => {
    switch (editorPosition) {
      case EditorPosition.BOTTOM:
        return 'top'
      case EditorPosition.RIGHT:
        return 'left'
      case EditorPosition.TOP:
        return 'bottom'
      case EditorPosition.LEFT:
      default:
        return 'right'
    }
  }, [editorPosition])

  const saveCodeToStorage = useCallback(debounce((code: string, cb?: (saveTime: Date) => void) => {
    configStore.saveUserConfig(EditorConfig.MarkdownCode, code)
    cb && cb(new Date())
  }, saveDebounce * 1000), [saveDebounce])

  // 初始化高度
  const [height, setHeight] = useState<number | string>(() => {
    return getEditorHeight(editorDirection)
  })

  // 初始化宽度
  const [width, setWidth] = useState<number | string>(() => {
    return getEditorWidth(editorDirection)
  })

  /**
   * 更换位置后，设置 Editor 尺寸
   */
  useEffect(() => {
    console.log({ editorDirection })
    setHeight(getEditorHeight(editorDirection))
    setWidth(getEditorWidth(editorDirection))
  }, [editorDirection])

  useEffect(() => {
    if (!editorRef.current || !defaultValue) {
      return
    }

    const editor = editorRef.current.getInstance()
    if (!editor.getMarkdown()) {
      editor.setMarkdown(defaultValue, true)
    }
  }, [defaultValue])

  /**
   * 相应 Markdown 内容变化
   */
  const handleEditorContentChange = (editorType: string) => {
    if (editorType === 'markdown' && editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown()
      saveCodeToStorage(content, onSave)
      onChange && onChange(content)
    }
  }

  const handleEditorContentLoad = () => {
    const content = editorRef.current?.getInstance().getMarkdown()
    onChange?.(content)
  }

  /**
   * 储存 Editor 尺寸信息到本地
   */
  const handleDragHandlerDragEnd = () => {
    if (!editorRef.current) {
      return
    }

    if (editorDirection === EditorDirection.VERTICAL) {
      configStore.saveUserConfig(EditorConfig.EditorHeight, editorRef.current.getRootElement().clientHeight + '')
    }

    if (editorDirection === EditorDirection.HORIZONTAL) {
      configStore.saveUserConfig(EditorConfig.EditorWidth, editorRef.current.getRootElement().clientWidth + '')
    }
  }

  // 拖拽杆 icon
  const editorDragHandlerClassString = classNames(
    'markdown-editor-drag-sizing',
    'iconfont',
    {
      'icon-tuozhuai': editorPosition === EditorPosition.LEFT || editorPosition === EditorPosition.RIGHT,
      'icon-tuozhuai-horizontal': editorPosition === EditorPosition.BOTTOM || editorPosition === EditorPosition.TOP,
    },
  )

  return (
    // @ts-ignore
    <DragSizing
      border={dragHandlePosition}
      className={styles.markdownEditor}
      handlerClassName={editorDragHandlerClassString}
      handlerOffset={-SPACING_BETWEEN}
      handlerWidth={SPACING_BETWEEN + 1}
      onEnd={handleDragHandlerDragEnd}
      style={{ minHeight: 100, minWidth: 150, width, height }}
    >
      <Editor
        placeholder="在这写下笔记，看看旁边预览的效果吧"
        initialValue={EditorIntroContent}
        ref={editorRef}
        previewStyle="tab"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        usageStatistics={false}
        hideModeSwitch={true}
        onChange={handleEditorContentChange}
        onLoad={handleEditorContentLoad}
      />
    </DragSizing>
  )
}

export default MarkdownEditor
