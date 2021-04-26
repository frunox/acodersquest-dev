import React, { useState, useContext } from "react"

const PostContext = React.createContext()
const PostUpdateContext = React.createContext()
const PostSort = React.createContext()
const PostSortToggle = React.createContext()


export function usePosts() {
  return useContext(PostContext)
}

export function usePostsUpdate() {
  return useContext(PostUpdateContext)
}

export function usePostSortStatus() {
  return useContext(PostSort)
}

export function usePostSortToggle() {
  return useContext(PostSortToggle)
}

export function PostProvider({ children }) {
  const [postArray, setPostArray] = useState([])
  const [postSort, setPostSort] = useState(false)

  function savePosts(posts) {
    return setPostArray(posts)
  }

  function togglePostSort() {
    setPostSort(prevPostSort => !prevPostSort)
  }


  return (
    <PostContext.Provider value={postArray}>
      <PostUpdateContext.Provider value={savePosts} >
        <PostSort.Provider value={postSort} >
          <PostSortToggle.Provider value={togglePostSort} >
            {children}
          </PostSortToggle.Provider>
        </PostSort.Provider>
      </PostUpdateContext.Provider>
    </PostContext.Provider>
  )
}