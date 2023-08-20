import DiseasesAndMedicine from "../../../../Containers/Configuration/Diseases Mapping Management/Diseases And Medicine";
import DashboardHeader  from "../../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../../layouts/DashboradFooter";

const diseaseAndMedicine = () =>{
    return (<>
                <DashboardHeader/>
                <DiseasesAndMedicine/>
                <DashboradFooter/>
            </>);
}

export default diseaseAndMedicine;