function initMap() {
    // Initialize the map
    const map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: -33.977, lng: 18.695 }, // Default center (Sydney)
        zoom: 15
    });

    // Add autocomplete to the pickup field
    const pickupInput = document.getElementById('pickup');
    const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
        types: ['geocode'], // Restrict to geographic locations
    });

    // Add autocomplete to the dropoff field
    const dropoffInput = document.getElementById('dropoff');
    const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, {
        types: ['geocode'], // Restrict to geographic locations
    });

    // Optional: Bind the autocomplete fields to the map
    pickupAutocomplete.bindTo('bounds', map);
    dropoffAutocomplete.bindTo('bounds', map);

    // Add a marker (optional)
    const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'Hello World!'
    });
}

document.getElementById('rideForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    const time = document.getElementById('time').value;

    alert(`Ride booked!\nPickup: ${pickup}\nDropoff: ${dropoff}\nTime: ${time}`);
});

//-33.9777610284874, 18.695671167342816