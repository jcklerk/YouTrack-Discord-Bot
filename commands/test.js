const { prefix, token } = require('../botconfig.json');
module.exports = {
    name: 'test',
    description: 'test',
    async execute(message) {
        const args = message.content.slice(prefix.length).slice(5);
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }

            message.channel.send(`${args}`);

    }};