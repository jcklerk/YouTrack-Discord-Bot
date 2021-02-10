const axios = require('axios');
module.exports = {
    name: 'joke',
    description: 'joke',
    async execute(message) {
        let getjoke = async () => {
            let response = await axios.get('https://official-joke-api.appspot.com/random_joke'
            );
            let joke = response.data;
            return joke;
        };
        let jokeValue = await getjoke();
        return message.channel.send(
            `Hier is je geintje \n ${jokeValue.setup} \n\n ${jokeValue.punchline}`
        );
    }
};

