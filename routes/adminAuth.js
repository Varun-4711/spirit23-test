const express = require('express')
const Admin = require('../models/Admin');
const router = express.Router();
const becrypt = require('bcryptjs');
const Sports_ranking = require('../models/Sports_ranking');

router.post('/api/admin/login', async (req, res) => {
    const { password } = req.body;
    try {
        const admin = await Admin.findOne({ admin: 'admin' });

        if (!admin) {
            // console.log("not found");
        //    await Admin.create({
        //         admin:"admin",
        //         password:password
        //     }).then(()=>{
        //         console.log("created"); 
        //     })

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
                req.session.login = true;
                res.json({
                    status: true,
                });
            }
            else {
                res.json({
                    status: false,
                    error: "wrong password",
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

router.put('/api/admin/update', async (req, res) => {
    try {
        const { name, gender, category, subCategory, rank1, rank2, rank3, rank4 } = req.body;
        const sport = await Sports_ranking.findOne({ name: name, gender: gender, category: category, subCategory });
        if (!sport) {
            await Sports_ranking.create({
                name, gender, category, subCategory, rank1, rank2, rank3, rank4
            }).then(() => {
                res.json({ status: true, msg: "created" });
            })
        }
        else {
            // console.log(sport);
            const newdata = { name, gender, category, subCategory, rank1, rank2, rank3, rank4 };
            // console.log(newdata);
            Sports_ranking.findOneAndUpdate({ name, gender, category }, { $set: newdata }, { new: true }).then(() => {
                res.json({ status: true, msg: "updated" });
            })
        }
    } catch (error) {
        res.json({ status: false, error });
    }

})

router.post('/api/admin/get', async (req, res) => {
    try {
        const { name } = req.body;
        // console.log(name);
        const sport = await Sports_ranking.find({ name });
        if (sport.length == 0) {
            // console.log(" not avaiable");
            res.json([{
                name: name, category: "NA", gender: "NA", subCategory: "NA", rank1: "NA", rank2: "NA", rank3: "NA", rank4: "NA"
            }, {
                name: name, category: "NA", gender: "NA", subCategory: "NA", rank1: "NA", rank2: "NA", rank3: "NA", rank4: "NA"
            }]);
        }
        else {
            // console.log(sport);
            // console.log("avaiable");
            // console.log(sport);
            res.json(sport);
        }
    } catch (error) {
        res.json({ status: false, error });
    }
});




module.exports = router;