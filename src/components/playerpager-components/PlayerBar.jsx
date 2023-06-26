// import package components
import { useState, useEffect, useRef } from 'react';
// import components
import useAppState from '../../context/AppState';
// import assets
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { IoPlaySharp } from 'react-icons/io5';
import { IoIosPause } from 'react-icons/io';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { SlVolume2, SlVolumeOff } from 'react-icons/sl';

const PlayerBar = () => {

    // state and constants
    const { data, setSong, setCurrentIndex } = useAppState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(100);
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();
    const soundBar = useRef();
    const max = 30;

    // function to change current time based upon change in pregress bar
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / max * 100}%`);
        setCurrentTime(progressBar.current.value);
    }
    // function to change progress of progress bar
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / max * 100}%`);
        setCurrentTime(progressBar.current.value);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }
    // toogle play pause icon
    const tooglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }
    useEffect(() => {
        whilePlaying();
    }, [isPlaying, data])
    // function to change sound
    const changeSound = () => {
        const vol = (soundBar.current.value / 100).toPrecision(1)
        setVolume(soundBar.current.value);
        audioPlayer.current.volume = vol;
        (vol < 0.1) ? setIsMute(true) : setIsMute(false);
        soundBar.current.style.setProperty('--seek-before-width', `${soundBar.current.value}%`)
    }
    // toogle volume on off icon
    const toogleMute = () => {
        const prevValue = isMute;
        setIsMute(!prevValue);
        if (!prevValue) {
            audioPlayer.current.muted = true;
            soundBar.current.style.setProperty('--seek-before-width', `0%`)
            soundBar.current.value = 0
        }
        else {
            audioPlayer.current.muted = false;
            soundBar.current.style.setProperty('--seek-before-width', `${volume}%`);
            soundBar.current.value = volume;
        }
    }
    // function to move forward and backward
    const changePrevious = () => {
        let index = data.currentIndex;
        setCurrentIndex((index - 1)<0 ? 0 : (index-1));
        setSong(data.tracklist[(index - 1)<0 ? 0 : (index-1)]);
        setIsPlaying(true);
    }
    const changeNext = () => {
        let index = data.currentIndex;
        setCurrentIndex((index + 1)%30);
        setSong(data.tracklist[(index + 1)%30]);
        setIsPlaying(true);
    }

    // function to print song meta data on screen
    const printInfo = () => {
        let type = data.selectedSong.type[0].toUpperCase() + data.selectedSong.type.substr(1).toLowerCase();
        let artist = "";
        for (var i = 0; i < data.selectedSong.artists.length; ++i) {
            artist += data.selectedSong.artists[i].name;
            if (i === data.selectedSong.artists.length - 1)
                break;
            artist += ", "
        }
        let year = data.selectedSong.album.release_date.split("-")[0];
        return `${type} • ${artist} • ${year}`;
    }
    const adjustTime = (time) => {
        if (time < 10)
            return `0:0${time}`;
        else
            return `0:${time}`;
    }

    return (
        <>
            <div className="fixed h-[72px] w-full bottom-0 left-0 bg-[#212121] z-[3]"></div>
            <div className="player-bar fixed h-[72px] w-full bottom-0 left-0 bg-[#212121] z-[3] text-[#909090]">
                {/* start section */}
                <div className="start flex items-center lg:w-[292px] md:w-[256px]">
                    <div className='flex items-center text-white'>
                        <div className="ml-[8px] lg:p-[8px] md:p-[8px] sm:p-[4px] lg:w-[38px] md:w-[38px] sm:w-[32px] lg:h-[38px] md:h-[38px] sm:h-[32px] cursor-pointer" title="Previous song" onClick={changePrevious}><AiFillStepBackward className="w-full h-full" /></div>
                        <div className="lg:ml-[8px] md:ml-[8px] lg:p-[8px] md:p-[8px] sm:p-[4px] lg:w-[54px] md:w-[54px] sm:w-[40px] lg:h-[54px] md:h-[54px] sm:h-[40px] cursor-pointer" title={isPlaying ? "Pause" : "Play"} onClick={tooglePlayPause}>
                            {isPlaying ? <IoIosPause className="w-full h-full" /> : <IoPlaySharp className="w-full h-full" />}
                        </div>
                        <div className="lg:ml-[8px] md:ml-[8px] lg:p-[8px] md:p-[8px] sm:p-[4px] lg:w-[38px] md:w-[38px] sm:w-[32px] lg:h-[38px] md:h-[38px] sm:h-[32px] cursor-pointer" title="Next song" onClick={changeNext}><AiFillStepForward className="w-full h-full" /></div>
                    </div>
                    <span className="text-[12px] leading-[1.2] text-[#aaa] ml-[8px] mr-[16px] font-normal lg:inline-block md:inline-block sm:hidden">{adjustTime(currentTime)} / {`0:${max}`}</span>
                </div>

                {/* middle section */}
                <div className="middle flex justify-center items-center overflow-hidden">
                    <div className="relative h-[40px] w-[40px] lg:block md:block sm:hidden">
                        <img src={data.selectedSong.album.images[2].url} alt="thumbnail" className="h-full w-full" />
                    </div>
                    <div className="flex flex-col lg:max-w-[70%] md:max-w-[70%] sm:max-w-[90%] overflow-hidden ml-[16px] mr-[8px]">
                        <div className="text-[14px] leading-[1.2] font-medium text-white truncate" title={data.selectedSong.name}>{data.selectedSong.name}</div>
                        <div className="text-[14px] leading-[1.2] font-normal text-[rgba(255,255,255,.7)] truncate" title={printInfo()}>{printInfo()}</div>
                    </div>
                    <div className="flex items-center flex-row">
                        <div className="lg:inline-block md:hidden sm:hidden text-white">
                            <div className="inline-flex justify-center items-center h-[36px] w-[36px] mr-[8px] rounded-full hover:bg-[rgba(255,255,255,.1)] cursor-not-allowed" title="No action"><FiThumbsDown className="icons" /></div>
                            <div className="inline-flex justify-center items-center h-[36px] w-[36px] mr-[8px] rounded-full hover:bg-[rgba(255,255,255,.1)] cursor-default" title="Like song"><FiThumbsUp className="icons" /></div>
                        </div>
                    </div>
                </div>

                {/* end section */}
                <div className="end lg:w-[292px] md:w-[256px] flex items-center justify-center">
                    <div className="lg:w-[100px] md:w-[100px] sm:w-[80px] flex flex-row items-center">
                        <div className="w-full lg:mx-[16px] md:mx-[16px] sm:mx-[8px] h-[32px] flex items-center">
                            <input type="range" defaultValue="100" ref={soundBar} onChange={changeSound} className="sound-bar" />
                        </div>
                    </div>
                    <div className="w-[40px] h-[40px] p-[10px] lg:mr-0 md:mr-0 sm:mr-[4px] stroke-[#909090] cursor-pointer" title={!isMute && "Mute"} onClick={toogleMute}>
                        {
                            isMute ? <SlVolumeOff className="w-full h-auto" /> : <SlVolume2 className="w-full h-auto" />
                        }
                    </div>
                </div>

                {/* progress bar */}
                <div id="progress-bar-container" className="absolute top-0 left-[-2px] w-full cursor-pointer">
                    <input type="range" defaultValue="0" max={max} ref={progressBar} onChange={changeRange} className="progress-bar" />
                </div>
                {/* audio */}
                <audio ref={audioPlayer} src={data.selectedSong.preview_url} autoPlay onEnded={changeNext} />
            </div>
        </>
    )
}

export default PlayerBar;