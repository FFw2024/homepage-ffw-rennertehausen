import Alarms from "../../../components/alarms";
import { useRouter } from "next/router";


export default function Einsaetze() {
    var router = useRouter();
    var { year, alarmId } = router.query;

    return (
        <Alarms year={year} alarmId={alarmId} />
    )
}