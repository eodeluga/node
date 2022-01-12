function recognisePath(req){
    // Write route to console
    console.log(`You have accessed route ${req.originalUrl}`)
}

module.exports = {recognisePath: recognisePath};
