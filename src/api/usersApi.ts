import axios from "axios";
import HttpStatusCode from "../types/HttpStatusCode";
import { User } from "../types/User.type";

export const API_BASE_PATH = 'https://gorest.co.in/public/v2/';
export const USER_RESOURCE_NAME = "users";
export const ERROR_MSG_NOT_SUCCESS = "Error on request";

function useUsersApi(): any {
    const path = API_BASE_PATH + USER_RESOURCE_NAME;
    const getUsers = function (): Promise<Array<User>> {
        return axios.get(path)
            .then(function (response) {
                if (response.status === HttpStatusCode.OK) {
                    return response.data;
                } else {
                    return Promise.reject(ERROR_MSG_NOT_SUCCESS);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                throw new Error(error);
            });
    }
    return { getUsers };
}


export default useUsersApi;