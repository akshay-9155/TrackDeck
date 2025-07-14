class ApiResponse {
    constructor(statusCode, data = null, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
