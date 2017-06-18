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
		babel: {
			main: {
				options: {
					sourceMap: true,
					presets: ['es2015']
				},
				files: {
					'js/howdoipoliticsmain-compiled.js': 'js/howdoipoliticsmain.js'
				}
			},
			modern: {
				options: {
					sourceMap: true,
					presets: ['es2015']
				},
				files: {
					'js/howdoipoliticsmodern-compiled.js': 'js/howdoipoliticsmodern.js'
				}
			},
			legacy: {
				options: {
					sourceMap: true,
					presets: ['es2015']
				},
				files: {
					'js/howdoipoliticslegacy-compiled.js': 'js/howdoipoliticslegacy.js'
				}
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
							'js/howdoipoliticsmain-compiled.js',
							'js/howdoipoliticsmodern-compiled.js'
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
							'js/howdoipoliticsmain-compiled.js',
							'js/howdoipoliticslegacy-compiled.js'
						]
				}
			}
		}
	});
 
	grunt.registerTask('default', ['sass', 'cssmin', 'babel:main', 'babel:modern', 'babel:legacy', 'uglify']);
	grunt.registerTask('modern', ['sass', 'cssmin', 'babel:main', 'babel:modern', 'uglify:modern']);
	grunt.registerTask('legacy', ['sass', 'cssmin', 'babel:main', 'babel:legacy', 'uglify:legacy']);
	grunt.registerTask('styles', ['sass', 'cssmin']);
	// no es6 support for uglify yet :(
};