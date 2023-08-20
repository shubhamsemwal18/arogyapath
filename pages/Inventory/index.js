import InventoryManagement from "../../Containers/Configuration/Inventory";
import  DashboardHeader  from "../../layouts/DashboardHeader";
import DashFooter from '../../layouts/DashboradFooter';

const index  = () =>{
  return(<>
          <DashboardHeader/>
          <InventoryManagement/>
          <DashFooter/>
          
          </>);
}

export default index;