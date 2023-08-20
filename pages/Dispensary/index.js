import DispensaryManagement from "../../component/Dispensary Management";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <DispensaryManagement/>
          <DashFooter/>
          
          
          </>);
}

export default index;