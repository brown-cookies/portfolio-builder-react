import { Button } from '@/components/ui/button'
import { HeroCards } from './HeroCards'

export const Hero = () => {
  return (
    <section className='container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2'>
      <div className='space-y-6 text-center lg:text-start'>
        <main className='text-5xl font-bold md:text-6xl'>
          <h1 className='inline'>
            <span className='inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent'>
              Portfolio
            </span>{' '}
            Builder
          </h1>{' '}
          for{' '}
          <h2 className='inline'>
            <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent'>
              developers
            </span>{' '}
            .
          </h2>
        </main>

        <p className='mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0'>
          Build your Portfolio landing page effortlessly with our Drag-and-drop
          editor.
        </p>

        <div className='space-y-4 md:space-x-4 md:space-y-0'>
          <Button className='w-full md:w-1/3'>
            <a href='/sign-in'>Get Started</a>
          </Button>
          <Button className='w-full md:w-1/3' variant={'outline'}>
            <a href='/#pricing'>See pricing</a>
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className='z-10'>
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className='shadow'></div>
    </section>
  )
}
