import axios from 'axios';
import {ProfileType} from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'd418a1c2-23eb-4c24-817d-5fabace62f03'
    }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                })
        );
    },

    unfollow(id: number) {
        return (
            instance.delete(`follow/${id}`)
                .then(response => {
                    return response.data;
                })
        );
    },

    follow(id: number) {
        return (
            instance.post(`follow/${id}`)
                .then(response => {
                    return response.data;
                })
        );
    },

    getUserProfile(userID: number) {
        console.warn('Obsolete method. Use profileAPI object')
        return (
            profileAPI.getUserProfile(userID)
        );
    }
};

export const profileAPI = {
    getUserProfile(userID: number) {
        return (
            instance.get(`profile/${userID}`)
        );
    },

    getUserStatus(userID: number) {
        return (
            instance.get(`profile/status/${userID}`)
        );
    },

    updateUserStatus(status: string) {
        return (
            instance.put(`profile/status`, {status: status})
        );
    },

    saveUserPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return (
            instance.put(`profile/photo`, formData/*, {headers: {'Content-Type': 'multipart/form-data'}}*/)
        );
    },

    saveProfile(profile: ProfileType) {
        return (
            instance.put(`profile`, profile)
        );
    }
};

export const authAPI = {
    me() {
        return (
            instance.get<MeResponseType>(`auth/me`).then(response => response.data)
        );
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return (
            instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
                .then(response => response.data)
        );
    },

    logout() {
        return (
            instance.delete(`auth/login`)
        );
    }
};

export const securityAPI = {
    getCaptchaURL() {
        return (
            instance.get(`security/get-captcha-url`)
        );
    }
};

// types for API
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
};

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
};

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
};

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
};