import { useState, useEffect } from "react";
import Link from 'next/link';
import { CgArrowLongRight } from 'react-icons/cg';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai';
import { LoginPage } from "../../MultiLanguageFiles/loginPage";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from './action'
import Router from 'next/router';
import Image from 'next/image';
import Cookies from "universal-cookie";
import loginStyle from '../../css/login.module.css';


const Login = () =>{

    let [passwordHide,setPasswordHide] = useState(true);
    let [passwordType,setPasswordType] = useState('password');
    let [loginLoader,setLoginLoader] = useState(false);
    let [userNameError,setUserNameError] = useState('');
    let [passwordError,setPasswordError] = useState('');

    const cookies = new Cookies();

    var jwt = require('jsonwebtoken');
    
    const state = useSelector((state) => state.LoginReducer);
   
    let dispatch = useDispatch()

    let [LoginPayload,setLoginPayload] = useState({
        userName:'',
        password:'',
    });


    
  useEffect(() => {
    setLoginLoader(false);
    if (state && state.userLoginFailure) {
        if(state.userLoginFailure.errors){
            if(state.userLoginFailure.errors){
                if(state.userLoginFailure.errors.userName){
                    setUserNameError(state.userLoginFailure.errors.userName[0]);
                }
                if(state.userLoginFailure.errors.password){
                    setPasswordError(state.userLoginFailure.errors.password[0]);
                }
            }
        }
        else{
            if(state.userLoginFailure.message){
                setPasswordError(state.userLoginFailure.message);
            }
        }
    }
        if(state && state.userLoginSuccess){
            if(state.userLoginSuccess.token){

                let jwtToken = jwt.sign({
                    data:state.userLoginSuccess},
                    process.env.NEXT_PUBLIC_SECRETKEY,
                    {
                    expiresIn: 86400 // expires in 24 hours
                })

                cookies.set('Arogya_Path_token',jwtToken,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});


                if(state.userLoginSuccess.role === 'Admin'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_ADMIN}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Dashboard');  
                }
                if(state.userLoginSuccess.role === 'Reception'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_RECEPTION}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/PatientManagement');  
                }
                if(state.userLoginSuccess.role === 'Pre-Consultation'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_PRECONSULTATION}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Pre-Consultation');  
                }
                
                if(state.userLoginSuccess.role === 'Consultation'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_CONSULTATION}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Consultation');  
                }

                if(state.userLoginSuccess.role === 'Dispensary'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_DISPENSARY}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Dispensary');  
                }

                if(state.userLoginSuccess.role === 'Accounts'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_ACCOUNTS}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Accounts');  
                }

                if(state.userLoginSuccess.role === 'Helpdesk'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_HELPDESK}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/Helpdesk');  
                }
                if(state.userLoginSuccess.role === 'Patient'){
                    cookies.set('Arogya_Path_Role',`${process.env.NEXT_PUBLIC_PATIENT}`,{sameSite:'strict',path:'/',expires: new Date(new Date().getTime()+60*60*24*1000)});
                    Router.push('/PatientDashboard');  
                }
                
                
            }
            else{
                setPasswordError('Token Not Found.');
            }
        }


        dispatch(ACTIONS.resetToInitialState());

  }, [state.userLoginFailure,state.userLoginSuccess ]);


    const onChangeHandler = (e) =>{
        let loginPayloadCopy = {...LoginPayload};
        loginPayloadCopy[e.target.id] = e.target.value;

        setLoginPayload(loginPayloadCopy);
    }

    const loginFormSubmit = (e) =>{
        
        e.preventDefault();
        setUserNameError('');
        setPasswordError('');

        setLoginLoader(true);
        dispatch(ACTIONS.appLogin(LoginPayload));
    
    }

    const showPassword = () =>{
        setPasswordType('text');
        setPasswordHide(false);
    }

    const hidePassword = () =>{
        setPasswordType('password');
        setPasswordHide(true);
    }

    const redirectHome = () =>{
        Router.push('/');
    }

    return<>
    <section className={loginStyle.loginPageLayout}>
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-md-6  d-none  d-md-block  ">
                    <div className="d-flex align-items-center justify-content-center h-100 d-md-flex d-none">
                        <div className={loginStyle.loginContent}>
                            {/* <Image src='/images/ArogyaPath.png' alt='arogyaPath-Logo' height={200} width={200}/> */}
                            <Image src="/images/logo.png" alt='arogyaPath-Logo' width={180} height={180} /> 
                            <h2 className="dark-green-color h2 mt-2"><LoginPage keyword="welcome" labelContent="Welcome to Arogyapath"/></h2>
                            <p className="light-green-color"><LoginPage keyword="applicationV" labelContent="Application v1.0"/></p>
                            <button type="button" onClick={()=>redirectHome()}><LoginPage keyword="backToHome" labelContent="Back to home"/></button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 dark-green-bg d-flex justify-content-center align-items-center ">
                    <form onSubmit={(e) =>loginFormSubmit(e)} >
                        <div className={loginStyle.loginFormLayout}>
                            <h2 className="text-white h3x"><LoginPage keyword="signIn" labelContent="Sign In"/></h2>
                            <p  className="text-white mb-5 h8"><LoginPage keyword="letStart" labelContent="Hello! Let's get started"/></p>
                            <div className={`form-group ${loginStyle.loginForm}`}>
                                <label htmlFor="userName">
                                <LoginPage keyword="userName" labelContent="Registration No / Mobile No"/>
                                </label>
                                <input type="text" id="userName" onChange={(e) =>onChangeHandler(e)} required/>
                                <FaUserAlt/>
                            </div>
                            {userNameError != '' && <span className="formErrors">{userNameError}</span>}
                            <div className={`form-group mt-3 ${loginStyle.loginForm}`}>
                                <label htmlFor="password">
                                <LoginPage keyword="password" labelContent="Password"/>
                                </label>
                                
                                <input type={passwordType} id="password" onChange={(e) =>onChangeHandler(e)} required/>
                                {passwordHide ?<span className={loginStyle.passwordIcons} onClick={() => showPassword()}> <BsFillEyeSlashFill/></span> : <span className={loginStyle.passwordIcons} onClick={() => hidePassword()}> <BsFillEyeFill/></span>}
                            </div>
                            {passwordError != '' && <span className="formErrors">{passwordError}</span>}
                            <div className="form-group my-5 px-3">
                                {/* <div className="row">
                                    <div className="col-md-6 text-center">
                                        <div className={`form-check ${loginStyle.loginForm}`}>
                                            <input type="checkbox" id="remember" className="form-check-input"/>
                                            <label htmlFor="remember" className="form-check-label">
                                            <LoginPage keyword="remeber" labelContent="Remember Me"/><AiOutlineCheck/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`form-group d-flex justify-content-center ${loginStyle.loginForm}`}>
                                            <Link href="/">
                                                <a className="forgot"><LoginPage keyword="forgotPassword" labelContent="Forgot Password?"/></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className={`form-group d-md-flex d-block justify-content-center ${loginStyle.loginForm}`}>
                                <div className="col-md-6">
                                    <button type="submit">
                                        {loginLoader ?<LoginPage keyword="loginLoader" labelContent="Login ..."/>: 
                                        <><span className="me-lg-2 me-xl-0 me-xxl-0 me-md-4 me-sm-3"><LoginPage keyword="login" labelContent="Login"/><CgArrowLongRight/></span></>}
                                        </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </>;
}

export default Login;