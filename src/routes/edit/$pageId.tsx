import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { config as grapesjsConfig } from '@/config/grapesjs'
import grapesjs from 'grapesjs'
import type { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'

export const Route = createFileRoute('/edit/$pageId')({
  component: Edit,
})

function Edit() {
  const editorRef = useRef<Editor>(null)

  useEffect(() => {
    const editorInstance = grapesjs.init(grapesjsConfig)

    if (!editorRef.current) {
      editorRef.current = editorInstance
    }

    return () => {
      editorInstance.destroy()
    }
  }, [])

  async function handleClick() {
    const data = await editorRef.current?.store()

    console.log(data)
  }

  return (
    <>
      <div className='grapesjs-app'>
        <div className='editor'>
          <div id='gjs' style={{ height: '100%' }}></div>
        </div>

        <button onClick={handleClick}>Hello</button>
      </div>
    </>
  )
}
