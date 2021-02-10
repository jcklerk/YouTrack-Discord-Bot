const Discord = require('discord.js');
const axios = require('axios');
const api_header = { headers: { authorization: "Bearer perm:dmpvbmc0MjIxQHN0dWRlbnQubGFuZHN0ZWRlLm5s.NTktMQ==.YzwzwFsApq7KfJ01eTaJq32cdCBvOq" }}
const url = "https://youtrack.icebox.dev/api/admin/projects/0-42/issues?fields=$type,id,summary,customFields($type,id,projectCustomField($type,id,field($type,id,name)),value($type,avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))";
module.exports = {
    name: 'done',
    description: 'done',
    async execute(message) {

      let getissue = async () => {
        let prog = await axios.get(url, api_header);
        let issue = prog.data;
        return issue;
      }

      let issueValue = await getissue();
      let length = Object.keys(issueValue).length;

      const Done = new Discord.MessageEmbed()
          .setColor('#AF7AC5')
          .setTitle('Done')
          .setAuthor('Done Youtrack')
          .setDescription('All the you alredday did')
          .setFooter('\n Good job!');

          for (var i = 0; i < length; i++) {
            if (issueValue[i].customFields[1].value.name == 'Done') {
              Done.addFields({name: issueValue[i].summary, value: `Points: `+issueValue[i].customFields[5].value, inline: true }, )
            }}

      return message.channel.send(Done);

    }

};
