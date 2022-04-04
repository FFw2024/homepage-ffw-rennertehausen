import Link from 'next/link';
import React from 'react';
import Alarm from '../lib/alarm';
import { groupBy, mapToArray } from '../lib/utils';
import Card from './card'
import DataComponent from './dataComponent';

export default class Alarms extends DataComponent<Alarm> {

    protected dataUrl = "/data/alarms.json"

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            data: []
        };
    }

    protected onDataLoaded(component: DataComponent<Alarm>, data: Alarm[]): void {
        var promises = data.map((alarm, index) => {
            return fetch(`/img/alarms/${alarm.id}/images.txt`)
                .then(res => {
                    if (res.ok) {
                        return res.text();
                    }

                    if (res.status == 404) {
                        return null;
                    }

                    throw new Error(res.statusText);
                })
                .then(content => {
                    if (content) {
                        const lines = content.split("\n");
                        const prefix = `/img/alarms/${alarm.id}/`

                        alarm.images = lines.map(line => {
                            if (line != "") {
                                return prefix + line;
                            }
                        });
                    }

                    return alarm;
                });
        });

        Promise.all(promises).then((data) => {
            super.onDataLoaded(this, data);
        });
    }

    renderListPage() {
        var alarmsList = groupBy(this.state.data, Alarm.getYear);

        return (
            <div className="container">
                <h1>Eins&#228;tze</h1>
                {
                    mapToArray(alarmsList, (year, alarms) => {
                        return (
                            <>
                                <h1>{year}</h1>
                                <div className="row row-cols-lg-2 g-2">
                                    {
                                        alarms.map(alarm => {
                                            const link = `/einsatzabteilung/einsaetze/${alarm.id}`;

                                            return (
                                                <div key={alarm.id} className="col">
                                                    <Link href={link} >
                                                        <a className="card-link">
                                                            <Card className="h-100" orientation='horizontal' image={{
                                                                src: alarm.image,
                                                                alt: ""
                                                            }} >
                                                                <h5 className="card-title">{alarm.title}</h5>
                                                                <h6 className="card-subtitle mb-2 text-muted">{alarm.word}</h6>
                                                            </Card>
                                                        </a>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div >
        )
    }

    renderElementPage() {
        if (this.props.id == "latest") {
            const alarm = this.state.data.reduce((latest, current) => (latest.time < current.time) ? current : latest);

            const link = `/einsatzabteilung/einsaetze/${alarm.id}`;

            return (
                <Link href={link} >
                    <a className="card-link">
                        <Card className="h-100" orientation='horizontal' image={{
                            src: alarm.image,
                            alt: ""
                        }} >
                            <h5 className="card-title">{alarm.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{alarm.word}</h6>
                        </Card>
                    </a>
                </Link>
            )
        }

        const alarm = this.state.data.find(item => item.id == this.props.id);

        return (
            <div className='container gy-4'>
                <h1>{alarm.title}</h1>
                <h3 className="text-muted">{alarm.word}</h3>
                <div className="row">
                    <div>
                        <table className="table table-borderless w-auto">
                            <tbody>
                                <tr>
                                    <th scope="row">Einsatzort</th>
                                    <td>{alarm.location}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Einsatzzeit</th>
                                    <td>{new Date(alarm.time).toLocaleString('de-de', {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })} Uhr</td>
                                </tr>
                                {alarm.participants &&
                                    <tr>
                                        <th scope='row'>Einsatzkr&#228;fte</th>
                                        <td>{alarm.participants}</td>
                                    </tr>
                                }
                                {alarm.vehicles &&
                                    <tr>
                                        <th scope='row'>Fahrzeuge</th>
                                        <td>{alarm.vehicles}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='row'>
                    {
                        alarm.description.split('\n').map((line, index) => {
                            return (<p key={index} className="mb-0" dangerouslySetInnerHTML={{ __html: line }}></p>);
                        })
                    }
                </div>
                {
                    alarm.images &&
                    <div className="row mt-4">
                        <h3>Bildergalerie</h3>
                        <div className="row row-cols-2 gy-2">
                            {
                                alarm.images.map((imageSrc, index) => {
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
            </div >
        )
    }
}
