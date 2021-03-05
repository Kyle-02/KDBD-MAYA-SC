const dbd = require("dbd.js")
 
const bot = new dbd.Bot({
token: "ODEzNjU4ODUwMjc1NDkxODQw.YDSg2g.xQaSAK05uSZibVIqTnoo_onwZYE", 
prefix: "$getServerVar[prefix]" 
})
 
bot.onMessage()
 
bot.command({
name: "status", 
code: `$title[Bot Status]
$description[Status: $customEmoji[KUKBY5IU4IVTLO96CRFE] Online
Ping: $pingms
Latency: $botpingms
Uptime: $uptime]
$color[E82828]` 
})

bot.command({
name: "setprefix",
aliases: ['changeprefix', 'prefix'],
code: `$author[Success;https://cdn.discordapp.com/attachments/760236507310850102/780441559468474408/6286_tada_animated.gif]
$description[**Done, my new prefix is** \`$message\`]
$color[RANDOM]
$setServerVar[prefix;$message]
$onlyIf[$message[1]!=;**You have to put a prefix, example** \`$getServerVar[prefix]setprefix /\`]
$onlyPerms[admin;$customEmoji[Rufy] **You dont have** \`ADMIN\` **perms**]`
})
 
bot.variables({
    prefix: "c!"
})

bot.command({
name: "help",
code: `$title[Command List]
$description[Here are the list of all of my commands:

• changeprefix (aliases: prefix, setprefix) - change bot's prefix for the server.
• covid - shows the latest statistics of COVID-19 worldwide.
• covid <country> - shows the latest statistics of COVID-19 for the given country.
• help - shows this panel.
• status - shows bot's uptime and ping status.
• about - shows information about the bot.
• statistics - shows statistical information about the bot.]
$footer[COV-BOT;https://i.imgur.com/oqXw6bH.png]
$color[E82828]`
})

 bot.command({
 name: "covid",
 code: `$title[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];country]\'s Covid-19 Stats]
$addField[**Active Cases**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];active]];yes]
$addField[**Today Deaths**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];todayDeaths]];yes]
$addField[**Today Cases**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];todayCases]];yes]
$addField[**Recovered**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];recovered]];yes]
$addField[**Deaths**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];deaths]];yes]
$addField[**Cases**;$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];cases]];yes]
$addField[**Updated**;$replaceText[$parseDate[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];updated];date];GMT+0000 (Coordinated Universal Time);];yes]
$addField[**Country ID**;$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];countryInfo.iso2];yes]
$addField[**Country**;$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];country];yes]
$thumbnail[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/countries/$message[1];countryInfo.flag]]
$footer[COV-BOT;https://i.imgur.com/oqXw6bH.png]
$color[E82828]

$onlyIf[$message[1]!=;
{title:Covid-19 Global Stats}{thumbnail:https://media.discordapp.net/attachments/239446877953720321/691020838379716698/unknown.png?width=375&height=375}
{field:**Today Recovered**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;todayRecovered]]:yes}
{field:**Today Deaths**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;todayDeaths]]:yes}
{field:**Today Cases**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;todayCases]]:yes}
{field:**Recovered**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;recovered]]:yes}
{field:**Deaths**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;deaths]]:yes}
{field:**Cases**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;cases]]:yes}
{field:**Updated**:$replaceText[$parseDate[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;updated];date];GMT+0000 (Coordinated Universal Time);]:yes}
{field:**Active Cases**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;active]]:yes}
{field:**Affected Country**:$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;affectedCountries]]:yes}
{footer:COV-BOT:https://i.imgur.com/oqXw6bH.png} {color:E82828}]`
})

bot.command({
  name: "about",
  code: `$title[About COV-BOT]
  $description[COV-BOT is a newly developed discord bot developed in February 24, 2021 by $username[$botOwnerID] using DBD.js as its programming language. COV-BOT's purpose is to give reliable statistics and information about COVID-19. The bot gives latest statistics of the coronavirus for local and worldwide and also gives information about COVID-19 and its variants.

$addField[Development Date;Februray 23, 2021 - February 24, 2021]
$addField[Release Date;February 25, 2021]
$addField[Developer;$username[$botOwnerID]]]
$color[E82828]`
})

bot.command({
  name: "statistics",
  code: `$title[Bot Statistics]
$author[$username[$clientid];$useravatar[$clientid]]
$thumbnail[https://cdn.discordapp.com/attachments/795966035919634455/807884403904741386/5495053-statistic-icons-download-5953-free-png-and-vector-icons-statistic-png-512_512_preview.png]
$color[RANDOM]
$addField[Others;
• Total commands: $commandsCount
• Latency: $botPing ms
• Uptime: $uptime
• Owner: $usertag[$botownerid]]
$addField[Versions;
• NodeJS Version: $getObjectProperty[nodev]
• Discord.js Version: $getObjectProperty[discordv]
]
$addField[Hosting Related Stats;
• CPU Usage: $cpu
• CPU Model: $djsEval[require ('os').cpus()[0\\].model;yes] 
• CPU Platform: $djsEval[require ('os').platform();yes]
• RAM Usage: $ram MB
• Memory Usage: $djsEval[process.memoryUsage().rss / 1024 / 1024;yes] MB]
 $djseval[d.object.nodev = process.version
d.object.discordv = require('discord.js').version
$createObject[{}]]`
})

bot.command({
    name: "bus",
    code: `$title[Bot's Users & Servers Count]
$description[Users: $allMembersCount usrs
Servers: $serverCount srvers]
$color[E82828]`
})

bot.status({
  text: "c!help",
  type: "PLAYING",
  time: 5
})
