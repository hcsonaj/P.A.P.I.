module.exports = (client, message, MessageEmbed) => {

  var resultDescription = 'Keine Sorge, ich kann dir helfen <@' + message.author.id + '>:\n\n';

  if (message.member.roles.cache.some(role => role.name === 'Admin')) {

    resultDescription += 'Commands:\n\n```!papi update:\nMit diesem Befehl wird eine Runde gepostet, die noch nicht per Bot gepostet wurde.```\n';

    resultDescription += '```!papi post x:\nMit diesem Befehl wird eine Runde gepostet, die schon per Bot gepostet wurde Das x wird ersetzt mit der URL der Runde.\n\nBeispiele:\n!papi post https://pen-and-paper.info/event/?id=e7361801-8a68-46ff-9f66-88adcb82590d```\n';

    resultDescription += '```!papi stats:\nMit diesem Befehl werden die Daten des Server ausgegeben.```\n';

    resultDescription += '```!papi bump:\nMit diesem Befehl wird der automatische Bump gestartet.```\n';

  }

  resultDescription += '```!papi roll xdy\n!papi roll xwy:\nMit diesem Command kannst du einen Würfelwurf ausführen. Ersetze dabei **x** mit der Anzahl an Würfen und **y** mit der Größe der Würfel.\n\nBeispiele:\n!papi roll 3d6\n!papi roll 2d100 + 17```\n';

  resultDescription += '```!papi play x:\nMit diesem Command kann Musik in Voice-Channels abgespielt werden. Ersetze dafür einfach **x** mit einer URL oder füge einfach ein paar Keyword an und der Bot startet den ersten Treffer.\n\nBeispiele:\n!papi play https://www.youtube.com/watch?v=PvsQcQ1acoA\n!papi play star trek intro```\n';

  resultDescription += '```!papi stop:\nDieser Command stoppt den Bot, wenn er Musik abspielt.```\n';

  resultDescription += '```!papi spieler:\nMit diesem Command erhälst du eine Liste mit den Spielrunden, zu denen du dich auf der Webseite angemeldet hast.```\n';

  resultDescription += '```!papi leiter:\nMit diesem Command erhälst du eine Liste mit den Spielrunden, die du auf der Webseite ausgehängt hast.```\n';

  const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

  embedTemplate.setTitle('P.A.P.I. - Hilfe');
  embedTemplate.setDescription(resultDescription);
  embedTemplate.setAuthor('P.A.P.I.', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");
  embedTemplate.setFooter('P.A.P.I. - Bot');      

  message.reply({ embeds: [embedTemplate] });

}