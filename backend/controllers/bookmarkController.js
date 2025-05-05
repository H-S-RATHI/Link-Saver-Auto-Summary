import asyncHandler from "express-async-handler"
import fetch from "node-fetch"
import Bookmark from "../models/bookmarkModel.js"

// Helper function to trim text to specified number of words
const trimToWords = (text, maxWords = 50) => {
  if (!text) return text;
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

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
  console.log('Request body:', req.body) // Debug log
  
  let { url } = req.body

  if (!url) {
    res.status(400)
    throw new Error("Please provide a URL")
  }

  // Ensure URL has a protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }

  try {
    // Check if the URL is valid
    new URL(url)
  } catch (error) {
    res.status(400)
    throw new Error("Please provide a valid URL")
  }

  // Check if bookmark already exists for this user
  const existingBookmark = await Bookmark.findOne({ userId: req.user._id, url })

  if (existingBookmark) {
    res.status(400)
    throw new Error("Bookmark already exists")
  }

  try {
    // Extract metadata from URL
    console.log('Extracting metadata for URL:', url) // Debug log
    const metadata = await extractMetadata(url)
    console.log('Extracted metadata:', metadata) // Debug log

    // Get description from Jina AI
    let description = metadata.description ? trimToWords(metadata.description) : 'No description available';
    try {
      console.log('Fetching Jina AI summary for URL:', url);
      const jinaUrl = `https://r.jina.ai/${encodeURIComponent(url)}`;
      const jinaRes = await fetch(jinaUrl);
      
      if (jinaRes.ok) {
        let summary = await jinaRes.text();
        if (summary) {
          // Clean up the summary by removing metadata patterns
          summary = summary
            // Remove title and URL source in any order
            .replace(/(^|\n)(Title|URL Source|Markdown Content):.*?(\n|$)/g, '')
            // Remove any remaining Markdown Content prefix
            .replace(/^Markdown Content: ?\n?/, '')
            // Remove any leading/trailing dashes or whitespace
            .replace(/^[\s-]+/g, '')
            .replace(/[\s-]+$/g, '')
            // Remove multiple consecutive newlines
            .replace(/\n{3,}/g, '\n\n')
            .trim();
          
          description = trimToWords(summary);
          console.log('Jina AI summary fetched and cleaned successfully');
          console.log('Cleaned description:', description); // Debug log
        }
      } else {
        console.warn(`Jina AI API returned ${jinaRes.status}`);
      }
    } catch (jinaError) {
      console.warn('Failed to fetch Jina AI summary:', jinaError);
    }

    const bookmark = await Bookmark.create({
      url,
      title: metadata.title || url, // Fallback to URL if no title
      description: description,
      userId: req.user._id,
    })

    
    console.log('Created bookmark:', bookmark) // Debug log

    res.status(201).json(bookmark)
  } catch (error) {
    console.error('Error creating bookmark:', error) // Debug log
    res.status(500)
    throw new Error(error.message || 'Failed to create bookmark')
  }
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
