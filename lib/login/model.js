exports.loginAsTeacher = function (req, res, next) {
    req.db.any('select * from teachers where user_login = $1', [req.body.user_login])
    .then(function (data) {
        if (data[0]) {
            var bcryptCheck = req.bcrypt.compareSync(req.body.user_password, data[0].user_password);
            if (bcryptCheck == true) {
                var dataReturned = {
                    "user_id" : data[0].user_id,
                    "user_login" : data[0].user_login,
                    "user_first_name" : data[0].user_first_name,
                    "user_last_name" : data[0].user_last_name,
                    "course_id" : data[0].course_id,
                    "user_email" : data[0].user_email
                }
                req.session.user_id = data[0].user_id
                req.session.course_id = data[0].course_id
                res.status(200)
                .json({
                    status: 'success',
                    data: dataReturned,
                    message: 'Teacher connected'
                });
            } else {
                res.status(200)
                .json({
                    status: 'Unvalid password'
                });
            }
        } else {
            res.status(200)
            .json({
                status: 'Unvalid login'
            });
        }
    })
    .catch(function (err) {
        return next(err);
    });
}

exports.loginAsStudent = function(req, res, next) {
	console.log(req.body)
    req.db.any('select * from students where user_login = $1 and user_password = $2', [req.body.user_login, req.body.user_password])
    .then(function (data) {
        if (data[0]) {
            var dataReturned = {
                "user_id" : data[0].user_id,
                "user_login" : data[0].user_login,
                "user_first_name" : data[0].user_first_name,
                "user_last_name" : data[0].user_last_name,
                "course_id" : data[0].course_id
            }

            res.status(200)
            .json({
                status: 'success',
                data: dataReturned,
                message: 'Student connected'
            });
            req.session.user_id = data[0].user_id
            // req.session.course_id = data[0].course_id

        } else {
            res.status(200)
            .json({
                status: 'Unvalid login'
            });
        }
    })
    .catch(function (err) {
        return next(err);
    });
}
