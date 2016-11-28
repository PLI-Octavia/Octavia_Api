exports.getStudent = function (req, res, next) {
    // req.db.any('select SCR.*, GMS.game_name from scores SCR left join games GMS using(game_id) where student_id = $1', [req.params.user_id])
    // .then(function (data) {
    //     res.status(200)
    //     .json({
    //         status: 'success',
    //         data: data[0],
    //         message: 'Data retrieved'
    //     });
    // })
    // .catch(function (err) {
    //     return next(err);
    // });
}

exports.getStudentForCourse = function (req, res, next) {
    req.db.any('select user_id, user_login, user_first_name, user_last_name from students where course_id = $1', [req.session.course_id])
    .then(function (data) {
        res.status(200)
        .json(data);
    })
    .catch(function (err) {
        return next(err);
    });
}

exports.updateStudent = function (req, res, next) {
    req.db.any('update students set user_first_name = $1, user_last_name = $2 where user_id = $3', [req.body.user_first_name, req.body.user_last_name, req.params.user_id])
    .then(function (data) {
        res.status(200)
        .json(data);
    })
    .catch(function (err) {
        return next(err);
    });
}
