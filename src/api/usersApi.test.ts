import { act } from "@testing-library/react";
import { User } from "../types/User.type";
import useUsersApi, { API_BASE_PATH, USER_RESOURCE_NAME, ERROR_MSG_NOT_SUCCESS } from "./usersApi";
import axios from "axios";
import { Filter, FilterOptions } from "../types/Filter.type";

describe("useUsers.ts", () => {
    describe("getUsers", () => {
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

        test("When call api to get a specific users by id and the id does not exists should return an empty array", async () => {
            //Mock request service
            const axiosSpy = jest.spyOn(axios, "get");
            axiosSpy.mockResolvedValue({
                "status": 404, "message": "Resource not found"
            });
            const { getUsersById } = useUsersApi();
            let users: Array<User> = [];
            //execute method getUsers inside act and with await to be able assert the result
            await act(async () => { users = await getUsersById("1111"); });

            expect(axiosSpy).toBeCalled();
            expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME + "/" + "1111");
            expect(users.length).toBe(0);
        });

        test("When call api to get a specific users by id and the id does exists should return an array with one position", async () => {
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

        test("When call api with filters the request should have query string with the filters", async () => {
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
            const filters: Filter[] = [];
            filters.push({ type: FilterOptions.NAME, value: "test" });
            //execute method getUsers inside act and with await to be able assert the result
            await act(async () => { users = await getUsers(filters); });

            expect(axiosSpy).toBeCalled();
            expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME + "?" + FilterOptions.NAME + "=" + "test");
            expect(users.length).toBe(1);
        });
    });

    describe("createUser", () => {
        test("When its call the API to create the user with success should return the user data created", async () => {
            const name = "Amalia";
            const email = "Amalia@fado.com";
            const gender = "female";
            const status = "inactive";
            const id = 3909;

            //Mock request service
            const axiosSpy = jest.spyOn(axios, "post");
            axiosSpy.mockResolvedValue({
                "status": 201, data: {
                    id: id,
                    name: name,
                    email: email,
                    gender: gender,
                    status: status
                }
            });
            const { createUser } = useUsersApi();
            let user: User | undefined;
            //execute method getUsers inside act and with await to be able assert the result
            await act(async () => {
                user = await createUser({
                    "name": name,
                    "email": email,
                    "gender": gender,
                    "status": status
                });
            });

            expect(axiosSpy).toBeCalled();
            expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME,
                {
                    "email": email,
                    "gender": gender,
                    "name": name,
                    "status": status
                },
                {
                    "headers": {
                        "Accept": "application/json",
                        "Authorization": "Bearer 5b9a3ce53fb41e021ffdd64e4d8400062ab2e8885bfdce2c55bb351099919773",
                        "Content-Type": "application/json"
                    }
                });

            expect(user).toBeDefined();
            expect(user!.email).toBe(email);
            expect(user!.name).toBe(name);
            expect(user!.gender).toBe(gender);
            expect(user!.status).toBe(status);
            expect(user!.id).toBe(id);
        });
        test("When call api to create a user and the response is different from 201 should throw exception", async () => {
            //Mock request service
            const axiosSpy = jest.spyOn(axios, "post");
            axiosSpy.mockResolvedValue({
                "status": 400, "message": "Something"
            });
            const { createUser } = useUsersApi();

            return expect(createUser({
                "name": "name",
                "email": "email",
                "gender": "gender",
                "status": "status"
            })).rejects.toEqual(new Error(ERROR_MSG_NOT_SUCCESS));

        });
    });

    describe("updateUser", () => {
        test("When its call the API to update the user with success should return the user data updated", async () => {
            const name = "Amalia";
            const email = "Amalia@fado.com";
            const gender = "female";
            const status = "inactive";
            const id = 3909;

            //Mock request service
            const axiosSpy = jest.spyOn(axios, "patch");
            axiosSpy.mockResolvedValue({
                "status": 200, data: {
                    id: id,
                    name: name,
                    email: email,
                    gender: gender,
                    status: status
                }
            });
            const { updateUser } = useUsersApi();
            let user: User | undefined;
            //execute method getUsers inside act and with await to be able assert the result
            await act(async () => {
                user = await updateUser({
                    "id": id,
                    "name": name,
                    "email": email,
                    "gender": gender,
                    "status": status
                });
            });

            expect(axiosSpy).toBeCalled();
            expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME + '/' + id,
                {
                    "email": email,
                    "name": name,
                    "status": status
                },
                {
                    "headers": {
                        "Accept": "application/json",
                        "Authorization": "Bearer 5b9a3ce53fb41e021ffdd64e4d8400062ab2e8885bfdce2c55bb351099919773",
                        "Content-Type": "application/json"
                    }
                });

            expect(user).toBeDefined();
            expect(user!.email).toBe(email);
            expect(user!.name).toBe(name);
            expect(user!.gender).toBe(gender);
            expect(user!.status).toBe(status);
            expect(user!.id).toBe(id);
        });
        test("When call api to update a user and the response is different from 200 should throw exception", async () => {
            //Mock request service
            const axiosSpy = jest.spyOn(axios, "patch");
            axiosSpy.mockResolvedValue({
                "status": 400, "message": "Something"
            });
            const { updateUser } = useUsersApi();

            return expect(updateUser({
                "id": "id",
                "name": "name",
                "email": "email",
                "status": "status"
            })).rejects.toEqual(new Error(ERROR_MSG_NOT_SUCCESS));

        });
    });

    describe("deleteUser", () => {
        test("When its call the API to delete the user with success should not throw exception", async () => {

            const id = "11111";
            //Mock request service
            const axiosSpy = jest.spyOn(axios, "delete");
            axiosSpy.mockResolvedValue({
                "status": 204, data: {}
            });
            const { deleteUser } = useUsersApi();

            //execute method getUsers inside act and with await to be able assert the result
            await act(async () => {
                await deleteUser(id);
            });

            expect(axiosSpy).toBeCalled();
            expect(axiosSpy).toBeCalledWith(API_BASE_PATH + USER_RESOURCE_NAME + '/' + id,
                {
                    "headers": {
                        "Accept": "application/json",
                        "Authorization": "Bearer 5b9a3ce53fb41e021ffdd64e4d8400062ab2e8885bfdce2c55bb351099919773",
                        "Content-Type": "application/json"
                    }
                });
        });
        test("When call api to delete a user and the response is different from 204 should throw exception", async () => {
            //Mock request service
            const axiosSpy = jest.spyOn(axios, "delete");
            axiosSpy.mockResolvedValue({
                "status": 400, "message": "Something"
            });
            const { deleteUser } = useUsersApi();

            return expect(deleteUser("id")).rejects.toEqual(new Error(ERROR_MSG_NOT_SUCCESS));
        });
    });
});