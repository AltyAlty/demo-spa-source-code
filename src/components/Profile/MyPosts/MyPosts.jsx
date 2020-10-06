import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";

function MyPosts(props) {
    let postsElements = props.postsData.map(p => <Post id={p.id}
                                                       message={p.message}
                                                       likes={p.likesCount}
                                                       key={p.id}/>);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
};

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"}
                       name={"newPostText"}
                       placeholder={"Enter your message"}/>
            </div>

            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const AddPostReduxForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm);

export default MyPosts;