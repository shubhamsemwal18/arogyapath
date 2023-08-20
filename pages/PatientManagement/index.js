import Patient from "../../component/Patient Management";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <Patient/>
          <DashFooter/>
          </>);
}

export default index;