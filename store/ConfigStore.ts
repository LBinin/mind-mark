import { action, observable } from 'mobx'
import { EditorConfig, EditorPosition, PreviewMode } from '../const/editor'

export class ConfigStore {
  previewMode = observable.box(this.getUserConfigByKey<PreviewMode>(EditorConfig.PreviewMode) || PreviewMode.LIVE)
  editorPosition = observable.box(this.getUserConfigByKey<EditorPosition>(EditorConfig.Position) || EditorPosition.LEFT)

  @action.bound
  saveUserConfig(key: EditorConfig, value: string) {
    console.log({ key, value }, this.editorPosition)

    switch (key) {
      case EditorConfig.PreviewMode:
        this.previewMode.set(value as PreviewMode)
        break
      case EditorConfig.Position:
        this.editorPosition.set(value as EditorPosition)
        break
      default:
        break
    }

    localStorage.setItem(key, value)
  }

  getUserConfigByKey<T extends string>(key: string): T | null {
    if (typeof localStorage === 'undefined') { return null }
    return localStorage.getItem(key) as T | null
  }
}
