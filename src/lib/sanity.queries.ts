import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { getClient } from "@/lib/sanity.client"

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export async function getAllPost(
): Promise<{slug: Slug, title: string}[]> {
  const client  = getClient();
  return await client.fetch(postSlugsQuery)
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][]{ slug {current}, title}
`

export interface Post {
  _type: 'post'
  _id: string
  publishedAt: string
  author: any
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  categories: any
}