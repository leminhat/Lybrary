import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

class LoginService {

    saveLogin(login) {
        return axios.post(BASE_API_URL + "/editlogin/0", login);
    }

    getAllLogin() {
        return axios.get(BASE_API_URL + "/logins");
    }

    getLoginById(id) {
        return axios.get(BASE_API_URL + "/login/" + id);
    }

    deleteLogin(id) {
        return axios.get(BASE_API_URL + "/deletelogin/" + id);
    }

    updateLogin(id, login) {
        return axios.post(BASE_API_URL + "/updatelogin/" + id, login);
    }
    saveDangNhap(login) {
        return axios.post(BASE_API_URL + "/dangnhap", login);
    }
}

export default new LoginService();