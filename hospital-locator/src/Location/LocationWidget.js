import React from 'react'
import { usePermission, useLocation, getCityFromCoordinates } from './Location'

const LocationWidget = () => {
    const [locationAccess] = usePermission('geolocation')
    const [location, locationError] = useLocation()
    const [cityName, setCityName] = React.useState()

    React.useEffect(() => {
        if (!location) {
            return
        }
        getCityFromCoordinates(`${location.latitude},${location.longitude}`)
        .then(newCityName => setCityName(`Searching near ${newCityName}`))
    }, [location])

    const locationFailed = () => locationAccess === 'denined' || locationError

    const getText = () => {
        return locationFailed() ? 'Unable to determine location. Tap here to retry...'
            : !location ? 'Determining location...'
            : cityName
    }

    const requestLocation = () => {
        // TODO: We may want to reload location in-place, rather than reloading the entire page.
        // Due to permissions behavior being different on select browsers, this was not straightforward. 
        // For now, we will just reload the page which will request the user permission again.
        window.location.reload()
    }

    return (
        <div className="location-widget-root" onClick={requestLocation}>
            <p className="location-widget-text">
                {getText()}
            </p>
        </div>
    )
}

export { LocationWidget }