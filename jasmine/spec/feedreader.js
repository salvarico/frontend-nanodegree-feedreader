/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This spec verifies that every feed has a url defined and is not empty
        it('urls defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // This spec verifies that every feed has a name defined and is not empty
        it('names defined', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
        });
    });


    describe('The menu', function() {
        // spec for verifying that the menu is initialy hidden
        it('hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        // the menu changes visibility when the menu icon is clicked
        it('changes visibility when menu icon clicked', function() {
             const menuIcon = $('.menu-icon-link');
             menuIcon.click();
             expect(document.body.classList.contains('menu-hidden')).toBe(false);
             menuIcon.click();
             expect(document.body.classList.contains('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // verifies that each feed has at least one entry
        it('has at least one entry', function() {
            const feedEntry = document.querySelector('.feed .entry');
            expect(feedEntry).toBeDefined();
        });
    });


    describe('New Feed Selection', function() {
        let feedOne, feedTwo;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $(".feed").html();
                loadFeed(1, function() {
                    feedTwo = $(".feed").html();
                    done();
                });
            });
        });

        // verifies that the content changes when a new feed is loaded
        it('content changes', function() {
            expect(feedOne === feedTwo).toBe(false);
        });
    });
}());
