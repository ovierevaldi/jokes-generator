import { useContext, useState } from 'react'
import './App.css'
import JokeAPI, { JokeProp } from './libs/joke-api';
import JokeSettings from './components/JokeSettings';
import { IoMdSettings } from 'react-icons/io';
import { AppContext } from './context/AppContext';

function App() {
  const appContext = useContext(AppContext);

  const [isJokeGenerated, setIsJokeGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentJoke, setCurrentJoke] = useState<Partial<JokeProp>>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateJoke = async() => {
    setIsLoading(true);
    const result = await JokeAPI().generateRandomJoke(appContext?.currentJokeType || 'random');
    
    if(typeof result === 'object'){
      setIsJokeGenerated(true);
      setCurrentJoke(result as JokeProp);
    };

    setIsLoading(false);
  };

  const openSettingsModal = () => {
    setIsModalOpen(!isModalOpen)
  };

  return (
    <div className='grid place-items-center h-screen'>
      <p className='text-4xl md:text-6xl'>Jokes Generator</p>
      
      {
        isLoading ? (<p>Loading...</p>) 
        : isJokeGenerated ? (
          <div className="text-center flex flex-col gap-y-8">
            <p className="text-3xl md:text-5xl">{currentJoke?.setup}</p>
            <p className="text-4xl md:text-6xl">{currentJoke?.punchline}</p>
          </div>
        ) : (
          <p className="text-4xl">Generate Some Jokes</p>
        )
      }

      <button 
        className='bg-white hover:bg-gray-300 cursor-pointer text-black p-4 text-2xl md:text-4xl md:p-6 rounded-lg'
        onClick={generateJoke}
      >
        Generate
      </button>

      <button
          onClick={openSettingsModal} 
          className="absolute bottom-0 right-0 text-4xl md:text-6xl p-2 md:p-3 bg-white text-black rounded-lg mb-2 mr-2 hover:bg-gray-200 cursor-pointer">
          <IoMdSettings />
      </button>
      
      <JokeSettings isModalOpen={isModalOpen} requestCloseModal={openSettingsModal}/>
    </div>
  )
}

export default App
