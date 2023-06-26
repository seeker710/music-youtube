// import package components
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
// import components
import useAppState from "../context/AppState";
import Navbar from '../components/homepage-components/Navbar';
import MainPanel from '../components/playerpager-components/MainPanel';
import SidePanel from '../components/playerpager-components/SidePanel';
import PlayerBar from '../components/playerpager-components/PlayerBar';
// change
import axios from 'axios';
import { KEY, HOST } from '../Constant';

const Playerpage = () => {

    const { data, setTracklist } = useAppState();
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const config = {
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': HOST,
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const seed = data.seed;
                if (data.seed == null) navigate('/', { replace: true });
                const { data: { mediaItems } } = await axios.get(`https://spotify23.p.rapidapi.com/seed_to_playlist/?uri=${seed}`, config);
                const playlistId = mediaItems[0].uri.split(":")[2];
                const { data: { items } } = await axios.get(`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistId}&offset=1&limit=30`, config);
                const tracklist = items.map(item => item.track);
                setTracklist(tracklist);
                setLoad(true);
            } catch (error) {
                console.log(`error occured: ${error}`);
                navigate('/');
            }
        })();
    }, [])

    return (
        <>
            <div className='fixed top-0 left-0 h-[64px] w-screen z-[3] bg-[#030303] opacity-[1]'></div>
            {/* navbar  */}
            <Navbar />
            {/* player content */}
            {load ? <><div className='fixed top-[64px] w-screen h-[calc(100vh-64px-72px)] text-white'>
                <div className='flex lg:flex-row md:flex-col sm:flex-col lg:pt-[32px] md:pt-[32px] sm:pt-[24px] lg:px-[56px] md:px-[56px] sm:px-[12px] h-full'>
                    <MainPanel />
                    <SidePanel />
                </div>
            </div>
            {/* music control panel */}
            <div>
                <PlayerBar />
            </div></> : <div className="flex h-[100vh] w-[100vw] items-center justify-center"><ScaleLoader color={'#f00303'} size={50} /></div>}
        </>
    );
}

export default Playerpage;