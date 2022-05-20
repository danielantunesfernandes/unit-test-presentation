import UsersApi from "../api/usersApi";
import { User } from "../types/User.type";


type UseUsers = {
    getUsersGroupAlphabetic: () => Promise<Map<string, Array<User>>>;
};


function useUsers(): UseUsers {

    function parseUsersAlphabetical(users: User[]): Map<string, Array<User>> {
        const result: Map<string, Array<User>> = new Map();
        users
            .filter((user: User) => user.name)
            .sort(function (a, b) {
                return a.name.localeCompare(b.name);
            }).forEach((user: User) => {
                const firstLetter = user.name[0].toUpperCase();
                if (result.has(firstLetter)) {
                    result.get(firstLetter)?.push(user);
                } else {
                    result.set(firstLetter, [user]);
                }
            });
        return result;
    }

    const getUsersGroupAlphabetic = async function (): Promise<Map<string, Array<User>>> {
        const { getUsers } = UsersApi();
        const users: Array<User> = await getUsers();

        return parseUsersAlphabetical(users);
    }
    return { getUsersGroupAlphabetic };


}


export default useUsers;