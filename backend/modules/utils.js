class time{
    constructor(hour, minute=0, second=0){
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

class results{
    constructor(s=true, c=0, r=""){
        self.success = s;
        self.code = c;
        self.reason = r;
    }
}