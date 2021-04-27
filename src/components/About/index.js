import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../postContent.css';

function About() {
  let content = `  
  # Creating the Blog
  
  It started with _create-react-app_ and went from there. I decided to use Firebase as the back end because I want to learn and use cloud services, and, well, it's pretty simple to use. I worked with AWS for a while, but it's not as straightforward as Firebase.  And, the free tier is more lenient.

  Firebase provides the server, an authentication service, a database (I'm using Firestore) and cloud storage for files and images.  Learn more about Firebase [here](https://firebase.google.com).

  All of the posts and much of the content on the site is written in markdown.  In researching how to create posts, it became clear that writing in markdown is much easier than writing HTML or JSX. The posts are written in markdown (*.md) files, and the content on this page is written into a string literal. I use the _react-markdown_ package to render the markdown as JSX.

  I didn't want to use a site-building service like WordPress or Blogger, which are very popular for creating blogs. For this project, I am sticking with the basics, to improve my skills with HTML, CSS and React.  I don't consider myself a front-end developer, but that's what I'm concentrating on now. More detail will be provided in the posts. 
  `;

  return (
    <div className="content">
      <h1>About Me</h1>
      <p>
        I am a former civil engineer who is changing careers to become a web
        developer. I have a MERN stack boot camp certificate, and am continuing
        to expand my capabilities until, well, something better comes along.
        Google, YouTube and Udemy are the primary sources I use for learning.
      </p>
      <p>
        My circle of friends doesn't include coders, so I work on my own. This
        blog is about the stumbling blocks, failures and occasional successes I
        experience with coding in general, and in particular, with creating this
        blog app. It's the most ambitious project I've taken on to date. So,
        don't expect expert advice from me - I'll provide links to sources that
        I found helpful.
      </p>
      <p>
        Sure, I use StackOverflow when it's called for, but even there I don't
        get answers to all my questions. A lot of the information I read is too
        advanced right now, so I try to find my own way of doing things,
        borrowing as much as I can along the way.
      </p>
      <h2>Contact Information</h2>
      <p>
        I hope you enjoy the posts and find some of them useful. I want to add
        comments at some point so you can share your experiences. In the
        meantime, contact me via{' '}
        <a href="mailto:john@acodersquest.com">email</a>.
      </p>
      <p> </p>
      <ReactMarkdown linkTarget={'_blank_'}>{content}</ReactMarkdown>
    </div>
  );
}

export default About;
