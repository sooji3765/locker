// VARIABLES =============================================================
var TOKEN_KEY = "jwtToken";
var username = "";
var email = "";
var user_id = "";

// FUNCTIONS =============================================================
function getJwtToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

function message(msg) {
    return $('#message').text(msg);
}

if (getJwtToken()) {
    $.ajax({
        url: 'http://localhost:3000/user/authcheck',
        type: 'get',
        beforeSend: function (xhr) { //Include the bearer token in header
            xhr.setRequestHeader("x-access-token", getJwtToken());
        },
        success: function (data) {
            if (data !== null) {

                userid = data.userId;
                username = data.userName;
                email = data.email;

                console.log("userid = " + userid);
                console.log("username = " + username);
                console.log("email = " + email);
            }
        }
    })
}