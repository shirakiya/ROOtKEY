$(function(){
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();

    directionsDisplay = new google.maps.DirectionsRenderer();
  	var mapOptions = {
  		center: new google.maps.LatLng(35.617932, 139.722558),
  		scrollwheel: true,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	};

  	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);

    var $form = $('#form-search');
    start  = $form.find("#form_start").val();
    end    = $form.find("#form_end").val();
    mode   = $form.find("#form_mode option:selected").val();
    radius = parseInt($form.find("#form_radius option:selected").val());

    var markerInfo = JSON.parse($("#marker_info").text());
    //var searchCo   = JSON.parse($("#search_co").text());

    if (markerInfo.length > 0) {
      for (var key in markerInfo) {
        var myMarker = new google.maps.Marker({
          position : new google.maps.LatLng(markerInfo[key]["lat"], markerInfo[key]["lng"]),
          map      : map,
        });

        //情報ウィンドウ（吹き出し）の設置
        var contentString =
          '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h6 id="firstHeading" class="firstHeading"><strong>' + markerInfo[key]["name"] + '</strong></h6>'+
            '<div id="bodyContent">住所: ' + markerInfo[key]["vicinity"] + '</div>'+
          '</div>';

        attachMessage(myMarker,contentString);
      }
    }

    //if (searchCo.length !== 0) {
    //  for (var key in searchCo) {
    //    var circleOptions = {
    //      strokeColor   : "#FF0000",
    //      strokeOpacity : 0.8,
    //      strokeWeight  : 2,
    //      fillColor     : "#FF0000",
    //      fillOpacity   : 0.35,
    //      map           : map,
    //      center        : new google.maps.LatLng(searchCo[key]["lat"], searchCo[key]["lng"]),
    //      radius        : radius,
    //    };
    //    new google.maps.Circle(circleOptions);
    //  }
    //}

  function calcRoute() {
    var selectMode = "";
    if (mode === "driving") {
      selectMode = google.maps.TravelMode.DRIVING;
    } else if (mode === "walking") {
      selectMode = google.maps.TravelMode.WALKING;
    }

    var request = {
      origin      : start,
      destination : end,
      travelMode  : selectMode,
      avoidTolls  : true
    };
    directionsService.route(request,function(result,status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  function attachMessage(marker,msg) {
    google.maps.event.addListener(marker, 'click', function(event) {
      if (typeof(infoWindow) != "undefined") {
        infoWindow.close();
      }
      infoWindow = new google.maps.InfoWindow({
        content : msg
      });
      infoWindow.open(marker.getMap(),marker);
    });
  }

  function calcDistance() {
    var distinations = [];
    console.log(markerInfo);
    for (var key in markerInfo) {
      console.log(markerInfo[key]);
      //distinations.push(key);
    }
  }

  calcRoute();
  calcDistance();
});
