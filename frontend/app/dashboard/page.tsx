"use client"

import { useState } from "react"
import { useBookmarks } from "@/hooks/use-bookmark"
import AddBookmark from "@/components/dashboard/add-bookmark"
import BookmarkList from "@/components/dashboard/bookmark-list"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, List } from "lucide-react"

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const { bookmarks, isLoading, error, addBookmark, deleteBookmark } = useBookmarks()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
          <p className="text-muted-foreground">Manage your saved bookmarks</p>
        </div>
        <Tabs defaultValue={view} onValueChange={(value) => setView(value as "grid" | "list")} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">
              <LayoutGrid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <AddBookmark onAddBookmark={addBookmark} />
      <BookmarkList bookmarks={bookmarks} isLoading={isLoading} error={error} onDelete={deleteBookmark} view={view} />
    </div>
  )
}
