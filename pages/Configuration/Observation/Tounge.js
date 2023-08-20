
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";
import ToungeObservation from "../../../Containers/Configuration/Observation/tounge";

const tounge = () =>{
    return (<>
                <DashboardHeader/>
                <ToungeObservation/>
                <DashboradFooter/>
            </>);
}

export default tounge;