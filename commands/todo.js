const Discord = require('discord.js');
const axios = require('axios');
const { url, api_credentials, api_issues, api_project } = require('../botconfig.json');
const api_header = { headers: { authorization: api_credentials }}
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

              let getissue = async () => {
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
                  if (issueValue[i].customFields[4].value[0] == undefined){
                    console.log("Unscheduled");
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
