import {localStorageUtils} from "./localStorageUtils.js";
import {fetchMockUsers} from "./fetchMock.js";

const userLocalStorageKey = "userList";
export const startUp = async () => {
    const data = localStorageUtils.get(userLocalStorageKey);

    if (data) {
        return data;
    }

    const newData = await fetchMockUsers();
    console.log(newData)
    localStorageUtils.set(userLocalStorageKey, newData);
    return newData;
}
export const getUserById = (id) => {
    const data = localStorageUtils.get(userLocalStorageKey);

    if (!data || !Array.isArray(data.users)) return null;

    return data.users.find((user) => user.id === id) || null;
};

export const deleteUserById = (id, users) => {
    if (!users || !Array.isArray(users)) return null;
    const newArray = [...users.filter(item => item.id !== id)];
    localStorageUtils.set(userLocalStorageKey, {users: newArray});
    return newArray;
}



export const updateUserById = async (newData)=>{
    let users = await startUp();
    if (!users) return null;

    const update_index = users.users.findIndex(user=> user.id === newData.id)
    users.users[update_index] = newData;
    localStorageUtils.set(userLocalStorageKey, users);

    return users;
}

export const addUser = async (newData)=>{
    let users = await startUp();
    if (!users.users || !Array.isArray(users.users)) return null;

    users.users.push(newData)

    localStorageUtils.set(userLocalStorageKey, users);

    return users

}
