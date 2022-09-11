const fs = require('fs');
const student = require('./student');
const results = require('./results');
const constants = require('./constants');
const time = require('./time');
const path = require('path');

class database{
    static s = [];
    static last = "";

    static enter(student){
        let stu = student;
        let r = new results();
       
        for(let i in this.s){
            let st = this.s[i];
            if(st.id == stu.id && st.name == stu.name){
                r.success = false;
                r.code = 10;
                r.reason = "Already in database";
               
                return(r);
            }
        }
        stu.entry = time.getTime();
        this.s.push(stu)
        return(r);
    }

    static exit(student){
        let stu = student;
        let r = new results();
       
        for(let i = 0; i < this.s.length; i++){
            let st = this.s[i];
            if(st.id == student.id && st.name == st.name){
                this.s[i].exit = time.getTime();
               
                if(st.entry == null){
                    this.s[i].entry = constants.START;
                }
                return(r);
            }
        }
       
        stu.entry = constants.START;
        stu.exit = time.getTime();
        this.s.push(stu);

        return(r);    
    }

    static createFile(write){
        let output = [["name", "id", "grade", "entry time", "exit time"],];
        let r = new results();
        
        for(let i = 0; i < this.s.length; i++){
            this.s[i].fix();
            output.push(this.s[i].toArr());
        }
       
        let oStr = "";

        for(let i = 0; i < output.length; i++){
            oStr += output[i].join() + "\n";
        }

        if(write != null){
            fs.writeFile(path.join(constants.FILESTORAGE, constants.CLUB + " - " + time.getDate() + ".csv"), oStr, (err) =>{
                if(err){
                    r.success = false;
                    r.reason = err;
                    r.code = 1;
                }else{
                    console.log("success");
                }
            });
        }
        
        r.reason = oStr;

        return r;
    }

    static delete(){
        if(last == ""){
            return(new results(false, 10, "No file written"))
        }

        fs.unlink(path.join(constants.FILESTORAGE, this.last), (err) =>{
            if(err){
                return(new results(false, 1, err));
            }else{
                console.log("success");
            }
        });

        return(new results());
    }

    static generate(){
        let output = [["name", "id", "grade", "entry time", "exit time"],];
        let r = new results();
        
        for(let i = 0; i < this.s.length; i++){
            this.s[i].fix();
            output.push(this.s[i].toArr());
        }
       
        let oStr = "";

        for(let i = 0; i < output.length; i++){
            oStr += output[i].join() + "\n";
        }

        return(oStr);
    }
}

module.exports = database;