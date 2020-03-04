module.exports = (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    if(parseInt(id, 10) === parseInt(req.userId, 10)) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}