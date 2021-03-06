const Discord = require('discord.js');
const { readdirSync } = require('fs');
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "help",
 aliases: ["h", "commands"],
 category: "General",
 cooldown: 5,
 description: "Displays all the commands available",
 usage: "help [command]",
 run: async (client, message, args) => {
  if (args[0]) {
   return getCMD(client, message, args[0]);
  }
  if(!args[0]) {
   return getAll(client, message);
  }
  },
}
function getAll(client, message) {
 const commands = readdirSync('./commands/');
 const embed = new Discord.MessageEmbed()
  .setAuthor("Help", message.guild.iconURL())
  .setColor("RANDOM")
  .setTimestamp()
  let categories;
  categories = [...new Set(client.commands.map(cmd => cmd.category))];
  for (const id of categories) {
   const category = client.commands.filter(cmd => cmd.category === id);
   if (id == "General") {
    var icon = ":bricks:";
   }
   if (id == "Moderation") {
    var icon = ":hammer:";
   }
   if (id == "Fun") {
    var icon = ":rofl:";
   }
   if (id == "Music") {
    var icon = ":notes:";
   }
   if (id == "Economy") {
    var icon = ":moneybag:";
   }
   if (id == "Utility") {
    var icon = ":toolbox:";
   }
   if (id == "NSFW") {
    var icon = ":smirk:";
   }
   if (id == "undefined") {
    var icon = ":grey_question:";
   }
   embed.addField(`${icon} ${id} (${category.size})`, category.map(cmd => `${cmd.name}`).join(', '));
  }
  embed.addField(":grey_question: Command Information", `${prefix} help <command>`);
  embed.setFooter("Requested by " + `${message.author.username}` + " • " + `${client.commands.size}` + " Commands", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
  return message.channel.send(embed);
}

function getCMD(client, message, input) {
 const embed = new Discord.MessageEmbed();
 const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
 const info = `No information found for command ` + input.toLowerCase();
 if (!cmd) {
  try {
   return message.channel.send({embed: {
    color: 16734039,
    description: info
  }})
  } catch (err) {
    message.channel.send({embed: {
   color: 16734039,
   description: "No information found"
  }})
  }
 } else {
  function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
  const hembed = new Discord.MessageEmbed()
   .setTitle(`:grey_question: Help - ${cmd.name} command`, message.guild.iconURL())
   .setColor('RANDOM')
   .setTimestamp()
   .setDescription(`
    Category: ${cmd.category}
    Description: ${cmd.description}
    Usage: \`${prefix} ${cmd.usage}\`
    Aliases: ${cmd.aliases.lenght ? cmd.aliases.map((a) => `${a}`).join(', ') : '`None`'}
   `)
   .setFooter('Syntax: <> = required, [] = optional • Requested by ' + `${message.author.username}`)
 message.channel.send(hembed);
 }
 }
