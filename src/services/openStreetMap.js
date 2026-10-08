const NOMINATIM_URL = 'https://nominatim.openstreetmap.org'
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

const fetchJson = async (url, options = {}) => {
  const controller = options.signal || new AbortController().signal
  const timeout = window.setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Location service returned ${response.status}.`)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Location search timed out. Please try again.')
    }
    throw new Error(error.message || 'The location service is unavailable.')
  } finally {
    window.clearTimeout(timeout)
  }
}

export const getCurrentLocation = () => new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    reject(new Error('Location services are not available in this browser.'))
    return
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
    (error) => reject(new Error(error.message || 'Location access was declined.')),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
  )
})

const toPlace = (result) => ({
  id: result.place_id || result.osm_id || `${result.lat}-${result.lon}-${result.display_name}`,
  name: result.name || result.display_name.split(',')[0],
  address: result.address || result.display_name,
  location: {
    lat: Number(result.lat),
    lng: Number(result.lon),
  },
  rating: result.rating,
  reviews: result.reviews,
})

export const searchPlaces = async (query, { location, signal } = {}) => {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []

  const params = new URLSearchParams({
    format: 'jsonv2',
    limit: '8',
    countrycodes: 'ng',
    q: `${normalizedQuery}, Nigeria`,
  })

  if (location) {
    params.set('lat', location.lat)
    params.set('lon', location.lng)
  }

  const results = await fetchJson(`${NOMINATIM_URL}/search?${params.toString()}`, { signal })
  return results.map(toPlace)
}

const formatOsmAddress = (tags) => {
  const street = tags['addr:street'] || tags.street
  const city = tags.city || tags.town || tags.village
  const state = tags.state || tags.county
  const country = tags.country || 'Nigeria'

  return [street, city, state, country].filter(Boolean).join(', ')
}

export const getNearbyPlaces = async (location, radius = 20000) => {
  const query = `[out:json];
    (
      node(around:${radius},${location.lat},${location.lng})["name"];
      way(around:${radius},${location.lat},${location.lng})["name"];
      relation(around:${radius},${location.lat},${location.lng})["name"];
    );
    out center 20;
  `

  const results = await fetchJson(`${OVERPASS_URL}?data=${encodeURIComponent(query)}`)
  const places = (results.elements || [])
    .filter((element) => element.tags?.name)
    .map((element) => ({
      id: `${element.type}-${element.id}`,
      name: element.tags.name,
      address: formatOsmAddress(element.tags),
      location: {
        lat: element.center?.lat || element.lat,
        lng: element.center?.lon || element.lon,
      },
    }))

  return places.slice(0, 20)
}

export const getOpenStreetMapStatus = () => true
