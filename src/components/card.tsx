import Image from "next/image";
import { Component } from "react";

type ImageProps = {
    src: string;
    alt: string;
}

type CardOrientation = 'horizontal' | 'vertical';

export type CardProps = typeof Card.defaultProps & {
    image?: ImageProps;
    className?: string;
    orientation: CardOrientation;
}

export default class Card extends Component<CardProps> {
    static defaultProps = {
        image: null,
        orientation: 'vertical',
        className: null,
        children: null
    };

    render() {
        var cardContent: {};
        if (this.props.orientation == 'horizontal' && this.props.image != null) {
            cardContent = (
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={this.props.image.src} className="img-fluid rounded-start" alt={this.props.image.alt} />
                    </div>
                    <div className="col-md-8 card-body">
                        {this.props.children}
                    </div>
                </div>
            )
        }
        else if (this.props.orientation == 'vertical' && this.props.image != null) {
            cardContent = (
                <>
                    <img src={this.props.image.src} className="card-img-top" alt={this.props.image.alt} />
                    <div className="card-body">
                        {this.props.children}
                    </div>
                </>
            )
        }
        else {
            cardContent = (
                <div className="card-body">
                    {this.props.children}
                </div>
            )
        }

        const cardStyle = this.props.className != null ? `card ${this.props.className}` : 'card';

        return (<div className={cardStyle}>{cardContent}</div>);
    }
}
