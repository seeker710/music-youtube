// import package components
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import assets
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
// import components
import CarouselCard from './CarouselCard';

const Carousel = ({ carouselText, carouselData }) => {

    const sliderRef = useRef(null);
    const responsive = [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]

    return (
        <div className="relative">
            {/* carousel header */}
            <div className="flex justify-between w-[89vw] mx-auto pt-[32px] overflow-hidden">
                <div className="font-['youtube-sans'] lg:text-[28px] md:text-[26px] sm:text-[24px] font-medium leading-[1.2] tracking-normal hover:underline">{carouselText}</div>
                <div className="flex gap-[16px]">
                    <div onClick={() => sliderRef.current.slickPrev()} className="flex justify-center items-center h-[40px] w-[40px] rounded-full border-solid border border-gray-500 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]"><IoIosArrowBack /></div>
                    <div onClick={() => sliderRef.current.slickNext()} className="flex justify-center items-center h-[40px] w-[40px] rounded-full border-solid border border-gray-500 cursor-pointer hover:bg-[rgba(255,255,255,0.1)]"><IoIosArrowForward /></div>
                </div>
            </div>
            {/* carousel slide display */}
            <div className="mt-[16px] mb-[24px]">
                <div className="w-[89vw] mx-auto overflow-hidden">
                    <Slider ref={sliderRef} slidesToShow={5} infinite={false} arrows={false} responsive={responsive} className="overflow-hidden w-[89vw] mx-auto0">
                        {
                            carouselData.map(
                                item => <CarouselCard key={item.track.id} song={item} />
                            )
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
