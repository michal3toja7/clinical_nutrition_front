
export default function handleResponse(error) {
    if (error.response.status === 401) {
        return {error: "401"}
    }

    if (error.response.status === 403) {
        return {error: "403"}
    }
}