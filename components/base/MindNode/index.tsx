import classNames from 'classnames'
import React, { useState } from 'react'
import { NODE_ROOT_CLASS } from '../../../const'
import { BlockquoteContent, HeadingContent } from '../../../model'
import { resolveCallout, resolveTitle } from '../../../utils/mindNodeResolver'

import styles from './style.module.scss'
import { generateNodeId } from '../../../utils'

const MindNode: React.FC<{
  title: HeadingContent[];
  callout?: BlockquoteContent[];
  className?: any;
  hasParent?: boolean;
  isRoot?: boolean;
  children?: React.ReactNode;
  firstNode?: boolean;
  lastNode?: boolean
}> = props => {
  const { title, callout, className, isRoot, children, firstNode, lastNode } = props

  const [collapse, setCollapse] = useState<boolean>(false)

  const childrenCount = React.Children.count(children)

  const mindNodeClassString = classNames(styles.mindNode, className, {
    [ styles.singleChild ]: childrenCount === 1,
    [ NODE_ROOT_CLASS ]: isRoot,
    [ styles.rootNode ]: isRoot,
    [ styles.firstChild ]: firstNode,
    [ styles.lastChild ]: lastNode,
    // [NODE_ROOT_CLASS]: isRoot,
    [ styles.collapsed ]: collapse && childrenCount > 0,
  })

  const handleCollapseNode = (e: any) => {
    setCollapse(v => !v)
    e.stopPropagation()
  }

  const currNodeId = generateNodeId('' + resolveTitle(title, true))
  console.log({ styles })

  return (
    <div className={mindNodeClassString} id={currNodeId}>

      <div className={styles.mindNodeBody}>
        <div className={styles.mindNodeBodyTitle}>{resolveTitle(title)}</div>

        {callout && (
          <div className={styles.mindNodeBodyCallout}>
            {callout.map((item, index) => (
              <div className={styles.mindNodeBodyCalloutItem} key={index}>{resolveCallout(item)}</div>
            ))}
          </div>
        )}

        {children && <button className={styles.mindNodeBodyCollapseBtn} title="收缩节点"
                             onClick={handleCollapseNode}>{collapse ? childrenCount : '-'}</button>}
      </div>

      {children && (<>
        <div className={styles.mindNodeChildren}>{children}</div>
      </>)}
    </div>
  )
}

export default MindNode
