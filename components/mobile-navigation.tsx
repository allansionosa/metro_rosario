"use client"

import { Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type MobileNavigationItem = {
  label: string
  href: string
  children?: MobileNavigationItem[]
}

function MobileNavigation({ items }: { items: MobileNavigationItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className="grid size-10 place-items-center rounded border border-slate-200 text-slate-600 xl:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(88vw,360px)] bg-white p-0">
        <SheetHeader className="border-b border-slate-100 p-5">
          <SheetTitle className="text-lg font-extrabold text-slate-800">
            COMLOGIK MEDICAL
          </SheetTitle>
          <SheetDescription>
            Navigate to patient services and hospital information.
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1 p-4" aria-label="Mobile navigation">
          {items.map((item) =>
            item.children ? (
              <div key={item.href} className="py-1">
                <div className="px-3 pb-2 pt-3 text-xs font-extrabold tracking-wide text-slate-400 uppercase">
                  {item.label}
                </div>
                <div className="grid gap-1">
                  {item.children.map((child) => (
                    <SheetClose key={child.href} asChild>
                      <Link
                        href={child.href}
                        className="rounded-sm px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/30"
                      >
                        {child.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            ) : (
              <SheetClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className="rounded-sm px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/30"
                >
                  {item.label}
                </Link>
              </SheetClose>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNavigation }
