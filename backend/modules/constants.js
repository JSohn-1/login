const time = require('./time.js');

class constants{
    static START = new time(15, 30);
    static END = new time(17, 0);
    static CLUB = "Robotics";
}

module.exports = constants;