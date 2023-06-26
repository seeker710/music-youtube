// import package components
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import components
import useAppState from '../../context/AppState';
import useOptionState from '../../context/OptionState';
import { optionTitle } from '../../context/Constants';
// import assets
import ytmusic from '../../assets/images/ytmusic.svg';
import ytmusic_1 from '../../assets/images/ytmusic_1.svg';
import { IoSearchOutline, IoCompassOutline } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { GrHomeRounded } from 'react-icons/gr';
import { MdOutlineLibraryMusic } from 'react-icons/md';

const Navbar = () => {

    // custom style for active link
    const style = {
        color: "white",
        display: "flex",
    }
    const { clearTracklist, setQuery } = useAppState();
    const { setOption } = useOptionState();
    const clickHomepage = () => {
        setOption(optionTitle.home);    // set option to home
        clearTracklist();   // clears the current running tracklist
    }
    // state for managing search bar
    const inputRef = useRef();  // reference for input
    const [searchBar, setSearchBar] = useState(false);  // display search bar or not
    const [search, setSearch] = useState(""); // search text
    useEffect(() => {
        inputRef.current.focus();
    }, [searchBar]);
    const navigate = useNavigate();
    const clickHandler = (e) => {
        if(e.keyCode === 13) {
            setQuery(search);
            navigate('/search');
        }
    }

    return (
        <div className="fixed top-0 left-0 h-[64px] z-[3] bg-transparent w-screen px-[16px] text-[rgba(255,255,255,0.5)]">
            <div className="w-full h-full flex items-center py-[8px]">
                <Link to="/" className="z-[3]">
                    <div onClick={clickHomepage}>
                    {/* <div className="lg:inline-block md:inline-block sm:hidden"> */}
                        <img src={ytmusic} alt="ytmusic" className="lg:inline-block md:inline-block sm:hidden" />
                    {/* </div> */}
                    {/* <div className="lg:hidden md:hidden"> */}
                        <img src={ytmusic_1} alt="ytmusic" className="lg:hidden md:hidden" />
                    {/* </div> */}
                    </div>
                </Link>
                <div className="h-full w-full absolute flex justify-center items-center py-[8px]">
                    {/* page section */}
                    <div style={searchBar ? { display: "none" } : undefined} className="flex items-center">
                        <NavLink to="/" style={({ isActive }) => isActive ? style : undefined}>
                            <div className="nav-links cursor-pointer">
                                <div className="lg:inline-block md:hidden sm:hidden">Home</div>
                                <div className="navbar-icon lg:hidden"><GrHomeRounded id="home-icon" className="w-full h-full" /></div>
                            </div>
                        </NavLink>
                        <div className="nav-links cursor-not-allowed">
                            <div className="lg:inline-block md:hidden sm:hidden">Explore</div>
                            <div className="navbar-icon lg:hidden"><IoCompassOutline className="w-full h-full" /></div>
                        </div>
                        <div className="nav-links cursor-not-allowed">
                            <div className="lg:inline-block md:hidden sm:hidden">Library</div>
                            <div className="navbar-icon lg:hidden"><MdOutlineLibraryMusic className="w-full h-full" /></div>
                        </div>
                    </div>
                    {/* search section */}
                    <div className="flex lg:mx-[22px] md:mx-[19px] sm:mx-[16px] cursor-pointer">
                        {/* search button */}
                        <div style={searchBar ? { display: "none" } : undefined} className="flex hover:text-white" onClick={() => setSearchBar(true)}>
                            <div className="lg:px-[16px] self-center" title="Initiate search"><IoSearchOutline className="w-auto lg:h-[20px] md:h-6 sm:h-6" /></div>
                            <div className="text-[20px] lg:inline-block md:hidden sm:hidden">Search</div>
                        </div>
                        {/* search bar */}
                        <div style={searchBar ? undefined : { display: "none" }} className="flex justify-between items-center h-[48px] bg-[#212121] border border-[rgba(255,255,255,0.1)]">
                            <div className="w-[56px] h-12 px-4 py-3" title="Back" onClick={() => { setSearchBar(false); setSearch("") }}>
                                <BiArrowBack className="w-full h-full" />
                            </div>
                            <input ref={inputRef} onChange={e => setSearch(e.target.value)} onKeyDown={clickHandler} value={search} type="text" placeholder="Search" autoComplete="off" spellCheck="false" className="lg:w-[60vw] md:w-[50vw] sm:w-[45vw] h-12 bg-transparent outline-none text-[20px] leading-[1.2] font-medium text-white" />
                            <div onClick={() => setSearch("")} className="w-[56px] h-12 px-4 py-3" title="Clear">
                                <RxCross2 className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
