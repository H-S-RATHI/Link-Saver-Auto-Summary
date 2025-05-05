import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookmarkIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="w-full px-6 py-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Bookmark Saver</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="justify-center w-full grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Save your favorite websites <br className="hidden sm:inline" />
              in one place
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Bookmark Saver helps you organize and access your favorite websites quickly and easily.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
