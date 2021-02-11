const Discord = require('discord.js');
const axios = require('axios');
const { url, api_credentials, api_issues, api_project } = require('../apiconfig.json');
const api_header = { headers: { authorization: api_credentials }}
const { prefix, token } = require('../botconfig.json');
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
              let messagecontent = message.content.slice(prefix.length).slice(5).trim().toLocaleLowerCase();
              if (messagecontent == "1" || messagecontent == "sprint1" || messagecontent == "sprint 1") {
                  var sprintcheck = "Sprint 1";
              }else if (messagecontent == "2" || messagecontent == "sprint2" || messagecontent == "sprint 2"){
                  var sprintcheck = "Sprint 2"
              }else if (messagecontent == "3" || messagecontent == "sprint3" || messagecontent == "sprint 3"){
                  var sprintcheck = "Sprint 3"
              } else if (messagecontent == "4" || messagecontent == "sprint4" || messagecontent == "sprint 4"){
                  var sprintcheck = "Sprint 4"
              }else if (messagecontent == "0" || messagecontent == "sprint0" || messagecontent == "sprint 0" || messagecontent == "un" || messagecontent == "unscheduled"){
                  var sprintcheck = "Unscheduled"
              }

              const ToDo = new Discord.MessageEmbed()
                  .setColor('#AF7AC5')
                  .setTitle('ToDo')
                  .setDescription('All the things you still have in your ToDo list')
              for (var i = 0; i < length; i++) {
                  if (issueValue[i].customFields[4].value[0] == undefined){
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
