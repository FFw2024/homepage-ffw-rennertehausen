import { Component } from "react";
import Card from "./card";
import Event from '../lib/event';
import Link from "next/link";

type EventCardState = {
    loaded: boolean;
    events: Event[];
}

export default class EventCard extends Component<{ className?: string, title: string }, EventCardState> {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            events: []
        };
    }

    componentDidMount(): void {
        fetch("/data/events.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json() as Promise<Event[]>;
            })
            .then(events => {
                this.setState({
                    loaded: true,
                    events: events
                });
            });
    }

    render() {
        return (
            <Card className={this.props.className} >
                <h5 className="card-title">{this.props.title}</h5>
                {
                    this.state.loaded
                        ? (
                            <ul className="list-group list-group-flash">
                                {this.state.events.filter(event => event.display ?? true).map((event, index) => {
                                    const content = (<span><strong>{event.time}</strong> {event.title}</span>);

                                    if (event.link) {
                                        return (
                                            <li key={index} className="list-group-item list-group-item-action">
                                                <Link href={event.link}>
                                                    {content}
                                                </Link>
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={index} className="list-group-item">
                                                {content}
                                            </li>
                                        )
                                    }
                                })}
                            </ul>)
                        : (
                            <div key={0} className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                }
            </Card >
        );
    }
}
