import DiseasesAndExercises from "../../../../Containers/Configuration/Diseases Mapping Management/Diseases And Exercises";
import DashboardHeader  from "../../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../../layouts/DashboradFooter";

const diseaseAndExercises = () =>{
    return (<>
                <DashboardHeader/>
                <DiseasesAndExercises />
                <DashboradFooter/>
            </>);
}

export default diseaseAndExercises;