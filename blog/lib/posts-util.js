import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// process.cwd() will point at the overall project folder
const postsDirectory = path.join(process.cwd(), 'posts');

function getPostData(fileName) {
  const fileContent = fs.readFileSync(
    path.join(postsDirectory, fileName),
    'utf-8'
  );
  // we pass the fileContent, which is a string, to gray-matter
  // to extract the metadata
  // from our markdown file
  // matter will return an object with the data and the content
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ''); // remove the file extension

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  // read all files from the posts directory synchronously
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}


export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}