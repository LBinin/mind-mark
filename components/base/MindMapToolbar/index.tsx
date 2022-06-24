import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Button, Checkbox, Divider, Dropdown, Menu, Space, Tooltip } from 'antd'

import {
  PicLeftOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  PicRightOutlined, SaveOutlined,
} from '@ant-design/icons'

import toolbarCommandsHandler from './commands'
import Iconfont from '../Iconfont'
import ScreenshotCaptureBtn from '../ScreenshotCaptureBtn'

import styles from './style.module.scss'
import EditorConfigContext from '../../../context/editor'
import { EditorConfig, EditorPosition } from '../../../const/editor'

export enum ConfigKey {
  EDITOR_POSITION_LEFT = 'editorPositionLeft',
  EDITOR_POSITION_RIGHT = 'editorPositionRight',
  EDITOR_POSITION_TOP = 'editorPositionTop',
  EDITOR_POSITION_BOTTOM = 'editorPositionBottom',
  LIVE_PREVIEW = 'livePreview'
}

const MindMapToolbar: React.FC<{
  saveTime?: Date;
  // onClick?: (key: ConfigKey) => void; // Menu Item Click handle
}> = props => {
  const { saveTime } = props

  const handlePreviewModeChange = (e: any) => {
    toolbarCommandsHandler(ConfigKey.LIVE_PREVIEW, e.target.checked)
  }

  return (<>
    <Space className={styles.mindMapToolbar}>
      <Tooltip title="[待实现] 使用 ctrl/cmd + s 保存预览（非实时预览模式）">
        <Checkbox
          disabled={true}
          checked={true}
          onChange={handlePreviewModeChange}
        >
          实时预览
        </Checkbox>
      </Tooltip>
      <Divider type="vertical" />
      <LastSaveTime time={saveTime} />
      {/* 编辑器布局 */}
      <EditorLayout />
      {/* 导出图片功能 */}
      <ScreenshotCaptureBtn />
    </Space>
  </>)
}

const LastSaveTime: React.FC<{
  time?: Date;
}> = props => {
  const { time } = props

  if (!time) {
    return null
  }

  return (
    <>
      <span className={styles.toolBarLastModifiedTime}>
        <SaveOutlined /> 上次保存时间：
          {String(time.getHours()).padStart(2, '0')}:
          {String(time.getMinutes()).padStart(2, '0')}:
          {String(time.getSeconds()).padStart(2, '0')}
      </span>
      <Divider type="vertical"/>
    </>
  )
}

const EditorLayout: React.FC = props => {
  const { position: editorPosition, handleSave } = useContext(EditorConfigContext)
  console.log({ editorPosition })

  const handlePositionChange = ({ key }: { key: any }) => {
    handleSave?.(EditorConfig.Position, key)
  }

  const menu = (
    <Menu
      onClick={handlePositionChange}
      items={[
        { label: "编辑器左移", key: EditorPosition.LEFT, icon: <PicLeftOutlined />, disabled: editorPosition === EditorPosition.LEFT },
        { label: "编辑器右移", key: EditorPosition.RIGHT, icon: <PicRightOutlined />, disabled: editorPosition === EditorPosition.RIGHT },
        { label: "编辑器下移", key: EditorPosition.BOTTOM, icon: <VerticalAlignBottomOutlined />, disabled: editorPosition === EditorPosition.BOTTOM },
        { label: "编辑器上移", key: EditorPosition.TOP, icon: <VerticalAlignTopOutlined />, disabled: editorPosition === EditorPosition.TOP },
      ]}
    />
  )

  return (
    <Dropdown overlay={menu} placement="bottom" arrow>
      <Button icon={<Iconfont type="icon-layout" />}>编辑器布局 {editorPosition} </Button>
    </Dropdown>
  )
}

export default observer(MindMapToolbar)
