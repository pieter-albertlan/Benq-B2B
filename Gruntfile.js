


module.exports = function(grunt) {



	grunt.initConfig({	

		copy: {
			main: {
				files: [
				{expand: true, cwd: 'app/json',	src: ['**'], dest: 'build/json'},
				{expand: true, cwd: 'app/views',	src: ['**'], dest: 'build/views'},
				{expand: true, cwd: 'app/img',	src: ['**'], dest: 'build/img'},
				{expand: true, cwd: 'app/css',	src: ['**'], dest: 'build/css'},
				{expand: true, cwd: 'app/js/plugins',	src: ['**', '!*.js.map'], dest: 'build/js/plugins'},
				{expand: true, cwd: 'app/js/vendor',	src: ['**', '!*.js.map'], dest: 'build/js/vendor'},
				{expand: true, cwd: 'app/video',	src: ['**'], dest: 'build/video'},
				{expand: true, cwd: 'app/audio',	src: ['**'], dest: 'build/audio'},
				{src: ['app/index.html'], dest: 'build/index.html'},
				]
			},

			images: {
				files:[
				{expand: true, cwd: 'src/img',	src: ['**', '!**/responsive/**'], dest: 'app/img'},
				]
			},

			images_step2: {
				files:[
				{expand: true, cwd: 'app/img/about/responsive', src: ['**'], dest: 'app/img/about'},
				{expand: true, cwd: 'app/img/home/responsive', src: ['**'], dest: 'app/img/home'},
				{expand: true, cwd: 'app/img/work/responsive', src: ['**'], dest: 'app/img/work'},
				{expand: true, cwd: 'app/img/contact/responsive', src: ['**'], dest: 'app/img/contact'},
				{expand: true, cwd: 'app/img/work_item/responsive', src: ['**'], dest: 'app/img/work_item'},
				]
			},

		},	

		responsive_images: { //1600 70 quality
			dev:{
				options:{
					sizes: [{
						width:"100%"
					}, { 
						width: "50%"
					}],
					engine:"im",
					quality:80,
					newFilesOnly:"false"
				},
				files: [{
					expand:true,
					src: [ 'img/**/responsive/*.{gif,jpg,png}', 'img/**/responsive/**/*.{gif,jpg,png}' ] ,
					cwd: 'src/',
					dest: 'app/'
				}]
			},			
		},

		clean: {
			yourTarget : {
				src : [ "app/img/**" ]
			},
			images:{
				src: [ "app/img/**/responsive" ]
			}
		},
		
		concat: {
			generated: {
				files: [{
					dest: '.tmp/concat/js/app.js',
					src: [
						'app/js/*.js',
					]
				}]
			},			
			scripts: {
				files:[{
					dest: 'build/js/scripts.js',
					src: [
						'app/js/vendor/respimage.min.js',	
						'app/js/plugins/jquery.flexslider.min.js',
						'app/js/plugins/jquery.resizeimagetoparent.min.js',
						'app/js/plugins/jquery.widowFix-1.3.2.min.js',
						'app/js/plugins/ScrollToPlugin.min.js',
						'app/js/plugins/videogular.min.js',
						'app/js/plugins/angular-route.min.js',
			            'app/js/plugins/angular-loader.min.js',
			            'app/js/plugins/angular-flexslider.min.js',   
			            'app/js/plugins/angular-sanitize.min.js',
			            'app/js/plugins/angular-hammer.min.js',
			            'app/js/plugins/angulartics.js',
			            'app/js/plugins/angulartics-ga.js',
			            'app/js/plugins/angular-socialshare.min.js',
			            'app/js/plugins/angular-swfobject.js',
			            'js/plugins/froogaloop2.min.js',
			            'css/fonts/font-sourcehansans-tc.min.js'
			        ]					
				}]
			}
		},

		uglify: {
			generated: {
				files: [{
					dest: 'build/js/app.js',
					src: [ '.tmp/concat/js/app.js' ]
				}]
			}
		},

		

		useminPrepare: {
			html: 'app/index.html',
			options: {
				dest: 'build'
			}
		},

		usemin:{
			html: ['build/index.html']
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'build/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
					ext: '.min.css'
				}]
			}
		},

		processhtml: {
			
			dist: {

				options: {
					data: {
						message: 'This is development environment'
					}
				},

				files: {
					'build/index.html': 'build/index.html'
				}
			}			
		}

	});


grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);




grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-filerev');
grunt.loadNpmTasks('grunt-usemin');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-processhtml');

grunt.registerTask('responsive', [ 
	'copy:images',
	'responsive_images',
	'copy:images_step2',
	'clean:images',
	]);

grunt.registerTask('responsive_all', [ 
	'clean:images',
	'copy:images',
	'responsive_images',
	'copy:images_step2'	
	]);


grunt.registerTask('build', [ 
	'copy:main', 
	'useminPrepare',
	'concat:generated',
	'concat:scripts',
	'uglify:generated',
	'usemin',
	'cssmin',
	'processhtml'
	]);



}