import DataEntry from "./dataEntry";

export default class Event extends DataEntry {
    title: string;
    time: string;
    link?: string;
}