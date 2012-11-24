var Githuber = function ()
{   
    this.bind();
};

Githuber.prototype.search = function (city, language)
{
    var self = this;

    $.ajax({
        url : 'https://api.github.com/legacy/user/search/location:' + city,
        dataType : 'jsonp',
        success : function (response) {
            console.log(response);
            for (var i=0; i<response.data.users.length; i++) {
                var user = response.data.users[i];
                var languages = language.split(',');
                if (user.language === language || language === "" || languages.indexOf(user.language) != -1) {
                    //self.render(user);
                    self.clear();
                    self.detail(user);                    
                }
            }

        }
    });
};

Githuber.prototype.detail = function (user)
{
    var self = this;

    $.ajax({
        url : 'https://api.github.com/users/' + user.username,
        dataType : "jsonp",
        success : function (response) {
            self.render(response.data);
        }
    }); 
}

Githuber.prototype.bind = function ()
{
    var self = this;

    $('form').submit(function () {
        var city = $('input[name=city]', this).val();
        if (city == "") {
            alert('Please fill city field');

            return false;
        }
        self.search($('input[name=city]', this).val(), $('input[name=language]', this).val());

        return false;
    })
};

Githuber.prototype.render = function (user)
{
    $('ul').append('<li><img src="https://secure.gravatar.com/avatar/' + user.gravatar_id + '"/><a href="http://github.com/' + user.login + '">' + (user.name == undefined ? user.login : user.name) + '</a></li>');
};

Githuber.prototype.clear = function ()
{
    $('ul').html('');
}

$(document).ready(function () {
    var githuber = new Githuber;
});