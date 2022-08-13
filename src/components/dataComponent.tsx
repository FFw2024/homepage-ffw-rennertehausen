import { Component } from "react";
import DataEntry from "../lib/dataEntry";

type DataComponentState<T> = {
    loaded: boolean;    
    data: T[];
};

type DataComponentProps<T> = typeof DataComponent.defaultProps & {
    id?: string;
    title: string;
}

export default abstract class DataComponent<T extends DataEntry> extends Component<DataComponentProps<T>, DataComponentState<T>> {
    static defaultProps = {
        id: null
    }

    protected abstract dataUrl: string;

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,            
            data: []
        }; new Map<string, T>()
    }

    componentDidMount(): void {
        fetch(this.dataUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json() as Promise<T[]>;
            })
            .then(data => this.onDataLoaded(this, data));
    }

    protected onDataLoaded(component: DataComponent<T>, data: T[]) {
        component.setState({
            loaded: true,
            data: data
        });
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
                <h1>{this.props.title}</h1>
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
