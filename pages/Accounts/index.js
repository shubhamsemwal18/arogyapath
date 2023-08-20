import AccountsManagement from "../../component/Accounts";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <AccountsManagement/>
          <DashFooter/>  
        </>);
}

export default index;