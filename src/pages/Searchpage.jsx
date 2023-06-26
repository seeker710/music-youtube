// import package components
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
// import components
import useAppState from '../context/AppState';
import Navbar from '../components/homepage-components/Navbar';
import TopResult from '../components/searchpage-components/TopResult';
import Result from '../components/searchpage-components/Result';
// change
import { KEY, HOST } from '../Constant';
import axios from 'axios';

const Searchpage = () => {

    const { data, clearTracklist } = useAppState();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [topResults, setTopResults] = useState();
    const [tracks, setTracks] = useState();
    const config = {
        params: {
            q: data.query,
            type: 'multi',
            offset: '0',
            limit: '5',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': HOST,
        }
    }
    useEffect(() => {
        clearTracklist();
        if(data.query == null) navigate('/');
        (
            async () => {
                try {
                    const { data: { topResults, tracks } } = await axios.get(`https://spotify23.p.rapidapi.com/search/`, config);
                    setTopResults(topResults.items[1]);
                    setTracks(tracks);
                    setLoad(true);
                } catch (error) {
                    console.log(`error occured: ${error}`);
                    navigate('/')
                }
            }
        )();
    }, [])

    return (
        <>
            <div className='fixed top-0 left-0 h-[64px] w-screen z-[3] bg-[#030303] opacity-[1]'></div>
            <Navbar />
            {load ? <div className="pt-[64px]">
                <div className="lg:w-[860px] md:w-[560px] sm:w-[calc(100vw-44px)] pt-[16px] m-auto">
                    <div className="flex flex-col">
                        {/* <Result queryTitle="Top result" song={topResults.items} /> */}
                        <TopResult songData={topResults} />
                        <Result song={tracks.items} />
                    </div>
                </div>
            </div> : <div className="flex h-[100vh] w-[100vw] items-center justify-center"><ScaleLoader color={'#f00303'} size={50} /></div>}
        </>
    )
}

export default Searchpage;