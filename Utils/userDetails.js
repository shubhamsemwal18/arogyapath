import Cookies from "universal-cookie";
import Router from "next/router";

export default function userDetail(){
    let cookies = new Cookies;
    const jwt = require('jsonwebtoken');
    let token = cookies.get('Arogya_Path_token');

    let userDetails = jwt.decode(token)
    if(userDetails === null){
        Router.push('/login')
    }
    else{
        return userDetails;
    }
}