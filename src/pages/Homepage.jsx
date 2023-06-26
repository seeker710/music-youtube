// import package components
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
// import components
import useAppState from '../context/AppState';
import useOptionState from '../context/OptionState';
import Navbar from '../components/homepage-components/Navbar';
import Content from '../components/homepage-components/Content';

const Homepage = () => {

    // set data for carousel
    const { data, setCarousel, clearTracklist } = useAppState();
    const [load, setLoad] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                if (data.carousel.length !== 0) {
                    setCarousel(data.carousel);
                } else {
                    const { data: { trendingRes, bollyRes, popRes } } = await axios.get('https://ytmusic-backend.vercel.app/homepage');
                    setCarousel([trendingRes, bollyRes, popRes])
                }
                clearTracklist();
                setLoad(true);
            } catch (error) {
                console.log(`error occured: ${error}`);
            }
        })();
    }, [])

    // set data for option
    const [optionLoad, setOptionLoad] = useState(false);
    const { optionData, setCommute, setRelax, setEnergize, setWorkout, setFocus, } = useOptionState();
    useEffect(() => {
        (async () => {
            try {
                if (optionData.commute.length !== 0 || optionData.relax.length !== 0 || optionData.energize.length !== 0 || optionData.workout.length !== 0 || optionData.focus.length !== 0) {
                    setCommute(optionData.commute);
                    setRelax(optionData.relax);
                    setEnergize(optionData.energize);
                    setWorkout(optionData.workout);
                    setFocus(optionData.focus);
                } else {
                    const { data: { commuteRes, relaxRes, energizeRes, workoutRes, focusRes, } } = await axios.get('https://ytmusic-backend.vercel.app/option');
                    setCommute(commuteRes);
                    setRelax(relaxRes);
                    setEnergize(energizeRes);
                    setWorkout(workoutRes);
                    setFocus(focusRes);
                }
                setOptionLoad(true);
            } catch (error) {
                console.log(`error occured: ${error}`);
            }
        })();
    }, [])

    // for changing background of navbar
    const [navbar, setNavbar] = useState(0);
    var temp = 0;
    useEffect(() => {
        window.addEventListener("wheel", (event) => {
            temp += event.deltaY;
            if (temp < 0) temp = 0;
            setNavbar(temp);
        })
    }, [])

    return (
        <>
            <div style={(navbar > 0) ? { opacity: 1 } : { opacity: 0 }} className='navbar-divider fixed top-0 left-0 h-[64px] w-screen z-[3] bg-[#030303] duration-100 ease transition-opacity'></div>
            {/* navbar */}
            <Navbar />
            {/* main content */}
            {/* {load && optionLoad && <Content />} */}
            {
                (load && optionLoad) ? <Content /> : <div className="flex h-[100vh] w-[100vw] items-center justify-center"><ScaleLoader color={'#f00303'} size={50} /></div>
            }
        </>
    );
}

export default Homepage;