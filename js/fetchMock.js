
export const fetchMockUsers = async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


