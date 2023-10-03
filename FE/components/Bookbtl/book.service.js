import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

class LoginService {

    saveBook(book) {
        return axios.post(BASE_API_URL + "/editbook/0", book);
    }

    getAllBook() {
        return axios.get(BASE_API_URL + "/books");
    }

    getBookById(id) {
        return axios.get(BASE_API_URL + "/book/" + id);
    }

    deleteBook(id) {
        return axios.get(BASE_API_URL + "/deletebook/" + id);
    }

    updateBook(id, book) {
        return axios.post(BASE_API_URL + "/updatebook/" + id, book);
    }
    
}

export default new LoginService();