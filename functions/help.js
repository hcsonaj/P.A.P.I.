module.exports = (client, message, args, MessageEmbed) => {

  var helpArray = {
    'update': 'Commands:\n\n```!papi update```\nMit diesem Befehl wird eine Runde gepostet, die noch nicht per Bot gepostet wurde.\n\n',
    'stats': '```!papi stats```\nMit diesem Befehl werden die Daten des Server ausgegeben.\n\n',
    'calc': '```!papi calc x```\nMit diesem Befehl wird das Ergebnis von x ausgegeben.\n\n',
    'roll': '```!papi roll xdy\n!papi roll xwy```\nMit diesem Command kannst du einen Würfelwurf ausführen. Ersetze dabei **x** mit der Anzahl an Würfen und **y** mit der Größe der Würfel.\n\nBeispiele:\n!papi roll 3d6\n!papi roll 2d100 + 17\n\n',
    'gen': '```!papi generate x```\nMit diesem Command kannst viele verschiedene Dinge generieren. Folgende Möglichkeiten hast du:\n```!papi gen gold y z``` > Generiert einen Betrag an "GOLD". Werden y und z nicht gefüllt, dann wird ein Betrag zwischen 0 und 100 generiert. Wird nur y gefüllt, generiert der Bot einen Betrag zwischen 0 und y. Ansonsten legst du die Grenzen mit y und z fest.\n```!papi gen name y z``` > Generiert ein Charakterprofil mit Details. Werden y und z nicht gefüllt, dann wird ein deutscher Name generiert (zufälliges Geschlecht). Also y kann entweder ein "f" oder ein "m" angegeben werden, dann bekommst du ein deutsches Profil mit dem Geschlecht Mann oder Frau respektiv. Wenn du y aber mit einer Sprache füllen möchtest (de, fr, gb, en), geht die Geschlechtsangabe auf das z über. \n\n',
    'poll': '```!papi poll [FRAGE] Antwort 1, Antwort 2, Antwort 3```\nMit diesem Command kannst du eine Umfrage erstellen. Ersetze dabei **FRAGE** mit dem Titel der Umfrage und die **Antwort 1, Antwort 2, etc.** mit den Auswahlmöglichkeiten. Maximal möglich sind hier 10 Antworten.\n\nBeispiele:\n!papi poll [Wann spielen wir weiter?] Montag, Dientag, Mittwoch, Donnerstag\n\n',
    'play': '```!papi play x:\nMit diesem Command kann Musik in Voice-Channels abgespielt werden. Ersetze dafür einfach **x** mit einer URL oder füge einfach ein paar Keyword an und der Bot startet den ersten Treffer.\n\nBeispiele:\n!papi play https://www.youtube.com/watch?v=PvsQcQ1acoA\n!papi play star trek intro```\n\n',
    'stop': '```!papi stop```\nDieser Command stoppt den Bot, wenn er Musik abspielt.\n\n',
    'spieler': '```!papi spieler```\nMit diesem Command erhälst du eine Liste mit den Spielrunden, zu denen du dich auf der Webseite angemeldet hast.\n\n',
    'leiter': '```!papi leiter```\nMit diesem Command erhälst du eine Liste mit den Spielrunden, die du auf der Webseite ausgehängt hast.\n\n',
    'post': '```!papi post x```\nMit diesem Befehl wird eine Runde gepostet, die schon per Bot gepostet wurde Das x wird ersetzt mit der URL der Runde.\n\nBeispiele:\n!papi post https://pen-and-paper.info/event/?id=e7361801-8a68-46ff-9f66-88adcb82590d\n\n'
  }

  var resultDescription = 'Keine Sorge, ich kann dir helfen <@' + message.author.id + '>:\n\n';

  if (args.length > 0) {

    resultDescription += helpArray[args[0]];

  } else {

    if (message.member.roles.cache.some(role => role.name === 'Pen-And-Paper.info-Team')) {

      resultDescription += helpArray['update'] + helpArray['stats'] + helpArray['calc'];

    }

    resultDescription += helpArray['roll'] + helpArray['gen'] + helpArray['poll'];

    /* resultDescription += helpArray['play']; */

    resultDescription += helpArray['stop'] + helpArray['spieler'] + helpArray['leiter'] + helpArray['post'];

  }

  

  const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

  embedTemplate.setTitle('🆘 Hilfe 🆘');
  embedTemplate.setDescription(resultDescription);
  embedTemplate.setAuthor('P.A.P.I.');
  embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");      

  message.reply({ embeds: [embedTemplate] });
  setTimeout(function () {message.delete();}, 500);  

}