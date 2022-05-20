import { User } from "../types/User.type";
import useUsers from "./useUsers";

const mockGetUsers = jest.fn();
jest.mock("../api/usersApi", () => ({
    __esModule: true,
    default: () => ({
        getUsers: mockGetUsers,
    }),
}));


describe("useUsers.ts", () => {
    test("When xxxxxxx", async () => {
        mockGetUsers.mockResolvedValue([{
            id: 3909,
            name: 'Bianca',
            email: 'iyengar_vrinda@metz.com',
            gender: 'male',
            status: 'inactive'
        }, {
            id: 3902,
            name: 'Adrian',
            email: 'iyengar_vrinda@metz.com',
            gender: 'male',
            status: 'inactive'
        }, {
            id: 3902,
            name: 'Tianca',
            email: 'iyengar_vrinda@metz.com',
            gender: 'male',
            status: 'inactive'
        }, {
            id: 3910,
            name: 'Ana',
            email: 'test@metz.com',
            gender: 'female',
            status: 'active'
        }]);
        const { getUsersGroupAlphabetic } = useUsers();

        const result: Map<string, Array<User>> = await getUsersGroupAlphabetic();
        expect(result).not.toBeUndefined();

        const keys: Array<string> = Array.from(result.keys());
        expect(keys.length).toBe(3);
        expect(keys[0]).toBe('A');
        const usersA: Array<User> | undefined = result.get(keys[0]);
        expect(usersA).not.toBeUndefined();
        expect(usersA!.length).toBe(2);
        expect(keys[1]).toBe('B');
        const usersB: Array<User> | undefined = result.get(keys[1]);
        expect(usersB!.length).toBe(1);
        expect(keys[2]).toBe('T');
        const usersT: Array<User> | undefined = result.get(keys[2]);
        expect(usersT!.length).toBe(1);
    });
});