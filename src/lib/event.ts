import DataEntry from "./dataEntry";

export default class Event extends DataEntry {
    title: string;
    time: string;
    link?: string;
    display?: boolean;

    // the time up to which the event is displayed
    displayUntil: string;
}