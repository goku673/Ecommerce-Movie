const googleLogin =  (req, res) => {
    // 
    res.status(200).send(req.user)
};


 module.exports = googleLogin;