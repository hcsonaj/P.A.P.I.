module.exports = (client, message, MessageEmbed) => {

  // DATA
  const stats = client.guilds.cache.get('702197930504880208');
  //console.log(stats.roles.cache);

  const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')


  // CATEGORIES
  var statsCats = 0;
  var statsText = 0;
  var statsVoice = 0;
  var statsAnnouncement = 0;
  var statsStage = 0;
  var statsStore = 0;
  var statsThread = 0;
  var statsCounts = 0;
  stats.channels.cache.each(value => {
    if (value.type === "GUILD_CATEGORY") { statsCats += 1; }
    else if (value.type === "GUILD_TEXT") { statsText += 1; }
    else if (value.type === "GUILD_VOICE") { statsVoice += 1; }
    else if (value.type === "GUILD_ANNOUNCEMENT") { statsAnnouncement += 1; }
    else if (value.type === "GUILD_STAGE_VOICE") { statsStage += 1; }
    else if (value.type === "GUILD_STORE") { statsStore += 1; }
    else if (value.type === "GUILD_PUBLIC_THREAD") { statsThread += 1; }
    statsCounts++;
  })

  
  var statsCats = '```'
    + 'Kategorien: ' + statsCats + ' | '
    + 'Text: ' + statsText + ' | '
    + 'Voice: ' + statsVoice + '\n'
    + 'News: ' + statsAnnouncement + ' | '
    + 'Podium: ' + statsStage + ' | '
    + 'Store: ' + statsStore + ' | '
    + 'Threads: ' + statsThread
    + '```';


  // MEMBERS
  var statsMembers = '```' + '```';
  var statsMembersReal = 0;
  var statsMembersBots = 0;

  stats.members.cache.each(value => {
    if (value.user.bot) {
      statsMembersBots++;
    } else {
      statsMembersReal++;
    }
  })


  // ROLES
  var statsRoles = '```';
  var statsRolesCount = 0;
  stats.roles.cache.each(value => {
    if (value.name === "@everyone") { return }
    statsRoles += value.name + ' | ';
    statsRolesCount++;
  })
  statsRoles += '```';


  // EMOJIS
  var statsEmoji = 0;
  stats.emojis.cache.each(value => {
    statsEmoji += 1;
  })

  embedTemplate.addFields(
    { name: 'Name', value: '```' + stats.name + '```', inline: true },
    { name: 'Owner', value: '```' + client.users.cache.get(stats.ownerId).username + '```', inline: true },
    { name: 'Members [' + (statsMembersReal + statsMembersBots) + ']', value: '```' + 'Mitglieder: ' + statsMembersReal + ' | Bots: ' + statsMembersBots + '```' },
    { name: 'ID', value: '```' + stats.id + '```', inline: true },
    { name: 'Categories & Channels [' + statsCounts + ']', value: statsCats },
    { name: 'Emojis', value: '```' + statsEmoji + '```' },
    { name: 'Boost Level', value: '```' + stats.premiumTier + '```', inline: true },
    { name: 'Boost Amount', value: '```' + stats.premiumSubscriptionCount + '```', inline: true },
    { name: 'Rollen [' + statsRolesCount + ']', value: statsRoles }
  )

  embedTemplate.setTitle('📋 Server-Statistiken 📋');
  embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");      

  message.reply({ embeds: [embedTemplate] });
  setTimeout(function () {message.delete();}, 500);   

}