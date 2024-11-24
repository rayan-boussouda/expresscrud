import { Post } from "../Models/posts";

// Create a post
export async function createPost(data: any) {
  try {
    const newPost = await Post.create(data);
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// Get all posts
export async function getAllPosts() {
  try {
    const posts = await Post.find({});
    return posts;
  } catch (error) {
    console.log(error);
  }
}

// Get a single post
export async function getPost(id: string) {
  try {
    const post = await Post.findById({ _id: id });
    if (!post) {
      return "post not available";
    }
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Update a post
export async function updatePost(id: string, data: any) {
  try {
    const postz = await Post.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!postz) {
      return "post not available";
    }
    return postz;
  } catch (error) {
    // console.log(error);
    throw error; // Throw the error to be caught in the calling function
  }
}

// Delete a post
export async function deletePost(id: string) {
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return "post not available";
    }
  } catch (error) {
    console.log(error);
  }
}
