class UserController{
    constructor(userView, requester,baseUrl, appKey){
        this._userView = userView;
        this._requester = requester;
        this.appKey = appKey;
        this._baseServiceUrl = baseUrl +"/user/" + appKey + "/"; // todo
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data){
        if (data.username.length < 6){
            showPopup('error', 'Oprai si usernme-a');
            return;
        }
        if(data.fullname.length < 5){
            showPopup('error','Otidi da se prekrustish');
            return;
        }
        if (data.password != data.confirmPassword){
            showPopup('error', 'Nesuvpadat parolite');
            return;
        }
        if (data.password.length < 8){
            showPopup('error', 'kusa ti e parolata');
            return;
        }
        delete data ['confirmPassword'];

        this._requester.post(this._baseServiceUrl,data,
            function successCallback(respose) {
            showPopup('success', 'Bravo registrira se!');
            redirectUrl('#/login');
        },
        function errorCallback(response) {
            showPopup('error', 'Pak nishto ne napravi');
        });

    }


    login(data){
        let requestUrl = this._baseServiceUrl +"login";
        this._requester.post(requestUrl, data,
            function successCallback(response) {
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('fullName', response.fullname);
                showPopup('success', 'Bravo logna se!');
                redirectUrl('#/');
            },
            function errorCallback(response) {
                showPopup('error', 'Pak nishto ne napravi');
            });

    }

    logout(){

        sessionStorage.clear();
        redirectUrl('#/')

    }
}
