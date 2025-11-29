import {localStorageUtils} from "./localStorageUtils.js";
import {fetchMockUsers} from "./fetchMock.js";

const userLocalStorageKey = "userList";
export const startUp = async () => {
    const data = localStorageUtils.get(userLocalStorageKey);

    if (data) {
        return data;
    }

    const newData = await fetchMockUsers();
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
    localStorageUtils.set(userLocalStorageKey, newArray);
    return newArray;
}



export const updateUserById = (id, users, newData)=>{
    if (!users || !Array.isArray(users)) return null;
    
    const update_index = users.indexOf(user=> user.id == id)
    users[update_index] = newData;
    
    localStorageUtils.set(userLocalStorageKey, users);

    return users;
}

export const addUser = (users,newData)=>{
    const data = localStorageUtils.get(userLocalStorageKey);
    if (!users || !Array.isArray(users)) return null;   
    
    data.append(newData)

    localStorageUtils.set(userLocalStorageKey, data);

    return users

}
