import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "d418a1c2-23eb-4c24-817d-5fabace62f03"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                })
        )
    },

    unfollow(id) {
        return (
            instance.delete(`follow/${id}`)
                .then(response => {
                    return response.data;
                })
        )
    },

    follow(id) {
        return (
            instance.post(`follow/${id}`)
                .then(response => {
                    return response.data;
                })
        )
    },

    getUserProfile(userID) {
        console.warn('Obsolete method. Use profileAPI object')
        return (
            profileAPI.getUserProfile(userID)
        )
    }
};

export const profileAPI = {
    getUserProfile(userID) {
        return (
            instance.get(`profile/${userID}`)
        )
    },

    getUserStatus(userID) {
        return (
            instance.get(`profile/status/${userID}`)
        )
    },

    updateUserStatus(status) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    }
};

export const authAPI = {
    me() {
        return (
            instance.get(`auth/me`)
        )
    }
}
