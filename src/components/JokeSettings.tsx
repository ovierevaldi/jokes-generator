type JokeSettingsProp = {
    isModalOpen: boolean,
    requestCloseModal: () => void
};

const JokeSettings = ({isModalOpen, requestCloseModal} : JokeSettingsProp) => {
    const onCloseBtnClicked = () => {
        requestCloseModal();
    }
    
    return (
        <div className={`absolute ${isModalOpen ? 'bg-black/80 w-screen h-full' : ''}`}>
            {
                isModalOpen ? 
                <div 
                    className="w-[400px] h-[400px] bg-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg p-8">
                    <p className="text-center text-black text-3xl mb-8">Joke Generator Settings</p>
                    <div className="grid grid-cols-2 text-black text-xl gap-y-6">
                        <p>Joke Type</p>
                        <select className="outline outline-black rounded-md px-1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>

                        <p>Generated Joke(s)</p>
                        <input type="number" className="outline outline-black rounded-md px-2" defaultValue={1}/>
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