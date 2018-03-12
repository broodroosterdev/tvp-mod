'use strict';
const chat = jcmp.events.Call('get_chat')[0];
const fs = require('fs');
const locations = JSON.parse(fs.readFileSync('./packages/tvp-mod/locations.json', 'utf8'));
const language = require("./language.js");
jcmp.events.Add('chat_command', (player, message) => 
{
    message = message.split(' ');
    const command = message[0].slice(1);
    switch(message[0])
    {
        /*case "spawn": 
        {
            var location = message.split(' ')[1]
            var vehicle = new Vehicle(0x507B1F16, FormatLocation(locations.centcom.tanks[location]).pos, FormatLocation(locations.centcom.tanks[location]).rot);
            console.log(vehicle)
            break;
        }
        case "color":
        {
            if (message.startsWith("/color")) 
            {
                jcmp.vehicles.forEach((vehicle) => 
                {
                    if(vehicle.driver){vehicle.color = 1}
                })
            }
        }*/
        case "join":
        {
            JoinGame(player, message);
        }
        case "start":
        {
            try
            {
            if(players.length == 1) throw language.errors.not_enough_players;
            if(!players.ready) throw language.errors.players_not_ready;

            }catch(e)
            {
                chat.send(player, e);
            }
        }
        case "ready":
        {
            try
            {
            let player_in_game = FindPlayer(player);
            if(!player_in_game) throw ""
            }catch(e)
            {

            }
        }
    }
})

let players = [];
players.ready = function Ready()
{
    for(let i=0;i<players.length;i++)
    {
        if(!players[i].isReady) return false;
    }
}
function FindPlayer(player)
{
   let player_in_players = players.filter(function( player ) {return player.id == player.RemoteClient.steamId;});
   return player_in_players;
}
function Player(player, team)
{
    this.id = player.RemoteClient.steamId
    this.team = team;
    this.userName = player.name;
    this.RemoveWeapons = RemoveWeapons(player);
    this.isReady = false;
}
function RemoveWeapons(player)
{
    if(!player.weapons) return false;
    try
    {
        for(let i = 0;i<player.weapons.length;i++)
        {
            player.removeWeapons(i);
        }
        
    }catch(e)
    {
        console.log(e)
    }
}

function JoinGame(player, message)
{
    switch(message[1])
    {
        case"blue":
        {
         players.push(new Player(player,"blue"))
        }
        case"red":
        {
         players.push(new Player(player,"red"))
        }
    }
    
    
}

/*function LogVehicleLocation() 
{
    jcmp.vehicles.forEach((vehicle) => 
    {
        if(vehicle.driver){console.log(vehicle.rotation,vehicle.position)}
    })
}*/

function FormatLocation(data) 
{
    
    if (!data) 
    {
        return;
    }

    try 
    {
        const pos = data.pos;
        const rot = data.rot;
        const pos_vector = new Vector3f(pos.x, Number(pos.y), Number(pos.z));
        const rot_vector = new Vector3f(rot.x,rot.y,rot.z);
        return {"pos":pos_vector,"rot":rot_vector};
    } catch (e) 
    {
        console.log(e);
        return;
    }
    
    
    
}
setInterval(() => {},500)