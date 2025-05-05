"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Bookmark } from "@/types"
import { toast } from "sonner"

export function useBookmarks() {
  const [error, setError] = useState<Error | null>(null)
  const queryClient = useQueryClient()

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      try {
        const response = await api.get<Bookmark[]>("/api/bookmarks")
        setError(null)
        return response.data
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch bookmarks")
        setError(error)
        throw error
      }
    },
  })

  const addBookmarkMutation = useMutation({
    mutationFn: async (url: string) => {
      try {
        const response = await api.post<Bookmark>("/api/bookmarks", { url })
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to add bookmark"
        throw new Error(errorMessage)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
      toast.success("Bookmark added successfully")
    },
    onError: (error: Error) => {
      console.error("Failed to add bookmark:", error)
      toast.error(error.message || "Failed to add bookmark")
    },
  })

  const deleteBookmarkMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/bookmarks/${id}`)
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["bookmarks"], (oldData: Bookmark[] | undefined) =>
        oldData ? oldData.filter((bookmark) => bookmark._id !== id) : [],
      )
      toast.success("Bookmark deleted successfully")
    },
    onError: (error) => {
      console.error("Failed to delete bookmark:", error)
      toast.error("Failed to delete bookmark")
    },
  })

  const addBookmark = async (url: string) => {
    await addBookmarkMutation.mutateAsync(url)
  }

  const deleteBookmark = async (id: string) => {
    await deleteBookmarkMutation.mutateAsync(id)
  }

  return {
    bookmarks,
    isLoading,
    error,
    addBookmark,
    deleteBookmark,
  }
}
