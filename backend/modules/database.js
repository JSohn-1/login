const fs = require("filesystem");

import results from utils;
import constants from constants;
class student{
    constructor(id, name, entry=time.getTime()){
        self.id = id;
        self.name = name;
        self.entry = entry;
        self.exit = null;
    }    
    fix(){
        if(self.exit == null){
            self.exit = constants.end;
        }
    }

    toDict(){
        return({name: self.name, id: self.id, grade: self.grade, entry: self.entry.toString(), exit: self.exit.toString()})
    }
   
    toArr(){
        return([self.name, self.id, self.grade, self.entry.toString(), self.exit.toString()]);
    }
}

class database{
    static s = [];
   
    static enter(student){
        let stu = student;
        let r = new results();
       
        for(st in self.s){
            if(st.id == student.id && st.name == st.name){
                r.success = false;
                r.code = 10;
                r.reason = "Already in database";
               
                return(r);
            }
        }
        stu.entry = time.getTime();
        s.push(student)
        return(r);
    }
   
    static exit(student){
        let stu = student;
        let r = new results();
       
        for(let i = 0; i < s.length; i++){
            let st = s[i];
            if(st.id == student.id && st.name == st.name){
                s[i].exit = time.getTime();
               
                if(st.entry == null){
                    s[i].enter = constants.start;
                }
                return(r);
            }
        }
       
        stu.entry = constants.start;
        stu.exit = time.getTime();
        self.s.push(stu);
       
        return(r);    
    }
   
    static createFile(){
        let output = [["name", "id", "grade", "entry time", "exit time"]];
       
        for(let i = 0; i < s.length; i++){
            s[i].fix();
            output.push(s[i].toArr());
        }
       
        let oStr = "";
        for(o in output){
            oStr += o.join() + "\n";
        }
       
        fs.writeFile((constants.club + " - " + time.getDate()) + ".csv", oStr);
    }
}

