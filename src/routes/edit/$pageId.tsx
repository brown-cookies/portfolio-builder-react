import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$pageId')({
  component: Edit,
})

function Edit() {
  return <div>Hello "/edit/$pageId"!</div>
}
