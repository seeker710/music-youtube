// import components
import useAppState from '../../context/AppState';
// import assets
import { IoMdPlay } from 'react-icons/io';
import { SlVolume2 } from 'react-icons/sl';

const SongCard = ({ song, index }) => {

    const { data, setSong, setCurrentIndex } = useAppState();
    const changeSong = () => {
        setSong(song);
        setCurrentIndex(index);
    }

    const printName = () => song.name.split(" (")[0];
    const printArtist = () => {
        var artist = "";
        for (var i = 0; i < song.album.artists.length; ++i) {
            artist += song.album.artists[i].name;
            if (i === song.album.artists.length - 1)
                break;
            artist += ", "
        }
        return artist;
    }
    const printTime = () => {
        var min = Math.floor(song.duration_ms / 60000);
        var sec = ((song.duration_ms % 60000) / 1000).toFixed(0);
        return min + ":" + (sec < 10 ? '0' : '') + sec;
    }

    return (
        <div className="px-[8px] h-[56px] flex flex-row items-center border-b border-[rgba(255,255,255,0.1)]">
            <div className="mr-[16px] w-[32px] h-[32px] relative rounded-sm overflow-hidden cursor-pointer" onClick={changeSong}>
                <div className="absolute w-full h-full rounded-sm overflow-hidden bg-transparent opacity-[1]">
                    <img src={song.album.images[2].url} alt="song-icon" className="h-full w-full object-contain" />
                </div>
                {
                    (song.id === data.selectedSong.id) ?
                        <div className="absolute w-full h-full opacity-[1]">
                            <div className="bg-[rgba(0,0,0,0.8)] h-full w-full top-0 bottom-0 right-0 left-0"></div>
                            <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0">
                                <SlVolume2 className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                        :
                        <div className="absolute w-full h-full opacity-0 hover:opacity-100">
                            <div className="bg-[rgba(0,0,0,0.8)] h-full w-full top-0 bottom-0 right-0 left-0"></div>
                            <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0">
                                <IoMdPlay className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                }
            </div>
            <div className="flex flex-col flex-1 self-center min-w-[1px]">
                <div className="text-[14px] leading-[1.2] font-medium text-white mb-1">{printName()}</div>
                <div className="text-[14px] leading-[1.2] font-normal text-[#aaa] text-ellipsis overflow-hidden whitespace-nowrap">{printArtist()}</div>
            </div>
            <div className="ml-4"></div>
            <div className="pl-2 text-[14px] leading-[1.2] font-normal text-[#aaa] text-ellipsis overflow-hidden whitespace-nowrap">{printTime()}</div>
        </div>
    );
}

export default SongCard;
