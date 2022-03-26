import { Component } from "react";

type DataComponentState<T> = {
    loaded: boolean;
    data: T[];
};

type DataComponentProps<T> = typeof DataComponent.defaultProps & {
    id?: string;
}

export default abstract class DataComponent<T> extends Component<DataComponentProps<T>, DataComponentState<T>> {
    static defaultProps = {
        id: null
    }

    protected abstract dataUrl: string;

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            data: []
        };
    }

    componentDidMount(): void {
        fetch(this.dataUrl)
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
                })
            })
    }

    render() {
        if (this.state.loaded) {
            if (this.props.id != null) {
                return this.renderElementPage();
            }
            else {
                return this.renderListPage();
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

    abstract renderListPage(): JSX.Element;
    abstract renderElementPage(): JSX.Element;
};
