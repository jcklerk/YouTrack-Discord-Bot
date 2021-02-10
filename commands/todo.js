const Discord = require('discord.js');
const axios = require('axios');
const api_header = { headers: { authorization: "Bearer perm:dmpvbmc0MjIxQHN0dWRlbnQubGFuZHN0ZWRlLm5s.NTktMQ==.YzwzwFsApq7KfJ01eTaJq32cdCBvOq" }}
const url = "https://youtrack.icebox.dev/api/admin/projects/0-42/issues?fields=$type,id,summary,customFields($type,id,projectCustomField($type,id,field($type,id,name)),value($type,avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))";
module.exports = {
    name: 'todo',
    description: 'Todo',
    async execute(message) {
        let getissue = async () => {
            let todo = await axios.get(url, api_header);
            let issue = todo.data
            return issue
        }
        let issueValue = await getissue();
        let length = Object.keys(issueValue).length;

        const ToDo = new Discord.MessageEmbed()
            .setColor('#AF7AC5')
            .setTitle('ToDo')
            .setDescription('All the things you still have in your ToDo list')

        for (var i = 0; i < length; i++) {
            if (issueValue[i].customFields[1].value.name == "Open") {
                ToDo.addFields({name: issueValue[i].summary, value: `Points: `+issueValue[i].customFields[5].value, inline: true},)
            }
        }
        return message.channel.send(ToDo);
    }
};
