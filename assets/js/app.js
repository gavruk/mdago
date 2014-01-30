$(function () {
	$("#html_input").responsivetextarea({ minrows : 30 });

	$('#html_input').bind('input propertychange', function() {
		$.post('/update', { html: $("#html_input").val() }, 
			function (response) {
				if (response != null && response.md != null)
					$("#md_result").html(response.md);
			}
		);
	});
});