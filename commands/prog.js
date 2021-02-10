const Discord = require('discord.js');
const axios = require('axios');
const api_header = { headers: { authorization: "Bearer perm:dmpvbmc0MjIxQHN0dWRlbnQubGFuZHN0ZWRlLm5s.NTktMQ==.YzwzwFsApq7KfJ01eTaJq32cdCBvOq" }}
const url = "https://youtrack.icebox.dev/api/admin/projects/0-42/issues?fields=$type,id,summary,customFields($type,id,projectCustomField($type,id,field($type,id,name)),value($type,avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))";
module.exports = {
    name: 'prog',
    description: 'Proggres',
    async execute(message) {

      let getissue = async () => {
        let prog = await axios.get(url, api_header);
        let issue = prog.data
        return issue
      }
      let issueValue = await getissue();
      //console.log(issueValue2);
      let length = Object.keys(issueValue).length;
      //console.log(length);

      const Prog = new Discord.MessageEmbed()
          .setColor('#AF7AC5')
          .setTitle('In Progress')
          .setAuthor('In Progress Youtrack')
          .setDescription('All the tings you are working on')
          .setFooter('\n Lekker bezig');

          for (var i = 0; i < length; i++) {
            if (issueValue[i].customFields[1].value.name == 'In Progress') {
              Prog.addFields({name: issueValue[i].summary, value: `Points: `+issueValue[i].customFields[5].value, inline: true }, )
            }
          }
      //console.log(ToDo);
      return message.channel.send(Prog);


    }
};
