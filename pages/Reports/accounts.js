import AccountsReport from "../../Containers/Reports/Accounts";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <AccountsReport/>
          <DashFooter/>
          </>);
}

export default index;