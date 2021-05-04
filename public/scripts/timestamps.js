
//Function creates a timestamp
function maketimestamp(now){
    var hours = now.getHours()
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours != 0 ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timestamp = hours.toString() + ':' + minutes.toString() + ' ' + ampm;
    return timestamp;
}





// exports functions/variables 
module.exports = { maketimestamp } 