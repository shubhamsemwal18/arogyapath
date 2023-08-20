import Cookies from "universal-cookie";

export function GetHeaders() {
    let cookies = new Cookies;
    const jwt = require('jsonwebtoken');
    let token = cookies.get('Arogya_Path_token');

    let userDetails = jwt.decode(token)

    let headers = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        }
    };
    userDetails && userDetails.data && (headers.headers["authorization"] = `Bearer ${userDetails.data.token}`);
    return headers

}