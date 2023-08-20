import DispensaryReport from "../../Containers/Reports/Dispensary";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <DispensaryReport/>
          <DashFooter/>
          </>);
}

export default index;