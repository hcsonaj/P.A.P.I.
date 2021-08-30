function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const fetch = require('node-fetch');

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const languageArray = {
  'de': 'german_germany',
  'en': 'english_united-states',
  'gb': 'english_great-britain',
  'fr': 'french_france'
};
  
module.exports = (message, args, MessageEmbed) => {

  const embedTemplate = new MessageEmbed()
      .setColor('#6f1f94')

  embedTemplate.setTitle('🃏 Generator 🃏');
  embedTemplate.setFooter('P.A.P.I. - Der Premium-Bot', "https://cdn.discordapp.com/icons/702197930504880208/a_0eab0088a5da7f1da2d5afb6168bf7f8.gif");  

  switch(args[0]) {

    case 'gold': {

      if (args.length === 1) {

        embedTemplate.setDescription('Ich bräuchte mehr Informationen von dir. Gibt entweder eine Zahl an (dann generiere ich etwas zwischen 0 und der Zahl) oder gib zwei Zahlen an (dann generiere ich etwas zwischen den beiden Zahlen)');
        message.reply({ embeds: [embedTemplate] });
        setTimeout(function () {message.delete();}, 500); 

      } else if (args.length === 2) {

        embedTemplate.setDescription('Du erhälst **' + getRandomInt(0, (parseInt(args[1]) + 1)) + '** Gold');
        message.reply({ embeds: [embedTemplate] });
        setTimeout(function () {message.delete();}, 500);

      } else if (args.length === 3) {

        embedTemplate.setDescription('Du erhälst **' + getRandomInt(args[1], (parseInt(args[2]) + 1)) + '** Gold');
        message.reply({ embeds: [embedTemplate] });
        setTimeout(function () {message.delete();}, 500);

      }
      
      break;

    }

    case 'name': {

      var region = 'german_germany';
      var gender = 'random';

      if (args.length > 1) {

        if (args[1] === "m") {
          gender = "male";
        } else if (args[1] === "f") {
          gender = "female";
        } else {

          region = languageArray[args[1]];

          if (args[2] === "m") {
            gender = "male";
          } else if (args[2] === "f") {
            gender = "female";
          } else {
            gender = "random";
          }

        }

      }


      const apiURL = 'https://api.namefake.com/' + region + '/' + gender + '/';
      console.log(apiURL);

      fetch(apiURL)
      .then(response => response.json())
      .then(data => {

        let niceDate = new Date(data.birth_data);
        let nicerDate = niceDate.toLocaleDateString('de-DE', options);
        
        var textForEmbed = '';
        textForEmbed += '**' + data.name + '**\n\n' + data.address + '\n\n' + 'Geburtstag: ' + nicerDate + ' (' + calculate_age(niceDate) + ')\n\n' + 'Lieblingsfarbe: ' + data.color + '\nBlutgruppe: ' + data.blood + '\n\n' + 'Größe: ' + data.height + ' cm' + '\nGewicht: ' + data.weight + ' kg' + '\nHaare: ' + data.hair + '\nAugenfarbe: ' + data.eye;

        embedTemplate.setDescription(textForEmbed);
        message.reply({ embeds: [embedTemplate] });
        setTimeout(function () {message.delete();}, 500);

      });
      
			break;
		}

    default: {
			message.reply(
				{ content: 'Ich brauch von dir noch ein paar mehr Details. Diese Dinge kannst du generieren:\n\n```!papi gen name | Generiert eine komplette Persönlichkeit```\n\n```!papi gen gold x y | Generiert eine Zahl zwischen x und y. Wird y nicht angegeben, wird eine Zahl zwischen 0 und x generiert.```'}
			);
			break;
		}

  }

}