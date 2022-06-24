import '../styles/globals.css'
import type { AppProps } from 'next/app'

import 'antd/dist/antd.css'
import EditorConfigContext from '../context/editor'
import useEditorConfigContext from '../hooks/useEditorConfigContext'

function MyApp({ Component, pageProps }: AppProps) {
  const editorConfigContext = useEditorConfigContext()

  return (
    <EditorConfigContext.Provider value={editorConfigContext}>
      <Component {...pageProps} />
    </EditorConfigContext.Provider>
  )
}

export default MyApp
