import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://burger-builder-9c12f-default-rtdb.firebaseio.com/'
});

export default instance;