app.factory('vicRoadsIncidents', ['$http', function($http) {
    return $http.get('components/JSONs/incidents.json')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);
