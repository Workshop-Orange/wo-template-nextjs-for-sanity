import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <h1 className='text-4xl text-blue-300'>All Posts</h1>

      <div className='m-8'>
       <Link  href={'/post'}>All Posts</Link>
      </div>
    </main>
  )
}
