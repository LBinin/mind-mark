// 编辑器可配置项目
export enum EditorConfig {
  PreviewMode = 'MIND-NOTE-PREVIEW-MODE',
  MarkdownCode = 'MARKDOWN-CODE',
  Position = 'MIND-NOTE-EDITOR-POSITION',
  EditorWidth = 'MIND-NOTE-EDITOR-WIDTH',
  EditorHeight = 'MIND-NOTE-EDITOR-HEIGHT',
}

// 编辑器预览状态
export enum PreviewMode {
  LIVE = 'live', // 实时预览
  SAVE = 'save', // 保存时预览
}

// 编辑器布局
export enum EditorPosition {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export const EditorIntroContent = `
# 这是一个 Title
> 大致介绍一下

## 这是一个子节点
> 这里有一些备注

## 这是另一个子节点

### 我是叶子节点

#### 另一个叶子节点

##### 超级叶子节点 🍃

### 尝试一下折叠节点
> 鼠标放在父级节点上
> 可以看到折叠 / 展开按钮

## 功能使用
> 功能主要集中在右上方

### 「编辑器布局」
> 可以调整编辑器所在方位

### 「导出图片」
> 将当前脑图以图片形式导出

## ...其他节点
`
