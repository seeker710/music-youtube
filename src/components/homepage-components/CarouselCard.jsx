// import package components
import { useNavigate } from 'react-router-dom';
// import components
import useAppState from '../../context/AppState';
// import assets
import { IoMdPlay } from 'react-icons/io';

const CarouselCard = ({ song }) => {

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
        <div className="container lg:w-[calc((89vw-4*24px)/5)] md:w-[calc((89vw-3*24px)/4)] sm:w-[calc((89vw-2*24px)/3)] mr-[24px]" onClick={clickHandler}>
            <div className="cursor-pointer relative">
                <img src={songData.album.images[1].url} className="h-full w-full object-cover rounded-md" />
                <div className="image-overlay">
                    <div className="absolute right-[20px] bottom-[20px]">
                        <div className="hover-play-button h-[40px] w-[40px] bg-[rgba(0,0,0,0.6)] rounded-full flex justify-center items-center duration-200 ease-in">
                            <IoMdPlay className="h-[22px] w-auto ml-[2px] text-white" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-[8px]">
                <div className="lg:text-[16px] md:text-[15px] sm:text-[14px] font-medium leading-[1.2]">{printName()}</div>
                <div className="line-clamp mt-[3px] font-[200] lg:text-[16px] md:text-[15px] sm:text-[14px] text-[rgba(255,255,255,0.5)]">{printArtist()}</div>
            </div>
        </div>
    );
}

export default CarouselCard;