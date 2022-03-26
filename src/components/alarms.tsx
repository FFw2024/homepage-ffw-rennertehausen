import Link from 'next/link';
import React from 'react';
import Alarm from '../lib/alarm';
import Card from '../components/card'

type AlarmsState = {
    loaded: boolean;
    data: {
        year: number,
        alarms: Alarm[]
    }[];
}

type AlarmsProps = typeof Alarms.defaultProps & {
    alarmId?: number;
    year?: number;
}

export default class Alarms extends React.Component<AlarmsProps, AlarmsState> {
    static defaultProps = {
        alarmId: null,
        year: null
    }

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            data: []
        };
    }

    componentDidMount(): void {
        fetch("/data/alarms.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json();
            })
            .then(data => {
                this.setState({
                    loaded: true,
                    data: data
                });
            });
    }

    render() {
        if (this.state.loaded) {
            if (this.props.alarmId == null && this.props.year == null) {
                return (
                    <div className="container">
                        <h1>Eins&#228;tze</h1>
                        {
                            this.state.data.map((dataItem, index) => {
                                return (
                                    <>
                                        <h3>{dataItem.year}</h3>
                                        <div className="row row-cols-lg-2 g-2">
                                            {
                                                dataItem.alarms.map(alarm => {
                                                    const link = `/einsatzabteilung/einsaetze/${dataItem.year}?alarmId=${alarm.index}`;

                                                    return (
                                                        <div key={alarm.index} className="col">
                                                            <Link href={link} >
                                                                <a className="card-link">
                                                                    <Card className="h-100" orientation='horizontal' image={{
                                                                        src: alarm.image,
                                                                        alt: alarm.index
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
            else if (this.props.year != null) {
                const alarms = this.state.data.find(data => data.year == this.props.year);

                if (this.props.alarmId != null) {
                    const alarm = alarms.alarms.find(alarm => alarm.index == this.props.alarmId);

                    var images: string[];
                    if (alarm.images > 0) {
                        images = [];
                        for (var i = 1; i <= alarm.images; i++) {
                            images[i] = `/img/alarms/${alarm.index}/${alarm.index}_${i.toString().padStart(2, '0')}.png`
                        }
                    }

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
                                        return (<p key={index} className="mb-0">{line}</p>);
                                    })
                                }
                            </div>
                            {
                                alarm.images > 0 &&
                                <div className="row mt-4">
                                    <h3>Bildergalerie</h3>
                                    <div className="row row-cols-2 gy-2">
                                        {
                                            images.map((imageSrc, index) => {
                                                return (
                                                    <div key={index} className="col">
                                                        <img src={imageSrc} className="img-fluid" />
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
        }
        else {
            return (<div className="container">
                <h1>Eins&#228;tze</h1>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>)
        }
    }
}
