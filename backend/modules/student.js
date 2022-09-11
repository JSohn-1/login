const time = require('./time.js');
const constants = require('./constants.js');
class student{
    constructor(id, name, grade, entry=time.getTime()){
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.entry = entry;
        this.exit = null;
    }

    fix(){
        if(this.exit == null){
            this.exit = constants.END;
        }
    }

    toDict(){
        return({name: this.name, id: this.id, grade: this.grade, entry: this.entry.toString(), exit: this.exit.toString()})
    }
   
    toArr(){
        return([this.name, this.id, this.grade, this.entry.toString(), this.exit.toString()]);
    }

    toString(){
        return(this.name)
    }
}

module.exports = student;