function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(35.617932, 139.722558),
		zoom: 12,
		scrollwheel: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
