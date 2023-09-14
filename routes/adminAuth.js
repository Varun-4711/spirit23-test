const express = require('express')
const Admin = require('../models/Admin');
const router = express.Router();
const becrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const {password} = req.body;
    try {
        const admin = await Admin.findOne({ admin: 'admin' });
        if (!admin) {
            res.send({ status: false, error: "backend-error" });
        }
        // else {
        //     bcrypt.compare(password, admin.password, function (err, res2) {
        //         if (res2) {

        //             res.json({
        //                 status: true,
        //             });
        //         }
        //         else {
        //             res.json({
        //                 status: false,
        //                 error: err,
        //             });
        //         }
        //     });
        // }
        else {
            if (password === admin.password) {
                req.session.login=true;
                res.json({
                    status: true,
                });
            }
            else {
                res.json({
                    status: false,
                    error:"wrong password",
                });
            }
        }

    } catch (error) {
        res.json({
            status: false,
            error: error,
        });
    }
});
module.exports = router;