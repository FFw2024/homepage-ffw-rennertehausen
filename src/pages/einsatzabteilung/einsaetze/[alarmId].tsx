import Alarms from "../../../components/alarms";
import { useRouter } from "next/router";


export default function Einsaetze() {
    var router = useRouter();
    var { alarmId } = router.query;

    return (
        <Alarms id={alarmId} />
    )
}