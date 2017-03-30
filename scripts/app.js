(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_rJ-9hInq"; // Place your appKey from Kinvey here...
    let appSecret = "cb5afc1f18e14456b602bfa532961c88"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "a1ee65cb-7c6e-4895-9ca3-756b38cea16f.0Vfv8A4JNKwy9uqUUnLQGEBJPYMlCiCy3Dk2bvrOhNc="; // Create a guest User using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester
    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);
    let requester = new Requester(authService);

    authService.initAuthorizationType("Kinvey");

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    let homeView = new HomeView(mainContentSelector,selector);
    let homeController= new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(mainContentSelector,selector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector, selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);


    initEventServices();

    onRoute("#/",
        function () {
            console.log('cheeck');
        // Check if User is logged in and if its not show the guest page, otherwise show the User page...
            if(authService.isLoggedIn()){
            console.log('logna se');
            homeController.showUserPage();
        }
        else {
            console.log('ne se logna');
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $('#post-' + this.parms['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current User...
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let fullName = sessionStorage.getItem('fullName');
        postController.showCreatePostPage(fullName,authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        // Login the User...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new User...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createNewPost(data);
    });

    run('#/');
})();
