var currentPage = '#manage-bans-block';

const addPlayerToBanList = function(servername, playername, reason, time, steam, discord, license, live, xbox) {
    $('#player-list tbody').append(`
    <tr>
        <td><label class="switch"><input type="checkbox"><span class="slider round"></span></label></td>
        <td>`+servername+`</td>
        <td>`+playername+`</td>
        <td>`+reason+`</td>
        <td>`+time+`</td>
        <td>`+steam+`</td>
        <td>`+discord+`</td>
        <td>`+license+`</td>
        <td>`+live+`</td>
        <td>`+xbox+`</td>
    </tr>`);
}

const addPlayerNote = function(playername, note, steam, discord, license, live, xbox) {
    $('#player-notes tbody').append(`
    <tr>
        <td>`+playername+`</td>
        <td >`+note+`</td>
        <td>`+steam+`</td>
        <td>`+discord+`</td>
        <td>`+license+`</td>
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

const searchFunc = function(tableId, search) {
    $('#'+tableId+' tbody tr').hide();
    var len = $('#'+tableId+' tbody tr:not(.notfound) td:contains("'+search+'")').length;
    if (len > 0) {
        $('#'+tableId+' tr:not(.notfound) td:contains("'+search+'")').each(function(){
            $(this).closest('tr').show();
        });
    }
}

$(function() {
    $(currentPage).css('display', 'flex'); //Show default tab
    $('li > a').click(function() {
        activeTab(this); //Switch to other tab
    });

    $('#player-list').empty().append(`<thead><tr><th>Käytä</th><th>Palvelin</th><th>Pelaaja</th><th>Syy</th><th>Kesto</th><th>Steam</th><th>Discord</th><th>License</th><th>Live</th><th>Xbox</th></tr></thead><tbody></tbody>`);
    $('#player-notes').empty().append(`<thead><tr><th>Pelaaja</th><th>Huomiot</th><th>Steam</th><th>Discord</th><th>License</th><th>Live</th><th>Xbox</th></tr></thead><tbody></tbody>`);

    $('#player-list-search').keyup(function(){ //Player list search
        var search = $(this).val();
        searchFunc('player-list', search)
    });
    $('#player-notes-search').keyup(function(){ //Player notes search
        var search = $(this).val();
        searchFunc('player-notes', search)
    });
    /* Example bans & notes*/
    addPlayerToBanList('Example Roleplay', 'Pelaaja 1', 'Koodari', 1234, 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerToBanList('Example Roleplay', 'Pelaaja 2', 'Koodari', 654, 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerToBanList('Example Roleplay', 'Pelaaja 3', 'Koodari', 54, 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerToBanList('Example Roleplay', 'Pelaaja 4', 'Koodari', 745, 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');

    addPlayerNote('SeneX', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerNote('Henkilö 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerNote('Henkilö 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
});

