import pilot from '@/assets/pilot.png'
import { Statistics } from './Statistics'

export const About = () => {
  return (
    <section id='about' className='container py-24 sm:py-32'>
      <div className='rounded-lg border bg-muted/50 py-12'>
        <div className='flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12'>
          <img
            src={pilot}
            alt=''
            className='w-[300px] rounded-lg object-contain'
          />
          <div className='bg-green-0 flex flex-col justify-between'>
            <div className='pb-6'>
              <h2 className='text-3xl font-bold md:text-4xl'>
                <span className='bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent'>
                  About{' '}
                </span>
                Portfolio Builder
              </h2>
              <p className='mt-4 text-xl text-muted-foreground'>
                At Portfolio Builder, we make portfolio creation simple and
                professional. Our drag-and-drop builder, pre-built templates,
                and real-time previews let anyone design a stunning, responsive
                portfolio—no coding required. Whether you're a freelancer,
                designer, or business owner, our platform helps you showcase
                your work effortlessly. Start building today!
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
