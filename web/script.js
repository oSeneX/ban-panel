var currentPage = '#manage-bans-block';

const addPlayerToTable = function(servername, playername, reason, time, steam, discord, rockstar, live, xbox) {
    $('#player-list').append(`
    <tr>
        <td><label class="switch"><input type="checkbox"><span class="slider round"></span></label></td>
        <td>`+servername+`</td>
        <td>`+playername+`</td>
        <td>`+reason+`</td>
        <td>`+time+`</td>
        <td>`+steam+`</td>
        <td>`+discord+`</td>
        <td>`+rockstar+`</td>
        <td>`+live+`</td>
        <td>`+xbox+`</td>
    </tr>`);
}

$(function() {
    $(currentPage).css('display', 'flex');
    $('li > a').click(function() {
        var href = $(this).attr('href');
        $(currentPage).css('display', 'none');
        $(href).css('display', 'flex');
        $('li').removeClass();
        $(this).parent().addClass('active');
        currentPage = href;
    });

    $('#player-list').empty().append(`<tr><th>Käytä</th><th>Palvelin</th><th>Pelaaja</th><th>Syy</th><th>Kesto</th><th>Steam</th><th>Discord</th><th>Rockstar</th><th>Live</th><th>Xbox</th></tr>`);
    /* Example player
    addPlayerToTable('Example Roleplay', 'Pelaaja 1', 'Koodari', 1234, 'steam:4343', 'discord:4343', 'rockstar:4343', 'live:4343', 'xbox:4343');*/
});

