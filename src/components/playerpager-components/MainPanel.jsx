// import components
import useAppState from "../../context/AppState";

const MainPanel = () => {

    const { data } = useAppState();

    return (
        <div id="image-box" className="xl:px-[48px] lg:px-[108px] md:px-[96px] sm:px-[64px] lg:mb-[32px] md:mb-[16px] mx-auto lg:h-full flex flex-row justify-center items-center">
            <div className="relative w-full h-full">
                <img src={data.selectedSong.album.images[0].url} alt="thumbnail" className="w-full h-full object-contain" />
                <div className="bezel absolute w-full h-full top-0 left-0"></div>
            </div>
        </div>
    );
}

export default MainPanel;
