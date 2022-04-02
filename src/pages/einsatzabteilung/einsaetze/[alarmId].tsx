import Alarms from "../../../components/alarmComponent";
import { useRouter } from "next/router";


export default function Einsaetze() {
    var router = useRouter();
    var { alarmId } = router.query;

    return (
        <Alarms id={alarmId} />
    )
}