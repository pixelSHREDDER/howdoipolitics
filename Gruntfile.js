module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
 
	grunt.initConfig({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'css/howdoipolitics.css': 
						[
							'css/howdoipolitics.scss'
						]
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		uglify: {
			modern: {
				options: {
					sourceMap: true,
					sourceMapName: 'js/howdoipoliticsmodern.map'
				},
				files: {
					'js/howdoipoliticsmodern.min.js': 
						[
							'node_modules/jquery/dist/jquery.min.js',
							'js/howdoipoliticsmain.js',
							'js/howdoipoliticsmodern.js'
						]
				}
			},
			legacy: {
				options: {
					ie8: true,
					sourceMap: true,
					sourceMapName: 'js/howdoipoliticslegacy.map'
				},
				files: {
					'js/howdoipoliticslegacy.min.js': 
						[
							'js/legacy/jquery-1.12.4.min.js',
							'js/howdoipoliticsmain.js',
							'js/howdoipoliticslegacy.js'
						]
				}
			}
		}
	});
 
	grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);
	grunt.registerTask('modern', ['sass', 'cssmin', 'uglify:modern']);
	grunt.registerTask('styles', ['sass', 'cssmin']);
	// no es6 support for uglify yet :(
};