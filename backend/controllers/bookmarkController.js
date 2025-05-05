import asyncHandler from "express-async-handler"
import fetch from "node-fetch"
import Bookmark from "../models/bookmarkModel.js"

// Helper function to extract metadata from a URL
const extractMetadata = async (url) => {
  try {
    const response = await fetch(url)
    const html = await response.text()

    // Simple regex to extract title and description
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i)

    return {
      title: titleMatch ? titleMatch[1] : null,
      description: descriptionMatch ? descriptionMatch[1] : null,
    }
  } catch (error) {
    console.error("Error extracting metadata:", error)
    return { title: null, description: null }
  }
}

// @desc    Get all bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({ createdAt: -1 })
  res.json(bookmarks)
})

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
// @access  Private
const createBookmark = asyncHandler(async (req, res) => {
  const { url } = req.body

  if (!url) {
    res.status(400)
    throw new Error("Please provide a URL")
  }

  // Check if bookmark already exists for this user
  const existingBookmark = await Bookmark.findOne({ userId: req.user._id, url })

  if (existingBookmark) {
    res.status(400)
    throw new Error("Bookmark already exists")
  }

  // Extract metadata from URL
  const metadata = await extractMetadata(url)

  const bookmark = await Bookmark.create({
    url,
    title: metadata.title,
    description: metadata.description,
    userId: req.user._id,
  })

  res.status(201).json(bookmark)
})

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findById(req.params.id)

  if (!bookmark) {
    res.status(404)
    throw new Error("Bookmark not found")
  }

  // Check if user owns the bookmark
  if (bookmark.userId.toString() !== req.user._id.toString()) {
    res.status(401)
    throw new Error("Not authorized to delete this bookmark")
  }

  await bookmark.deleteOne()
  res.json({ message: "Bookmark removed" })
})

export { getBookmarks, createBookmark, deleteBookmark }
