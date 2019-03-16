export function updateCity(city, lat, lng, latRng, lngRng, zoom){
    return {
        type: "UPDATE_CITY",
        city,
        lat,
        lng,
        latRng,
        lngRng,
        zoom
    }
}