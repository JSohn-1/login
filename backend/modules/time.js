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
        let h = this.hour;
        let m = this.minute;
        let s = this.second;

        if(h == 0){
            h = "00";
        }else if(h < 0){
            h = "0" + h;
        }

        if(m == 0){
            m = "00";
        }else if(m < 0){
            m = "0" + m;
        }

        if(s == 0){
            s = "00";
        }else if(s < 0){
            s = "0" + s;
        }
        return h + ':' + m + ':' + s;
    }
}

module.exports = time;