export default class DateHelper {
    static convertStartDate(date: string | Date): Date | undefined {
        if (!date)
            return undefined;
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    static convertEndDate(date: string | Date): Date | undefined {
        if (!date)
            return undefined;

        let d = typeof date === 'string' ? new Date(date) : date;
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        d = DateHelper.addDays(d, 1);

        return DateHelper.addSeconds(d, -1);
    }

    static addMiliseconds(date: Date, miliseconds: number): Date {
        date.setMilliseconds(date.getMilliseconds() + miliseconds);
        return date;
    }

    static addSeconds(date: Date, seconds: number): Date {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    static addMinutes(date: Date, minutes: number): Date {
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }

    static addHours(date: Date, hours: number): Date {
        date.setHours(date.getHours() + hours);
        return date;
    }

    static addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    static addMonths(date: Date, months: number): Date {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    static addYears(date: Date, years: number): Date {
        date.setFullYear(date.getFullYear() + years);
        return date;
    }

    static formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    static convertDateReport(date: string | Date): string | undefined {
        if (!date)
            return undefined;

        let today;
        let d = new Date(date);
        let time = '';

        let weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        let day = weekday[d.getDay()];

        let month: any = [];
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        let m = month[d.getMonth()];

        today = day + ', ' + m + ' ' + d.getDate() + ', ' + d.getFullYear();
        time = this.formatAMPM(d);
        return today + ' - ' + time;
    }
}
