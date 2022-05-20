import axios from "axios";
import HttpStatusCode from "../types/HttpStatusCode";
import { User } from "../types/User.type";

export const API_BASE_PATH = 'https://gorest.co.in/public/v2/';
export const USER_RESOURCE_NAME = "users";
export const ERROR_MSG_NOT_SUCCESS = "Error on request";
const HEADER_AUTHORIZATION = "Bearer 5b9a3ce53fb41e021ffdd64e4d8400062ab2e8885bfdce2c55bb351099919773";

export type UserUpdate = {
    id: string;
    name: string;
    email: string;
    status: string;
}
export type UserCreate = {
    name: string;
    email: string;
    gender: string;
    status: string;
}
function useUsersApi(): any {
    const path = API_BASE_PATH + USER_RESOURCE_NAME;
    const getUsers = function (id: string | undefined): Promise<Array<User>> {
        let finalPath = path;
        if (id) {
            finalPath += "/" + id;
        }
        return axios.get(finalPath)
            .then(function (response) {
                if (response.status === HttpStatusCode.OK) {
                    return response.data;
                } else if (response.status === HttpStatusCode.NOT_FOUND) {
                    return [];
                } else {
                    return Promise.reject(ERROR_MSG_NOT_SUCCESS);
                }
            })
            .catch(function (error) {
                // handle error
                throw new Error(error);
            });
    }

    const updateUser = function ({ id, name, email, status }: UserUpdate): Promise<User> {
        return axios.patch(path + "/" + id, { name, email, status }, {
            headers: {
                'Authorization': HEADER_AUTHORIZATION,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            if (response.status === HttpStatusCode.OK) {
                return response.data;
            } else {
                return Promise.reject(ERROR_MSG_NOT_SUCCESS);
            }
        }).catch(function (error) {
            // handle error
            throw new Error(error);
        });
    }
    const createUser = function ({ name, email, status, gender }: UserCreate): Promise<User> {
        return axios.post(path, { name, email, status, gender }, {
            headers: {
                'Authorization': HEADER_AUTHORIZATION,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            if (response.status === HttpStatusCode.CREATED) {
                return response.data;
            } else {
                return Promise.reject(ERROR_MSG_NOT_SUCCESS);
            }
        }).catch(function (error) {
            // handle error
            throw new Error(error);
        });
    }
    const deleteUser = function (id: string): Promise<void> {
        return axios.delete(path + "/" + id, {
            headers: {
                'Authorization': HEADER_AUTHORIZATION,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            if (response.status === HttpStatusCode.NO_CONTENT) {
                return Promise.resolve();
            } else {
                return Promise.reject(ERROR_MSG_NOT_SUCCESS);
            }

        }).catch(function (error) {
            // handle error
            throw new Error(error);
        });
    }
    return { getUsers, updateUser, createUser, deleteUser };
}

export default useUsersApi;