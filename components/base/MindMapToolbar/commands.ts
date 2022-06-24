import { ConfigKey } from './index'
import { configStore } from '../../../store'
import { EditorConfig, EditorPosition, PreviewMode } from '../../../const/editor'

export default function toolbarCommandsHandler(key: ConfigKey, value?: any) {
  switch (key as ConfigKey) {
    case ConfigKey.EDITOR_POSITION_RIGHT:
      moveEditorTo(EditorPosition.RIGHT)
      break
    case ConfigKey.EDITOR_POSITION_LEFT:
      moveEditorTo(EditorPosition.LEFT)
      break
    case ConfigKey.EDITOR_POSITION_TOP:
      moveEditorTo(EditorPosition.TOP)
      break
    case ConfigKey.EDITOR_POSITION_BOTTOM:
      moveEditorTo(EditorPosition.BOTTOM)
      break
    case ConfigKey.LIVE_PREVIEW:
      codeToMapLivePreview(value)
      break
    default:
      break
  }
}

function moveEditorTo(position: EditorPosition) {
  configStore.saveUserConfig(EditorConfig.Position, position)
}

function codeToMapLivePreview(live: boolean) {
  configStore.saveUserConfig(EditorConfig.PreviewMode, live ? PreviewMode.LIVE : PreviewMode.SAVE)
}
