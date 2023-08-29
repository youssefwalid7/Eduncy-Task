import postSchema from '../models/post.js'
import userSchema from '../models/user.js'

export const SaveUser = async (name, email) => {
    const newUser = new userSchema({
        name: name,
        email: email
    })
    newUser.save().then(savedUser => {
        console.log('User saved:', savedUser);
        return savedUser
    })
        .catch(error => {
            console.error('Error saving user:', error);
        });
}

export const CreatePost = async (email, title, content) => {
    const newPost = new postSchema({
        email: email,
        title: title,
        content: content
    })
    newPost.save().then(savedPost => {
        console.log('Post saved:', savedPost);
        return savedPost
    }).catch(error => {
        console.error('Error saving user:', error);
    });
}

export const ListPosts = async (email) => {
    try {
        const results = await postSchema.find({ email: email }).exec();
        return results;
    } catch (error) {
        console.error('Error:', err);
    }
}

export const DeletePost = async (email, title) => {
    try {
        await postSchema.deleteOne({ email: email, title: title }).then(deletedPost => {
            console.log('Post deleted:', deletedPost);
            return deletedPost
        }).catch(error => {
            console.error('Error deleting post:', error);
        });

    } catch (error) {
        console.error('Error 2:', error);

    }
}

export const UpdatePost = async (email, title, newtitle, newcontent) => {
    try {
        const newData = {
            title: newtitle,
            content: newcontent,
        }
        await postSchema.findOneAndUpdate(
            { email: email, title: title },
            { $set: newData },
            { new: true }, // This option returns the updated document
        ).then(
            updatedPost => {
                console.log('Post updated:', updatedPost);
                return updatedPost
            }).catch(error => {
                console.error('Error updating post:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
} 