import PatientProfileStyle from "../../css/Profile.module.css";
import PatientDashboardStyle from '../../css/PatientDashboard.module.css';
import { CommonText } from "../../Multi_Lang";
import FormStyle from "../../css/form.module.css";
import { RiBarChartHorizontalFill } from 'react-icons/ri'
import { AiOutlineUser, AiFillCaretDown } from 'react-icons/ai' 
import userDetail from "../../Utils/userDetails";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
  let [userDetails, setUserDetails] = useState({})
  const cookies = new Cookies();

  let handleLogout = () => {
    cookies.remove('Arogya_Path_token');
    cookies.remove('Arogya_Path_Role');
    Router.push('/login')
  }

  useEffect(() => {
    let result = userDetail();
    setUserDetails(result);
  }, [])


  const redirectHome = () =>{
    Router.push('/');
}
  return (
    <>
    <header className={PatientDashboardStyle.dashboardHeader}>
          <nav className="navbar navbar-expand-lg py-0">
            <div className="container-fluid px-0">
              <button type="button" className='btn' onClick={()=>redirectHome()}>
                <div className='d-flex'>
                  <div className='me-3'>
                    <Image src="/images/logo.png" alt="aboutpic" width={30} height={30} />
                  </div>
                  <h1 className='fs-4 mb-0 text-dark'><CommonText en="Arogyapath" hi="आरोग्यपथ" />
                  </h1>
                </div>
              </button>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <RiBarChartHorizontalFill />
                </span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarSupportedContent"
              >
                <form className="d-flex w-100 justify-content-md-start justify-content-lg-end  pb-lg-0 pb-md-0 pb-2">
                  <div className="nav-item dropdown">
                    <span
                      className=
                      {`${PatientDashboardStyle.DropdownToggle} text-decoration-none  p-0 `}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className={`${PatientDashboardStyle.UserName} me-2`}>
                        {userDetails && userDetails.data && userDetails.data.userName.name}
                      </span>
                      <span className={PatientDashboardStyle.UserIcon}>
                        <AiOutlineUser />
                      </span>
                      <span className=" me-2 fs-6 text-dark">
                        <AiFillCaretDown />
                      </span>

                    </span>
                    <ul
                      className=
                      {`${PatientDashboardStyle.UserDropdown} dropdown-menu`}

                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <button
                        type='button'
                          className="dropdown-item "
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          type='button'
                          className="dropdown-item "
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </header>
      <section className={`f1 ${FormStyle.commonFormArea} ${PatientProfileStyle.header_spacing}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className={FormStyle.commonFormWrapper}>
                <div className="row pt-2">
                  <div className="col-md-4 pb-4">
                    <div className={PatientProfileStyle.imageBox}>
                      <Image
                        src="/images/patientpic1.jpeg"
                        alt="aboutpic"
                        layout="fill"
                      />
                      <div className={PatientProfileStyle.upload_icon}>
                        <MdModeEdit/><input type="file"/>
                      </div>
                    </div>
                    <div className={FormStyle.btnBox}>
                      <button
                        type="button"
                        className={`d-none ${PatientProfileStyle.formButton} ${PatientProfileStyle.imageWrapper}`}
                      >
                        Upload
                        <input
                          type="file"
                          className="form-control ps-2"
                          id="faceImg"
                        />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`col-md-8 d-flex justify-content-center flex-column ${PatientProfileStyle.PatientDetail}`}
                  >
                    <h4>...........</h4>
                    <p>
                      Email : <span>abc@example.com</span>
                    </p>
                    <p>
                      Mobile : <span>+91 1234567890</span>
                    </p>
                  </div>
                </div>
                <div className={`row pt-3 ${PatientProfileStyle.customTabBox}`}>
                  <div className="col-md-12">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`active ${PatientProfileStyle.tab_color}`}
                          id="pills-personal-details-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-personal-details"
                          type="button"
                          role="tab"
                          aria-controls="pills-personal-details"
                          aria-selected="true"
                        >
                          Personal Details
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={PatientProfileStyle.tab_color}
                          id="pills-physical-details-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-physical-details"
                          type="button"
                          role="tab"
                          aria-controls="pills-physical-details"
                          aria-selected="false"
                        >
                          Physical Details
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={PatientProfileStyle.tab_color}
                          id="pills-address-details-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-address-details"
                          type="button"
                          role="tab"
                          aria-controls="pills-address-details"
                          aria-selected="false"
                        >
                          Address Details
                        </button>
                      </li>
                    </ul>
                    <div
                      className={`tab-content p-4 ${PatientProfileStyle.tab_border}`}
                      id="pills-tabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="pills-personal-details"
                        role="tabpanel"
                        aria-labelledby="pills-personal-details-tab"
                      >
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Full Name</label>
                            </div>
                            <div className="col-md-6">
                              <span>......... .........</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Identification number</label>
                            </div>
                            <div className="col-md-6">
                              <span>SRH16003013</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Registration number</label>
                            </div>
                            <div className="col-md-6">
                              <span>DD16003013</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Date of birth</label>
                            </div>
                            <div className="col-md-6">
                              <span>16/02/2000</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Gender</label>
                            </div>
                            <div className="col-md-6">
                              <span>Male</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Age</label>
                            </div>
                            <div className="col-md-6">
                              <span>23</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Mother Name</label>
                            </div>
                            <div className="col-md-6">
                              <span>Example</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Father Name</label>
                            </div>
                            <div className="col-md-6">
                              <span>Example</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Occupation</label>
                            </div>
                            <div className="col-md-6">
                              <span>Example</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-physical-details"
                        role="tabpanel"
                        aria-labelledby="pills-physical-details-tab"
                      >
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Weight</label>
                            </div>
                            <div className="col-md-6">
                              <span>65</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Height</label>
                            </div>
                            <div className="col-md-6">
                              <span>177</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-address-details"
                        role="tabpanel"
                        aria-labelledby="pills-address-details-tab"
                      >
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Place of birth</label>
                            </div>
                            <div className="col-md-6">
                              <span>Dehradun</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>City</label>
                            </div>
                            <div className="col-md-6">
                              <span>Dehradun</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>State</label>
                            </div>
                            <div className="col-md-6">
                              <span>Uttarakhand</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Pincode</label>
                            </div>
                            <div className="col-md-6">
                              <span>248140</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Address 1</label>
                            </div>
                            <div className="col-md-6">
                              <span>Dehradun</span>
                            </div>
                          </div>
                        </div>
                        <div className={PatientProfileStyle.details}>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Address 2</label>
                            </div>
                            <div className="col-md-6">
                              <span>Dehradun</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
