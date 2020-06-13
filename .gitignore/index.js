const Discord = require("discord.js");
const client = new Discord.Client();
const configs = require("./configs.json");
const fivereborn = require('fivereborn-query');
client.config = configs;
const prefix = "!"; 

client.on("ready", () => {
    console.log("Gardien est prêt mon gars ! ");
});


client.on('message', message => {
    if(message.author.bot) return; 
    if(!message.content.toLowerCase().startsWith(prefix)) return;

    var args = message.content.split(' ');
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, message, args);
    } catch(err) {
        console.warn(err);
    }    
});

/////////////////////////////////////////////////////
// FONCTION (A NE PAS MODIFIER)
/////////////////////////////////////////////////////

function activity() {
    setTimeout(() => {
      fivereborn.query(configs.serverInfo[0], configs.serverInfo[1], (err, data) => {
        if (err) {
          console.log(err);
        } else {
          client.user.setActivity("Joueurs En Ligne:" + data.clients + "/" + data.maxclients, { type: configs.activityType });
        }
      });
      activity();
    }, 10000);
  }
  activity();


client.login("process.env.TOKEN");
