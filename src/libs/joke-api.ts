import axios from "axios";

export type JokeProp = {
    type: string,
    setup: string,
    punchline: string
};

export type JokeType = string[];

const JokeAPI = () => {
    const generateRandomJoke = async (type: string): Promise<JokeProp | Error> => {
        try {
            let url = ''
            if(type !== 'random')
                url = `https://official-joke-api.appspot.com/jokes/${type}/random`
            else
                url = `https://official-joke-api.appspot.com/jokes/random`;

            const response = await axios.get(url);
            if(response){
                const joke: JokeProp = type === "random"
                ? {
                    setup: response.data.setup,
                    type: response.data.type,
                    punchline: response.data.punchline,
                  }
                : {
                    setup: response.data[0]?.setup || "No setup available",
                    type: response.data[0]?.type || "Unknown",
                    punchline: response.data[0]?.punchline || "No punchline available",
                  };
                return joke;
            }
            else
                throw new Error('Cannot Get Jokes');
        } catch (error) {
            console.log(error);
            return new Error('Cannot Get Jokes')
        }
    };

    const getJokeType = async (): Promise<JokeType | Error> => {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/types');
            
            if(response){
                const joke_type : JokeType = response.data;
                return joke_type;
            }
            else
                throw new Error('Cannot Get Joke Type');

        } catch (error) {
             console.log(error);
            return new Error('Cannot Get Joke Type')
        }
    }

    return {
        generateRandomJoke, getJokeType
    }
};

export default JokeAPI;