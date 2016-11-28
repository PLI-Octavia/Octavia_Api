exports.getScore = function (req, res, next) {
    req.db.any('select SCR.*, GMS.game_name from scores SCR left join games GMS using(game_id) where student_id = $1 order by score_date', [req.params.user_id])
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Data retrieved'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

exports.postScore = function (req, res, next) {
    req.db.any('insert into scores(game_id, student_id, score_value, score_date, score_start_time, score_end_time) values($1, $2, $3, current_timestamp, current_timestamp, current_timestamp)', [req.body.game_id, req.body.student_id, req.body.score_value])
    .then(function (data) {
        res.status(200)
        .json({
            status: 'success',
            message: 'Data inserted'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}
