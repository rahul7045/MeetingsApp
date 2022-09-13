function loginUser(credentials) {
    return fetch(`https://mymeetingsapp.herokuapp.com/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
        .then(function (reslogin) {
        localStorage.setItem("name", reslogin.name);
        localStorage.setItem("email", reslogin.email);
        localStorage.setItem("token", reslogin.token);
        return reslogin;
    });
}
function getToken() {
    return localStorage.getItem("token");
}
function getName() {
    return localStorage.getItem("name");
}
function getEmail() {
    return localStorage.getItem("email");
}
export { loginUser, getToken, getName, getEmail };
//# sourceMappingURL=auth-login.js.map