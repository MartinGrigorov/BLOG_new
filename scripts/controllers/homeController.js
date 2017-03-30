class HomeController{
    constructor(HomeView, requester, baseUrl, appKey){
        this._HomeView = HomeView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }

    showGuestPage(){
        let _that = this;

        let recentPosts = []; // страничните постове(ляво)

        this._requester.get(_that._baseServiceUrl,
            function success(data) {
                let currentId = 1;

                // подрежда постовете по дата
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

            // правим цикала за да взима първите 3  и да ги нарежда в ляво recentPosts
                for (let i = 0; i < data.length && i < 3; i++){
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }

                _that._HomeView.showGuestPage(recentPosts, data);
            },
            function error(data) {
                showPopup('error', 'greshka pri vzimaneto na danni');
            }
        );
    }

    showUserPage(){
        let _that = this;

        let recentPosts = []; // страничните постове(ляво)

        this.requester.get(_that._baseServiceUrl,
            function success(data) {
                let currentId = 1;

                // подрежда постовете по дата
                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                // правим цикала за да взима първите 3  и да ги нарежда в ляво recentPosts
                for (let i = 0; i < data.length && i < 3; i++){
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }

                _that._HomeView.showUserPage(recentPosts, data);
            },
            function error(data) {
                showPopup('error', 'Ne sum zaredil postowete');
            }
        );
    }
}
