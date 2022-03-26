import { useRouter } from "next/router";
import Exercices from "../../../components/exercises";

export default function Uebungen() {
    var router = useRouter();
    var { exerciseId } = router.query;

    return (
        <Exercices id={exerciseId} />
    )
}