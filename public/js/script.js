$(function () {
	$('#submitForm').on('click', function () {
		$.ajax({ // send first name
			url: '/api/find',
			method: 'POST',
			data: {firstName: $('#firstName').val()},
			success: function (data) {
				if(!data.success)
					$('h2').html('User not found!');
				else
					$('h2').html('User found!');
			}
		})
	});
});