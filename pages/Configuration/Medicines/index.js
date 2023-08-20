import MedicineManagement from "../../../Containers/Configuration/Medicine Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const medicines = () =>{
    return (<>
                <DashboardHeader/>
                <MedicineManagement/>
                <DashboradFooter/>
            </>);
}

export default medicines;