var currentPage = '#manage-bans-block';

const addPlayerToList = function(servername, playername, reason, time, steam, discord, rockstar, live, xbox) {
    $('#player-list tbody').append(`
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

const activeTab = function(value) {
    var href = $(value).attr('href');
    $(currentPage).css('display', 'none');
    $(href).css('display', 'flex');
    $('li').removeClass();
    $(value).parent().addClass('active');
    currentPage = href;
}

$(function() {
    $(currentPage).css('display', 'flex'); //Show default tab
    $('li > a').click(function() {
        activeTab(this) //Switch to other tab
    });

    $('#player-list').empty().append(`<thead><tr><th>Käytä</th><th>Palvelin</th><th>Pelaaja</th><th>Syy</th><th>Kesto</th><th>Steam</th><th>Discord</th><th>Rockstar</th><th>Live</th><th>Xbox</th></tr></thead><tbody></tbody>`);
    
    $('#player-list-search').keyup(function(){ //Search
        var search = $(this).val();
        $('table tbody tr').hide();
    
        var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;
    
        if (len > 0) {
            $('table tr:not(.notfound) td:contains("'+search+'")').each(function(){
                $(this).closest('tr').show();
            });
        }
    });
    /* Example bans*/
    addPlayerToList('Example Roleplay', 'Pelaaja 1', 'Koodari', 1234, 'steam:4343', 'discord:4343', 'rockstar:4343', 'live:4343', 'xbox:4343');
    addPlayerToList('Example Roleplay', 'Pelaaja 2', 'Koodari', 654, 'steam:4343', 'discord:4343', 'rockstar:4343', 'live:4343', 'xbox:4343');
    addPlayerToList('Example Roleplay', 'Pelaaja 3', 'Koodari', 54, 'steam:4343', 'discord:4343', 'rockstar:4343', 'live:4343', 'xbox:4343');
    addPlayerToList('Example Roleplay', 'Pelaaja 4', 'Koodari', 745, 'steam:4343', 'discord:4343', 'rockstar:4343', 'live:4343', 'xbox:4343');
});

