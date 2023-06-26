// import components
import useAppState from '../../context/AppState';
import useOptionState from '../../context/OptionState';
import { optionTitle } from '../../context/Constants';
import Option from './Option';
import OptionCard from './OptionCard';
import Carousel from './Carousel';
// import assets
import home from '../../assets/images/home.png'
import commute from '../../assets/images/commute.jpg'
import relax from '../../assets/images/relax.jpg'
import energize from '../../assets/images/energize.jpg'
import workout from '../../assets/images/workout.jpg'
import focus from '../../assets/images/focus.jpg'

const Content = () => {

    // display data on homepage
    const { data } = useAppState();
    // display data of option on homepage
    const { optionData } = useOptionState();
    const styleFn = () => { // function to change background
        switch (optionData.option) {
            case optionTitle.commute:
                return {
                    image: { backgroundImage: `url(${commute})` },
                    text: "COMMUTE",
                }
            case optionTitle.relax:
                return {
                    image: { backgroundImage: `url(${relax})` },
                    text: "FOR RELAXING",
                }
            case optionTitle.energize:
                return {
                    image: { backgroundImage: `url(${energize})` },
                    text: "BOOSTING YOUR ENERGY",
                }
            case optionTitle.workout:
                return {
                    image: { backgroundImage: `url(${workout})` },
                    text: "FOR YOUR WORKOUT",
                }
            case optionTitle.focus:
                return {
                    image: { backgroundImage: `url(${focus})` },
                    text: "STAYING FOCUSED",
                }
            default:
                return {
                    image: { backgroundImage: `url(${home})` },
                    text: "Trending Now India",
                }
        }
    }
    const CarouselFn = () => {  // function to change option carousel
        switch (optionData.option) {
            case optionTitle.commute:
                return optionData.commute.filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
            case optionTitle.relax:
                return optionData.relax.filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
            case optionTitle.energize:
                return optionData.energize.filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
            case optionTitle.workout:
                return optionData.workout.filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
            case optionTitle.focus:
                return optionData.focus.filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
            default:
                return data.carousel[0].filter(item => {
                    if (item.track.name === "")
                        return false;
                    return true;
                }).map(item => <OptionCard key={item.track.id} song={item} />);
        }
    }

    return (
        <div className="relative text-white">
            <div id="background" className="absolute top-0 left-0 right-0 h-[49vh]" style={styleFn().image}></div>
            <div id="background-gradient" className="absolute pt-[64px] pb-[112px]">
                <div className="bg-transparent">
                    {/* Option - categories of song */}
                    <Option />
                    <div className="relative">
                        <div className="flex justify-between max-w-[89vw] mx-auto pt-[32px]">
                            <div className="font-['youtube-sans'] text-[28px] font-medium leading-[1.2] tracking-normal hover:underline">{styleFn().text}</div>
                        </div>
                        <div className="w-[89vw] mt-[24px] mb-[24px] mx-auto overflow-hidden">
                            <div id="scroll-hidden" className="flex flex-col flex-wrap w-full h-[calc(4*48px+4*16px)] overflow-y-hidden overflow-x-scroll">
                                {
                                    CarouselFn()
                                }
                            </div>
                        </div>
                    </div>
                    {/* carousel - display data */}
                    <Carousel carouselText="Hot Hits Hindi" carouselData={data.carousel[1]} />
                    <Carousel carouselText="Fresh Pop" carouselData={data.carousel[2]} />
                </div>
            </div>
        </div>
    );
}

export default Content;