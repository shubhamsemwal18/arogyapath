import UserManagement from "../../../Containers/Configuration/User Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const users = () =>{
    return (<>
                <DashboardHeader/>
                <UserManagement/>
                <DashboradFooter/>
            </>);
}

export default users;