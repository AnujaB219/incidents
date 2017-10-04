# Traffic Map

A local traffic authority needs a solution to display traffic incidents on a map. A simple browser based interface is required to display incident locations and information each about each incident.
JSON Feed

The traffic incidents are published in a JSON feed which contains data about the incident type, description, location details etc. This is live data and usually contains 300-400 items. Assumption: This is the maximum number of items your solution needs to support.

It's a single page JS application that has the following features

   1. Displays the incidents on an interactive map. Each incident in the feed should be displayed on the map with a marker. The user must be able to pan and zoom the map to explore incidents in a particular area. You can choose which map library to use.
   2.  When a user clicks an incident marker some basic information is shown. The following incident details are required to be displayed: alert_type, title, description. This information should be presented in a pop-up element that can be dismissed by the user.
   3.  Displays incidents in a list. As the user pans and zooms the map interface the incident list needs to be updated to show only the incidents currently visible on the map. Each list element needs to display the alert_type and title of the incident.

## Instructions to build

1. Download the code and Install Node.js.
2. Open the terminal and Install all components with   
         npm install -g grunt-cli bower yo generator-karma generator-angular
3. Go to the project directory to build the angular application
         yo angular
4. Run it on localhost:
    grunt serve
