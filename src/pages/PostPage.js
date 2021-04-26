import React from 'react'
import { usePosts } from "../contexts/PostContext"
import HomeNav from '../components/HomeNav'
import Post from '../components/Post'

function PostPage(props) {
  const postArray = usePosts()
  console.log('latest post id', postArray)
  console.log(props.match.params.id)
  return (
    <div>
      <HomeNav />
      <Post />
    </div>
  )
}

export default PostPage