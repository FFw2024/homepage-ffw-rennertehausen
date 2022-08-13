import { useRouter } from "next/router";
import NewsComponent from "../../components/newsComponent";

export default function News() {
    const router = useRouter();
    const { newsId } = router.query;

    return (<NewsComponent title="" id={newsId} />)
}

