"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"

import type { NavItem } from "@/components/site-chrome"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DesktopNavigation({ items }: { items: NavItem[] }) {
  return (
    <div className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 xl:flex">
      {items.map((item) =>
        item.children ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-sm py-1 outline-none transition hover:text-blue-600 focus-visible:ring-3 focus-visible:ring-blue-500/30 data-open:text-blue-600">
              {item.label}
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
              {item.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild>
                  <Link href={child.href} className="flex flex-col items-start">
                    <span>{child.label}</span>
                    {child.description ? (
                      <span className="mt-0.5 text-xs font-medium text-slate-400">
                        {child.description}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-sm py-1 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500/30"
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  )
}

export { DesktopNavigation }
