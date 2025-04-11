// Global variables
let pickupAutocomplete;
let dropoffAutocomplete;
const isMobile = window.matchMedia("(max-width: 991px)").matches;

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');
const rideForm = document.getElementById('rideForm');
const pickupInput = document.getElementById('pickup');
const dropoffInput = document.getElementById('dropoff');

// Initialize sidebar functionality
function initSidebar() {
    // Only show toggle button on mobile
    if (isMobile) {
        menuToggle.style.display = 'block';
    } else {
        menuToggle.style.display = 'none';
        document.body.classList.add('desktop-sidebar-open');
    }

    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
    });

    closeMenu.addEventListener('click', () => {
        if (isMobile) {
            document.body.classList.remove('sidebar-open');
        } else {
            document.body.classList.remove('desktop-sidebar-open');
        }
    });

    overlay.addEventListener('click', () => {
        if (isMobile) {
            document.body.classList.remove('sidebar-open');
        } else {
            document.body.classList.remove('desktop-sidebar-open');
        }
    });

    // Close sidebar when clicking on menu items (mobile only)
    if (isMobile) {
        document.querySelectorAll('#sidebar a').forEach(item => {
            item.addEventListener('click', () => {
                document.body.classList.remove('sidebar-open');
            });
        });
    }
}
// Initialize Google Maps and Autocomplete
function initMap() {
    try {
        // Initialize the map
        const map = new google.maps.Map(document.getElementById('map-container'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 13,
            gestureHandling: 'cooperative' // Better touch control
        });

        // Add autocomplete to the pickup field
        const pickupInput = document.getElementById('pickup');
        const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        // Add autocomplete to the dropoff field
        const dropoffInput = document.getElementById('dropoff');
        const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, {
            fields: ['address_components', 'geometry', 'name'],
            types: ['geocode'],
        });

        // Bind autocomplete fields to the map
        pickupAutocomplete.bindTo('bounds', map);
        dropoffAutocomplete.bindTo('bounds', map);

        // Handle form submission
        document.getElementById('rideForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickup = document.getElementById('pickup').value;
            const dropoff = document.getElementById('dropoff').value;
            const time = document.getElementById('time').value;
            
            alert(`Booking confirmed!\nFrom: ${pickup}\nTo: ${dropoff}\nTime: ${time}`);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Map loading failed. Please check your connection.');
    }
}

// Close sidebar when clicking on menu items
document.querySelectorAll('#sidebar a').forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
    });
});

//-33.9777610284874, 18.695671167342816
