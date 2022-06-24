import { Card, Divider, Space } from 'antd'
import { remark } from 'remark'
import React, { useMemo } from 'react'
import { buildMindNodes } from '../../../utils'
import { ASTNode, MindNodeItem } from '../../../model'
import Iconfont from '../Iconfont'
import MindMapToolbar from '../MindMapToolbar'
import MindNode from '../MindNode'

import styles from './style.module.scss'
import classNames from 'classnames'

const renderMindMap = (nodes: MindNodeItem[], hasParent?: boolean, isRoot?: boolean) => {
  return nodes.map((node: MindNodeItem, index: number) => {
    if (!node.title) {
      return null
    }

    // const classNames = nodes.length > 1 ? {
    //   'first-child': index === 0,
    //   'last-child': index === nodes.length - 1,
    // } : undefined

    return (
      <MindNode
        key={index}
        hasParent={hasParent}
        title={node.title}
        callout={node.callout}
        firstNode={nodes.length > 1 && index === 0}
        lastNode={nodes.length > 1 && index === nodes.length - 1}
        // className={classNames}
        isRoot={isRoot}
      >
        {node.children && renderMindMap(node.children, true)}
      </MindNode>
    )
  })
}

const MindMap: React.FC<{
  className?: string;
  markdown?: string;
  modifiedTime?: Date;
}> = props => {
  const { markdown, modifiedTime, className } = props
  console.log({ markdown })

  const allMarkdownNodes = useMemo<ASTNode[]>(
    () => markdown ? (remark().parse(markdown).children as ASTNode[]) : [],
    [markdown],
  )

  const dataSource = buildMindNodes(allMarkdownNodes)

  console.log({ dataSource })

  const cardCls = classNames(className, styles.mindMapCard)

  return (
    <Card
      title={<><Iconfont type="icon-mind-map" /> 脑图预览</>}
      key="mindMap"
      size="small"
      className={cardCls}
      extra={<MindMapToolbar saveTime={modifiedTime} />}
    >
      <Space direction="vertical" className={styles.mindMapContainer} split={<Divider />}>
        {dataSource && renderMindMap(dataSource, false, true)}
      </Space>
    </Card>
  )
}

export default MindMap
