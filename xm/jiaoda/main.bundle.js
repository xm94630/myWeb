/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9ccd7784e5ad167ff2bc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/base.css?");

/***/ }),

/***/ "./src/css/game.less":
/*!***************************!*\
  !*** ./src/css/game.less ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/game.less?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/base.css */ \"./src/css/base.css\");\n/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_base_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_game_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/game.less */ \"./src/css/game.less\");\n/* harmony import */ var _css_game_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_game_less__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webfontloader */ \"./node_modules/webfontloader/webfontloader.js\");\n/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/index.js\");\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var pixi_sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pixi-sound */ \"./node_modules/pixi-sound/dist/pixi-sound.es.js\");\n/* harmony import */ var _tool_tweenFun_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tool/tweenFun.js */ \"./src/js/tool/tweenFun.js\");\n\n\n\n\n //有依赖关系的是这样子引入的就行\n\n //自定义字体加载\n\nwebfontloader__WEBPACK_IMPORTED_MODULE_2___default.a.load({\n  custom: {\n    families: ['monogram']\n  }\n});\n/********************************************************************\n * resize                                                          *\n ********************************************************************/\n\nfunction resize() {\n  var ratio = Math.min(window.innerWidth / w, window.innerHeight / h);\n  app.view.style.width = Math.ceil(w * ratio) + \"px\";\n  app.view.style.height = Math.ceil(h * ratio) + \"px\"; //居中\n\n  var ratio2 = w / h;\n\n  if (window.innerWidth / window.innerHeight > w / h) {\n    app.view.style.top = 0;\n    app.view.style.left = (window.innerWidth - window.innerHeight * ratio2) / 2 + 'px';\n  } else {\n    app.view.style.left = 0;\n    app.view.style.top = (window.innerHeight - window.innerWidth / ratio2) / 2 + 'px';\n  }\n}\n/********************************************************************\n * 游戏实例创建                                                          *\n ********************************************************************/\n\n\nvar w = 750;\nvar h = 1200;\nvar mySound;\nvar progress;\nvar nPage = 1; //第几页\n\nvar totalPage = 38;\n\nvar myTicker = function myTicker() {};\n\nvar app = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Application\"]({\n  width: w,\n  height: h,\n  backgroundColor: 0xffffff\n});\napp.view.style.position = \"absolute\";\napp.view.style.display = \"block\";\napp.ticker.add(function (delta) {\n  myTicker(delta);\n});\ndocument.body.appendChild(app.view); //屏幕适配\n\nresize();\n/********************************************************************\n * 场景布局                                                          *\n ********************************************************************/\n\nvar stage0 = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Container\"](); //加载\n\nvar stage1 = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Container\"]();\nvar stage2 = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Container\"]();\nstage1.name = \"stage1\";\nstage2.name = \"stage2\";\n\nfunction getAllMaterial(res) {\n  //这个配置文件是对所有动画json文件的维护，使用起来非常方便\n  var characterAnimation = res['characterAnimation'].data;\n  var list = {\n    bgImg: function bgImg() {\n      var img = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"](res.background.texture);\n      return img;\n    },\n    viewBtnMC: function viewBtnMC() {\n      var sourceArr = characterAnimation['button.json']['viewBtn'];\n      var frameArr = [];\n\n      for (var i = 0; i < sourceArr.length; i++) {\n        frameArr.push(pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Texture\"].fromFrame(sourceArr[i]));\n      }\n\n      var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"extras\"].AnimatedSprite(frameArr);\n      mc.x = w - mc.width / 2 - 12;\n      mc.y = mc.height / 2 + 892;\n      mc.anchor.set(0.5);\n      mc.gotoAndStop(0);\n      mc.interactive = true;\n      mc.buttonMode = true;\n      mc.on('pointerdown', function () {\n        //舞台切换场景\n        app.stage.getChildByName('stage1').visible = false;\n        app.stage.getChildByName('stage2').visible = true;\n      });\n      return mc;\n    },\n    soundBtnMC: function soundBtnMC() {\n      var sourceArr = characterAnimation['button.json']['soundBtn'];\n      var frameArr = [];\n\n      for (var i = 0; i < sourceArr.length; i++) {\n        frameArr.push(pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Texture\"].fromFrame(sourceArr[i]));\n      }\n\n      var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"extras\"].AnimatedSprite(frameArr);\n      mc.x = w - mc.width / 2 - 30;\n      mc.y = mc.height / 2 + 30;\n      mc.anchor.set(0.5);\n      mc.gotoAndStop(0);\n      mc.interactive = true;\n      mc.buttonMode = true;\n      mc.scale.x = mc.scale.y = 1;\n      var flag = false;\n      mc.on('pointerdown', function () {\n        if (flag) {\n          mc.gotoAndStop(0);\n          mySound && mySound.play();\n          flag = false;\n        } else {\n          mc.gotoAndStop(1);\n          mySound && mySound.stop();\n          flag = true;\n        }\n      });\n      return mc;\n    },\n    nextBtnMC: function nextBtnMC() {\n      var sourceArr = characterAnimation['button.json']['viewBtn'];\n      var frameArr = [];\n\n      for (var i = 0; i < sourceArr.length; i++) {\n        frameArr.push(pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Texture\"].fromFrame(sourceArr[i]));\n      }\n\n      var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"extras\"].AnimatedSprite(frameArr);\n      mc.x = w - mc.width / 2 - 20;\n      mc.y = h - mc.height / 2 - 20;\n      mc.anchor.set(0.5);\n      mc.gotoAndStop(2);\n      mc.interactive = true;\n      mc.buttonMode = true;\n      mc.scale.x = mc.scale.y = 1;\n      mc.on('pointerdown', function () {\n        nPage++;\n\n        if (nPage >= totalPage) {\n          stage2.getChildByName('nextBtn').visible = false;\n        } else {\n          stage2.getChildByName('prevBtn').visible = true;\n          stage2.getChildByName('nextBtn').visible = true;\n        }\n\n        var bookMC = stage2.getChildByName('book');\n        bookMC.removeChildren(0, bookMC.children.length);\n        bookMC.addChild(list.pageMC(nPage));\n      });\n      mc.name = \"nextBtn\";\n      return mc;\n    },\n    prevBtnMC: function prevBtnMC() {\n      var sourceArr = characterAnimation['button.json']['viewBtn'];\n      var frameArr = [];\n\n      for (var i = 0; i < sourceArr.length; i++) {\n        frameArr.push(pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Texture\"].fromFrame(sourceArr[i]));\n      }\n\n      var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"extras\"].AnimatedSprite(frameArr);\n      mc.x = mc.width / 2 + 20;\n      mc.y = h - mc.height / 2 - 20;\n      mc.anchor.set(0.5);\n      mc.gotoAndStop(1);\n      mc.interactive = true;\n      mc.buttonMode = true;\n      mc.scale.x = mc.scale.y = 1;\n      mc.on('pointerdown', function () {\n        nPage--;\n\n        if (nPage <= 1) {\n          stage2.getChildByName('prevBtn').visible = false;\n        } else {\n          stage2.getChildByName('prevBtn').visible = true;\n          stage2.getChildByName('nextBtn').visible = true;\n        }\n\n        var bookMC = stage2.getChildByName('book');\n        bookMC.removeChildren(0, bookMC.children.length);\n        bookMC.addChild(list.pageMC(nPage));\n      });\n      mc.name = \"prevBtn\";\n      mc.visible = false;\n      return mc;\n    },\n    btn: function btn() {\n      var txt = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Text\"]('游戏开始', {\n        fontSize: 60,\n        fill: 0x000,\n        align: 'left'\n      });\n      txt.anchor.set(.5);\n      txt.x = w / 2;\n      txt.y = 200;\n      txt.interactive = true;\n      txt.buttonMode = true;\n      return txt;\n    },\n    page01Img: function page01Img() {\n      var img = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"](res.page01.texture);\n      img.name = \"page01\";\n      return img;\n    },\n    page02Img: function page02Img() {\n      var img = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"](res.page02.texture);\n      img.name = \"page02\";\n      return img;\n    },\n    bookMC: function bookMC() {\n      var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Container\"]();\n      mc.name = \"book\";\n      mc.addChild(list.pageMC(1));\n      return mc;\n    },\n    pageMC: function pageMC(nPage) {\n      var mc = pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"].fromImage(\"page\" + nPage);\n      mc.name = \"page\" + nPage;\n      return mc;\n    },\n    pageNumberMC: function pageNumberMC() {\n      var txt = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Text\"](nPage + \"/\" + totalPage, {\n        fontSize: 30,\n        fill: 0xc3592f,\n        align: 'left',\n        fontFamily: 'monogram'\n      });\n      txt.anchor.set(.5);\n      txt.x = w / 2;\n      txt.y = 1100;\n      txt.interactive = true;\n      txt.buttonMode = true;\n      txt.name = \"pageNumber\";\n      return txt;\n    },\n    homeBtnMC: function homeBtnMC() {\n      var mc = pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"].fromImage(\"icon-exit.png\");\n      mc.x = mc.width / 2 + 30;\n      mc.y = mc.height / 2 + 30;\n      mc.anchor.set(0.5);\n      mc.interactive = true;\n      mc.buttonMode = true;\n      mc.scale.x = mc.scale.y = 1;\n      var flag = false;\n      mc.on('pointerdown', function () {\n        app.stage.getChildByName('stage1').visible = true;\n        app.stage.getChildByName('stage2').visible = false;\n        nPage = 1;\n        stage2.getChildByName('prevBtn').visible = false;\n        stage2.getChildByName('nextBtn').visible = true; //复位\n\n        var bookMC = stage2.getChildByName('book');\n        bookMC.removeChildren(0, bookMC.children.length);\n        bookMC.addChild(list.pageMC(nPage));\n      });\n      return mc;\n    }\n  };\n  return list;\n} //加载声音前的loading场景\n\n\nfunction stage0_layout(res) {\n  var characterAnimation = res['characterAnimation'].data; //进度条(图形)\n\n  var sourceArr = characterAnimation['loadingBox.json']['loadingBox'];\n  var frames = [];\n\n  for (var i = 0; i < sourceArr.length; i++) {\n    frames.push(pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Texture\"].fromFrame(sourceArr[i]));\n  }\n\n  var mc = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"extras\"].AnimatedSprite(frames);\n  mc.name = \"loadingBox\";\n  mc.x = w / 2;\n  mc.y = h / 2;\n  mc.anchor.set(0.5);\n  mc.animationSpeed = 0.25;\n  mc.play(); //进度条（文字）\n\n  var progressTextMC = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Text\"](progress, {\n    fontSize: 60,\n    fill: 0x000,\n    align: 'left'\n  });\n  progressTextMC.anchor.set(.5);\n  progressTextMC.x = w / 2;\n  progressTextMC.y = 700;\n  progressTextMC.name = \"progressText\"; //背景图\n\n  var img = new pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"Sprite\"](res.background.texture);\n  img.height = h;\n  stage0.name = \"stage0\";\n  stage0.removeChildren(0, stage0.children.length);\n  stage0.addChild(img, mc, progressTextMC); //使用场景对应的ticker\n\n  myTicker = stage0_ticker;\n} //场景布局1\n\n\nfunction stage1_layout(res) {\n  var _getAllMaterial = getAllMaterial(res),\n      bgImg = _getAllMaterial.bgImg,\n      soundBtnMC = _getAllMaterial.soundBtnMC,\n      viewBtnMC = _getAllMaterial.viewBtnMC,\n      page01Img = _getAllMaterial.page01Img;\n\n  stage1.removeChildren(0, stage1.children.length);\n  stage1.addChild(bgImg(), viewBtnMC());\n} //场景布局2\n\n\nfunction stage2_layout(res) {\n  var _getAllMaterial2 = getAllMaterial(res),\n      prevBtnMC = _getAllMaterial2.prevBtnMC,\n      nextBtnMC = _getAllMaterial2.nextBtnMC,\n      soundBtnMC = _getAllMaterial2.soundBtnMC,\n      bookMC = _getAllMaterial2.bookMC,\n      pageMC = _getAllMaterial2.pageMC,\n      pageNumberMC = _getAllMaterial2.pageNumberMC,\n      homeBtnMC = _getAllMaterial2.homeBtnMC;\n\n  stage2.removeChildren(0, stage2.children.length);\n  stage2.addChild(bookMC(), nextBtnMC(), prevBtnMC(), pageNumberMC(), homeBtnMC());\n}\n/********************************************************************\n * ticker                                                          *\n ********************************************************************/\n\n\nfunction stage0_ticker(delta) {\n  stage0.getChildByName('progressText').text = progress;\n}\n\nfunction stage1_ticker(delta) {}\n\nfunction stage2_ticker(delta) {\n  stage2.getChildByName('pageNumber').text = nPage + \" / \" + totalPage;\n}\n/********************************************************************\n * 游戏入口                                                          *\n ********************************************************************/\n//这部分逻辑后期可以优化成promise，代码更加优美\n//我已经尝试使用promise，似乎并不能在代码上进行优化，所以还是用这里的\n\n\npixi_js__WEBPACK_IMPORTED_MODULE_3__[\"loader\"].add(\"characterAnimation\", \"./img/characterAnimation.json\").add(\"background\", \"./img/bg.png\").add(\"loadingBox\", \"./img/loader.json\").load(function (xxx, res) {\n  //优先加载一部分图片，用来做资源加载页\n  stage0_layout(res);\n  app.stage.addChild(stage0); //剩余资源加载\n\n  pixi_js__WEBPACK_IMPORTED_MODULE_3__[\"loader\"].add(\"bgmSound\", \"./sounds/bgm.mp3\").add(\"btn\", \"./img/btn.json\").add(\"buttons\", \"./img/buttons.json\").add(\"page1\", \"./img/page1.png\").add(\"page2\", \"./img/page2.png\").add(\"page3\", \"./img/page3.png\").add(\"page4\", \"./img/page4.png\").add(\"page5\", \"./img/page5.png\").add(\"page6\", \"./img/page6.png\").add(\"page7\", \"./img/page7.png\").add(\"page8\", \"./img/page8.png\").add(\"page9\", \"./img/page9.png\").add(\"page10\", \"./img/page10.png\").add(\"page11\", \"./img/page11.png\").add(\"page12\", \"./img/page12.png\").add(\"page13\", \"./img/page13.png\").add(\"page14\", \"./img/page14.png\").add(\"page15\", \"./img/page15.png\").add(\"page16\", \"./img/page16.png\").add(\"page17\", \"./img/page17.png\").add(\"page18\", \"./img/page18.png\").add(\"page19\", \"./img/page19.png\").add(\"page20\", \"./img/page20.png\").add(\"page21\", \"./img/page21.png\").add(\"page22\", \"./img/page22.png\").add(\"page23\", \"./img/page23.png\").add(\"page24\", \"./img/page24.png\").add(\"page25\", \"./img/page25.png\").add(\"page26\", \"./img/page26.png\").add(\"page27\", \"./img/page27.png\").add(\"page28\", \"./img/page28.png\").add(\"page29\", \"./img/page29.png\").add(\"page30\", \"./img/page30.png\").add(\"page31\", \"./img/page31.png\").add(\"page32\", \"./img/page32.png\").add(\"page33\", \"./img/page33.png\").add(\"page34\", \"./img/page34.png\").add(\"page35\", \"./img/page35.png\").add(\"page36\", \"./img/page36.png\").add(\"page37\", \"./img/page37.png\").add(\"page38\", \"./img/page38.png\").load(setup).onProgress.add(function (myLoader, res) {\n    progress = 'Loading...' + Math.round(myLoader.progress) + '%';\n  });\n});\n/********************************************************************\n * 游戏主体逻辑部分                                                    *\n ********************************************************************/\n\nfunction setup(xxx, res) {\n  mySound = res.bgmSound.sound;\n  mySound && mySound.play();\n\n  var _getAllMaterial3 = getAllMaterial(res),\n      soundBtnMC = _getAllMaterial3.soundBtnMC; //场景布局（创建容器）\n\n\n  stage1_layout(res);\n  stage2_layout(res); //舞台显示 (容器挂载)\n\n  app.stage.removeChild(app.stage.getChildByName('stage0')); //移除（后续不会再用）\n\n  app.stage.addChild(stage1, stage2, soundBtnMC());\n  app.stage.getChildByName('stage1').visible = true;\n  app.stage.getChildByName('stage2').visible = false; //使用场景对应的ticker\n\n  myTicker = stage2_ticker;\n}\n/********************************************************************\n * 事件绑定                                                          *\n ********************************************************************/\n\n\nwindow.addEventListener('resize', resize);\nconsole.log('=======>');\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/tool/tweenFun.js":
/*!*********************************!*\
  !*** ./src/js/tool/tweenFun.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar T = {\n  pi: Math.PI,\n  sin: Math.sin,\n  abs: Math.abs,\n  //x轴缩放\n  xMod: function xMod(fun, n) {\n    return function (t) {\n      return fun(t / n);\n    };\n  },\n  //y轴缩放\n  yMod: function yMod(fun, n, s) {\n    return function (x) {\n      return n * fun(x) + s;\n    };\n  },\n  //xy轴同时缩放\n  xyMod: function xyMod(fun, m, n, s) {\n    n = n || 1;\n    m = m || 1;\n    s = s || 0;\n    return this.yMod(this.xMod(fun, m), n, s);\n  },\n  //创建一个闭包\n  createSteps: function createSteps(fun, max, step, loop) {\n    var loop = loop || false; //false表示只运行一次，true表示无限循环\n\n    var count = 0;\n    return {\n      perAdd: function perAdd(t) {\n        t = t || step;\n        count += t;\n\n        if (count <= max) {\n          return fun(count);\n        } else {\n          if (loop) {\n            var yushu = count % max;\n\n            if (yushu == 0) {\n              return fun(max);\n            } else {\n              return fun(count % max);\n            }\n          } else {\n            return fun(max);\n          }\n        }\n      }\n    };\n  },\n  //自定义函数\n  ttFun: function ttFun(x) {\n    if (x >= 0 && x < 1) {\n      return x;\n    } else if (x >= 1 && x < 2) {\n      return -x + 2;\n    } else if (x >= 2 && x < 3) {\n      return x - 2;\n    } else if (x >= 3 && x < 4) {\n      return -x + 4;\n    } else if (x >= 4) {\n      return 0;\n    } else {\n      return 0;\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (T);\n\n//# sourceURL=webpack:///./src/js/tool/tweenFun.js?");

/***/ })

/******/ });