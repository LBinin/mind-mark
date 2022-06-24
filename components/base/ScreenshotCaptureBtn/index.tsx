import React, { useState } from 'react'
import { Button } from 'antd'
import ScreenshotCaptureModal from '../ScreenshotCaptureModal'
import Iconfont from '../Iconfont'

const ScreenshotCaptureBtn: React.FC = props => {

  const [screenshotModalVisible, setScreenshotModalVisible] = useState<boolean>(false)

  return (<>
    <Button
      className="mind-note-screenshot-capture-btn"
      onClick={() => setScreenshotModalVisible(true)}
      type="primary"
      icon={<Iconfont type="icon-xiangji-white" />}
    >
      导出图片
    </Button>

    <ScreenshotCaptureModal
      visible={screenshotModalVisible}
      onCancel={() => setScreenshotModalVisible(v => !v)}
    />
  </>)
}

export default ScreenshotCaptureBtn
