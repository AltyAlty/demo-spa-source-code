const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
    users: [
        /*{
            id: 1,
            isFollowed: false,
            fullName: 'Abba',
            status: 'I am useless',
            location: {city: 'Minsk', country: 'Belarus'},
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 2,
            isFollowed: true,
            fullName: 'Bret',
            status: 'I am worthless',
            location: {city: 'Moscow', country: 'Russia'},
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 3,
            isFollowed: false,
            fullName: 'Carry',
            status: 'I am pointless',
            location: {city: 'Kiev', country: 'Ukraine'},
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        }*/
    ]
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };

        default:
            return state;
    }
}

export const followAC = (userID) => ({
    type: FOLLOW,
    userID
});

export const unfollowAC = (userID) => ({
    type: UNFOLLOW,
    userID
});

export const setUsersAC = (users) => ({
    type: SET_USERS,
    users
});

export default usersReducer;