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
    default: {
      pages: [
        { name: 'Home', component: '<h1>Home page</h1>' },
        { name: 'About', component: '<h1>About page</h1>' },
        { name: 'Contact', component: '<h1>Contact page</h1>' },
      ],
    },
  },
}}
/> */
}

function RouteComponent() {
  return (
    <StudioEditor
      options={{
        licenseKey:
          '567bbc73d5524e959c7042af8f09de8fa0bd8a34221145e0b67c16639bd5add0',
        project: {
          type: 'web',
        },
      }}
    />
  )
}
