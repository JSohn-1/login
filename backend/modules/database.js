const fs = require('fs');
const student = require('./student.js');
const results = require('./results.js');
const constants = require('./constants');
const time = require('./time');
const path = require('path');

class database{
    static s = [];
   
    static enter(student){
        let stu = student;
        let r = new results();
       
        for(let st in this.s){
            if(st.id == student.id && st.name == st.name){
                r.success = false;
                r.code = 10;
                r.reason = "Already in database";
               
                return(r);
            }
        }
        stu.entry = time.getTime();
        this.s.push(student)
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
                    this.s[i].enter = constants.START;
                }
                return(r);
            }
        }
       
        stu.entry = constants.START;
        stu.exit = time.getTime();
        this.s.push(stu);

        return(r);    
    }
   
    static  createFile(){
        let output = [["name", "id", "grade", "entry time", "exit time"],];
       
        for(let i = 0; i < this.s.length; i++){
            this.s[i].fix();
            output.push(this.s[i].toArr());
        }
       
        let oStr = "";

        for(let i = 0; i < output.length; i++){
            oStr += output[i].join() + "\n";
        }

         fs.writeFile(path.join(_constants.FILESTORAGE, constants.CLUB + " - " + time.getDate() + ".csv"), oStr, (err) =>{
            if(err){
                throw err;
            }else{
                console.log("success");
            }
        });
        //})
        
        
    }
}

module.exports = database;