function consoleMid1 (req, res, next) {
    console.log("console.log 1")
    next()
}

module.exports = consoleMid1