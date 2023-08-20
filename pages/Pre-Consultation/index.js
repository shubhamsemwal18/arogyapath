import { PreConsultation } from "../../Containers/Pre-Consultation Management";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <PreConsultation/>
          <DashFooter/>
          </>);
}

export default index;