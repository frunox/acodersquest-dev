# A Coder's Quest

A blog created by a new web developer for new web developers. I share my experiences, good and bad, in creating projects on my own.

The project is still underdevelopment. Additional features will continue to be added.

View the project at [acodersquest.com](https://acodersquest.com).

## Project Description

This is a Javascript/React app, configured on Firebase. Cloud Firestore is used to store the file containing metadata and the content of each post. Images are stored using Google Storage.

Almost all the content is created using Markdown, stored in \*.md files. The files for the posts contain metadata, which is parsed out using the npm package `parse-md`. Markdown is rendered using `react-markdown`.

Some of the existing and future posts on the blog will describe it's construction in some detail, including how the Markdown files are processed. On the 'Posts' page, you can search by clicking on the keywords 'markdown' or 'Building-the-Blog' to find those posts.

A minimal amount of `semantic-ui-react` is used in 1 component. Otherwise, all the styling was done with CSS.

# License

This source code is available under the standard MIT license.

# Create React App

This project was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).
