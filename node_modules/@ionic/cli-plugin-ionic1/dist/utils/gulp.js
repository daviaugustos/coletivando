"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const chalk = require("chalk");
function checkEnvironment(projectDirectory) {
    try {
        var gulpFileExists = doesGulpFileExist(projectDirectory);
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            throw 'Uh oh! Looks like you\'re missing a module in your gulpfile:\n' +
                '\nDo you need to run `npm install`?\n';
        }
        throw `${chalk.red('\nThere is an error in your gulpfile: ')}\n` +
            `e.stack\n`;
    }
    return gulpFileExists;
}
exports.checkEnvironment = checkEnvironment;
function setupGulpInstance(projectDirectory) {
    try {
        var gulp = require(path.join(projectDirectory, 'node_modules', 'gulp'));
    }
    catch (e) {
        throw `Gulpfile detected, but gulp is not installed.\nDo you need to run npm install`;
    }
    return patchGulpEventLogging(gulp);
}
exports.setupGulpInstance = setupGulpInstance;
function runGulpHook(gulp, hookName) {
    return new Promise((resolve, reject) => {
        gulp.start.bind(gulp, hookName, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}
exports.runGulpHook = runGulpHook;
function doesGulpFileExist(projectDirectory) {
    var names = ['gulpfile.js', 'Gulpfile.js'];
    for (var i = 0, ii = names.length; i < ii; i += 1) {
        try {
            require(path.join(projectDirectory, names[i]));
            return true;
        }
        catch (e) {
            if (e.code === 'MODULE_NOT_FOUND' && e.message.indexOf(names[i]) !== -1) {
                continue;
            }
            throw e;
        }
    }
    return false;
}
function patchGulpEventLogging(gulpInst) {
    gulpInst.on('task_start', function (e) {
        console.log('Starting', '\'' + chalk.cyan(e.task) + '\'...');
    });
    gulpInst.on('task_stop', function (e) {
        console.log('Finished');
    });
    gulpInst.on('task_err', function (e) {
        var msg = formatGulpError(e);
        console.log('\'' + chalk.cyan(e.task) + '\'', chalk.red('errored after'));
        console.log(msg);
    });
    return gulpInst;
}
function formatGulpError(e) {
    if (!e.err) {
        return e.message;
    }
    if (typeof e.err.showStack === 'boolean') {
        return e.err.toString();
    }
    if (e.err.stack) {
        return e.err.stack;
    }
    return new Error(String(e.err)).stack;
}
