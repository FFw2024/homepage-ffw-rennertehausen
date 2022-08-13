import DataComponent from './dataComponent'
import News from "../lib/news"
import { groupBy, mapToArray } from '../lib/utils';
import Card from './card';
import { connect } from 'http2';

export default class NewsComponent extends DataComponent<News> {
    protected dataUrl: string = "/data/news.json"

    protected async onDataLoaded(component: DataComponent<News>, data: News[]): Promise<void> {
        // download images
        var promises = data.map((item) => {
            return fetch(`/img/news/${item.id}/images.txt`)
                .then(res => {
                    if (res.ok) {
                        return res.text();
                    }

                    if (res.status == 404) {
                        return null;
                    }

                    throw new Error(res.statusText)
                })
                .then(content => {
                    if (content) {
                        const lines = content.split('\n');
                        const prefix = `/img/news/${item.id}/`;

                        item.images = lines.map(line => {
                            if (line != "") {
                                return prefix + line;
                            }
                        });
                    }

                    return item;
                })
                .then(async item => {
                    if (item.src) {
                        return await fetch(item.src)
                            .then(res => {
                                if (res.ok) {
                                    return res.text();
                                }

                                throw new Error(res.statusText);
                            })
                            .then(page => {
                                item.text = page;
                                return item;
                            })
                    }
                    else {
                        return item;
                    }
                });
        });

        // set data
        Promise.all(promises).then((data) => {
            this.setState({
                loaded: true,
                data: data
            });
        });
    }

    renderListPage(): JSX.Element {
        const map = groupBy(this.state.data, item => Number.parseInt(item.id.substring(0, 4)));

        return (
            <>
                <h1>Aktuelles</h1>
                {
                    mapToArray(map, (year, news) => {
                        return (
                            <>
                                <h3>{year}</h3>
                                <div className="row row-cols-1 g-2">
                                    {
                                        news.map(item => {
                                            if (item.display != false) {
                                                const link = item.link ? item.link : `/aktuelles/${item.id}`;

                                                return (
                                                    <div key={item.id} className="col">

                                                        <Card href={link} orientation='horizontal' image={{
                                                            src: item.icon,
                                                            alt: ""
                                                        }}>
                                                            <div className="d-flex flex-column h-100">
                                                                <h5 className="card-title">{item.title}</h5>
                                                                <p className="card-text overflow-hidden">{item.description}</p>
                                                                <a className="card-link mt-auto align-self-end">weiterlesen</a>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </>
        )
    }

    renderElementPage(): JSX.Element {
        var item = this.state.data.find(item => item.id === this.props.id);

        if (!item) {
            const link = `/aktuelles/${this.props.id}`;
            item = this.state.data.find(item => item.link == link);
        }

        if (item.display != false) {
            return (
                <>
                    <h1>{item.title}</h1>
                    {
                        <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    }
                    {
                        item.images ? (
                            <div className="row mt-4">
                                <h3>Bildergalerie</h3>
                                <div className="row row-cols-2 gy-2">

                                    {
                                        item.images.map((imageSrc, index) => {
                                            return (
                                                <div key={index} className="col">
                                                    <img src={imageSrc} className="img-fluid" alt="" />
                                                </div>
                                            )
                                        })

                                    }
                                </div>

                            </div>) : null
                    }
                </>
            );
        }

        return null;
    }
}
