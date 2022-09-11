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
        
        if(this.hour == 0){
            h = "00";
        }else if(this.hour < 0){
            h = "0" + this.hour;
        }

        if(this.minute == 0){
            m = "00";
        }else if(this.minute < 0){
            m = "0" + this.minute;
        }

        if(this.second == 0){
            s = "00";
        }else if(this.second < 0){
            s = "0" + this.second;
        }
        return h + ':' + m + ':' + s;
    }
}

module.exports = time;