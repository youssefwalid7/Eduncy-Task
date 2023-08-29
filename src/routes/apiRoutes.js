import express from 'express'
import { verifyCognitoToken } from '../middleware/authMiddleware.js';
import { GetAllPosts, NewPost, RemovePost, UpdatePosts } from '../controllers/ApiController.js';

const router = express.Router();

router.post('/createpost', verifyCognitoToken, NewPost)
router.post('/listposts', verifyCognitoToken, GetAllPosts)
router.post('/deletepost', verifyCognitoToken, RemovePost)
router.post('/updatepost', verifyCognitoToken, UpdatePosts)

export default router;