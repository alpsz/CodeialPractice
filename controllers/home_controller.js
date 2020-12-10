module.exports.home = function(req, res)
{
    return res.end("<h1>Express Server is up and running</h1>");
}

module.exports.profile = function(req, res){
    return res.end("<h1>User Profile</h1>");
}