import DataEntry from "./dataEntry";

export default class Alarm extends DataEntry {
    title: string;
    image: string;
    time: Date;
    word: string;
    location: string;
    participants: number;
    vehicles: string;
    description: string;

    images: string[];

    static getYear(alarm: Alarm) {
        return Number.parseInt(alarm.id.substring(0, 4));
    }
}
