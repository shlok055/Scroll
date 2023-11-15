
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');


const Users = mongoose.model('Users', {
    username: String,
    password: String,
    mobile: String,
    email: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;


    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'Liked' })
        })
        .catch(() => {
            res.send({ message: 'Server Err!!' })
        })
}

module.exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const user = new Users({ username: username, password: password, email: email, mobile: mobile });
    user.save().then(() => {
        res.send({ message: 'Successfully Saved.' })
    })
        .catch(() => {
            res.send({ message: 'Server Err!!' })
        })
}

module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //const user = new Users({ username: username, password: password });

    Users.findOne({ username: username })
        .then((result) => {
            if (!result) {
                res.send({ message: 'User Not Exist.' })
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: 'result'
                    }, 'TradeNow', { expiresIn: '1h' });

                    res.send({ message: 'Welcome Back.', token: token, userId: result._id })
                }
                if (result.password !== password) {
                    res.send({ message: 'Password Not Match' })
                }
            }
        })
        .catch(() => {
            res.send({ message: 'Server Err' })
        })
}

module.exports.myProfileById = (req,res)=> {
    let userid = req.params.userId;

    Users.findOne({ _id: userid})
    .then((result) => {
        res.send({
            message: 'success', user: {
                email: result.email,
                mobile: result.mobile,
                username: result.username
            }
        })
    })
    .catch(() => {
        res.send({message: 'server err'})
    })
}

module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}
