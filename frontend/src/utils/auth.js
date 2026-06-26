export const getToken = () => {
    return localStorage.getItem(
        "access_token"
    );
};

export const getRole = () => {
    return localStorage.getItem(
        "role"
    );
};

export const isAuthenticated = () => {
    return !!getToken();
};