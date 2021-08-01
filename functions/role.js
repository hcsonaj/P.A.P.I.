const firstMessage = require('./minis/first-message');

module.exports = (client) => {
  const channelId = '871336259803553792'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    'book': 'Spielleiter:innen',
    'dice': "Spieler:innen",
    'egg': "Einsteiger:innen",
    'ear': "Interessierte/r-Zuhörer:innen",
    'pen': "Autor:innen",
    'clip': "Fremdconvention-Orga",
    'illus': "Illustrator:innen",
    'goggle': "Sprawler"
  }

  const reactions = []

  const papi = client.emojis.cache.find(emoji => emoji.name === "papi");
  const cutehulhu = client.emojis.cache.find(emoji => emoji.name === "cutehulhu");
  const silverhand = client.emojis.cache.find(emoji => emoji.name === "silverhand");

  let emojiText = '<a:papi:' + papi.id + '> ROLLENVERGABE <a:papi:' + papi.id + '>\n\nUm dich hier zurecht zu finden und um nicht gleich mit allen Kanälen erschlagen zu werden, möchte ich dich bitten, eine **Rolle auszuwählen**, damit du dich selbst einkategorisieren kannst und damit die jeweiligen **Textkanäle** für dich **freigeschaltet werden**. <:cutehulhu:' + cutehulhu + '> \n\nDu hast die Wahl zwischen folgenden Rollen:\n\n';

  const emoji1 = "📖"
  reactions.push(emoji1)
  const emoji2 = "🎲"
  reactions.push(emoji2)
  const emoji3 = "🐣"
  reactions.push(emoji3)
  const emoji4 = "👂"
  reactions.push(emoji4)
  const emoji5 = "🖋️"
  reactions.push(emoji5)
  const emoji6 = "📋"
  reactions.push(emoji6)
  const emoji7 = "🖌️"
  reactions.push(emoji7)
  const emoji8 = "🥽"
  reactions.push(emoji8)

  emojiText += `${emoji1} = ${emojis.book}\n`
    + `${emoji2} = ${emojis.dice}\n`
    + `${emoji3} = ${emojis.egg}\n`
    + `${emoji4} = ${emojis.ear}\n`
    + `${emoji5} = ${emojis.pen}\n`
    + `${emoji6} = ${emojis.clip}\n`
    + `${emoji7} = ${emojis.illus}\n`
    + `${emoji8} = ${emojis.goggle}\n`

  emojiText += '\n\nBevor du weiter machst, solltest du dir zunächst eine dieser Rollen aussuchen! <:cutehulhu:' + cutehulhu + '> (Mehrfachwahlen möglich!)\n\n(Verlagsmitarbeiter & PnP-Medien Menschen & Korrektoratsleser:innen gerne bei <@143785993856614400> melden für einen gesonderten Rang)\n\n**Das SPRAWL-Projekt:**\nWer sich außerdem an unserem hauseigenen Cyberpunk-Universums Projekt "Der Sprawl" beteiligen möchte, kann sich gerne den Sprawler-Rang abholen! :goggles: Damit könnt ihr euch am World-Building Prozess beteiligen und mit uns gemeinsam an dem Weltkonzept arbeiten! <a:silverhand:' + silverhand + '>\n\n'

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '862014814745264188') {
      return
    }

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    if (emoji === "🎲") { roleName = 'Spieler*innen' }
    else if (emoji === "📖") { roleName = 'Spielleiter*innen' }
    else if (emoji === "🐣") { roleName = 'Einsteiger*innen' }
    else if (emoji === "👂") { roleName = 'Interessierte/r-Zuhörer*innen' }
    else if (emoji === "🖋️") { roleName = 'Autor*innen' }
    else if (emoji === "📋") { roleName = 'Fremdconvention-Orga' }
    else if (emoji === "🖌️") { roleName = 'Illustrator*innen' }
    else if (emoji === "🥽") { roleName = 'Sprawler' }


    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}