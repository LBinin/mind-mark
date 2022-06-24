import React, {useState} from "react";
import html2canvas from "html2canvas";
import {Modal, message, Divider} from "antd";
import Iconfont from '../Iconfont'
import ScreenshotCaptureForm, { ScreenshotCaptureFormOptions } from '../ScreenshotCaptureForm'

const ScreenshotCaptureModal: React.FC<{
  visible?: boolean;
  onCancel?: () => void;
}> = props => {
  const {visible, onCancel} = props;

  const [screenshot, setScreenshot] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 根据用户选择生成对应图片
   * @param value 表单 value
   */
  const handleTakeScreenshots = (value: ScreenshotCaptureFormOptions) => {
    if (!value.target) {
      message.warn("请选择节点").then()
      return;
    }

    const target = document.getElementById(value.target) as HTMLElement;

    if (!target) {
      message.warn("目标节点不存在").then()
      return;
    }

    setLoading(true);

    html2canvas(target, { backgroundColor: value.background }).then(canvas => {
      setScreenshot(canvas.toDataURL())
      setLoading(false);
    })
  }

  return (<>
    <Modal
      title={<><Iconfont type="icon-xiangji4"/> 图片导出</>}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <ScreenshotCaptureForm
        onCapture={handleTakeScreenshots}
        loading={loading}
      />

      {screenshot && <>
        <Divider>右键保存 <Iconfont type="icon-shubiaojiantou"/></Divider>
        <img style={{width: "100%"}} src={screenshot} alt="screenshot"/>
      </>}
    </Modal>
  </>);
}

export default ScreenshotCaptureModal;
