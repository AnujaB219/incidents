app.controller('MainController', function($scope, $log, $timeout, $http) {

    $http.get("components/JSONs/incidents.json")
        .success(function(data) {
            $scope.incidents = data.incidents;

            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(-37.8415, 144.9821),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.markers = [];

            var infoWindow = new google.maps.InfoWindow();

            var createMarker = function(info) {

                var marker = new google.maps.Marker({
                    id: info.id,
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.long),
                    title: info.title
                });

                var content = '<div id="iwContainer">' +
                    '<div class="iwTitle">' + info.title + '</div>' +
                    '<div class="iwSubTitle">' + info.incident_type + '</div>' +
                    '<div class="iwContent">' + info.description + '</div>' +
                    '</div>';

                marker.content = content;

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent(marker.content);
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);

            };

            for (i = 0; i < $scope.incidents.length; i++) {
                createMarker($scope.incidents[i]);
            };

            $scope.isMarkerVisible = function(incident) {
                var bounds = $scope.map.getBounds();
                //alert(bounds);
                for (var i = 0; i < $scope.markers.length; i++) {
                    var marker = $scope.markers[i];
                    if (incident.id === marker.id) {
                        if (bounds.contains(marker.getPosition()) === true) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            };

            $scope.getIncidentsForVisibleMarkers = function() {

                var visibleIncidents = [];

                var bounds = $scope.map.getBounds();

                for (var i = 0; i < $scope.markers.length; i++) {
                    var marker = $scope.markers[i];

                    if (bounds.contains(marker.getPosition()) === true) {

                        for (var j = 0; j < $scope.incidents.length; j++) {
                            if (marker.id === $scope.incidents[j].id) {
                                visibleIncidents.push($scope.incidents[j]);
                            }
                        }
                    }
                }
                $scope.visibleIncidents = visibleIncidents;
                $scope.buttonText = "List (" + $scope.visibleIncidents.length + ")";


            };

            $scope.openInfoWindow = function(e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };

            google.maps.event.addListener($scope.map, 'bounds_changed', function() {
                $scope.$apply(function() {
                    $scope.getIncidentsForVisibleMarkers();
                })

            });

            $scope.listVisible = false;

            $scope.toggleShowList = function() {

                if ($scope.listVisible ===false) {
                    $scope.listVisible = true;
                    $scope.buttonText = "Hide List";
                } else {
                    $scope.listVisible = false;
                    $scope.buttonText = "List (" + $scope.visibleIncidents.length + ")";
                }
            };
        });
});