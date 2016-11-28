exports.signupAsTeacher = function(req, res, next) {
	var hash = req.bcrypt.hashSync(req.body.user_password, req.saltRounds);

	var values = [
		req.body.user_login,
		hash,
		req.body.user_first_name,
		req.body.user_last_name,
		req.body.course_id,
		req.body.user_email
	]

	req.db.none('insert into teachers(user_login, user_password, user_first_name, user_last_name, course_id, user_email) values($1, $2, $3, $4, $5, $6)', values)
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Teacher inserted'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

exports.signupAsStudent = function(req, res, next) {
	var values = [
		req.body.user_login,
		req.body.user_password,
		req.body.user_first_name,
		req.body.user_last_name,
		req.body.course_id,
	]

	req.db.none('insert into students(user_login, user_password, user_first_name, user_last_name, course_id) values($1, $2, $3, $4, $5)', values)
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Student inserted'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}