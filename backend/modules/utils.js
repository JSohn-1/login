class time{
    constructor(hour, minute, second){
        const hour = hour;
        const minute = minute;
        const second = second;
    }

    static getTime(){
        const cur = new Date();

        return new self(cur.getHours(), cur.getMinutes(), cur.getSeconds());
    }

    getRTime(){
        return self.hour + ':' + self.minute + ':' + self.second;
    }
}