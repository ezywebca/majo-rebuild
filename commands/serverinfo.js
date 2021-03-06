const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "serverinfo",
 aliases: ["sv", "server-info", "server"],
 description: "Display server info",
 category: "Utility",
 usage: "serverinfo",
 run: async (client, message, args) => {
 try {
  let serverowner = message.guild.member(message.guild.ownerID);
  var roles = [];
  var e = message.guild.emojis.cache.map(e => e.toString())
  function checkdays(date) {
   let now = new Date();
   let diff = now.getTime() - date.getTime();
   let days = Math.floor(diff / 86400000);
   return days + (days == 1 ? " day" : " days") + " ago";
 }

 let region = {
  "brazil": ":flag_br: Brazil",
  "eu-central": ":flag_eu: Central Europe",
  "singapore": ":flag_sg: Singapore",
  "us-central": ":flag_us: U.S. Central",
  "sydney": ":flag_au: Sydney",
  "us-east": ":flag_us: U.S. East",
  "us-south": ":flag_us: U.S. South",
  "us-west": ":flag_us: U.S. West",
  "eu-west": ":flag_eu: Western Europe",
  "vip-us-east": ":flag_us: VIP U.S. East",
  "london": ":flag_gb: London",
  "europe": ":flag_eu: Europe",
  "india": ":flag_in: India",
  "amsterdam": ":flag_nl: Amsterdam",
  "hongkong": ":flag_hk: Hong Kong",
  "russia": ":flag_ru: Russia",
  "southafrica": ":flag_za:  South Africa"
 }

 const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL())
  .addField("Server Owner", serverowner.user.username + "#" + serverowner.user.discriminator, true)
  .addField("ID", message.guild.id, true)
  .addField("Region", region[message.guild.region] || message.guild.region, true)
  .addField("Members", `**Total:** ${message.guild.members.cache.size} | **Members:** ${message.guild.members.cache.filter(member => !member.user.bot).size} | **Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
  .addField("Verification Level", message.guild.verificationLevel, true)
  .addField("Channels", message.guild.channels.cache.size, true)
  .addField("Roles [" + `${message.guild.roles.cache.size}` + "]", message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(", ") || "No Roles", true)
  .addField("Emojis [" + `${message.guild.emojis.cache.size}` + "]", e.join(", ") || "No Emojis", true)
  .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(message.channel.guild.createdAt)})`, true)
  .setTimestamp()
 message.channel.send(embed);
 } catch(err) {
  message.channel.send({embed: {
   color: 16734039,
   description: "Something went wrong... :cry:"
  }})
 }
 }
}
