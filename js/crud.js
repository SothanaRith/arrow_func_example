import {localStorageUtils} from "./localStorageUtils.js";
import {fetchMockUsers} from "./fetchMock.js";

const userLocalStorageKey = "userList";
export const startUp = async () => {
    const data = localStorageUtils.get(userLocalStorageKey)
    if (data) {
        return data.users;
    }
    const newData = await fetchMockUsers();
    localStorage.setItem(userLocalStorageKey, newData.users);
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
    localStorageUtils.set(userLocalStorageKey, newArray);
    return newArray;
}

