import QuestionManagement from "../../../Containers/Configuration/Question Management";
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";

const diseases = () =>{
    return (<>
                <DashboardHeader/>
                <QuestionManagement />
                <DashboradFooter/>
            </>);
}

export default diseases;