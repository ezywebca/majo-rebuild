const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 aliases: [],
 description: "BAKA!!!",
 category: "Fun",
 usage: "baka",
 run: async (client, message, args) => {
 try {
 const response = fetch("https://nekos.life/api/v2/img/baka")
 const body = response.text();
  console.log(body.url);
   const embed = new Discord.MessageEmbed()
    .setTitle("BAKA!!!")
    .setImage(body.url)
    .setColor("RANDOM")
    .setFooter("idiot!" + body.url)
    .setURL(body.url);
   message.channel.send(embed);
 } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
   console.log(err);
  }
 }
}
