import React from 'react';
import ReactMarkdown from 'react-markdown';
import HomeNav from '../HomeNav';
import Footer from '../Footer';

import { usePosts } from '../../contexts/PostContext';

import '../postContent.css';

function Post(props) {
  // const [isLoading, setIsLoading] = useState(true);
  const postArray = usePosts();
  console.log('Post: postArray', postArray);
  // const postIndex = postArray.length

  // let slug = parseInt(props.match.params.id);
  let slug = props.match.params.id;
  // console.log('Post slug', slug, typeof slug);

  // if (Object.is(NaN, id)) {
  //   console.log('Post redirect');
  //   return <Redirect to="/404" />;
  // }

  // let arrayLength = [];
  // while (postArray.length === 0) {
  //   let arrayLength = postArray.length;
  //   console.log('In while', arrayLength);
  //   if (arrayLength) {
  // setIsLoading(false);
  //     break;
  //   }
  // }
  // return <Redirect to="/all-posts" />;

  let id = postArray.findIndex((el) => el.slug === slug);
  console.log('POST id after sort: ', id);

  return (
    <React.Fragment>
      <section>
        <HomeNav />
        <main>
          <div className="post-content">
            <h1>{postArray[id].title}</h1>
            {/* <h3>Author: {postArray[id].author}</h3> */}
            <small>Published on {postArray[id].date}</small>
            {/* <hr /> */}
            <ReactMarkdown skipHtml={true} linkTarget={'_blank_'}>
              {postArray[id].content}
            </ReactMarkdown>
            <p>
              Thank you for reading my blog. Please send comments or suggestions
              for future posts to <span> </span>
              <a href="mailto:john@acodersquest.com">john@acodersquest.com.</a>
            </p>
          </div>
        </main>
        <Footer />
      </section>
    </React.Fragment>
  );
}

export default Post;
