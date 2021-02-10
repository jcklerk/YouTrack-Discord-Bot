const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: 'help',
    async execute(message) {
        const Help = new Discord.MessageEmbed()
            .setColor('#AF7AC5')
            .setTitle('Help')
            .setAuthor('Bot')
            .setDescription('All commands for Youtrack-Bot')
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