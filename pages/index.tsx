import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss'
// import MarkdownEditor from '../components/base/MarkdownEditor'

import dynamic from 'next/dynamic'
import MindMap from '../components/base/MindMap'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { configStore } from '../store'
import { EditorConfig, EditorPosition } from '../const/editor'
import EditorConfigContext from '../context/editor'


const MarkdownEditor = dynamic(() => import('../components/base/MarkdownEditor'), {
  ssr: false,
})

const Home: NextPage = () => {
  const [dataSource, setDataSource] = useState<string | undefined>('')
  const [markdownLastModifiedTime, setModifiedTime] = useState<Date>()
  const { previewMode, position: editorPosition } = useContext(EditorConfigContext)

  useEffect(() => {
    // const localMarkdown = configStore.getUserConfigByKey(UserConfig.MARKDOWN_CODE)
    // localMarkdown && setDataSource(localMarkdown)
    // fetch(MarkdownSourcePath).then(res => res.text()).then(setDataSource)
  }, [])

  const handleMarkdownCodeChange = (md: string | undefined, saveDate?: Date) => {
    console.log({ md })
    if (previewMode === 'live') {
      setDataSource(md)
    }
  }

  const handleMarkdownCodeSave = (saveDate: Date) => {
    if (saveDate) {
      setModifiedTime(saveDate)
    }
  }

  const appClassString = classNames(styles.mindNoteAppContainer, {
    [styles.layoutReverse]: editorPosition === EditorPosition.RIGHT,
    [styles.layoutEditorTop]: editorPosition === EditorPosition.TOP,
    [styles.layoutEditorBottom]: editorPosition === EditorPosition.BOTTOM,
  })

  return (
    <div className={appClassString}>
      <MarkdownEditor
        defaultValue={dataSource}
        onChange={handleMarkdownCodeChange}
        onSave={handleMarkdownCodeSave}
      />

      <MindMap
        className={styles.mindMapCard}
        markdown={dataSource}
        modifiedTime={markdownLastModifiedTime}
      />
    </div>
  )
}

export default Home
