// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import AddressLink from '../components/AddressLink';
// import PlaceGallery from '../components/PlaceGallery';
// import BookingWidget from '../components/BookingWidget';

// const PlacePage = () => {


//     const { id } = useParams();
//     const [place, setPlace] = useState(null);
//     useEffect(() => {
//         if (!id) {
//             return;
//         }
//         axios.get(`places/${id}`).then(response => {
//             setPlace(response.data);
//         });
//     }, [id]);

//     if (!place) return '';


//     return (
//         <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
//             <h1 className="text-3xl">{place.title}</h1>
//             <AddressLink>{place.address}</AddressLink>
//             <PlaceGallery place={place} />
//             <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
//                 <div>
//                     <div className="my-4">
//                         <h2 className="font-semibold text-2xl">Description</h2>
//                         {place.description}
//                     </div>
//                     Check-in: {place.checkIn}<br />
//                     Check-out: {place.checkOut}<br />
//                     Max number of guests: {place.maxGuests}
//                 </div>
//                 <div>
//                     <BookingWidget place={place} />
//                 </div>
//             </div>
//             <div className="bg-white -mx-8 px-8 py-8 border-t">
//                 <div>
//                     <h2 className="font-semibold text-2xl">Extra info</h2>
//                 </div>
//                 <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
//             </div>
//         </div>
//     )
// }

// export default PlacePage
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingWidget from '../components/BookingWidget';

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    return (
        <div className="mt-4 bg-pink-50 px-8 py-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-pink-600 mb-4">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl mb-2 text-pink-600">Description</h2>
                        <p className="text-gray-800 leading-6">{place.description}</p>
                    </div>
                    <div className="my-4">
                        <h3 className="font-semibold text-lg text-pink-600">Check-in: <span className="font-normal">{place.checkIn}</span></h3>
                        <h3 className="font-semibold text-lg text-pink-600">Check-out: <span className="font-normal">{place.checkOut}</span></h3>
                        <h3 className="font-semibold text-lg text-pink-600">Max number of guests: <span className="font-normal">{place.maxGuests}</span></h3>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white px-8 py-8 border-t rounded-lg shadow-lg">
                <div>
                    <h2 className="font-semibold text-2xl mb-2 text-pink-600">Extra info</h2>
                </div>
                <div className="text-sm text-gray-800 leading-6">{place.extraInfo}</div>
            </div>
        </div>
    );
};

export default PlacePage;
