
import DashboardHeader  from "../../../layouts/DashboardHeader";
import DashboradFooter  from "../../../layouts/DashboradFooter";
import PulseObservation from "../../../Containers/Configuration/Observation/pulse";

const pulse = () =>{
    return (<>
                <DashboardHeader/>
                <PulseObservation/>
                <DashboradFooter/>
            </>);
}

export default pulse;