module.exports.home = function(req, res)
{
    return res.render('home',{
        pageTitle: "Codeial Home"
    });
}

