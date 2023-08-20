import FormStyle from '../../../css/form.module.css';
import Link from 'next/link';
import customModalStyle from '../../../css/customModal.module.css'
import { GiMedicines } from 'react-icons/gi';
import { HiDotsVertical } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi'
import { AiFillMedicineBox } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import * as ACTIONS from './action'
import * as CommonAction from '../../../Common Api Calls/commonAction'


function UserManagement() {

  let [haveResponse, setHaveResponse] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [isSubmiting,setIsSubmiting] = useState(false)
  let { addToast } = useToasts();
  let [listView, setListView] = useState(true);
  let [currentMode, setCurrentMode] = useState('');

  let [allUsers, setAllUsers] = useState([]);
  let [allRoles, setAllRoles] = useState([]);

  let [userPayload, setUserPayload] = useState({
        firstname : '',
        lastname : '',
        userName : '',
        mobile : '',
        designation : '',
        identification : '',
        role : '',
        password : '',
        confirmPassword : '',
  })


  let dispatch = useDispatch();

  const state = useSelector((state) => state.UserManagementReducer);
  const CommonState = useSelector((state) => state.commonReducer);


  useEffect(() => {
    setIsLoading(true)
    dispatch(ACTIONS.getAllUsers())
  }, [state.createUserSuccess])

  useEffect(()=>{
    dispatch(ACTIONS.getAllRoles())
  },[])

  useEffect(() => {
    if (state.getAllUsersSuccess) {
        setIsLoading(false)
        setAllUsers(state.getAllUsersSuccess.users)
        addToast("Success!", {
          appearance: "success",
          content: `Get all users Success.`,
        });
    }
    if (state.getAllUsersFailure) {
      setIsLoading(false)
        addToast("Error!", {
            appearance: "error",
            content: `Unable to get all users.`,
          });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getAllUsersSuccess, state.getAllUsersFailure])

  useEffect(() => {
    if (state.getAllRolesSuccess) {
        setAllRoles(state.getAllRolesSuccess.roles)
        addToast("Success!", {
          appearance: "success",
          content: `Get all roles Success.`,
        });
    }
    if (state.getAllRolesFailure) {
      addToast("Error!", {
        appearance: "error",
        content: `Unable to get roles.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.getAllRolesSuccess, state.getAllRolesFailure])


  useEffect(() => {
    if (state.createUserSuccess) {
        setUserPayload({
            firstname : '',
            lastname : '',
            userName : '',
            mobile : '',
            designation : '',
            identification : '',
            role : '',
            password : '',
            confirmPassword : '',
      })
      setHaveResponse(true);
      setIsSubmiting(false)
      
      addToast("Success!", {
        appearance: "success",
        content: `User created Successfully.`,
      });
    }
    if (state.createUserFailure) {
      
     setIsSubmiting(false)
      addToast("Error!", {
        appearance: "error",
        content: `Unable to create user.`,
      });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.createUserSuccess, state.createUserFailure])

  let handleChange = (e) => {
    let userPayloadCopy = { ...userPayload };
    userPayloadCopy[e.target.id] = e.target.value;
    setUserPayload(userPayloadCopy);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmiting(true)

    if(currentMode === 'Edit'){
      dispatch(ACTIONS.updateUsers(userPayload))
    }
    else{
      if(currentMode !== 'view'){
        dispatch(ACTIONS.createUsers(userPayload))
      }
    }
      
    
  }

  let enableForm = () => {
    
    setUserPayload({
      firstname : '',
      lastname : '',
      userName : '',
      mobile : '',
      designation : '',
      identification : '',
      role : '',
      password : '',
      confirmPassword : '',
    })
    setCurrentMode('')
    setListView(false);
    setIsSubmiting(false)
  }

  let disabledForm = () =>{
    setListView(true);
  }

  let closeModal = () => {
    setHaveResponse(false);
    setListView(true)
    setCurrentMode('')
  }

  let changeMode = (index,mode)=>{
    setCurrentMode(mode)
    setUserPayload(allUsers[index])
    setListView(false)
  }

  useEffect(() => {
    if (state.updateUserSuccess) {
      setUserPayload({
        firstname : '',
        lastname : '',
        userName : '',
        mobile : '',
        designation : '',
        identification : '',
        role : '',
        password : '',
        confirmPassword : '',
      })
      setIsLoading(true)
      setCurrentMode('')
      setListView(true)
      setIsSubmiting(false)
      dispatch(ACTIONS.getAllUsers())
      addToast("Success!", {
        appearance: "success",
        content: `user updated Successfully.`,
      });
    }
    if (state.updateUserFailure) {
      setIsSubmiting(false)
        addToast("Error!", {
            appearance: "error",
            content: `Unable to update user.`,
          });
    }

    dispatch(ACTIONS.resetToInitialState())

  }, [state.updateUserSuccess, state.updateUserFailure])

  return (
    <section className={FormStyle.commonFormArea}>
      <div className="container">
        <div className="row">
          <>
            {haveResponse &&
              <div className={customModalStyle.customModalLayout}>
                <div className={customModalStyle.customModalBox}>
                  <p className='text-center text-success'>User Created Successfully.</p>
                  <button type='button' className='btn btn-success' onClick={() => closeModal()}>Ok</button>
                </div>
              </div>
            }
            <div className="col-lg-8 ">
              <div className={FormStyle.commonFormWrapper}>
                <div className="row">
                  
                  <div className="col-md-8">
                    <h1 className={FormStyle.formTitle}>
                      <span className={FormStyle.formTitlelogo}>
                        <GiMedicines />
                      </span>
                      User Information
                    </h1>
                  </div>
                  {listView ? <>

                    <div className='col-lg-4 text-end'>
                      <button type='button' className='common-gradient' onClick={() => enableForm()}><BiPlus /> Add New</button>
                    </div>


                    <div className='col-md-12'>
                      <div className={FormStyle.formCommonUnderline}></div>
                    </div>
                    
                    
              

                    <div className="col-md-12">
                      <div className={FormStyle.allListTable}>
                        {allUsers.length > 0 ? <table>
                          <tr className={FormStyle.allListTableHeadings}>
                            <th> Name</th>
                            <th> Mobile </th>
                            <th> designation </th>
                            <th className={FormStyle.allListTableActionList}></th>
                          </tr>
                          {
                            allUsers.map((item, index) => {
                              return (
                                <tr className={FormStyle.allListTableSingleRow}>
                                  <td>{item.firstname} {item.lastname}</td>
                                  <td>{item.mobile}</td>
                                  <td>{item.designation}</td>
                                  <td className={FormStyle.allListTableActionList}>
                                    <ul className={FormStyle.actionList}>
                                      <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          <HiDotsVertical />
                                        </span>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                          <li>
                                            <div>
                                              <span className="dropdown-item" onClick={()=>changeMode(index,'view')}>View</span>
                                            </div>
                                          </li>
                                          <li>
                                          <div>
                                              <span className="dropdown-item" onClick={()=>changeMode(index,'Edit')}>Edit</span>
                                            </div>
                                          </li>
                                          <li>
                                            <div>
                                                <span className="dropdown-item">Delete</span>
                                            </div>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </table>
                          :
                          <>
                            <p>No data found</p>
                          </>}

                      </div>
                    </div>
                  </>
                    : <>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                      <div className='row'>
                        <div className='col-md-12'>
                           <div className={FormStyle.formCommonUnderline}></div>
                        </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='firstname'>
                            First Name
                          </label>
                          <input type="text" id="firstname" value={userPayload.firstname} onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='lastname'>
                            Last Name
                          </label>
                          <input type="text" id="lastname" value={userPayload.lastname} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='mobile'>
                            Mobile
                          </label>
                          <input type="text" id="mobile" value={userPayload.mobile} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='role'>
                            Role
                          </label>
                          <select className='form-select' id="role" value={userPayload.role}  onChange={(e) => handleChange(e)} required disabled={currentMode === 'view'}>
                                <option value="" disabled hidden>select role.</option>
                                {allRoles.length > 0 ? ( allRoles.map((item)=>{
                                    return <option value={item.id}>{item.title}</option>
                                })) : <option disabled>No role found</option>}
                            </select> 
                          {/* <input type="text" id="role" value={userPayload.role} onChange={(e) => handleChange(e)} /> */}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='designation'>
                            Designation
                          </label>
                          <input type="text" id="designation" value={userPayload.designation} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='identification'>
                            Identification
                          </label>
                          <input type="text" id="identification" value={userPayload.identification} onChange={(e) => handleChange(e)} disabled={currentMode === 'view'}/>
                        </div>
                      </div>
                      {currentMode !== 'view' && 
                      <>  
                      { currentMode === '' && 
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='userName'>
                            User Name
                          </label>
                          <input type="text" id="userName" value={userPayload.userName} onChange={(e) => handleChange(e)} />
                        </div>
                      </div>
                      }
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='password'>
                            {currentMode === 'Edit' && 'New'} Password
                          </label>
                          <input type="text" id="password" value={userPayload.password} onChange={(e) => handleChange(e)} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={FormStyle.feildWrapper}>
                          <label htmlFor='confirmPassword'>
                            Confirm Password
                          </label>
                          <input type="password" id="confirmPassword" value={userPayload.confirmPassword} onChange={(e) => handleChange(e)} />
                        </div>
                      </div>
                      </>
                      }
                      <div className="col-md-12">
                      {currentMode !== 'view' &&
                        <button type="submit" className={FormStyle.formButton} disabled={isSubmiting}>
                         {currentMode === 'Edit' ? 'Update' : 'Submit'}
                        </button>
                      }
                        <button type="button" className={`${FormStyle.formButtonPrev} ms-4`} onClick={()=>disabledForm()}>Cancel</button>
                      </div>
                      </div>
                      </form>
                    </>
                  }
                </div>
              </div>
            </div>

          </>

          <div className="col-lg-4">
            <div className={FormStyle.sideInfoBox}>
              <div className={FormStyle.upper}>
                <h2 className={FormStyle.sideTitle}>
                  <AiFillMedicineBox />
                  Users
                </h2>
              </div>
              <div className={FormStyle.lower}>
                <p className="common-para">

                  Contrary to popular belief, Lorem Ipsum is not simply random text.
                  It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the word in classical literature,

                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                  This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..',
                  comes from a line in section 1.10.32.

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserManagement