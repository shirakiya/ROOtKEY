$(function(){
  var $form = $('#form-search');
  var start  = $form.find("#form_start").val();
  var end    = $form.find("#form_end").val();
  var mode   = $form.find("#form_mode option:selected").val();
  var radius = parseInt($form.find("#form_radius option:selected").val());

  var selectMode = "";
  if (mode === "driving") {
    selectMode = google.maps.TravelMode.DRIVING;
  } else if (mode === "walking") {
    selectMode = google.maps.TravelMode.WALKING;
  }

  var markerInfo = JSON.parse($("#marker_info").text());

  initialize();
  //calcDistance();

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
    	center: new google.maps.LatLng(35.617932, 139.722558),
    	scrollwheel: true,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionsDisplay.setMap(map);

    // マーカーの設置
    if (markerInfo.length > 0) {
      for (var key in markerInfo) {
        var myMarker = new google.maps.Marker({
          position : new google.maps.LatLng(markerInfo[key]["lat"], markerInfo[key]["lng"]),
          map      : map,
        });

        //情報ウィンドウ（吹き出し）の設置
        var contentString =
          '<div class="markerinfo">'+
            '<div class="markerinfo-title">' + markerInfo[key]["name"] + '</div>'+
            '<div>住所: ' + markerInfo[key]["vicinity"] + '</div>'+
          '</div>';

        attachMessage(myMarker,contentString);
      }
    }

    // 出発地から目的地までのルートの表示
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin      : start,
      destination : end,
      travelMode  : selectMode,
      avoidTolls  : true
    };
    directionsService.route(request, function(result,status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);

        // 出発地から目的地までの距離と移動時間を表示する
        var distance = result.routes[0].legs[0].distance.text;
        var duration = result.routes[0].legs[0].duration.text;
        $('#search-result-detail-origin').append('<i class="fa fa-arrows-h"></i> ' + distance + '　<i class="fa fa-clock-o"></i> ' + duration);
      }
    });

  //  var searchCo   = JSON.parse($("#search_co").text());
  //  if (searchCo.length !== 0) {
  //    for (var key in searchCo) {
  //      var circleOptions = {
  //        strokeColor   : "#FF0000",
  //        strokeOpacity : 0.8,
  //        strokeWeight  : 2,
  //        fillColor     : "#FF0000",
  //        fillOpacity   : 0.35,
  //        map           : map,
  //        center        : new google.maps.LatLng(searchCo[key]["lat"], searchCo[key]["lng"]),
  //        radius        : radius,
  //      };
  //      new google.maps.Circle(circleOptions);
  //    }
  //  }
  }

  // マーカーがクリックされた時の処理
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

  // 出発地から各マーカーまでの距離を算出し、表示させる
  function calcDistance() {
    var starts   = new Array(start);
    var reqcount = Math.ceil(markerInfo.length/25);

    var markerInfoPart = {};
    for (var i=0; i<reqcount; i++) {
      // markerInfoから25個の要素を取り出す
      var startKey = i * 25;
      var endKey   = startKey + 25;
      markerInfoPart[i] = markerInfo.slice(startKey, endKey);

      // 取り出したmarkerInfoの緯度経度のみを持つ配列をさらに取り出す
      var desLatLngs = [];
      for (var key in markerInfoPart[i]) {
        var desLatLng = new google.maps.LatLng(markerInfoPart[i][key]['lat'], markerInfoPart[i][key]['lng']);
        desLatLngs.push(desLatLng);
      }

      // 距離検索実行
      var service = new google.maps.DistanceMatrixService();
      var option = {
        origins     : starts,
        destinations: desLatLngs,
        travelMode  : selectMode,
        unitSystem  : google.maps.UnitSystem.METRIC,
        avoidTolls  : true
      };
      service.getDistanceMatrix(option, function(result, status){
        if (status == google.maps.DistanceMatrixStatus.OK) {
          // この検索結果と合わせて詳細情報を表示させる
          var results = result.rows[0].elements;  // 出発地点から各マーカーへの距離情報オブジェクトを配列で持っている状態
          //TODO コールバックが実行されるのにタイムラグがあり、このブロックよりしたの処理が先に実行されてしまう
          //mapの抜本的見直しが必要!!
          for (var resKey in results) {
            //var targetMarker = markerInfoPart[i].shift;
          }

          $('.loader').hide();
        }
      });
    }
  }

});
