// import components
import useOptionState from '../../context/OptionState';
import { optionTitle } from '../../context/Constants';

const Option = () => {

    const { optionData, setOption } = useOptionState();
    // custom style
    const style = {
        background: '#fff',
        color: '#030303',
    }

    return (
        <div className="option-overflow flex max-w-[89vw] mx-auto">
            <div className="option">
                <div className="option-button" style={(optionData.option === optionTitle.commute) ? style : undefined} onClick={() => setOption(optionTitle.commute)}>Commute</div>
            </div>
            <div className="option">
                <div className="option-button" style={(optionData.option === optionTitle.relax) ? style : undefined} onClick={() => setOption(optionTitle.relax)}>Relax</div>
            </div>
            <div className="option">
                <div className="option-button" style={(optionData.option === optionTitle.energize) ? style : undefined} onClick={() => setOption(optionTitle.energize)}>Energize</div>
            </div>
            <div className="option">
                <div className="option-button" style={(optionData.option === optionTitle.workout) ? style : undefined} onClick={() => setOption(optionTitle.workout)}>Workout</div>
            </div>
            <div className="option">
                <div className="option-button" style={(optionData.option === optionTitle.focus) ? style : undefined} onClick={() => setOption(optionTitle.focus)}>Focus</div>
            </div>
        </div>
    );
}

export default Option;