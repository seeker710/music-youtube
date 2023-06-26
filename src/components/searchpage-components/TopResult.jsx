// import package components
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import components
import useAppState from '../../context/AppState';
import { KEY, HOST } from '../../Constant';
// import assets
import { IoMdPlay } from 'react-icons/io';

const TopResult = ({ songData }) => {

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
        <div className="mb-[32px] lg:w-[860px] md:w-[560px] sm:w-[calc(100vw-44px)] mx-auto">
            <div className="my-[16px]">
                <h2 className="font-['youtube-sans'] text-[24px] font-semibold leading-[1.2] text-white">Top result</h2>
            </div>
            <div className="grid grid-cols-1 relative overflow-hidden rounded-lg lg:w-[860px] md:w-[560px] sm:w-[calc(100vw-44px)]">
                <div id="top-result-background" className="m-0 p-0 border-0 bg-transparent">
                    <div className="absolute block inset-0 h-full z-[-2] opacity-70 blur-3xl">
                        <img src={songData.data.albumOfTrack.coverArt.sources[1].url} alt="top-result-background" className="object-cover object-center w-full h-full" />
                    </div>
                </div>
                <div id="top-result-container" className="flex flex-row relative h-full bg-transparent m-0 p-0 border-0 w-full">
                    <div className="top-result-card w-full">
                        <div className="top-result-thumbnail lg:p-4 md:p-4 sm:p-4 sm:pb-0">
                            {/* song thumbnail */}
                            <div className="flex lg:w-[100px] md:w-[100px] sm:w-[64px] lg:h-[100px] md:h-[100px] sm:h-[64px] rounded-sm overflow-hidden mr-4 relative">
                                {/* thumbnail image */}
                                <div className="h-full w-full block relative cursor-pointer">
                                    <img src={songData.data.albumOfTrack.coverArt.sources[1].url} alt="search-thumbnail" className="h-full w-full object-contain" />
                                </div>
                                {/* hover effect */}
                                <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full block opacity-0 hover:opacity-100">
                                    <div className="bg-gradient-to-b from-[rgba(0,0,0,.8)] to-[rgba(0,0,0,.8)] h-full w-full">
                                        <div className="flex items-center justify-center h-full w-full cursor-pointer"  onClick={clickHandler}>
                                            <div className="w-8 h-8 text-white">
                                                <IoMdPlay className="w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* song name and information */}
                            <div className="details-container overflow-hidden p-0">
                                {/* song information */}
                                <div id="metadata-container" className="self-center flex flex-col justify-end items-start p-0">
                                    <div className="font-['youtube-sans'] lg:text-[22px] md:text-[22px] sm:text-[18px] font-semibold leading-[1.2] text-white mb-2 cursor-pointer whitespace-normal max-w-full line-clamp-1 truncate "  onClick={clickHandler}>{songData.data.name}</div>
                                    <div className="text-[14px] leading-[1.2] font-normal text-[rgba(255,255,255,0.5)] line-clamp-1 truncate cursor-default">Song • {printArtist()} • {printTime()}</div>
                                </div>
                                {/* play button */}
                                <div id="actions-container" className="lg:ml-auto md:ml-0 self-center w-[min(145px,100%)] overflow-hidden">
                                    <div className="text-[#030303] bg-white px-4 h-9 rounded-[18px] leading-9 flex items-center justify-center cursor-pointer" onClick={clickHandler}>
                                        <div className="mr-[6px] w-[18px] h-[18px]"><IoMdPlay className="w-full h-full" /></div>
                                        <div className="text-[14px] overflow-hidden whitespace-nowrap capitalize">Play</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* This action is displayed for mobile version only */}
                        <div className="lg:hidden md:hidden sm:block px-4 pb-4 w-[60%]">
                            <div className="text-[#030303] bg-white px-4 h-9 rounded-[18px] leading-9 flex items-center justify-center cursor-pointer" onClick={clickHandler}>
                                <div className="mr-[6px] w-[18px] h-[18px]"><IoMdPlay className="w-full h-full" /></div>
                                <div className="text-[14px] overflow-hidden whitespace-nowrap capitalize">Play</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopResult;