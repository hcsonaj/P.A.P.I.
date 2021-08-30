module.exports = (message, args, MessageEmbed) => {

  if (args[0] === "") {
    message.reply({ content: 'Bitte eine Gleichung mit angeben.\n\n`!papi calc x`' })
    return;
  }

  var result = 0;
  var toCalc = '';
  
  if (args.length > 1) {
    args.forEach(value => {
      toCalc += value;
    })
  } else {
    toCalc = args[0];
  }

  result = eval(toCalc);

  const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

  embedTemplate.setTitle('🖩 Rechner 🖩');
  embedTemplate.setDescription('Hier dein Ergebnis <@' + message.author.id + '>:\n\n' + toCalc + ' = **[' + result.toFixed(2) + ']**');
  embedTemplate.setAuthor('P.A.P.I.');
  embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");      

  message.reply({ embeds: [embedTemplate] });
  setTimeout(function () {message.delete();}, 500);  

}