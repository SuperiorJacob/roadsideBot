const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on("ready", () => {
    bot.user.setActivity("Roasides content.", { type: "WATCHING" })
})

const delete_roles = {
    '501st Legion': true,
    '212th Legion': true,
    'Assault': true,
    'Medic': true,
    'Marksman': true,
    'Heavy': true,
    'Private': true,
    'Private First Class': true,
    'Lance Corporal': true,
    'Corporal': true,
    'Sergeant': true,
    'Staff Sergeant': true,
    'Sergeant Major': true,
    'Master Sergeant': true,
    'Warrant Officer': true,
    'Chief Warrant Officer': true,
    'Second Lieutenant': true,
    'Lieutenant': true,
    'Captain': true,
    'Major': true,
    'Colonel': true,
    'Commander': true,
    'Marshal Commander': true,
    'Cadet': true,
    'Clone Trooper': true
};

bot.on('message', (message) => {
    const parts = message.content.split(',');

    let channel = bot.channels.cache.get('756471565113360404');

    if (parts[0] == '__role' && message.member == null)
    {
        if (parts[1] && parts[2])
        {
            let user = message.mentions.members.first();
            let myRole = message.guild.roles.cache.find(role => role.name.indexOf(parts[2]) !==-1 );
            
            if (!myRole) return message.channel.send("Role: " + parts[2] + " doesn't exist!");
            if (!user) return message.channel.send("User: " + parts[1] + " doesn't exist!");
            
            user.roles.add(myRole);

            channel.send("[Webhook] Added user: " + parts[1] + " to the role " + parts[2]);

            message.delete({ timeout: 0 });
        }
    }

    if (parts[0] == '__name' && message.member == null)
    {
        if (parts[1] && parts[2])
        {
            let user = message.mentions.members.first();
            
            if (!user || user.id == '308072508136095774') return message.channel.send("User: " + parts[1] + " doesn't exist!");
            
            user.setNickname(parts[2]);

            channel.send("[Webhook] Added user: " + parts[1] + " to the name " + parts[2]);

            message.delete({ timeout: 0 });
        }
    }

    if (parts[0] == '__clearroles' && message.member == null)
    {
        if (parts[1])
        {
            let user = message.mentions.members.first();
            
            if (!user) return message.channel.send("User: " + parts[1] + " doesn't exist!");
            
            user.roles.cache.forEach(role => {
                if (delete_roles[role.name])
                    user.roles.remove(role);
            })

            channel.send("[Webhook] Removed users previous roles:");

            message.delete({ timeout: 0 });
        }
    }
});

bot.login('');