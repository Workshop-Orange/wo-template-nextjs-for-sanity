import { getAllPost } from "@/lib/sanity.queries"
import { getClient } from "@/lib/sanity.client"
import Link from 'next/link';

export const revalidate = 60

export default async function Home() {
  const data = await getAllPost();

  return (
    <main className="">
     <h1>All posts</h1>
     <div className="grid grid-cols-2 gap-6">
     <pre>
      {JSON.stringify(data, null, 1)}
     </pre>
     <div className="">
      {data?.map((item, i) => 
       <div key={i} className="py-1">
         <Link  href={item.slug.current}>{item.title}</Link>
        </div>
      )}
     </div>

     </div>
    </main>
  )
}

