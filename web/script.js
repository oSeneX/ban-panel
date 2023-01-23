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
    const table = $(`#${tableId} tbody tr`);
    table.hide();
    const lowerSearch = search.toLowerCase();
    const matchingCells = table.filter(function(){
        return $(this).text().toLowerCase().includes(lowerSearch);
    });
    if (matchingCells.length > 0) {
        matchingCells.closest('tr').show();
    }
}

$(function() {
    $(currentPage).css('display', 'flex'); //Show default tab
    $('li > a').click(function() {
        activeTab(this); //Switch to other tab
    });

    $('#player-list').empty().append(`<thead><tr><th>Käytä</th><th>Palvelin</th><th>Pelaaja</th><th>Syy</th><th>Kesto</th><th>Steam</th><th>Discord</th><th>License</th><th>Live</th><th>Xbox</th></tr></thead><tbody></tbody>`);
    $('#player-notes').empty().append(`<thead><tr><th>Pelaaja</th><th>Huomiot</th><th>Steam</th><th>Discord</th><th>License</th><th>Live</th><th>Xbox</th></tr></thead><tbody></tbody>`);

    /* Example bans & notes*/
    addPlayerNote('SeneX', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerNote('Henkilö 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
    addPlayerNote('Henkilö 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi leo, mollis maximus finibus at, egestas eu ipsum. Aenean tempus faucibus bibendum. Aenean accumsan velit quis nisl elementum, ut euismod tellus convallis.', 'steam:11000011b9b5f17', 'discord:251683721500033024', 'license:4d90c53954e3944e22637b7a9c92e8565056361a', 'live:1829582852050677', 'xbl:2535459271415119');
});

$('#player-list-search').keyup(function(){ //Player list search
    var search = $(this).val();
    searchFunc('player-list', search)
});
$('#player-notes-search').keyup(function(){ //Player notes search
    var search = $(this).val();
    searchFunc('player-notes', search)
});

$('#login-button').click(function(){ 
    var username = $('.login-username').val();
    var password = $('.login-password').val();
    var requestData = {"server": username, "password": password}
        fetch('http://localhost:8888/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then((response) => response.json())
        .then(data => {
            if (data.error) {
                $('#error-text-login').empty().append('Virhe kirjautumisessa');
                return;
            }
            if (data.apikey) {
                $('.loginbg').css('display', 'none');
                fetch('http://localhost:8888/bans', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer '+data.apikey,
                        'Content-type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then(data => {
                    data.forEach(obj => {
                        addPlayerToBanList(obj.server, 'Pelaaja', obj.reason, obj.expires, obj.identifiers.steam, obj.identifiers.discord, obj.identifiers.license, obj.identifiers.live, obj.identifiers.xbox);
                    });
                })
            }
        })
        .catch(error => {
            $('#error-text-login').empty().append('Virheellinen käyttäjätunnus tai salasana!')
        });
});

$('#register-button').click(function(){ 
    var username = $('.register-username').val();
    var password = $('.register-password').val();
    var data = {"server": username, "password": password}
    fetch('http://localhost:8888/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            $('#error-text-register').empty().append('Salasanan täytyy olla vähintään 8 merkkiä pitkä!'); 
            return;
        }
        $('.register-container').css('display', 'none');
        $('.apikey-container').css('display', 'flex');
        $('.apikey-container').empty().append(`<span style="margin-bottom: 1vw; font-size: 2vw; font-weight: 500">API-avain:</span>\n<span style="margin-bottom: 1vw; font-size: 1.3vw;">`+data.apikey+`</span>\n<span>Syötä avain config.json -tiedostoon ja käynnistä palvelin uudelleen. \n\nHUOM: Mikäli hukkaat avaimesi, joudut luomaan uuden avaimen paneelin asetuksista.</span>`)
    })
    .catch(error => {
        
    });
});

$('#show-create-account').click(function(){ 
    $('.login-container').css('display', 'none');
    $('.register-container').css('display', 'flex');
});
