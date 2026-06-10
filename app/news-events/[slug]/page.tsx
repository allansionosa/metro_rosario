import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { getNewsEventPost, newsEventPosts } from "@/lib/news-events"
import { hospital } from "@/lib/site-data"

type NewsEventDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

function getPostIndex(slug: string) {
  return newsEventPosts.findIndex((post) => post.slug === slug)
}

export function generateStaticParams() {
  return newsEventPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: NewsEventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsEventPost(slug)

  if (!post) {
    return {
      title: `News & Events | ${hospital.shortName}`,
    }
  }

  return {
    title: `${post.title} | ${hospital.shortName}`,
    description: post.summary,
  }
}

export default async function NewsEventDetailPage({
  params,
}: NewsEventDetailPageProps) {
  const { slug } = await params
  const post = getNewsEventPost(slug)

  if (!post) {
    notFound()
  }

  const postIndex = getPostIndex(post.slug)
  const previousPost = newsEventPosts[postIndex - 1]
  const nextPost = newsEventPosts[postIndex + 1]

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title={post.title}
        eyebrow={post.type}
        description={post.summary}
      />

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article>
            <Button
              asChild
              variant="link"
              className="mb-7 h-auto p-0 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <Link href="/news-events">
                <ArrowLeft className="size-4" data-icon="inline-start" />
                Back to News & Events
              </Link>
            </Button>

            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-slate-100">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
                priority
              />
              <span className="absolute top-4 left-4 rounded-sm bg-blue-600 px-3 py-1.5 text-xs font-bold text-white uppercase">
                {post.type}
              </span>
            </div>

            <div className="mt-8 max-w-3xl">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                <CalendarDays className="size-4" />
                {post.date}
              </p>
              <h1 className="mt-4 text-4xl leading-tight font-extrabold text-neutral-700 md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-8 space-y-5 text-sm leading-8 text-slate-600">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <Card className="rounded-sm border-0 bg-blue-600 p-7 text-white ring-0">
              <CardTitle className="text-2xl font-extrabold">
                Patient note
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-blue-50">
                {post.callout}
              </CardContent>
              <Button
                asChild
                size="lg"
                className="mt-6 h-10 rounded bg-white px-5 text-xs font-bold text-blue-600 hover:bg-blue-50 hover:text-white"
              >
                <Link href="/appointment">Request Appointment</Link>
              </Button>
            </Card>

            <Card className="rounded-sm border-0 bg-slate-100 p-7 ring-0">
              <CardTitle className="text-xl font-extrabold text-neutral-700">
                Contact the care desk
              </CardTitle>
              <CardContent className="mt-4 px-0 text-sm leading-7 text-slate-500">
                {hospital.tel}
                <br />
                {hospital.mobile}
                <br />
                {hospital.email}
              </CardContent>
            </Card>
          </aside>
        </div>

        <nav
          className="mx-auto mt-14 grid max-w-7xl gap-4 border-t border-slate-200 pt-8 md:grid-cols-2"
          aria-label="Article navigation"
        >
          {previousPost ? (
            <Link
              href={`/news-events/${previousPost.slug}`}
              className="rounded-sm border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
                <ChevronLeft className="size-3.5" />
                Previous
              </p>
              <p className="mt-2 text-sm font-bold text-neutral-700">
                {previousPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              href={`/news-events/${nextPost.slug}`}
              className="rounded-sm border border-slate-200 p-5 text-right transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="flex items-center justify-end gap-2 text-xs font-bold text-blue-600 uppercase">
                Next
                <ChevronRight className="size-3.5" />
              </p>
              <p className="mt-2 text-sm font-bold text-neutral-700">
                {nextPost.title}
              </p>
            </Link>
          ) : null}
        </nav>
      </section>

      <SiteFooter />
    </main>
  )
}
