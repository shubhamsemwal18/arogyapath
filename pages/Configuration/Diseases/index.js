import DiseasesManagement from "../../../Containers/Configuration/Diseases Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const diseases = () =>{
    return (<>
                <DashboardHeader/>
                <DiseasesManagement/>
                <DashboradFooter/>
            </>);
}

export default diseases;