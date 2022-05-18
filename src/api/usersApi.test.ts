import { act } from "@testing-library/react";
import { User } from "../types/User.type";
import useUsersApi, { API_BASE_PATH, USER_RESOURCE_NAME, ERROR_MSG_NOT_SUCCESS } from "./usersApi";
import axios from "axios";


describe("useUsers.ts", () => {
    test("When call api to get all the users and does not return 20o should throw an Error", () => {
        //Mock request service
        const axiosSpy = jest.spyOn(axios, "get");
        axiosSpy.mockResolvedValue({
            "status": 400, response: {
                message: 'bad request'
            }
        });
        const { getUsers } = useUsersApi();
        return expect(getUsers()).rejects.toEqual(new Error(ERROR_MSG_NOT_SUCCESS));
    });

    test("When call api to get all the users and API return one user only should return an array of User with one object only", async () => {
        //Mock request service
        const axiosSpy = jest.spyOn(axios, "get");
        axiosSpy.mockResolvedValue({
            "status": 200, data: [{
                id: 3909,
                name: 'Vrinda Iyengar',
                email: 'iyengar_vrinda@metz.com',
                gender: 'male',
                status: 'inactive'
            }]
        });
        const { getUsers } = useUsersApi();
        let users: Array<User> = [];
        //execute method getUsers inside act and with await to be able assert the resutl
        await act(async () => { users = await getUsers(); });

        expect(axiosSpy).toBeCalled();
        expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME);
        expect(users.length).toBe(1);
    });

    test("When call api to get all the users should return an array of User objects", async () => {
        //Mock request service
        const axiosSpy = jest.spyOn(axios, "get");
        axiosSpy.mockResolvedValue({
            "status": 200, data: [{
                id: 3909,
                name: 'Vrinda Iyengar',
                email: 'iyengar_vrinda@metz.com',
                gender: 'male',
                status: 'inactive'
            }, {
                id: 3910,
                name: 'test',
                email: 'test@metz.com',
                gender: 'female',
                status: 'active'
            }]
        });
        const { getUsers } = useUsersApi();
        let users: Array<User> = [];
        //execute method getUsers inside act and with await to be able assert the resutl
        await act(async () => { users = await getUsers(); });

        expect(axiosSpy).toBeCalled();
        expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME);
        expect(users.length).toBe(2);
    });
});
