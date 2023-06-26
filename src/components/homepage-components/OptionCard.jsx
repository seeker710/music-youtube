// import package components
import { useNavigate } from 'react-router-dom';
// import components
import useAppState from '../../context/AppState';
// import assets
import { IoMdPlay } from 'react-icons/io';

const OptionCard = ({ song }) => {

    // function use to display info on homepage
    const { track: songData } = song;
    const printName = () => songData.name.split(" (")[0];
    const printArtist = () => {
        var artist = "";
        for (var i = 0; i < songData.artists.length; ++i) {
            artist += songData.artists[i].name;
            if (i === songData.artists.length - 1)
                break;
            artist += ", "
        }
        return artist;
    }

    // function use to display info on playerpage
    const { setSeed,setSong, setTracklist } = useAppState();
    const navigate = useNavigate();
    const clickHandler = () => {
        const seed = songData.uri;
        setSong(songData);
        setTracklist([songData]);
        setSeed(seed);
        navigate('/song');
    }

    return (
        <div className="mb-[16px] mr-[24px] pr-[8px] w-[420px] flex items-center h-[48px] relative" onClick={clickHandler}>
            <div className="w-[48px] h-[48px] mr-[16px] rounded-sm">
                <img src={songData.album.images[2].url} alt="thumbnail" className="w-full h-full" />
            </div>
            <div className="absolute w-[48px] h-[48px] cursor-pointer opacity-0 hover:opacity-100">
                <div className="h-full w-full bg-[rgba(0,0,0,0.8)]"></div>
                <div className="h-full w-full -translate-y-2/3 translate-x-1/3 text-lg"><IoMdPlay /></div>
            </div>
            <div className="flex overflow-hidden flex-wrap w-[calc(100%-48px-16px)]">
                <div className="basis-full mb-[3px] flex justify-between overflow-hidden text-[14px] leading-[1.2] font-medium truncate cursor-default">
                    {printName()}
                </div>
                <div className="text-[14px] leading-[1.2] font-normal text-[rgba(255,255,255,0.7)] truncate cursor-default">
                    {printArtist()}
                </div>
            </div>
        </div>
    );
}

export default OptionCard;