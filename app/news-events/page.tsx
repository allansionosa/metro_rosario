import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { PageHero, SiteFooter, SiteHeader } from "@/components/site-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { newsEventPosts } from "@/lib/news-events"
import { hospital } from "@/lib/site-data"

const POSTS_PER_PAGE = 2

type NewsEventsPageProps = {
  searchParams?: Promise<{
    page?: string
  }>
}

function getPageNumber(pageParam?: string) {
  const pageNumber = Number(pageParam)

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return 1
  }

  return pageNumber
}

function getPageHref(pageNumber: number) {
  if (pageNumber <= 1) {
    return "/news-events"
  }

  return `/news-events?page=${pageNumber}`
}

export default async function NewsEventsPage({
  searchParams,
}: NewsEventsPageProps) {
  const params = await searchParams
  const totalPages = Math.ceil(newsEventPosts.length / POSTS_PER_PAGE)
  const requestedPage = getPageNumber(params?.page)
  const currentPage = Math.min(requestedPage, totalPages)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = newsEventPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <PageHero
        title="News & Events"
        eyebrow="Updates"
        description={`Facility information, patient access notes, and service updates for ${hospital.name}.`}
      />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Latest Updates
              </p>
              <h2 className="mt-4 text-4xl font-extrabold text-neutral-700">
                Helpful notes from the care desk.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                Browse facility updates, patient advisories, and service notes.
                Each post includes a concise summary and a full detail page for
                the next steps patients should know.
              </p>
            </div>
            <div className="rounded-sm bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {visiblePosts.map((post) => (
              <Card
                key={post.slug}
                className="grid overflow-hidden rounded-sm border-0 bg-white p-0 shadow-[0_14px_28px_rgba(15,23,42,0.08)] ring-0 lg:grid-cols-[260px_1fr]"
              >
                <Link
                  href={`/news-events/${post.slug}`}
                  className="relative min-h-64 overflow-hidden lg:min-h-full"
                  aria-label={`Read ${post.title}`}
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 260px, 100vw"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-sm bg-blue-600 px-3 py-1.5 text-xs font-bold text-white uppercase">
                    {post.type}
                  </span>
                </Link>
                <CardContent className="flex flex-col justify-between p-7">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <CalendarDays className="size-4" />
                      {post.date}
                    </p>
                    <CardTitle className="mt-4 text-2xl font-extrabold text-neutral-700">
                      <Link
                        href={`/news-events/${post.slug}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {post.summary}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="mt-7 h-10 w-fit rounded border-blue-600 px-5 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Link href={`/news-events/${post.slug}`}>
                      Read more
                      <ChevronRight
                        className="size-3.5"
                        data-icon="inline-end"
                      />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <nav
            className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-8 sm:flex-row"
            aria-label="News pagination"
          >
            <Button
              asChild={hasPreviousPage}
              variant="outline"
              size="lg"
              className="h-10 rounded border-slate-300 px-5 text-xs font-bold text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-40"
              disabled={!hasPreviousPage}
            >
              {hasPreviousPage ? (
                <Link href={getPageHref(currentPage - 1)}>
                  <ChevronLeft className="size-3.5" data-icon="inline-start" />
                  Previous
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="size-3.5" data-icon="inline-start" />
                  Previous
                </span>
              )}
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1
                const isCurrentPage = pageNumber === currentPage

                return (
                  <Button
                    key={pageNumber}
                    asChild
                    variant={isCurrentPage ? "default" : "outline"}
                    size="icon-lg"
                    className={`rounded text-xs font-bold ${
                      isCurrentPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border-slate-300 text-slate-500 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    <Link
                      href={getPageHref(pageNumber)}
                      aria-current={isCurrentPage ? "page" : undefined}
                      aria-label={`Go to news page ${pageNumber}`}
                    >
                      {pageNumber}
                    </Link>
                  </Button>
                )
              })}
            </div>

            <Button
              asChild={hasNextPage}
              variant="outline"
              size="lg"
              className="h-10 rounded border-slate-300 px-5 text-xs font-bold text-slate-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-40"
              disabled={!hasNextPage}
            >
              {hasNextPage ? (
                <Link href={getPageHref(currentPage + 1)}>
                  Next
                  <ChevronRight className="size-3.5" data-icon="inline-end" />
                </Link>
              ) : (
                <span>
                  Next
                  <ChevronRight className="size-3.5" data-icon="inline-end" />
                </span>
              )}
            </Button>
          </nav>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
