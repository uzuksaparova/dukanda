import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';

const Test = () => {
    // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    //     useGeolocated({
    //         positionOptions: {
    //             enableHighAccuracy: false,
    //         },
    //         userDecisionTimeout: 5000,
    //         onError: (err) => {
    //             console.log(err);
    //         },
    //     });
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lng: '' },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({ loaded: true, error });
    };

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setLocation((state) => ({
                ...state,
                loaded: true,
                error: {
                    code: 0,
                    message: 'Geolocation not supported',
                },
            }));
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return (
        <>
            {location.lat && location.lat}
            {location.lng && location.lng}
            {/* {coords ? (
                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{coords.longitude}</td>
                        </tr>
                        <tr>
                            <td>altitude</td>
                            <td>{coords.altitude}</td>
                        </tr>
                        <tr>
                            <td>heading</td>
                            <td>{coords.heading}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{coords.speed}</td>
                        </tr>
                    </tbody>
                </table>
            ) : null} */}
        </>
    );
};

export default Test;



