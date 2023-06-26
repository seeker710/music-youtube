// import components
import ResultCard from "./ResultCard";

const Result = ({ song }) => {

    return (
        <div className="mb-[32px]">
            <div className="my-[16px]">
                <h2 className="font-['youtube-sans'] text-[24px] font-semibold leading-[1.2] text-white capitalize">songs</h2>
            </div>
            <div>
                {
                    song.filter(item => {
                        if (item.data.hasOwnProperty('albumOfTrack'))
                            return true;
                        return false;
                    }).map((item, index) => <ResultCard key={index} songData={item} />
                    )
                }
            </div>
        </div>
    );
}

export default Result;
