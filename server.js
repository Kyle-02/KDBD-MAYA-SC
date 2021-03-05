const dbd = require("dbd.js")
 
const bot = new dbd.Bot({
token: "ODEwNDM0ODAwNDAxMjUyMzUz.YCjmOQ.Eqchc0D3LO3M8BC4Y046gHc6sao", 
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
$color[73C2FB]` 
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
    prefix: "."
})
bot.command({
name: "<@810434800401252353>",
code: `$title[MayaBot]
$description[Hi $username my prefix is \`$getServerVar[prefix]\`
You can type \`$getServerVar[prefix]help\` for list of commands]
$color[73C2FB]`,
nonPrefixed: true
})
 
bot.command({
name: "<@!810434800401252353>",
code: `$title[MayaBot]
$description[Hi $username my prefix is \`$getServerVar[prefix]\`
You can type \`$getServerVar[prefix]help\` for list of commands]
$color[73C2FB]`,
nonPrefixed: true
})

//Moderation Commands

bot.command({
    name: "warn",
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$setUserVar[warn;$sum[$getUserVar[warn;$mentioned[1]];1];$mentioned[1]]
$description[<@$mentioned[1]> has been warned by <@$authorID>
Reason: $replaceText[$replaceText[$checkCondition[$noMentionMessage!=;];true;$noMentionMessage;1];false;No Reason Provided;1]]
$color[73C2FB]`
})

bot.variables({
    warn: "0"
})

bot.command({
    name: "checkwarns",
    aliases: ["checkwarnings", "warnings"],
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$author[$username[$mentioned[1;yes]]'s Warnings;$userAvatar[$mentioned[1;yes]]]
$description[Warnings: $getUserVar[warn;$mentioned[1;yes]]]
$color[73C2FB]`
})

bot.command({
  name: "clearwarns",
  aliases: ["clearwarnings", "resetwarn"],
  code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$setUserVar[warn;0;$mentioned[1]]
$description[<@$mentioned[1]>'s warnings has been cleared!]
$color[73C2FB]`
})

bot.command({
    name: "removewarn",
    aliases: ["rw","removewarning"],
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$setUserVar[warn;$sub[$getUserVar[warn;$mentioned[1]];$noMentionMessage];$mentioned[1]]
$description[<@$authorID> removed $noMentionMessage warnings from <@$mentioned[1]>]
$color[73C2FB]`
})

bot.command({
  name: "mute",
    code: `$channelSendMessage[$channelID;<@$mentioned[1]> you are now unmuted!]
$takeRoles[$mentioned[1];$roleID[Muted]]
$wait[$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]==];true;24d];false;$noMentionMessage[1]]]
$channelSendMessage[$channelID;{description:$username[$mentioned[1]]#$discriminator[$mentioned[1]] has been muted for $replaceText[$replaceText[$checkCondition[$noMentionMessage[1]==];true;undefined time];false;$noMentionMessage[1]]}{color:73C2FB}]
$giveRoles[$mentioned[1];$roleID[Muted]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<=$rolePosition[$highestRole[$mentioned[1]]];That user is higher than me on role position]
$onlyIf[$rolePosition[$highestRole[$authorID]]<=$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$onlyIf[$mentioned[1]!=$authorID;You can't mute yourself]
$onlyIf[$mentioned[1]!=;You must mention someone.]
$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]`
})

bot.command({
    name: "kick",
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$kick[$message[1]]
$description[<@$authorID> kicked <@$message[1]]>
$addTimestamp
$color[73C2FB]`
})

bot.command({
    name: "ban",
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$ban[$message[1]
$onlyPerms[ban;\`Request Forbidden\`]
$description[The user has been banned successfully!]
$color[73C2FB]`
})

bot.command({
    name: "unban",
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$unban[$message[1]
$onlyPerms[ban;\`Forbidden\`]
$description[The user has been unbanned successfully!]
$color[73C2FB]`
})

bot.command({
    name: "nickname",
    aliases: ["changenickname", "username"],
    code: `$onlyForRoles[808060534820962364;808060534820962364;\`Request Forbidden!\`]
$changeNickname[$noMentionMessage]
$description[<@$mentioned[1]]>'s nickname has been changed to $noMentionMessage]
$color[73C2FB]`
})

//Utility Commands

bot.command({
    name: "clear",
    code: `$clear[$message]
$description[Successfully removed $message[1] messages!]
$color[73C2FB]
$deletecommand
$deleteIn[2s]`
})

bot.command({
    name: "profile",
    aliases: ["userinfo","whois"],
    code: `$title[$username[$mentioned[1;yes]]'s Profile]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$description[$addField[Roles;$userRoles[$mentioned[1;yes]];no]
$addField[Server Joining Date;$memberJoinedDate[$mentioned[1;yes];date];no]
$addField[Account Creation Date;$creationDate[$mentioned[1;yes];date];no]
$addField[Badges;$getUserBadges[$mentioned[1;yes]];no]
$addField[ID;$mentioned[1;yes];no]
$addField[Tag;#$discriminator[$mentioned[1;yes]];no]
$addField[Username;$username[$mentioned[1;yes]];no]]
$color[73C2FB]`
})

bot.command({
    name: "serverinfo",
    code: `$title[$serverName[$guildID]' Info]
$thumbnail[$serverIcon]
$description[$addField[Emojis;$serverEmojis;no]
$addField[Server Creation Date;$creationDate[$guildID];no]
$addField[Verification Level;$serverVerificationLevel;inline]
$addField[Boost Level;$serverBoostLevel;no]
$addField[Boosts;$serverBoostCount;no]
$addField[Server Region;$serverRegion;no]
$addField[Server Owner;$username[$ownerID];no]
$addField[Guild ID;$guildID;no]
$addField[Server Name;$serverName[$guildID];no]]
$color[73C2FB]`
})

//Economy Commands

bot.variables({
    wallet: "0",
    bank: "0"
  })

bot.command({
name: "balance",
aliases: ['bal',],
code: `$author[$username[$mentioned[1;yes]]'s Balance;$userAvatar[$mentioned[1;yes]]]
$description[Wallet: 🪙 $getGlobalUserVar[wallet;$mentioned[1;yes]]
Bank: 💳 $getGlobalUserVar[bank;$mentioned[1;yes]]
Net Worth: 💰$sum[$getGlobalUserVar[wallet;$mentioned[1;yes]];$getGlobalUserVar[bank;$mentioned[1;yes]]]]
$color[73C2FB]`
})

bot.variables({
    Name: "wallet",
    Name2: "bank"
  })

bot.command({
      name: "work",
      code: `$setGlobalUserVar[wallet;$sum[$getGlobalUserVar[wallet;$authorID];$random[0;5000]];$authorID]
$author[$username#$discriminator[$authorID];$authorAvatar]
$description[You work as $randomText[a Actuary;a Human Resource Specialist;a Epidemiologist;a Interpreter;a Teacher;a Doctor;a Engineer;a Technician;a Pilot; a Flight Attendant;a Astronaut;a Business CEO;a Manager;a Radio Announcer;a Video Game Developer;a Video Game Designer;a Discord Bot Developer;a Policeman;a News Broadcaster] and earned 🪙 $random[0;5000]!]
$color[73C2FB]`
})

bot.command({
      name: "crime",
      code: `$globalCooldown[5m;You just commited a crime, wait for %time% before commiting again!]
$author[$username#$discriminator[$authorID];$authorAvatar]
$description[You $randomText[got;got caught and gave] 🪙 $random[2000;4000] for $randomText[robbing a teacher;stoling purse from a nurse;robbing a doctor;robbing a police car;abusing a woman for money;robbing a bank;stealing medicines from a hospital;stealing a car;stealing a van;destroying a building;robbing a house at nifhty; hijacking a yacht;sneaking in a park]]
$if[$randomText[got;got caught and gave]==got]
$color[73C2FB]
$setGlobalUserVar[wallet;$sum[$getGlobalUserVar[wallet;$authorID];$random[2000;4000]];$authorID]
$else
$setGlobalUserVar[wallet;$sub[$getGlobalUserVar[wallet;$authorID];$random[2000;4000]];$authorID]
$color[ED5652]
$endif`
})

bot.command({
      name: "daily",
      code: `$globalCooldown[24h;You already claimed today! Wait for %time% before claiming again!]
$setGlobalUserVar[wallet;$sum[$getGlobalUserVar[wallet;$authorID];$random[5000;10000]];$authorID]
$author[$username#$discriminator[$authorID];$authrAvatar]
$description[You got :coin: $random[5000;10000] coins today! Come back again tomorrow to claim again!]
$color[73C2FB]`
})

bot.command({
name: "deposit",
aliases: ['dep',],
code: `$argsCheck[>1;Use .dep <amount> or .dep all!]
$if[$checkContains[$message[1];all]==true]
$setGlobalUserVar[wallet;$sub[$getGlobalUserVar[wallet;$authorID];$getGlobalUserVar[wallet;$authorID]];$authorID]
$setGlobalUserVar[bank;$sum[$getGlobalUserVar[bank;$authorID];$getGlobalUserVar[wallet;$authorID]];$authorID]
$description[Successfully deposited 🪙 $getGlobalUserVar[wallet;$authorID] coins!]
$color[73C2FB]
$onlyIf[$getGlobalUserVar[wallet;$authorID]!=0;You do not have any coins to deposit!]
$else
$if[$isNumber[$message[1]]==true]
$onlyIf[$message[1]<=$getGlobalUserVar[wallet;$authorID];You don't have enough coins in your wallet!]
$setGlobalUserVar[wallet;$sub[$getGlobalUserVar[wallet;$authorID];$message[1]];$authorID]
$setGlobalUserVar[bank;$sum[$getGlobalUserVar[bank;$authorID];$message[1]];$authorID]
$description[Successfully deposited 🪙 $message[1] coins!]
$color[73C2FB]
$endif
$endif`
})

bot.command({
name: "withdraw",
aliases: ['with',],
code: `$argsCheck[>1;Use .with <amount> or .with all!]
$if[$checkContains[$message[1];all]==true]
$setGlobalUserVar[bank;$sub[$getGlobalUserVar[bank;$authorID];$getGlobalUserVar[bank;$authorID]];$authorID]
$setGlobalUserVar[wallet;$sum[$getGlobalUserVar[wallet;$authorID];$getGlobalUserVar[bank;$authorID]];$authorID]
$description[Successfully withdrew 🪙 $getGlobalUserVar[bank;$authorID] coins!]
$color[73C2FB]
$onlyIf[$getGlobalUserVar[bank;$authorID]!=0;You do not have any coins to withdraw!]
$else
$if[$isNumber[$message[1]]==true]
$onlyIf[$message[1]<=$getGlobalUserVar[bank;$authorID];You don't have enough coins in your bank!]
$setGlobalUserVar[bank;$sub[$getGlobalUserVar[bank;$authorID];$message[1]];$authorID]
$setGlobalUserVar[wallet;$sum[$getGlobalUserVar[wallet;$authorID];$message[1]];$authorID]
$description[Successfully withdrew 🪙 $message[1] coins!]
$color[73C2FB]
$endif
$endif`
})

bot.command({
    name: "help",
    code: `$awaitReaction[$authorID;10m;{description:React to the corresponding emoji for the category you need help with:
<:mod:815930589634756628> - **Moderation**
<:gear:815930883261464606> - **Utilities**}{color:73C2FB};$customEmoji[075TY73NGPPA97NRWP7O],$customEmoji[YA61IFHI106A7Z3HD7GF],:coin:;mod,util,economy;\`Request Timeout\`;no]`
})

bot.awaitedCommand({
name: "mod",
code: `$description[Here are the list of my moderation commands:
• warn - warns the user with optional reason.
• checkwarns - checks the warnings of the user mentioned, if no user mentioned will return author's warnings.
• clearwarns - clears the warnings of the user.
• removewarn - removes a quantity of warnings to the mentioned user.
• mute - mutes the user for the given period of time.
• kick - kicks the user using their ID.
• ban - bans the user using their ID.
• unban - unban the user using their ID.
• nickname - changes the nickname of the mentioned user.] 
$color[73C2FB]`
})

bot.awaitedCommand({
    name: "util",
    code: `$description[Here are the list of my utility commands:
• status - shows bot's uptime and ping status.
• clear - clears messages according to how many were given.]
$color[73C2FB]`
})

bot.awaitedCommand({
    name: "economy",
    code: `$description[Here are the list of my economy commands:
• balance - shows your balance and other's balance.
• work - work to earn money.
• crime - commit a crime and earn or get caught.
• daily - gives you money everyday.
• deposit - deposits your coins to your bank.
• withdraw - withdraws your coins from your bank.]
$color[73C2FB]`
})

bot.command({
  name: "statistics",
  aliases: "stats",
  code: `$title[Bot Statistics]
$author[$username[$clientid];$useravatar[$clientid]]
$thumbnail[https://cdn.discordapp.com/attachments/795966035919634455/807884403904741386/5495053-statistic-icons-download-5953-free-png-and-vector-icons-statistic-png-512_512_preview.png]
$color[73C2FB]
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
$createObject[{}]]
$color[73C2FB]`
})

bot.status({
  text: ".help",
  type: "PLAYING",
  time: 5
})
