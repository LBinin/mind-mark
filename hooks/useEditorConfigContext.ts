import { IEditorConfigContext } from '../context/editor'
import { useEffect, useState } from 'react'
import { EditorConfig, EditorPosition, PreviewMode } from '../const/editor'

const useEditorConfigContext = (): IEditorConfigContext => {
  const [width, setWidth] = useState<number>(250)
  const [height, setHeight] = useState<number>(0)
  const [position, setPosition] = useState<EditorPosition>(EditorPosition.LEFT)
  const [previewMode, setPreviewMode] = useState<PreviewMode>(PreviewMode.LIVE)

  // 从 store 拿
  useEffect(() => {
    const storeEditorHeight = localStorage.getItem(EditorConfig.EditorHeight)
    const storeEditorWidth = localStorage.getItem(EditorConfig.EditorWidth)
    const storePosition = localStorage.getItem(EditorConfig.Position)
    const storePreviewMode = localStorage.getItem(EditorConfig.PreviewMode)

    storeEditorHeight && setHeight(Number(storeEditorHeight))
    storeEditorWidth && setWidth(Number(storeEditorWidth))
    storePosition && setPosition(storePosition as EditorPosition)
    storePreviewMode && setPreviewMode(storePreviewMode as PreviewMode)
  }, [])

  const handleSave = (type: EditorConfig, value: any) => {
    localStorage.setItem(type, value)

    switch (type) {
      case EditorConfig.EditorHeight:
        setHeight(value)
        break
      case EditorConfig.EditorWidth:
        setWidth(value)
        break
      case EditorConfig.Position:
        setPosition(value)
        break
      case EditorConfig.PreviewMode:
        setPreviewMode(value)
        break
      default:
        break
    }
  }

  return {
    width,
    height,
    position,
    previewMode,
    handleSave,
  }
}

export default useEditorConfigContext
