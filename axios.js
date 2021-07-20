import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://jsonplaceholder.typicode.com'
    baseURL: 'https://hearth-5d9ff-default-rtdb.firebaseio.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;