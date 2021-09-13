export class TimeFrame {

    constructor(public start: number, public end: number) { }

    static day = 86400
    static week = TimeFrame.day * 7

    static dayBefore(end: number): TimeFrame {
        return new TimeFrame((Math.floor(end / 1000 - TimeFrame.day) - 1), (Math.floor(end / 1000)))
    }

    static weekBefore(end: number) {
        return new TimeFrame((Math.floor(end / 1000 - TimeFrame.week) - 1), (Math.floor(end / 1000)))
    }
}
