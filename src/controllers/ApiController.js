import { CreatePost, ListPosts, DeletePost, UpdatePost } from "../services/dbServices.js";

export const NewPost = async (req, res) => {
    try {
        const { email, title, content } = req.body

        if (!email) throw Error("email is required");
        if (!title) throw Error("title is required");
        if (!content) throw Error("content is required");
        else {
            const post = await CreatePost(email, title, content)
            res.status(200).json({ post });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const GetAllPosts = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        if (!email) throw Error("email is required");
        else {
            const posts = await ListPosts(email)
            res.status(200).json({ posts })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const RemovePost = async (req, res) => {
    try {
        const { email, title } = req.body
        if (!email) throw Error("email is required");
        if (!title) throw Error("title is required");
        else {
            await DeletePost(email, title)
            res.status(200).json({ message: "post deleted" });

        }
    } catch (error) {
        res.status(500).json({ error: error.message + "2" });

    }

}
export const UpdatePosts = async (req, res) => {
    try {
        const { email, title, newtitle, newcontent } = req.body
        if (!email) throw Error("email is required");
        if (!title) throw Error("email is required");
        if (!newtitle) throw Error("email is required");
        if (!newcontent) throw Error("email is required");
        else {
           const result= await UpdatePost(email, title, newtitle, newcontent)
            res.status(500).json({ result });

        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}