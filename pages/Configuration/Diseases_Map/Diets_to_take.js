import Map_Disease_with_diets_to_take from "../../../Containers/Configuration/Diseases Mapping Management/Diseases And Diets To Take";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const disease_map_diets_to_take = () =>{
    return (<>
                <DashboardHeader/>
                <Map_Disease_with_diets_to_take/>
                <DashboradFooter/>
            </>);
}

export default disease_map_diets_to_take;