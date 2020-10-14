import profileReducer, {addPostActionCreator, deletePostActionCreator} from './profile-reducer';
import React from 'react';

let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post', likesCount: 3}
    ]
};

test('a number of posts should be incremented', () => {
    let action = addPostActionCreator("some post text");

    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(3);
});

test('a message of an added post should be correct', () => {
    let action = addPostActionCreator("some post text");

    let newState = profileReducer(state, action);

    expect(newState.postsData[2].message).toBe("some post text");
});

test('after deleting a post, a number of posts should be decremented', () => {
    let action = deletePostActionCreator(1);

    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(1);
});

test('after trying to delete a post with incorrect ID, a number of posts should not be decremented', () => {
    let action = deletePostActionCreator("3");

    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(2);
});



