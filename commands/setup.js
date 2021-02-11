const Discord = require('discord.js');
module.exports = {
    name: 'setup',
    description: 'setup',
    async execute(message) {
        const Setup = new Discord.MessageEmbed()
            .setColor('#AF7AC5')
            .setTitle('Setup Bot')
            .setAuthor('YouTrack Bot')
            .setDescription('How to set up YouTrack Bot')
            .addFields(
                {name: 'Youtrack-bot', value: 'Bot'},
                {name: '>todo', value: 'Shows issues', inline: true},
                {name: '>prog', value: 'Shows youre progress', inline: true},
                {name: '>done', value: 'Shows issues thats been completed', inline: true},

                // Joke command moet onderaan blijven, doe alle nieuwe commands hier boven
                {name: '>joke', value: 'Tells you a random joke', inline: true},
            )
            .setFooter('Happy to help 🤩');
        return message.channel.send(Help);
    }
    };
