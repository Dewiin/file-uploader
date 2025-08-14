async function foldersGet(req, res) {
    try {
        if(!req.user) {
            return res.redirect("/login");
        }

        res.render("index", {user: req.user});
    } catch (err) {
        console.error(`Error retrieving folders: `, err);
    }
}

module.exports = {
    foldersGet,

}