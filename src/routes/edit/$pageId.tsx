import { useEffect, useRef } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { config as grapesjsConfig } from '@/config/grapesjs'
import { ProjectType } from '@/types/ProjectType'
import grapesjs, { Editor } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import { getProject } from '@/api/get-project'
import { updateProjectContent } from '@/api/update-project-content'
import { useToast } from '@/hooks/use-toast'

export const Route = createFileRoute('/edit/$pageId')({
  component: Edit,
})

function Edit() {
  const { pageId } = Route.useParams()

  const { toast } = useToast()
  const editorRef = useRef<Editor>(null)
  const handleLoadProjectDataRef = useRef<(content: string) => void>(() => {})

  const { data: project } = useQuery<ProjectType>({
    queryKey: ['project-key', pageId],
    queryFn: () => getProject(Number(pageId)),
  })

  const mutation = useMutation({
    mutationFn: updateProjectContent,
    onSuccess: () => {
      toast({ title: 'Saved!', description: 'Project successfully saved!' })
    },
    onError: (error) => {
      toast({
        title: 'Error!',
        description: `Something went wrong! ${error.name}`,
      })
    },
  })

  useEffect(() => {
    if (editorRef.current) return

    const editorInstance = grapesjs.init({
      ...grapesjsConfig,
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,

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
      async run(editor: Editor) {
        const projectData = editor.getProjectData()

        mutation.mutate({
          projectId: Number(pageId),
          content: JSON.stringify(projectData),
        })
      },
    })

    editorRef.current = editorInstance

    handleLoadProjectDataRef.current = (content: string) => {
      editorRef.current?.loadProjectData(JSON.parse(content))
    }

    return () => {
      editorInstance.destroy()
      editorRef.current = null
    }
  }, [pageId])

  useEffect(() => {
    if (project?.content != null) {
      handleLoadProjectDataRef.current(project.content)
    }
  }, [project])

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
