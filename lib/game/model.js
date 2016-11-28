exports.getGame = function (req, res, next) {
    req.db.any('select * from games left join games_courses using(game_id) where course_id = $1', [req.params.course_id])
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

exports.getGameFromSession = function (req, res, next) {
    req.db.any('select *, g.game_id, case when course_id IS NULL then 0 else 1 end as enabled from games g left join games_courses gc on g.game_id = gc.game_id and gc.course_id = $1', [req.session.course_id])
    .then(function (data) {
        res.status(200)
        .json(data);
    })
    .catch(function (err) {
        return next(err);
    });
}

exports.toggle = function (req, res, next) {
    if (req.body.enabled == 1) {
        req.db.any('insert into games_courses(course_id, game_id) values($1, $2)', [req.session.course_id, req.params.game_id])
        .then(function (data) {
            res.status(200)
            .json(data);
        })
        .catch(function (err) {
            return next(err);
        });
    } else {
        req.db.any('delete from games_courses where course_id = $1 and game_id = $2', [req.session.course_id, req.params.game_id])
        .then(function (data) {
            res.status(200)
            .json(data);
        })
        .catch(function (err) {
            return next(err);
        });
    }
}
