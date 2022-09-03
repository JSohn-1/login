class time{
    constructor(hour, minute=0, second=0){
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static getTime(){
        const cur = new Date();

        return new this(cur.getHours(), cur.getMinutes(), cur.getSeconds());
    }

    static getDate(){
        const cur = new Date();

        return String(cur.getMonth() + 1).padStart(2, '0') + " " + String(cur.getDate()).padStart(2, '0') + " " + cur.getFullYear();
    }

    toString(){
        return this.hour + ':' + this.minute + ':' + this.second;
    }
}

module.exports = time;