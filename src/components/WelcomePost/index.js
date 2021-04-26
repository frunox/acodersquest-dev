import React from 'react'
import '../components.css'

function WelcomePost() {
  return (
    <div>
      <div className="post-card-fixed">
        <h2>Welcome!</h2>
        <hr></hr>
        <p className='post-card-summary'>Welcome to the <strong><em>A Coder's Quest</em></strong> blog. If you are new to coding and web development, this is your place. Join me in sharing adventures in self-learning and lessons learned. Read more about the blog <a href='/about'>here</a>.</p>
      </div>
    </div>
  )
}

export default WelcomePost
