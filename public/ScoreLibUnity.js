var EndScore = {
    user_id: "-1",  
 	game_id: "-1",

    endGame: function (score) {
    	this.getUrl();
    	$.post( "http://46.105.123.11/score/student/", 
    		{ 
    			student_id: this.user_id, 
    			score_value: score,
    			game_id: this.game_id
    		});
    },

    getUrl: function () {
    	var param = window.location.search.substr(1)
    	var tab_param = param.split('&')
    	this.user_id = tab_param[0].split('=')[1]
    	this.game_id = tab_param[1].split('=')[1]
    }
};
