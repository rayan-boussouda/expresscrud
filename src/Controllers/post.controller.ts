import { Request, Response } from 'express';
import { createPost, getAllPosts, getPost as getSinglePost, updatePost as updateExistingPost, deletePost as removePost } from '../Services/post.service';
import { PostschemaValidate } from '../Models/posts';

export const addPost = async (req: Request, res: Response) => {
    const data = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        published: req.body.published,
    };

    const { error, value } = PostschemaValidate.validate(data);

    if (error) {
        res.send(error.message);
    } else {
        const post = await createPost(value);
        res.status(201).send(post);
    }
};

export const getPosts = async (req: Request, res: Response) => {
    const posts = await getAllPosts();
    res.send(posts);
};  

export const getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await getSinglePost(id);
    res.send(post);
};

export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(req.body)
    try {
        const post = await updateExistingPost(id,req.body);
        res.send(post);
    } catch (error) {
        res.status(500).send(error)
    }
  
}
export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = removePost(id);
    res.send(post)

}