Occupied City
=============
This is the codebase for Occupied City. It uses Symfony 2.7 on the server side and AngularJS 1.3 for the client.
For now the server mostly just organises static resources and the site is largely an Angular app - we don't
yet make serious use of Symfony or use the database.

The site lives at **[occupied.city](http://occupied.city)** and is released as
[open source](https://github.com/webful-ltd/occupied-city) under the MIT Licence.

Maintenance
-----------
To use Bower with the project in its current, rather dated state, it is
necessary to switch to an old Node + npm. e.g.:

    nvm use 4
    bower update
    nvm use 8 # or your normal version

Issues
------
Issues are [tracked on GitHub](https://github.com/webful-ltd/occupied-city/issues).

Mapping
-------
We currently use [Leaflet](http://leafletjs.com/) for maps with
[angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive). Tiles come from the default
provider, OpenStreetMap.

### City outlines
We're using [Flickr Shapefiles](http://code.flickr.net/2011/01/08/flickr-shapefiles-public-dataset-2-0/) locality data
to produce approximate outlines for each included city. Currently the coordinates are manually copy/pasted from their
 GeoJSON file and included in our service data. Cities without a `coords` key will use their area and draw a circle
 instead of the real city shape.

Some of the resulting shapes are a slightly weird representation of the city, but I've not yet found a better data
source covering the whole world with enough detail to include cities the size of (say) Liverpool. It would be
good to stick to one consistent source and process for all cities. Do you know of a better place to get outline GeoJSON?
Let me know!

### Country outlines
As Flickr shapes were even more noticeably off for at least some countries, we use
[these approximations](https://github.com/johan/world.geo.json) instead.

Dependencies
------------
Server dependencies are managed with Composer and client libraries with Bower.

Requirements
------------
* PHP 5.4+
* MySQL 5.5+
* Apache 2.2+

Tests
-----
Run PHP tests with `./test/phpunit.sh`.

Run Karma tests by installing Karma 0.12.* and running `./test/karma.sh`.

Run e2e tests by installing Node.js dev dependendies (`npm install`) and running `./test/protractor.sh`.

AngularJS interpolation
-----------------------
Although little Twig interpolation is currently in use, to avoid confusion we give AngularJS the alternative
interpolation brackets `{[ ... ]}`. This allows AngularJS and Twig to be used side by side, e.g. in
`layout.html.twig`.

Apache virtual host configuration
---------------------------------
To use both Symfony and 'HTML5 mode' AngularJS routes (with no `#` prefix) requires an unusual vhost setup.

For some background I wrote about this and the interpolation point above, you might want read
[this blog post](http://noellh.com/blog/angularjs-symfony-harmony/).

This is the VirtualHost currently used for the local dev environment:

    <VirtualHost *:80>
            DocumentRoot "/Users/noel/files/Dev/Occupied City/web"
            ServerName oc.localhost
            ErrorLog "/Users/noel/files/Dev/Occupied City/app/logs/apache-errors.log"

            RewriteEngine on
            # Rewrite Angular routes to PHP index file to allow html5 state links
            RewriteRule ^/app_dev\.php/([^.]+)$ /app_dev.php/#!/$1 [R,NE]

            <Directory "/Users/noel/files/Dev/Occupied City/web">
                    Options +Includes +Indexes +FollowSymLinks +MultiViews
                    AllowOverride None
                    Order allow,deny
                    Allow from all
            </Directory>
    </VirtualHost>

Possible sources
----------------
Some potential sources for additional research & data:

* [Visualizing Palestine settlement infographic](http://visualizingpalestine.org/visuals/palestinian-israeli-peace-talks-settlements-oslo)
* [UNRWA Barrier Monitoring Unit](http://www.unrwa.org/newsroom/features/barrier-monitoring-unit?id=908) -
    We could show wall construction over time?
