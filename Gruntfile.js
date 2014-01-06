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
        // root:  root folder of your project
        // rules: ruleset folder for phpmd
        // sources: symfony2 project folder
        // src: symfony2 src folder
        // web: symfony2 web folder
        // bin: symfony2 bin folder
        // cache: symfony2 cache folder
        // console: symfomy2 console file
        // dist: app build folder
        // url: browser url to your app
        // reload: reload port for the watch task
        // compassLin: compass library folder
        // compassLocation1: scss files to compile
        app: {
            "root": "../..",
            "rules": "tests/rulesets",

            "sources": "<%= app.root %>/source",

            "src": "<%= app.sources %>/src",
            "web": "<%= app.sources %>/web",
            "bin": "<%= app.sources %>/bin",
            "cache": "<%= app.sources %>/app/cache",
            "console": "<%= app.sources %>/app/console",

            "dist": "<%= app.root %>/dist",

            "url": "http://localhost/   {XXX}   /source/web/app_dev.php",

            "reload": 1338

        },

        compass: {
            "compassLib": "<%= app.src %>/   {XXX}   /Resources/public/sass",
            "compassLocation1": "<%= app.src %>/   {XXX}   /Resources/public"
        }

        deploy: {
            "host": "server.com",
            "port": 21,

            "src": "path/to/source/folder",
            "dest": "/path/to/destination/folder"
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
