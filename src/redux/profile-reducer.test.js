import profileReducer, {addPostActionCreator, deletePostActionCreator} from './profile-reducer';
import React from 'react';

// general initial data for testing
let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 2},
        {id: 2, message: 'It\'s my first post', likesCount: 3}
    ]
};

// test 01
test('a number of posts should be incremented', () => {
    // initial data for the test
    let action = addPostActionCreator("some post text");

    // actions
    let newState = profileReducer(state, action);

    // expectations
    expect(newState.postsData.length).toBe(3);
});

// test 02
test('a message of an added post should be correct', () => {
    // initial data for the test
    let action = addPostActionCreator("some post text");

    // actions
    let newState = profileReducer(state, action);

    // expectations
    expect(newState.postsData[2].message).toBe("some post text");
});

// test 03
test('after deleting a post, a number of posts should be decremented', () => {
    // initial data for the test
    let action = deletePostActionCreator(1);

    // actions
    let newState = profileReducer(state, action);

    // expectations
    expect(newState.postsData.length).toBe(1);
});

// test 04
test('after trying to delete a post with incorrect ID, a number of posts should not be decremented', () => {
    // initial data for the test
    let action = deletePostActionCreator("3");

    // actions
    let newState = profileReducer(state, action);

    // expectations
    expect(newState.postsData.length).toBe(2);
});



