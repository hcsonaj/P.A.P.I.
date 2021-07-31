const firstMessage = require('./minis/first-message');

module.exports = (client) => {
  const channelId = '868544101518307348'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    'book': 'Smile',
    'dice': "Laugh"
    //'egg': "EinsteigerInn",
    //'ear': "ZuhörerIn"
  }

  const reactions = []

  let emojiText = 'Hier die möglichen Rollen\n\n'
  const emoji1 = "📖"
  reactions.push(emoji1)
  const emoji2 = "🎲"
  reactions.push(emoji2)
  /* const emoji3 = "🐣"
  reactions.push(emoji3)
  const emoji4 = "👂"
  reactions.push(emoji4) */

  emojiText += `${emoji1} = ${emojis.book}\n`
    + `${emoji2} = ${emojis.dice}\n`
  //  + `${emoji3} = ${emojis.egg}\n`
  //  + `${emoji4} = ${emojis.ear}\n`

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '862014814745264188') {
      return
    }

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    if (emoji === "🎲") { roleName = 'Smile' }
    else if (emoji === "📖") { roleName = 'Laugh' }
    //else if (emoji === "🐣") { roleName = 'Party' }
    //else if (emoji === "👂") { roleName = 'Party' }


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