module.exports = (client, con) => {

  function doTestParti() {


    // ANMELDUNG
    con.query(`SELECT pap_spieler.id, pap_spieler.discord_name AS player, pap_leiten.discord_name AS master, pap_leiten.title AS runde, pap_spieler.date_created, pap_leiten.currentPlayer AS currentP, pap_leiten.maxplayer AS maxP FROM pap_spieler, pap_leiten WHERE pap_spieler.active = '1' AND pap_leiten.active = '1' AND pap_leiten.id = pap_spieler.runde AND pap_spieler.date_created > NOW() - INTERVAL 5 MINUTE ORDER BY date_created DESC`,async (err,result)=>{

      if(err){ throw err }

      result.forEach(value => {

        var userID = '';

        let user = client.users.cache.find(user => {
          if (userID === '') {
            let test = user.username + "#" + user.discriminator;
            if (test === value.master) {
              userID = user.id;
            }
          }
        })
        
        var isComplete = "";

        if (value.currentP === value.maxP) {
          isComplete = " Damit ist die Runde voll! :party:";
        } else { isComplete = ""; }

        const userToSendTo = client.users.cache.get(userID);
        userToSendTo.send("Spieler:in \"" + value.player + "\" hat sich für deine Runde **" + value.runde + "** angemeldet. Jetzt hast du " + value.currentP + " / " + value.maxP + " Spieler:innen." + isComplete);
        console.log("ANGEMELDET: " + value.player);

      })

    });


    // ABMELDUNG
    con.query(`SELECT pap_spieler.id, pap_spieler.discord_name AS player, pap_leiten.discord_name AS master, pap_leiten.title AS runde, pap_spieler.date_created, pap_leiten.currentPlayer AS currentP, pap_leiten.maxplayer AS maxP FROM pap_spieler, pap_leiten WHERE pap_spieler.active = '0' AND pap_leiten.active = '1' AND pap_leiten.id = pap_spieler.runde AND pap_spieler.date_created > NOW() - INTERVAL 5 MINUTE ORDER BY date_created DESC`,async (err,result)=>{

      if(err){ throw err }

      result.forEach(value => {

        var userID = '';

        let user = client.users.cache.find(user => {
          if (userID === '') {
            let test = user.username + "#" + user.discriminator;
            if (test === value.master) {
              userID = user.id;
            }
          }
        })
        
        var isComplete = "";

        if (value.currentP < value.maxP) {
          isComplete = " Damit ist die Runde wieder frei! :party:";
        } else { isComplete = " Der freigewordene Platz ist auf der Warteliste! :party:"; }

        const userToSendTo = client.users.cache.get(userID);
        userToSendTo.send("Spieler:in \"" + value.player + "\" hat sich von deiner Runde **" + value.runde + "** abgemeldet. Jetzt hast du " + value.currentP + " / " + value.maxP + " Spieler:innen." + isComplete);
        console.log("ABGEMELDET: " + value.player);

      })

    });


  }

  setInterval(() => {
    doTestParti();
  }, 300000);

  doTestParti();

}