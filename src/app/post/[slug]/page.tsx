import { getClient } from "@/lib/sanity.client"
import { postSlugsQuery } from "@/lib/sanity.queries"
import { getPost } from "@/lib/sanity.queries";

export const dynamicParams = false;

type PageType = {
  params: {
    slug: string
  }
}

type Slug = {
  slug: {
      current: string
  }
}

export default async function Page(data: PageType) {
  let res = await getPost(getClient(), `/post/${data.params.slug}`);
  return (
    <main className="">
     <pre>
      {JSON.stringify(res, null, 2)}
     </pre>
    </main>
  )
}

export async function generateStaticParams() {

  const client = getClient()
  
  const slugs: Slug[] = await client.fetch(postSlugsQuery)
  const vals = slugs.map((item) => item.slug.current.replace('/post/', ''))
  console.log({vals })

  return vals.map((item) => ({
    slug: item,
  }))
}

