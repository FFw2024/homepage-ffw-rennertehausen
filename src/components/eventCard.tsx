import { Component } from "react";
import Card from "./card";


export class Event {
    title: string;
    time: string;
}

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
        if (this.state.loaded) {
            const items = this.state.events.map((event, index) => {
                return (
                    <span key={index}>
                        <strong>{event.time}</strong> {event.title}
                    </span>
                )
            });

            return (
                <Card title={this.props.title} className={this.props.className} items={items} />
            )
        }
        else {
            return (
                <Card title={this.props.title} className={this.props.className} items={[
                    <div key={0} className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ]} />
            )
        }
    }
}