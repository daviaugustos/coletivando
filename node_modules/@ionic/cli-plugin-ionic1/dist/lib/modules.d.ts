/// <reference types="express" />
/// <reference types="opn" />
/// <reference types="xml2js" />
import * as expressType from 'express';
import * as globWatcherType from 'glob-watcher';
import * as opnType from 'opn';
import * as proxyMiddlewareType from 'proxy-middleware';
import * as tinylrType from 'tiny-lr';
import * as xml2jsType from 'xml2js';
export declare function load(modulePath: 'express'): typeof expressType;
export declare function load(modulePath: 'glob-watcher'): typeof globWatcherType;
export declare function load(modulePath: 'opn'): typeof opnType;
export declare function load(modulePath: 'proxy-middleware'): typeof proxyMiddlewareType;
export declare function load(modulePath: 'tiny-lr'): typeof tinylrType;
export declare function load(modulePath: 'xml2js'): typeof xml2jsType;
