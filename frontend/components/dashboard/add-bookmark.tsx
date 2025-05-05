"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"

const bookmarkSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
})

type BookmarkFormValues = z.infer<typeof bookmarkSchema>

interface AddBookmarkProps {
  onAddBookmark: (url: string) => Promise<void>
}

export default function AddBookmark({ onAddBookmark }: AddBookmarkProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(data: BookmarkFormValues) {
    try {
      setIsSubmitting(true)
      await onAddBookmark(data.url)
      form.reset()
    } catch (error) {
      console.error("Failed to add bookmark:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Save Bookmark
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
