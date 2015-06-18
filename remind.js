$(document).ready(function(){
	
	$("#reminder").click(function(){
	$(".reminder").remove();
	$('<div class="reminder animated fadeIn"> <h1>Remind password</h1> <form action="" method="post"> <label for="email">email:</label><br> <input type="text" minlength="4" autofocus=true name="email" id="forgot_email"><br> <input type="submit" name="action" id="remind" value="Submit"><input type="button" name="action" id="cancel_rem" value="Cancel"></form> </div>').insertAfter($(".login")).slideDown("slow");
	$("#cancel_rem").click(function(){
		$(".reminder").removeClass("animated fadeIn");
		$(".reminder").addClass("animated fadeOut");
		$(".reminder").slideUp(800, "swing");
		// setTimeout(function(){$(".reminder").hide();}, 600);
	});
	$("#remind").click(function(e){
		
	var email = $("#forgot_email").val(),
			minlen = 4,
			pat = /[a-zA-Z\d_]+@{1}[a-zA-Z]+\.{1}[a-zA-Z]{2,}/g,
			execs = pat.exec(email);
	bubblerReminder = function(element, message) {
				$("#bubble").remove();
				$(".reminder .warn_wrapper").fadeOut("fast");
				$("<div id='bubble'>"+message+"</div>").insertAfter($(".reminder " +element).next());
				$(".reminder #bubble").slideDown("fast");
				};

		if(execs===null){
			bubblerReminder("#forgot_email", "not correct address");
			return e.preventDefault(e);
		}
		else {
				$.post("remindPass.php", {email: email}, function(data){
					$("<div class='noty'></div>").insertBefore($(".login")).html(data);
				

					$(".noty").animate({
						opacity: "1",
						marginTop: "20",
					}, 300, "swing");
					

					$(".noty").click(function(){

						$(this).animate({
						opacity: ".0",
						marginTop: "-50",
					}, 300, "swing", function(){$(this).remove();});
							
					});
				});
				$(".reminder #bubble").slideUp("fast", function(){$(this).remove();});
				return e.preventDefault(e);
		}
		});
});
});