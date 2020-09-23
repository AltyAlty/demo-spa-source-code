let initialState = {
    friendsData: [
        {
            id: 1,
            name: 'Abba',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 2,
            name: 'Bret',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        },
        {
            id: 3,
            name: 'Carry',
            avatar: 'https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png'
        }
    ]
};

const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;