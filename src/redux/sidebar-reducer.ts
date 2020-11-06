import avatarSource from '../assets/images/user.png';

// type of state
type InitialStateType = typeof initialState;

type FriendType = {
    id: number
    name: string
    avatar: typeof avatarSource
};

// state
let initialState = {
    friendsData: [
        {id: 1, name: 'Abba', avatar: avatarSource},
        {id: 2, name: 'Bret', avatar: avatarSource},
        {id: 3, name: 'Carry', avatar: avatarSource}
    ] as Array<FriendType>
};

// reducer
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
};

// export
export default sidebarReducer;