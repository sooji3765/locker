// VARIABLES =============================================================
var TOKEN_KEY = "jwtToken";
var userid = "";
var username = "";
var email = "";

console.log(username);

var pagename = window.location.pathname;
if (pagename != "/")
    $('.header a:first').after('<a href="#" class="back-button header-icon header-icon-1"><i class="fas fa-arrow-left"></i></a>');

// FUNCTIONS =============================================================
function getJwtToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

function throwJwtToken() {
    return sessionStorage.getItem(TOKEN_KEY,NULL);
}

function message(msg) {
    return $('#message').text(msg);
}

window.addEventListener("load", function () {
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

                    console.log("jwtToken: " + getJwtToken());
                    console.log("userid = " + userid);
                    console.log("username = " + username);
                    console.log("email = " + email);

                }
            }
        })
    } else if (window.location.pathname.indexOf("login") < 0 && window.location.pathname.indexOf("signup") < 0) {
        window.location.href = "/user/login";
    }
});