module.exports = function (grunt) {
    ['contrib-jshint', 'contrib-connect','contrib-copy', 'contrib-cssmin', 'contrib-concat', 'contrib-uglify', 'contrib-watch', 'contrib-clean', 'ngmin', 'karma', 'gh-pages', 'karma-coveralls'].forEach(function (mod) {
        grunt.loadNpmTasks('grunt-' + mod);
    });

    grunt.initConfig({
        connect: { serve: { options: { port: 9000, keepalive: false, livereload: 23489, base: ['dist'], debug: true } } },
        jshint: { options: { jshintrc: '.jshintrc' }, calendar: { files: [{ src: '{src,test}/*.js' }] } },
        copy: { main: {expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist/'} },
        cssmin: {
            minify: { expand: true, cwd: 'src/', src: ['*.css'], dest: 'dist/', ext: '.min.css' }
        },
        concat: {
            calendar: {
                options: { banner: '(function () { "use strict";\n\n', footer: '\n})();' },
                files: [{ src: ['src/module.js', 'src/*.js'], dest: 'dist/calendar.js' }]
            }
        },
        ngmin: { calendar: { files: [{ src: 'dist/calendar.js', dest: 'dist/calendar.js' }] } },
        uglify: { calendar: { files: [{ src: 'dist/calendar.js', dest: 'dist/calendar.min.js' }] } },
        clean: { calendar: { files: [{ src: ['dist/calendar.js', 'dist/calendar.min.js'] }] } },
        watch: {
            options: { atBegin: true, livereload: 23489 },
            calendar: { files: ['src/*.js','src/*.css','src/*.html'], tasks: ['copy', 'jshint', 'cssmin', 'concat'] },
            livereload: { files: ['dist/*'], tasks: [] }
        }
    });

    grunt.registerTask('package', ['jshint', 'concat', 'copy', 'cssmin', 'ngmin', 'uglify']);
    grunt.registerTask('default', ['copy', 'cssmin', 'connect:serve', 'watch']);
};
