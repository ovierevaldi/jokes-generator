import { useContext, useEffect, useState } from "react";
import JokeAPI, { JokeType } from "../libs/joke-api";
import { AppContext, AppProvider } from "../context/AppContext";

type JokeSettingsProp = {
    isModalOpen: boolean,
    requestCloseModal: () => void
};

const JokeSettings = ({isModalOpen, requestCloseModal} : JokeSettingsProp) => {
    const appContext = useContext(AppContext)

    const [jokeTypes, setJokeTypes] = useState<JokeType>([]);

    const onCloseBtnClicked = () => {
        requestCloseModal();
    };

    const changeGeneratedJokeAmount = (value: string) => {
        appContext?.changeCurrentAmountJokeGenerated(parseInt(value));
    };

    const changeJokeType = (type: string) => {
        appContext?.changeCurrentJokeType(type);
    }

    useEffect(() => {
        const getJokeType = async () => {
            const result = await JokeAPI().getJokeType();
            if(result instanceof Error){
                setJokeTypes(['Cannot Get Joke Type']);
            }
            else{
                setJokeTypes(result as JokeType)
            }
        };

        getJokeType();
    }, [])
    
    return (
        <div className={`absolute ${isModalOpen ? 'bg-black/80 w-screen h-full' : ''}`}>
            {
                isModalOpen ? 
                <div 
                    className="w-[400px] h-[400px] bg-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg p-8">
                    <p className="text-center text-black text-3xl mb-8">Joke Generator Settings</p>
                    <div className="grid grid-cols-2 text-black text-xl gap-y-6">
                        <p>Joke Type</p>
                        <select 
                            className="outline outline-black rounded-md px-1"
                            onChange={(e) => changeJokeType(e.target.value)}
                            defaultValue={appContext?.currentJokeType}
                        >
                            <option value={'random'}>random</option>
                            {
                                jokeTypes.map((type) => <option key={type} value={type}>{type}</option>)
                            }
                        </select>

                        {/* <p>Generated Joke(s)</p>
                        <input min={1} type="number" className="outline outline-black rounded-md px-2" defaultValue={1} onChange={(e) => changeGeneratedJokeAmount(e.target.value)}/> */}
                    </div>
                    <button 
                        onClick={onCloseBtnClicked}
                        className="text-white bg-black left-1/2 -translate-x-1/2 bottom-0 absolute mb-4 p-2 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
                : <></>
            }
        </div>      
    )
};
export default JokeSettings