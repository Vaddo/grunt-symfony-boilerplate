'use strict';

module.exports = function (grunt) {
//
// grunt libraries -------------------------------------------------------------
//
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-phplint');
    grunt.loadNpmTasks('grunt-phpmd');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-files-check');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.option( 'force', true )


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),





//
// project setting -------------------------------------------------------------
//

        // root:   root folder of your project
        // tests: ruleset folder for phpmd
        // url: browser url to your app
        // reload: reload port for the watch task
        app: {
            "root":   "../..",
            "tests":  "tests/rulesets",
            "url":    "http://localhost/   {$replace$}   /source/web/app_dev.php",
            "reload": 1338
        },

        // root: app build folder
        // src: symfony2 dist src folder
        // web: symfony2 dist web folder
        // bin: symfony2 dist bin folder
        // cache: symfony2 dist cache folder
        // logs: symfony2 dist log folder
        dist: {
            "root":  "<%= app.root %>/dist",
            "src":   "<%= dist.root %>/src",
            "web":   "<%= dist.root %>/web",
            "bin":   "<%= dist.root %>/bin",
            "cache": "<%= dist.root %>/app/cache",
            "logs":  "<%= dist.root %>/app/logs"
        },

        // root: symfony2 project folder
        // src: symfony2 src folder
        // web: symfony2 web folder
        // bin: symfony2 bin folder
        // cache: symfony2 cache folder
        // console: symfomy2 console file
        // logs: symfony2 log folder
        symfony: {
            "root":    "<%= app.root %>/source",
            "src":     "<%= symfony.root %>/src",
            "web":     "<%= symfony.root %>/web",
            "bin":     "<%= symfony.root %>/bin",
            "cache":   "<%= symfony.root %>/app/cache",
            "logs":    "<%= symfony.root %>/app/logs",
            "console": "<%= symfony.root %>/app/console",
        },

        // compassLib: compass library folder
        // compassLocation1: scss files to compile
        sass: {
            "libs":      "<%= symfony.src %>/   {$replace$}   /Resources/public/sass",
            "location1": "<%= symfony.src %>/   {$replace$}   /Resources/public"
        },

        deploy: {
            "host": "{$replace$}",
            "port": 21,
            "src":  "{$replace$}",
            "dest": "{$replace$}"
        },





//
// load task files -------------------------------------------------------------
//
        //
        // WATCHOUT: You need to add
        // <script src="http://localhost:1338/livereload.js"></script>
        // to your HTML template for the watching task.
        //
        watch:   grunt.file.readJSON('grunt_tasks/watch.json'),

        phplint: grunt.file.readJSON('grunt_tasks/phplint.json'),
        jshint:  grunt.file.readJSON('grunt_tasks/jshint.json'),
        clean:   grunt.file.readJSON('grunt_tasks/clean.json'),
        phpmd:   grunt.file.readJSON('grunt_tasks/phpmd.json'),

        //
        // WATCHOUT: sassDir and cssDir need to be defined in
        //           for every bundle which should be compiled and
        //           autoprefixed.
        //
        compass:      grunt.file.readJSON('grunt_tasks/compass.json'),
        autoprefixer: grunt.file.readJSON('grunt_tasks/autoprefixer.json'),

        open:         grunt.file.readJSON('grunt_tasks/open-browser.json'),
        copy:         grunt.file.readJSON('grunt_tasks/copy.json'),
        files_check:  grunt.file.readJSON('grunt_tasks/files-check.json'),
        shell:        grunt.file.readJSON('grunt_tasks/shell.json'),

        imagemin:     grunt.file.readJSON('grunt_tasks/imagemin.json'),

        'ftp-deploy':   grunt.file.readJSON('grunt_tasks/ftp-deploy.json')
    });





//
// register tasks --------------------------------------------------------------
//
    grunt.registerTask('dev', ['clean',
                               'open:develop',
                               'compass',
                               'autoprefixer',
                               'shell:symlinks',
                               'watch']);

    grunt.registerTask('build', ['shell:symlinks',
                                 'shell:assetic',
                                 'clean:dist',
                                 'copy:build',
                                 'clean:build',
                                 'imagemin']);

    grunt.registerTask('deploy', ['ftp-deploy']);

    grunt.registerTask('sym',    ['shell:symlinks']);
    grunt.registerTask('assets', ['shell:assetic']);
    grunt.registerTask('cache',  ['clean:cache']);
};
