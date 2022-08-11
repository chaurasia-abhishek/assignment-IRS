const savedocument = (req, res, next) => {
    if (req.files&&req.files.userdocs) {
        const fileName = req.files.userdocs.name.replace('.', `${req.user.id + new Date().getSeconds()}.`);
        req.files.userdocs.mv('./static/files/' + fileName)
        req.filename = fileName;
    }
    next()
}

module.exports = savedocument;

 