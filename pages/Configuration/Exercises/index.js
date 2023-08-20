import ExerciseManagement from "../../../Containers/Configuration/Exercises Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const exercises = () =>{
    return (<>
                <DashboardHeader/>
                <ExerciseManagement/>
                <DashboradFooter/>
            </>);
}

export default exercises;