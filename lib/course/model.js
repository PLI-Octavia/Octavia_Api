exports.getCourse = function (req, res, next) {
    req.db.any('select * from courses where course_id = $1', [req.session.course_id])
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            data: data[0],
            message: 'Data retrieved'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}