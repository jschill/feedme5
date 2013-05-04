/*global module:true*, require:true*/
module.exports = function (grunt) {

	"use strict";

	var srcs = ['../feedme5.js', '../client/**/*.js', '!../client/lib/*.js'];
	var specs = ['./specs/**/*.js'];

	grunt.initConfig({

		jasmine: {
			all: {
				src: srcs,
				options: {
					specs: specs
				}
			},
			coverage:{
				src: srcs,
				options: {
					template : require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: 'reports/coverage.json',
						report: 'reports/coverage'
					},
					specs: specs
				}
			}
		},
		jshint: {
			all: {
				options: {
					bitwise: true,
					curly: true,
					eqeqeq: true,
					nonew: true,
					undef: true,
					unused: true,
					maxparams: 5,
					forin: true,
					immed: true,
					eqnull: true,
					browser: true,
					latedef: true,
					newcap: true,
					noarg: true,
					strict: true,
					trailing: true,
					maxdepth: 3,
					maxstatements: 20,
					maxcomplexity: 5
				},
				files: {
					src: srcs.concat(specs)
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint', 'jasmine']);

};