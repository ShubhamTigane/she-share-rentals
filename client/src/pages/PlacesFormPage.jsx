import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PhotosUploader from '../components/PhotosUploader';
import Perks from '../components/Perks';
import AccountNav from '../components/AccountNav';

const PlacesFormPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');

    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice] = useState(1000)

    const [addedPhotos, setAddedPhotos] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        })
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }



    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }


    async function savePlace(e) {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        };

        if (id) {
            await axios.put('/places', {
                id, ...placeData
            })
            alert("place updated");
        }
        else {
            await axios.post('/places', placeData);
            alert("place added");
        }

        navigate('/account/places'); // Navigate using useNavigate


    }

    

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {/* <h2 className='text-2xl mt-4' >Title</h2> */}
                {/* <p className='text-gray-500 text-sm' >title for your place</p> */}
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='title, My lovely home' />
                {/* <h2 className='text-2xl mt-4' >Address</h2> */}
                {/* <p className='text-gray-500 text-sm' >Address to this place</p> */}
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='address' />
                {/* <h2 className='text-2xl mt-4' >photos</h2> */}
                {/* <p className='text-gray-500 text-sm' >more = better</p> */}
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {/* <h2 className='text-2xl mt-4' >Description</h2> */}
                {/* <p className='text-gray-500 text-sm' >description of the place</p> */}
                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                {/* <h2 className='text-2xl mt-4' >Perks</h2> */}
                {/* <p className='text-gray-500 text-sm' >select all the perks</p> */}
                {preInput('Perks', 'select all the perks of your place')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {/* <h2 className='text-2xl mt-4' >Extra info</h2> */}
                {/* <p className='text-gray-500 text-sm' >House rules </p> */}
                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                {/* <h2 className='text-2xl mt-4' >check in & check out</h2> */}
                {/* <p className='text-gray-500 text-sm' >add check in & check out time </p> */}
                {preInput('Check in & out times', 'add check in and out times')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4' >
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in Time</h3>
                        <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='11:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in Out</h3>
                        <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='11:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max Guests</h3>
                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder='4' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder='4' />
                    </div>
                </div>
                <div>
                    <button className='primary my-4' >Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage
