import { getAllPost } from "@/lib/sanity.queries"
import { getClient } from "@/lib/sanity.client"
import Link from 'next/link';

export default async function Home() {
  const data = await getAllPost();

  return (
    <main className="">
     <h1>All posts</h1>
     <pre>
      {JSON.stringify(data, null, 2)}
     </pre>
     <div>
      {data?.map((item, i) => 
       <div key={i} className="">
         <Link  href={item.slug.current}>{item.title}</Link>
        </div>
      )}
     </div>
    </main>
  )
}

