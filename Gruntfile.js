/**
 * Created by yshybeka on 8/31/2017.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        jasmine_nodejs: {
            options: {
                useHelpers: true,
                helpers: [],
                random: false,
                seed: null,
                defaultTimeout: 10000,
                stopOnFailure: false,
                traceFatal: true,
                // configure one or more built-in reporters
                reporters: {
                    console: {
                        colors: true,        // (0|false)|(1|true)|2
                        cleanStack: 1,       // (0|false)|(1|true)|2|3
                        verbosity: 4,        // (0|false)|1|2|3|(4|true)
                        listStyle: "indent", // "flat"|"indent"
                        activity: false
                    },
                    // junit: {
                    //     savePath: "./reports",
                    //     filePrefix: "junit-report",
                    //     consolidate: true,
                    //     useDotNotation: true
                    // },
                    // nunit: {
                    //     savePath: "./reports",
                    //     filename: "nunit-report.xml",
                    //     reportName: "Test Results"
                    // },
                    // terminal: {
                    //     color: false,
                    //     showStack: false,
                    //     verbosity: 2
                    // },
                    // teamcity: true,
                    // tap: true
                },
                // add custom Jasmine reporter(s)
                customReporters: []
            },
            emailControllerSender: {
                // target specific options
                options: {
                    useHelpers: false
                },
                // spec files
                specs: [
                    "server/api-services/email/test/emailControllerSpec.js"
                ]
            },
            emailSenderService: {
                // target specific options
                options: {
                    useHelpers: false
                },
                // spec files
                specs: [
                    "helpers/email/test/emailSenderSpec.js"
                ]
            }

        }
    });
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    grunt.registerTask('test', ['jasmine_nodejs']);
    grunt.registerTask('default', ['jasmine_nodejs']);
};

