function initMap() {
    const mapOptions = {
      center: { lat: 34.0522, lng: -118.2437 }, // Set the initial center of the map
      zoom: 10, // Set the initial zoom level
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Define an array of locations with their latitude and longitude
    const locations = [
      { lat: 37.7749, lng: -122.4194, title: "San Francisco" },
      { lat: 34.0522, lng: -118.2437, title: "Los Angeles" },
      { lat: 40.7128, lng: -74.0060, title: "New York City" }
      // Add more locations as needed
    ];

    // Create and add markers for each location
    for (const location of locations) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: location.title
      });
    }
  }


function initMap(data) {
    const mapOptions = {
      center: { lat: data[0].lat, lng: data[0].lng }, 
      zoom: 11,
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const locations = data.map((e) => {
      return {lat: e.lat, lng: e.lng, title: e.name}
    })
    // console.log(locations);

    for (const location of locations) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: location.title
      });
    }
}


{/* <iframe 
    src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed"
    width="100%"
    height="100%"
    frameborder="0"
    style="border:0">
</iframe> */}