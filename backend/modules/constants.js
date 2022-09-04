const time = require('./time.js');
const path = require('path');

class constants{
    static START = new time(15, 30);
    static END = new time(17, 0);
    static CLUB = "Robotics";
    static FILESTORAGE = path.join(__dirname, 'files')
}

module.exports = constants;