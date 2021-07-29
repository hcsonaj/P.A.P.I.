module.exports = (client, message, Discord) => {

  // DATA
  const stats = client.guilds.cache.get('826515888449781780');
  //console.log(stats.roles.cache);

  const embedTemplate = new Discord.MessageEmbed()
      .setColor('#6f1f94')


  // CATEGORIES
  var statsCats = 0; var statsText = 0; var statsVoice = 0;
  var statsAnnouncement = 0; var statsStage = 0; var statsStore = 0;
  stats.channels.cache.each(value => {
    if (value.type === "category") { statsCats += 1; }
    else if (value.type === "text") { statsText += 1; }
    else if (value.type === "voice") { statsVoice += 1; }
    else if (value.type === "announcement") { statsAnnouncement += 1; }
    else if (value.type === "stage") { statsStage += 1; }
    else if (value.type === "store") { statsStore += 1; }
  })
  var statsCats = '```'
    + 'Kategorien: ' + statsCats + ' | '
    + 'Text: ' + statsText + ' | '
    + 'Voice: ' + statsVoice + '\n'
    + 'News: ' + statsAnnouncement + ' | '
    + 'Podium: ' + statsStage + ' | '
    + 'Store: ' + statsStore
    + '```';



  // ROLES
  var statsRoles = '```';
  stats.roles.cache.each(value => {
    if (value.name === "@everyone") { return }
    statsRoles += value.name + ' | '
  })
  statsRoles += '```';


  // EMOJIS
  var statsEmoji = 0;
  stats.emojis.cache.each(value => {
    statsEmoji += 1;
  })


  embedTemplate.addFields(
    { name: 'Name', value: '```' + stats.name + '```', inline: true },
    { name: 'Owner', value: '```' + client.users.cache.get(stats.ownerID).username + '```', inline: true },
    { name: 'Members', value: '```' + stats.memberCount + '```' },
    { name: 'ID', value: '```' + stats.id + '```', inline: true },
    { name: 'Region', value: '```' + stats.region + '```', inline: true },
    { name: 'Categories & Channels', value: statsCats },
    { name: 'Emojis', value: '```' + statsEmoji + '```' },
    { name: 'Boost Level', value: '```' + stats.premiumTier + '```', inline: true },
    { name: 'Boost Amount', value: '```' + stats.premiumSubscriptionCount + '```', inline: true },
    { name: 'Rollen', value: statsRoles }
  )

  embedTemplate.setTitle('P.A.P.I. - Serverstats');
  embedTemplate.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");
  embedTemplate.setFooter('P.A.P.I. - Bot');      

  message.reply(embedTemplate);

}