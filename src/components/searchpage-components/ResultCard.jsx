// import package components
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import components
import useAppState from '../../context/AppState';
import { KEY, HOST } from '../../Constant';
// import assets
import { IoMdPlay } from 'react-icons/io';

const ResultCard = ({ songData }) => {

    // print metadata of result songs
    const printArtist = () => {
        var artist = "";
        for (var i = 0; i < songData.data.artists.items.length; ++i) {
            artist += songData.data.artists.items[i].profile.name;
            if (i === songData.data.artists.items.length - 1)
                break;
            artist += ", "
        }
        return artist;
    }
    const printTime = () => {
        var time = songData.data.duration.totalMilliseconds;
        var min = Math.floor(time / 60000);
        var sec = ((time % 60000) / 1000).toFixed(0);
        return min + ":" + (sec < 10 ? '0' : '') + sec;
    }

    // display data on player page
    const { setSeed, setSong, setTracklist } = useAppState();
    const navigate = useNavigate();
    const config = {
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': HOST,
        }
    }
    const clickHandler = async () => {
        console.log("hello", songData);
        const seed = songData.data.uri;
        setSeed(seed);
        try {
            const {data: {tracks: [song]}} = await axios.get(`https://spotify23.p.rapidapi.com/tracks/?ids=${songData.data.id}`, config);
            setSong(song);
            setTracklist([song]);
            navigate('/song');
        } catch (error) {
            console.log(`error occured: ${error}`);
            navigate('/');
        }
    }

    return (
        <div className="border-b border-[rgba(255,255,255,0.1)] flex items-center h-[80px] px-[8px]">
            <div className="w-[56px] h-[56px] mr-[16px] relative cursor-pointer" onClick={clickHandler}>
                <img src={songData.data.albumOfTrack.coverArt.sources[1].url} alt="" />
                <div className="absolute w-full h-full -translate-y-full cursor-pointer opacity-0 hover:opacity-100">
                    <div className="h-full w-full bg-[rgba(0,0,0,0.8)]"></div>
                    <div className="w-[24px] h-[24px] m-auto -translate-y-[155%] translate-x-[12%] text-[rgba(255,255,255,1)]"><IoMdPlay className="w-[20px] h-[20px]" /></div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="mb-[4px] text-[14px] leading-[1.2] font-medium text-white line-clamp-1 truncate cursor-pointer" onClick={clickHandler}>{songData.data.name}</div>
                <div className="text-[14px] leading-[1.2] font-normal text-[rgba(255,255,255,0.5)] line-clamp-1 truncate cursor-default">Song • {printArtist()} • {printTime()}</div>
            </div>
        </div>
    );
}

export default ResultCard;