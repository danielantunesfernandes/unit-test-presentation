import axios from "axios";
import { Filter } from "../types/Filter.type";
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

interface UsersApiOutPut {
    getUsersById: (id?: string, filters?: Array<Filter>) => Promise<Array<User>>;
    getUsers: (filters?: Array<Filter>) => Promise<Array<User>>;
    createUser: ({ name, email, status, gender }: UserCreate) => Promise<User>;
    deleteUser: (id: string) => Promise<void>;
    updateUser: ({ id, name, email, status }: UserUpdate) => Promise<User>;
}

function UsersApi(): UsersApiOutPut {
    const path = API_BASE_PATH + USER_RESOURCE_NAME;

    function getApiHeaders() {
        return {
            headers: {
                'Authorization': HEADER_AUTHORIZATION,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
    }
    function handleFilters(filters: Filter[]) {
        let queryStr = "?";
        filters.forEach((filter) => { queryStr = queryStr.concat(filter.type, "=", filter.value); });
        return queryStr;
    }

    function prepareGetPath(id: string | undefined, filters: Filter[] | undefined) {
        let finalPath = path;
        if (id) {
            finalPath += "/" + id;
        }

        if (filters && filters.length > 0) {
            finalPath += handleFilters(filters);
        }
        return finalPath;
    }


    const getUsersById = function (id?: string, filters?: Array<Filter>): Promise<Array<User>> {

        return axios.get(prepareGetPath(id, filters))
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

    const getUsers = function (filters?: Array<Filter>): Promise<Array<User>> {
        return getUsersById(undefined, filters);
    }

    const updateUser = function ({ id, name, email, status }: UserUpdate): Promise<User> {
        return axios.patch(path + "/" + id, { name, email, status }, getApiHeaders()).then(function (response) {
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
        return axios.post(path, { name, email, status, gender }, getApiHeaders()).then(function (response) {
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
        return axios.delete(path + "/" + id, getApiHeaders()).then(function (response) {
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
    return { getUsers, getUsersById, updateUser, createUser, deleteUser };
}

export default UsersApi;