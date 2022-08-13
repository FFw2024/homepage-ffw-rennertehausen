import Image from "next/image";
import Link from "next/link";
import { Component } from "react";

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
}

type CardOrientation = 'horizontal' | 'vertical';

export type CardProps = typeof Card.defaultProps & {
    image?: ImageProps;
    className?: string;
    orientation: CardOrientation;
    href?: string;
}

export default class Card extends Component<CardProps> {
    static defaultProps = {
        image: null,
        orientation: 'vertical',
        className: null,
        href: null,
        children: null
    };

    render() {
        var cardContent: {};
        if (this.props.orientation == 'horizontal' && this.props.image != null) {
            cardContent = (
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={this.props.image.src} className={`img-fluid rounded-start ${this.props.image.className}`} alt={this.props.image.alt} />
                    </div>
                    <div className="col-md-8 card-body">
                        {this.props.children}
                        { this.props.href &&
                            <Link href={this.props.href}>
                                <a className="card-link stretched-link"></a>
                            </Link>
                        }
                    </div>
                </div>
            )
        }
        else if (this.props.orientation == 'vertical' && this.props.image != null) {
            cardContent = (
                <>
                    <img src={this.props.image.src} className={`card-img-top ${this.props.image.className}`} alt={this.props.image.alt} />
                    <div className="card-body">
                        {this.props.children}
                        {this.props.href &&
                            <Link href={this.props.href}>
                                <a className="card-link stretched-link"></a>
                            </Link>
                        }
                    </div>
                </>
            )
        }
        else {
            cardContent = (
                <div className="card-body">
                    {this.props.children}
                    {this.props.href &&
                        <Link href={this.props.href}>
                            <a className="card-link stretched-link"></a>
                        </Link>
                    }
                </div>
            )
        }

        const cardStyle = this.props.className != null ? `card ${this.props.className}` : 'card';

        return (<div className={cardStyle}>{cardContent}</div>);
    }
}
