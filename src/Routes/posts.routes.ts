import express from 'express';
import { addPost, getPosts, getPost, updatePost, deletePost } from '../Controllers/post.controller';

// Initiating the router
export const router = express.Router();

// Add post route
router.post('/', addPost);

// Get posts
router.get('/', getPosts);

// Get single post
router.get('/:id', getPost);

// Update a post
router.put('/:id', updatePost);

// Delete a post
router.delete('/:id', deletePost);
