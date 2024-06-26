const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const ticketConfigController = require('../../controllers/ticketConfigController');

module.exports = {
    id: 'confirmCloseTicket',
    async execute(interaction) {
        const { member, channel, guild } = interaction;

        // Obtener la configuración de tickets desde la base de datos
        const config = await ticketConfigController.getTicketConfig(guild.id);
        if (!config) {
            await interaction.reply({ content: 'No se pudo encontrar la configuración del sistema de tickets.', ephemeral: true });
            return;
        }

        // Obtener la categoría "Cerrados"
        let closedCategory = guild.channels.cache.find(channel => channel.name === 'Cerrados' && channel.type === ChannelType.GuildCategory);
        if (!closedCategory) {
            closedCategory = await guild.channels.create({
                name: 'Cerrados',
                type: ChannelType.GuildCategory,
                position: guild.channels.cache.size // Posicionar al final
            });
        }

        // Verificar si el ticket está en la categoria Cerrados
        if (channel.parentId === closedCategory.id) {
            const embed = new EmbedBuilder()
                .setDescription('> ¡El ticket ya está cerrado!')
                .setColor(0x3498db)
            await interaction.reply({ embeds: [embed] })
            return; // Finaliza la ejecución de la función si se cumple la condición 
        }

        const closedEmbed = new EmbedBuilder()
            .setTitle('Ticket Cerrado')
            .setDescription('El ticket ha sido cerrado.')
            .setColor('#ff0000');

        const closedButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('deleteTicket')
                .setLabel('🗑️ Borrar ')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('reopenTicket')
                .setLabel('🔓 Reabrir')
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({ embeds: [closedEmbed], components: [closedButtons] });

        // Guardar la categoría original en el topic del canal antes de moverlo
        const originalCategory = channel.parentId;
        await channel.setTopic(originalCategory);

        // Mover el canal a la categoría "Cerrados"
        await channel.setParent(closedCategory.id);

        // Actualizar permisos
        await channel.permissionOverwrites.set([
            {
                id: guild.id,
                deny: [PermissionFlagsBits.ViewChannel],
            },
            {
                id: member.id,
                deny: [PermissionFlagsBits.ViewChannel],
            },
            {
                id: config.staffRoleId,
                allow: [PermissionFlagsBits.ViewChannel],
            },
        ]);

        // Enviar embed al canal de logs
        const logChannelId = await ticketConfigController.getTicketLogChannel(guild.id);
        const logChannel = guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setTitle('Ticket Cerrado')
                .setDescription(`El ticket **${channel.name}** ha sido cerrado por ${member.user.tag}.`)
                .setColor('#ff0000');
            await logChannel.send({ embeds: [logEmbed] });
        }
    }
};
