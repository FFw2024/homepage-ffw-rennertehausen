import { Component } from "react";

type ImageProps = {
    src: string;
    alt: string;
}

type CardOrientation = 'horizontal' | 'vertical';

export type CardProps = typeof Card.defaultProps & {
    title: string;
    text?: string[];
    image?: ImageProps;
    items?: JSX.Element[];
    className?: string;

    orientation: CardOrientation;
}

export default class Card extends Component<CardProps> {
    static defaultProps = {
        text: null,
        image: null,
        items: null,
        orientation: 'vertical',
        className: null
    };

    render() {
        const items = this.props.items != null ?
            <ul className="list-group list-group-flush">
                {
                    this.props.items.map((item: string, index: number) => <li key={index} className="list-group-item">{item}</li>)
                }
            </ul> : (<></>)

        console.log(items);

        const cardBody = (<div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            {this.props.text != null ?? this.props.text.map((text: string, index: number) => <p key={index} className="card-text">{text}</p>)}
            {items}
        </div>);

        var cardContent: {};
        if (this.props.orientation == 'horizontal' && this.props.image != null) {
            cardContent = (
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={this.props.image.src} className="img-fluid rounded-start" alt={this.props.image.alt} />
                    </div>
                    <div className="col-md-8">
                        {cardBody}
                    </div>
                </div>
            )
        }
        else {
            cardContent = (
                <>
                    {this.props.image != null ?? (<img src={this.props.image.src} className="card-img-top" alt={this.props.image.alt} />)}
                    {cardBody}
                </>
            )
        }

        const cardStyle = this.props.className != null ? `card ${this.props.className}` : 'card';

        return (<div className={cardStyle}>{cardContent}</div>);
    }
}
