// import package components
import useAppState from "../../context/AppState";
import SongCard from "./SongCard";

const SidePanel = () => {

    const { data } = useAppState();

    return (
        <div className="side-panel lg:ml-[56px] md:mt-[32px] lg:mt-[0] sm:mt-[32px] flex flex-col sm:flex-1">
            <div className="h-[48px] flex items-center text-[15px] font-medium overflow-hidden">
                <div className="relative h-full w-full whitespace-nowrap overflow-hidden">
                    <div className="flex flex-row justify-evenly text-white uppercase h-full w-full">
                        <div className="text-white h-full w-[120px] inline-flex justify-center items-center cursor-pointer px-3 relative overflow-hidden align-middle">
                            <div className="flex flex-row justify-center items-center">up next</div>
                        </div>
                        <div className="text-white h-full w-[120px] inline-flex justify-center items-center cursor-pointer px-3 relative overflow-hidden align-middle">
                            <div className="flex flex-row justify-center items-center">lyrics</div>
                        </div>
                        <div className="text-white h-full w-[120px] inline-flex justify-center items-center cursor-pointer px-3 relative overflow-hidden align-middle">
                            <div className="flex flex-row justify-center items-center">related</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-divider"></div>
            <div className="py-[8px]"></div>
            <div className="player-content">
                <div className="scrollbar-content">
                    {
                        data.tracklist.map((item, index) => <SongCard key={index} song={item} index={index} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default SidePanel;
