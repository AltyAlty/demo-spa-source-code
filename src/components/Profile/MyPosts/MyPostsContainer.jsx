import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

function MyPostsContainer() {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let addPost = () => {
                        store.dispatch(addPostActionCreator());
                    };

                    let updateNewPostText = (text) => {
                        let action = updateNewPostTextActionCreator(text);
                        store.dispatch(action);
                    };

                    return (
                        <MyPosts updateNewPostText={updateNewPostText}
                                 addPost={addPost}
                                 postsData={state.profilePage.postsData}
                                 newPostText={state.profilePage.newPostText}/>
                    )
                }
            }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;