import axios from "axios";

export type JokeProp = {
    type: string,
    setup: string,
    punchline: string
}

const JokeAPI = () => {
    const generateRandomJoke = async (): Promise<JokeProp | Error> => {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            if(response){
                const joke : JokeProp = {
                    setup: response.data.setup,
                    type: response.data.type,
                    punchline: response.data.punchline
                }
                return joke;
            }
            else
                throw new Error('Cannot Get Jokes');
        } catch (error) {
            console.log(error);
            return new Error('Cannot Get Jokes')
        }
    };

    return {
        generateRandomJoke
    }
};

export default JokeAPI;