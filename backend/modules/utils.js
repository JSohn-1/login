exports.checkCreds = function(p){
    var output = {};
    output['success'] = true;
    output['code'] = 40;
    output['reason'] = "none";

    if(p.name == undefined){
        output['success'] = false;
        output['code'] = 10
        output['reason'] = 'No name given';

    }

    if(p.username == undefined){
        output['success'] = false;
        output['code'] = 20;
        output['reason'] = "No username given";

    }

    return output;
}
