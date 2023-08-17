const googleLogin = (req, res) => {
    
    const objetoGoogle = {
        name :req.user.displayName,
        image : req.user.photos[0].value
    }
    res.status(200).send(objetoGoogle);
};


 module.exports = googleLogin;