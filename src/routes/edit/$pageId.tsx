import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { config as grapesjsConfig } from '@/config/grapesjs'
import grapesjs, { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'

export const Route = createFileRoute('/edit/$pageId')({
  component: Edit,
})

function Edit() {
  const editorRef = useRef<Editor>(null)
  const handleClickRef = useRef<() => void>(() => {})

  const { pageId } = Route.useParams()

  useEffect(() => {
    if (editorRef.current) return

    const editorInstance = grapesjs.init({
      ...grapesjsConfig,
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 3,

        options: {
          local: {
            key: `gjs-key-${pageId}`,
          },
        },
      },
    })

    editorInstance.Panels.addButton('views', {
      id: 'custom-save',
      className: 'fa fa-save',
      command: 'save-code',
      attributes: { title: 'Save Code' },
    })

    editorInstance.Commands.add('save-code', {
      run(editor) {
        alert('Saved!')
      },
    })

    editorRef.current = editorInstance

    handleClickRef.current = () => {
      if (!editorRef.current) return

      const data = editorRef.current.getProjectData()
      console.log(JSON.stringify(data))
    }

    return () => {
      editorInstance.destroy()
      editorRef.current = null
    }
  }, [pageId])

  return (
    <>
      <div className='grapesjs-app'>
        <div className='editor'>
          <div id='gjs' style={{ height: '100%' }}></div>
        </div>
      </div>
    </>
  )
}
