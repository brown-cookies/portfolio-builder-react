import { createFileRoute } from '@tanstack/react-router'
import StudioEditor from '@grapesjs/studio-sdk/react'
import '@grapesjs/studio-sdk/style'

export const Route = createFileRoute('/studio')({
  component: RouteComponent,
})

{
  /* <StudioEditor
options={{
  licenseKey:
    '567bbc73d5524e959c7042af8f09de8fa0bd8a34221145e0b67c16639bd5add0',
  project: {
    type: 'web',
  },
}}
/> */
}

function RouteComponent() {
  return <h1>Hello, World</h1>
}
