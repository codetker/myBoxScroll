module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },

            build: {
                src: 'src/jquery.codetker.boxScroll.js',
                dest: 'dest/jquery.codetker.boxScroll.min.js'
            }
        },

        jshint: ['src/jquery.codetker.boxScroll.js']

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'uglify']);

};