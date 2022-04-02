import Link from "next/link";
import Alarm from "../lib/alarm";
import Exercise from "../lib/exercise";
import { groupBy, mapToArray } from "../lib/utils";
import Card from "./card";
import DataComponent from "./dataComponent";

export default class Exercices extends DataComponent<Exercise> {
    protected dataUrl = "/data/exercises.json"

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            data: []
        }
    }

    renderListPage() {
        const map = groupBy(this.state.data, (exercise) => Number.parseInt(exercise.id.substring(0,4)));

        return (
            <div className="container">
                <h1>&#220;bungen</h1>
                {
                    mapToArray(map, (year, exercises) => {
                        return (
                            <>
                                <h3>{year}</h3>
                                <div className="row row-cols-lg-2 g-2">
                                    {exercises.map(exercise => {
                                        const link = `/einsatzabteilung/uebungen/${exercise.id}`;

                                        return (
                                            <div key={exercise.id} className="col">
                                                <Link href={link}>
                                                    <a className="card-link">
                                                        <Card className="h-100" orientation="horizontal" image={{
                                                            src: exercise.image,
                                                            alt: ""
                                                        }}>
                                                            <h5 className="card-title" >{exercise.title}</h5>
                                                        </Card>
                                                    </a>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })
                }
            </div>
        )
    }

    renderElementPage() {
        const exercise = this.state.data.find(exercise => exercise.id == this.props.id);

        var images: string[];
        if (exercise.images > 0) {
            images = [];
            for (var i = 1; i <= exercise.images; i++) {
                images[i - 1] = `/img/exercises/${exercise.id}/${exercise.id}_${i.toString().padStart(2, '0')}.png`;
            }
        }

        return (
            <div className="container gy-4">
                <h1>{exercise.title}</h1>
                <div className="row">
                    {
                        exercise.description.split('\n').map((line, index) => {
                            return (<p key={index} className="mb-0">{line}</p>)
                        })
                    }
                </div>
                {
                    exercise.images > 0 &&
                    <div className="row mt-4">
                        <h3>Bildergalerie</h3>
                        <div className="row row-cols-2 gy-2">
                            {
                                images.map((imageSrc, index) => {
                                    return (
                                        <div key={index} className="col">
                                            <img src={imageSrc} className="img-fluid" alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
