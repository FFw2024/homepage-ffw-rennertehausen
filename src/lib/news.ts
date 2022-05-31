import DataEntry from "./dataEntry";

export default class News extends DataEntry {
    title: string;
    display?: boolean;
    description: string;
    images?: string[];
    link?: string;
    icon: string;
    text: string;
}