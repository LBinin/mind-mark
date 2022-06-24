import React, {useState} from "react";
import {Button, Form, Row, Select} from "antd";
import { NODE_ROOT_CLASS } from '../../../const'
import Iconfont from '../Iconfont'

enum ScreenshotCaptureFormItem {
  TARGET = "target",
  BACKGROUND = "background",
}

enum BackgroundColor {
  WHITE = "#fff",
  TRANSPARENT = "transparent",
}

export interface ScreenshotCaptureFormOptions {
  // 选择节点
  [ScreenshotCaptureFormItem.TARGET]: string;
  // 图片背景
  [ScreenshotCaptureFormItem.BACKGROUND]: string;
}

const ScreenshotCaptureForm: React.FC<{
  onCapture?: (values: ScreenshotCaptureFormOptions) => void;
  loading?: boolean;
}> = props => {
  const {onCapture, loading} = props;

  const [targetList] = useState<string[]>(() => {
    const nodeList = document.querySelectorAll(`.${NODE_ROOT_CLASS}`);
    return Array.from(nodeList).map(node => node.id);
  })

  const [form] = Form.useForm();

  const handleCapture = () => {
    const values: ScreenshotCaptureFormOptions = form.getFieldsValue();
    onCapture && onCapture(values);
  }

  return (
    <Form form={form}>
      {/* 选择节点 */}
      <Form.Item label="选择节点" name={ScreenshotCaptureFormItem.TARGET}>
        <Select dropdownMatchSelectWidth={false} placeholder="请选择节点">
          {targetList.map((item, index) => (
            <Select.Option key={item} value={item}>{decodeURIComponent(item)}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* 图片背景 */}
      <Form.Item label="图片背景" name={ScreenshotCaptureFormItem.BACKGROUND} initialValue={BackgroundColor.TRANSPARENT}>
        <Select dropdownMatchSelectWidth={false}>
          <Select.Option value={BackgroundColor.TRANSPARENT}>透明</Select.Option>
          <Select.Option value={BackgroundColor.WHITE}>白色</Select.Option>
        </Select>
      </Form.Item>

      <Row justify="center">
        <Button type="primary" onClick={handleCapture} icon={<Iconfont type="icon-shandian-white"/>} loading={loading}>
          {loading ? "导出中，请稍后..." : "开始导出!"}
        </Button>
      </Row>
    </Form>
  )
}

export default ScreenshotCaptureForm;
