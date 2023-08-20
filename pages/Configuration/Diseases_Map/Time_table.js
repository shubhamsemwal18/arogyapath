import DiseaseAndTimeTable from "../../../Containers/Configuration/Diseases Mapping Management/Disease Map Time Table";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_map_time_table = () =>{
    return (<>
                <DashboardHeader/>
                <DiseaseAndTimeTable/>
                <DashboradFooter/>
            </>);
}

export default disease_map_time_table;