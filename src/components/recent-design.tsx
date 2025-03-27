import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IconCode } from '@tabler/icons-react'
import { IconDots } from '@tabler/icons-react'
import { ProjectType } from '@/types/ProjectType'
import { getProjects } from '@/api/get-projects'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const sortNameText = new Map<string, string>([
  ['ascending', 'Ascending'],
  ['descending', 'Descending'],
])

const sortDateText = new Map<string, string>([
  ['newest', 'Newest'],
  ['oldest', 'Oldest'],
])

// Skeleton Loading Component
const SkeletonLoading = () => {
  return (
    <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 24 }).map((_, index) => (
        <li key={index} className='rounded-lg border p-4 hover:shadow-md'>
          <div className='mb-8 flex items-center justify-between'>
            <div className='flex size-10 items-center justify-center rounded-lg bg-muted p-2'>
              <div className='size-6 animate-pulse rounded bg-gray-300' />
            </div>
          </div>
          <div>
            <div className='mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-300' />
            <div className='h-4 w-full animate-pulse rounded bg-gray-300' />
            <div className='mt-1 h-4 w-2/3 animate-pulse rounded bg-gray-300' />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function RecentDesign() {
  const { user } = useAuth()

  const [sortType, setSortType] = useState<'name' | 'date'>('date')
  const [sortOrder, setSortOrder] = useState<
    'ascending' | 'descending' | 'newest' | 'oldest'
  >('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['project-list', user?.id],
    queryFn: () => getProjects(user?.id as number),
    enabled: !!user?.id,
  })

  const filteredProjects = (projects || [])
    .filter((project: ProjectType) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: ProjectType, b: ProjectType) => {
      if (sortType === 'name') {
        return sortOrder === 'ascending'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      } else if (sortType === 'date') {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      }
      return 0
    })

  if (isError) {
    toast({ title: 'Something went wrong!', description: error.message })
  }

  return (
    <>
      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Input
            placeholder='Filter apps...'
            className='h-9 w-40 lg:w-[250px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={sortType}
            onValueChange={(value: 'name' | 'date') => {
              setSortType(value)
              if (value === 'name') {
                setSortOrder('ascending')
              } else if (value === 'date') {
                setSortOrder('newest')
              }
            }}
          >
            <SelectTrigger className='w-36'>
              <SelectValue>{sortType === 'name' ? 'Name' : 'Date'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Name</SelectItem>
              <SelectItem value='date'>Date</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortOrder}
            onValueChange={(
              value: 'ascending' | 'descending' | 'newest' | 'oldest'
            ) => setSortOrder(value)}
          >
            <SelectTrigger className='w-36'>
              <SelectValue>
                {sortType === 'name'
                  ? sortNameText.get(sortOrder)
                  : sortDateText.get(sortOrder)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {sortType === 'name' ? (
                <>
                  <SelectItem value='ascending'>Ascending</SelectItem>
                  <SelectItem value='descending'>Descending</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value='newest'>Newest</SelectItem>
                  <SelectItem value='oldest'>Oldest</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className='shadow' />
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredProjects.map((app: ProjectType) => (
            <li
              key={app.name}
              className='cursor-pointer rounded-lg border p-4 hover:shadow-md'
            >
              <a href={`edit/${app.id}`}>
                <div className='mb-8 flex items-center justify-between'>
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                  >
                    <IconCode />
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline'>
                          <IconDots />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Keyboard shortcuts
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div>
                  <h2 className='mb-1 font-semibold'>{app.name}</h2>
                  <p className='line-clamp-2 text-gray-500'>Some Description</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
