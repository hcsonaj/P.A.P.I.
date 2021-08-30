module.exports = (client, con) => {

  function doTestParti() {

    con.query(`SELECT pap_spieler.id, pap_spieler.discord_name AS player, pap_leiten.discord_name AS master, pap_leiten.title AS runde, pap_spieler.date_created FROM pap_spieler, pap_leiten WHERE pap_spieler.active = '1' AND pap_leiten.active = '1' AND pap_leiten.id = pap_spieler.runde AND pap_spieler.date_created > NOW() - INTERVAL 5 MINUTE ORDER BY date_created DESC`,async (err,result)=>{

      if(err){ throw err }

      result.forEach(value => {

        var userID = '';

        let user = client.users.cache.find(user => {
          if (userID === '') {
            let test = user.username + "#" + user.discriminator;
            console.log(test);
            if (test === value.master) {
              userID = user.id;
            }
          }
        })

        const userToSendTo = client.users.cache.get(userID);
        userToSendTo.send("Spieler:in \"" + value.player + "\" hat sich für deine Runde **" + value.runde + "** angemeldet.");

      })

    });

  }

  setInterval(doTestParti, 300000);

  doTestParti();

}