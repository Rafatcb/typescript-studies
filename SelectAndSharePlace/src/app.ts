import axios from 'axios';
const GOOGLE_API_KEY = 'AIzaSyDk9oiEpZ-ITm3HPhoo0FJ2BggYaVtcIWw';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredValue = addressInput.value;

    axios
        .get<GoogleGeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredValue)}&key=${GOOGLE_API_KEY}`
        )
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 13
            });
            new google.maps.Marker({ position: coordinates, map: map });
        })
        .catch(err => alert(err));
}

form.addEventListener('submit', searchAddressHandler);
