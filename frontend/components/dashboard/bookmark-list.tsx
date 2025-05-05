"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { Bookmark } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ExternalLink, Trash2, Loader2 } from "lucide-react"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  isLoading: boolean
  error: Error | null
  onDelete: (id: string) => Promise<void>
  view: "grid" | "list"
}

export default function BookmarkList({ bookmarks, isLoading, error, onDelete, view }: BookmarkListProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <BookmarkSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <h3 className="mt-4 text-lg font-semibold">Failed to load bookmarks</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.message || "An error occurred while loading your bookmarks. Please try again."}
        </p>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border p-8 text-center">
        <h3 className="text-lg font-semibold">No bookmarks yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">Add your first bookmark using the form above.</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-4 ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} onDelete={onDelete} view={view} />
      ))}
    </div>
  )
}

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => Promise<void>
  view: "grid" | "list"
}

function BookmarkCard({ bookmark, onDelete, view }: BookmarkCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(bookmark._id)
    } catch (error) {
      console.error("Failed to delete bookmark:", error)
      setIsDeleting(false)
    }
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=64`

  return (
    <Card className={view === "list" ? "flex flex-row items-center" : ""}>
      <CardHeader className={view === "list" ? "flex-shrink-0 w-16" : ""}>
        <div className="flex justify-center">
          <img
            src={faviconUrl || "/placeholder.svg"}
            alt={bookmark.title || "Favicon"}
            className="h-8 w-8 rounded-sm"
            onError={(e) => {
              // If favicon fails to load, replace with a default
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
            }}
          />
        </div>
      </CardHeader>
      
      <CardContent className={`${view === "list" ? "flex-1 py-6" : ""} space-y-2`}>
        <Collapsible>
          <div className="space-y-2">
            <CollapsibleTrigger asChild>
              <button className="text-left w-full">
                <CardTitle className="text-lg hover:underline">
                  {bookmark.title || new URL(bookmark.url).hostname}
                </CardTitle>
              </button>
            </CollapsibleTrigger>
            
            <p className="text-sm text-muted-foreground break-all">
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {bookmark.url}
              </a>
            </p>
            
            {bookmark.description && (
              <CollapsibleContent className="overflow-hidden mt-2">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {bookmark.description}
                </p>
              </CollapsibleContent>
            )}
            
            {bookmark.description && (
              <CollapsibleTrigger asChild>
                <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronDown className="h-4 w-4 mr-1 collapsible-chevron-up" />
                  <ChevronUp className="h-4 w-4 mr-1 collapsible-chevron-down" />
                  <span className="collapsible-text">Show more</span>
                </button>
              </CollapsibleTrigger>
            )}
          </div>
        </Collapsible>
      </CardContent>
      <CardFooter className={`${view === "list" ? "flex-shrink-0 py-6" : ""} flex justify-between`}>
        <Button variant="outline" size="sm" asChild>
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit
          </a>
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function BookmarkSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">
          <Skeleton className="h-8 w-8 rounded-sm" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-9" />
      </CardFooter>
    </Card>
  )
}
