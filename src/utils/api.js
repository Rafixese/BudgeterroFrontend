const BASE_URL = "http://127.0.0.1:8000"

const login_api = (formdata) => {
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return fetch(BASE_URL+"/auth/token/", requestOptions)
}

const signup_api = (formdata) => {
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return fetch(BASE_URL+"/auth/users/", requestOptions)
}

export {login_api, signup_api}