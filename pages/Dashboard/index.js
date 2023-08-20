import Dashboard from "../../component/Dashboard/dashboard";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <Dashboard/>
          <DashFooter/>
          
          
          </>);
}

export default index;