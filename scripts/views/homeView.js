class HomeView {
    constructor(mainContentSelector, wrapperSelector) {
        this._mainContentSelector = mainContentSelector;
        this._wrapperSelector = wrapperSelector;
    }

    showGuestPage(sideBarData, mainData) {
        let _that = this;
        $.get('templates/welcome-guest.html', function (template) { //TODO: nqmam jQuery... nqma da e aktivno -1:50 ot videoto

            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };

                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);

            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };

                console.log(recentPosts);

                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
        });
    }

    showUserPage(sideBarData, mainData) {
        let _that = this;
        $.get('templates/welcome-user.html', function (template) { //TODO: nqmam jQuery... nqma da e aktivno -1:50 ot videoto

            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };

                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);

            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };

                console.log(recentPosts);

                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
        });
    }
}


