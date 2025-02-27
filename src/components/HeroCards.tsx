import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Check, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { LightBulbIcon } from './Icons'

export const HeroCards = () => {
  return (
    <div className='relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex'>
      {/* Testimonial */}
      <Card className='absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='flex flex-row items-center gap-4 pb-2'>
          <Avatar>
            <AvatarImage alt='' src='https://github.com/shadcn.png' />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <CardTitle className='text-lg'>Browncookies React</CardTitle>
            <CardDescription>@browncookies</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This Portfolio Builder is awesome!</CardContent>
      </Card>

      {/* Team */}
      <Card className='absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='mt-8 flex items-center justify-center pb-2'>
          <img
            src='https://i.pravatar.cc/150?img=58'
            alt='user avatar'
            className='absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]'
          />
          <CardTitle className='text-center'>Mielle Almedejar</CardTitle>
          <CardDescription className='font-normal text-primary'>
            Fullstack Developer
          </CardDescription>
        </CardHeader>

        <CardContent className='pb-2 text-center'>
          <p>I had fun building this shit and make it functional</p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel='noreferrer noopener'
              href='https://github.com/leoMirandaa'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Github icon</span>
              <GitHubLogoIcon className='h-5 w-5' />
            </a>
            <a
              rel='noreferrer noopener'
              href='https://twitter.com/leo_mirand4'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>X icon</span>
              <svg
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 fill-foreground'
              >
                <title>X</title>
                <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
              </svg>
            </a>

            <a
              rel='noreferrer noopener'
              href='https://www.linkedin.com/in/leopoldo-miranda/'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Linkedin icon</span>
              <Linkedin size='20' />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className='absolute left-[50px] top-[150px] w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader>
          <CardTitle className='item-center flex justify-between'>
            Free
            <Badge variant='secondary' className='text-sm text-primary'>
              Recommended
            </Badge>
          </CardTitle>
          <div>
            <span className='text-3xl font-bold'>$0</span>
            <span className='text-muted-foreground'> /month</span>
          </div>

          <CardDescription>
            Test our portfolio builder with minimal feature
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className='w-full'>Start Free Trial</Button>
        </CardContent>

        <hr className='m-auto mb-4 w-4/5' />

        <CardFooter className='flex'>
          <div className='space-y-4'>
            {[
              'Up to 5 projects',
              '6 pages per project',
              'Free components',
              'Free templates',
            ].map((benefit: string) => (
              <span key={benefit} className='flex'>
                <Check className='text-green-500' />{' '}
                <h3 className='ml-2'>{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className='absolute -right-[10px] bottom-[35px] w-[350px] shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='flex items-start justify-start gap-4 space-y-1 md:flex-row'>
          <div className='mt-1 rounded-2xl bg-primary/20 p-1'>
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className='text-md mt-2'>
              Support both light and dark mode
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
