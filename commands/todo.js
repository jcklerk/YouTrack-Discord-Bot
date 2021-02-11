const Discord = require('discord.js');
const axios = require('axios');
const api_header = { headers: { authorization: "Bearer perm:dmpvbmc0MjIxQHN0dWRlbnQubGFuZHN0ZWRlLm5s.NTktMQ==.YzwzwFsApq7KfJ01eTaJq32cdCBvOq" }}
const url = "https://youtrack.icebox.dev/api/admin/projects";
const api_project = "?fields=id,name";
const api_issues = "/issues?fields=$type,id,summary,customFields($type,id,projectCustomField($type,id,field($type,id,name)),value($type,avatarUrl,buildLink,color(id),fullName,id,isResolved,localizedName,login,minutes,name,presentation,text))";
module.exports = {
    name: 'todo',
    description: 'Todo',
    async execute(message) {
      let get_project_id = async () => {

          let project_id = await axios.get(url+api_project, api_header);
          let issue = project_id.data
          return issue
      }
      let project_id_Value = await get_project_id();
      let project_id_length = Object.keys(project_id_Value).length;
      for (var i = 0; i < project_id_length; i++) {
          if (project_id_Value[i].name.toLowerCase() == message.channel.name) {
              let id_project_id = '/'+project_id_Value[i].id;
              //onsole.log(message.channel.name);
              //console.log(project_id_Value[i].id);
              console.log(id_project_id);
      console.log(url+id_project_id+api_issues);

        let getissue = async () => {
            console.log(url+id_project_id+api_issues);
            let todo = await axios.get(url+id_project_id+api_issues, api_header);
            let issue = todo.data
            return issue
        }
        let issueValue = await getissue();
        let length = Object.keys(issueValue).length;
        let sprintcheck = "Sprint 1";


        const ToDo = new Discord.MessageEmbed()
            .setColor('#AF7AC5')
            .setTitle('ToDo')
            .setDescription('All the things you still have in your ToDo list')
        for (var i = 0; i < length; i++) {
            console.log(issueValue[i].customFields[4].value[0].name);
            if (issueValue.hasOwnProperty(issueValue[i].customFields[4].value[0].name)){
                var sprint = "Unscheduled";
            }else {
                var sprint = issueValue[i].customFields[4].value[0].name;
            }
            if (sprint == sprintcheck) {
                if (issueValue[i].customFields[1].value.name == "Open") {
                    ToDo.addFields({
                        name: issueValue[i].summary,
                        value: `Points: ` + issueValue[i].customFields[5].value,
                        inline: true
                    },)
                }
            }
        }
        return message.channel.send(ToDo);
    }
  }
}
};
