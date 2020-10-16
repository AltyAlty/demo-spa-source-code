import avatarSource from '../assets/images/user.png';

// state
let initialState = {
    friendsData: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource}
    ]
};

// reducer
const sidebarReducer = (state = initialState, action) => {
    return state;
};

// export
export default sidebarReducer;