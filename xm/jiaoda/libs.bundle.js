/******/ (function(modules) { // webpackBootstrap
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
/******/ 	var hotCurrentHash = "f0e3872709b56446c95d";
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
/******/ 			var chunkId = "libs";
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/lib/sound.js":
/*!*****************************!*\
  !*** ./src/js/lib/sound.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\nSound.js\n===============\n\nA complete micro library of useful, modular functions that help you load, play, control\nand generate sound effects and music for games and interactive applications. All the\ncode targets the WebAudio API.\n*/\n\n/*\nFixing the WebAudio API\n--------------------------\n\nThe WebAudio API is so new that it's API is not consistently implemented properly across\nall modern browsers. Thankfully, Chris Wilson's Audio Context Monkey Patch script\nnormalizes the API for maximum compatibility.\n\nhttps://github.com/cwilso/AudioContext-MonkeyPatch/blob/gh-pages/AudioContextMonkeyPatch.js\n\nIt's included here.\nThank you, Chris!\n\n*/\n(function (global, exports, perf) {\n  'use strict';\n\n  function fixSetTarget(param) {\n    if (!param) // if NYI, just return\n      return;\n    if (!param.setTargetAtTime) param.setTargetAtTime = param.setTargetValueAtTime;\n  }\n\n  if (window.hasOwnProperty('webkitAudioContext') && !window.hasOwnProperty('AudioContext')) {\n    window.AudioContext = webkitAudioContext;\n    if (!AudioContext.prototype.hasOwnProperty('createGain')) AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;\n    if (!AudioContext.prototype.hasOwnProperty('createDelay')) AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;\n    if (!AudioContext.prototype.hasOwnProperty('createScriptProcessor')) AudioContext.prototype.createScriptProcessor = AudioContext.prototype.createJavaScriptNode;\n    if (!AudioContext.prototype.hasOwnProperty('createPeriodicWave')) AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;\n    AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain;\n\n    AudioContext.prototype.createGain = function () {\n      var node = this.internal_createGain();\n      fixSetTarget(node.gain);\n      return node;\n    };\n\n    AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay;\n\n    AudioContext.prototype.createDelay = function (maxDelayTime) {\n      var node = maxDelayTime ? this.internal_createDelay(maxDelayTime) : this.internal_createDelay();\n      fixSetTarget(node.delayTime);\n      return node;\n    };\n\n    AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource;\n\n    AudioContext.prototype.createBufferSource = function () {\n      var node = this.internal_createBufferSource();\n\n      if (!node.start) {\n        node.start = function (when, offset, duration) {\n          if (offset || duration) this.noteGrainOn(when || 0, offset, duration);else this.noteOn(when || 0);\n        };\n      } else {\n        node.internal_start = node.start;\n\n        node.start = function (when, offset, duration) {\n          if (typeof duration !== 'undefined') node.internal_start(when || 0, offset, duration);else node.internal_start(when || 0, offset || 0);\n        };\n      }\n\n      if (!node.stop) {\n        node.stop = function (when) {\n          this.noteOff(when || 0);\n        };\n      } else {\n        node.internal_stop = node.stop;\n\n        node.stop = function (when) {\n          node.internal_stop(when || 0);\n        };\n      }\n\n      fixSetTarget(node.playbackRate);\n      return node;\n    };\n\n    AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor;\n\n    AudioContext.prototype.createDynamicsCompressor = function () {\n      var node = this.internal_createDynamicsCompressor();\n      fixSetTarget(node.threshold);\n      fixSetTarget(node.knee);\n      fixSetTarget(node.ratio);\n      fixSetTarget(node.reduction);\n      fixSetTarget(node.attack);\n      fixSetTarget(node.release);\n      return node;\n    };\n\n    AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter;\n\n    AudioContext.prototype.createBiquadFilter = function () {\n      var node = this.internal_createBiquadFilter();\n      fixSetTarget(node.frequency);\n      fixSetTarget(node.detune);\n      fixSetTarget(node.Q);\n      fixSetTarget(node.gain);\n      return node;\n    };\n\n    if (AudioContext.prototype.hasOwnProperty('createOscillator')) {\n      AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator;\n\n      AudioContext.prototype.createOscillator = function () {\n        var node = this.internal_createOscillator();\n\n        if (!node.start) {\n          node.start = function (when) {\n            this.noteOn(when || 0);\n          };\n        } else {\n          node.internal_start = node.start;\n\n          node.start = function (when) {\n            node.internal_start(when || 0);\n          };\n        }\n\n        if (!node.stop) {\n          node.stop = function (when) {\n            this.noteOff(when || 0);\n          };\n        } else {\n          node.internal_stop = node.stop;\n\n          node.stop = function (when) {\n            node.internal_stop(when || 0);\n          };\n        }\n\n        if (!node.setPeriodicWave) node.setPeriodicWave = node.setWaveTable;\n        fixSetTarget(node.frequency);\n        fixSetTarget(node.detune);\n        return node;\n      };\n    }\n  }\n\n  if (window.hasOwnProperty('webkitOfflineAudioContext') && !window.hasOwnProperty('OfflineAudioContext')) {\n    window.OfflineAudioContext = webkitOfflineAudioContext;\n  }\n})(window);\n/*\nDefine the audio context\n------------------------\n\nAll this code uses a single `AudioContext` If you want to use any of these functions\nindependently of this file, make sure that have an `AudioContext` called `actx`. \n*/\n\n\nvar actx = new AudioContext();\n/*\nsounds\n------\n\n`sounds` is an object that you can use to store all your loaded sound fles. \nIt also has a helpful `load` method that manages asset loading. You can load sounds at\nany time during the game by using the `sounds.load` method. You don't have to use\nthe `sounds` object or its `load` method, but it's a really convenient way to \nwork with sound file assets.\n\nHere's how could use the `sound` object to load three sound files from a `sounds` folder and \ncall a `setup` method when all the files have finished loading:\n\n    sounds.load([\n      \"sounds/shoot.wav\", \n      \"sounds/music.wav\",\n      \"sounds/bounce.mp3\"\n    ]);\n    sounds.whenLoaded = setup;\n\nYou can now access these loaded sounds in your application code like this:\n\nvar shoot = sounds[\"sounds/shoot.wav\"],\n    music = sounds[\"sounds/music.wav\"],\n    bounce = sounds[\"sounds/bounce.mp3\"];\n\n*/\n\nvar sounds = {\n  //Properties to help track the assets being loaded.\n  toLoad: 0,\n  loaded: 0,\n  //File extensions for different types of sounds.\n  audioExtensions: [\"mp3\", \"ogg\", \"wav\", \"webm\"],\n  //The callback function that should run when all assets have loaded.\n  //Assign this when you load the fonts, like this: `assets.whenLoaded = makeSprites;`.\n  whenLoaded: undefined,\n  //The load method creates and loads all the assets. Use it like this:\n  //`assets.load([\"images/anyImage.png\", \"fonts/anyFont.otf\"]);`.\n  load: function load(sources) {\n    console.log(\"Loading sounds..\"); //Get a reference to this asset object so we can\n    //refer to it in the `forEach` loop ahead.\n\n    var self = this; //Find the number of files that need to be loaded.\n\n    self.toLoad = sources.length;\n    sources.forEach(function (source) {\n      //Find the file extension of the asset.\n      var extension = source.split('.').pop(); //#### Sounds\n      //Load audio files that have file extensions that match\n      //the `audioExtensions` array.\n\n      if (self.audioExtensions.indexOf(extension) !== -1) {\n        //Create a sound sprite.\n        var soundSprite = makeSound(source, self.loadHandler.bind(self), true, false); //Get the sound file name.\n\n        soundSprite.name = source; //If you just want to extract the file name with the\n        //extension, you can do it like this:\n        //soundSprite.name = source.split(\"/\").pop();\n        //Assign the sound as a property of the assets object so\n        //we can access it like this: `assets[\"sounds/sound.mp3\"]`.\n\n        self[soundSprite.name] = soundSprite;\n      } //Display a message if the file type isn't recognized.\n      else {\n          console.log(\"File type not recognized: \" + source);\n        }\n    });\n  },\n  //#### loadHandler\n  //The `loadHandler` will be called each time an asset finishes loading.\n  loadHandler: function loadHandler() {\n    var self = this;\n    self.loaded += 1;\n    console.log(self.loaded); //Check whether everything has loaded.\n\n    if (self.toLoad === self.loaded) {\n      //If it has, run the callback function that was assigned to the `whenLoaded` property\n      console.log(\"Sounds finished loading\"); //Reset `loaded` and `toLoaded` so we can load more assets\n      //later if we want to.\n\n      self.toLoad = 0;\n      self.loaded = 0;\n      self.whenLoaded();\n    }\n  }\n};\n/*\nmakeSound\n---------\n\n`makeSound` is the function you want to use to load and play sound files.\nIt creates and returns and WebAudio sound object with lots of useful methods you can\nuse to control the sound. \nYou can use it to load a sound like this:\n\n    var anySound = makeSound(\"sounds/anySound.mp3\", loadHandler);\n\n\nThe code above will load the sound and then call the `loadHandler`\nwhen the sound has finished loading. \n(However, it's more convenient to load the sound file using \nthe `sounds.load` method described above, so I don't recommend loading sounds\nlike this unless you need more low-level control.)\n\nAfter the sound has been loaded you can access and use it like this:\n\n    function loadHandler() {\n      anySound.loop = true;\n      anySound.pan = 0.8;\n      anySound.volume = 0.5;\n      anySound.play();\n      anySound.pause();\n      anySound.playFrom(second);\n      anySound.restart();\n      anySound.setReverb(2, 2, false);\n      anySound.setEcho(0.2, 0.2, 0);\n      anySound.playbackRate = 0.5;\n    }\n   \nFor advanced configurations, you can optionally supply `makeSound` with optional 3rd and \n4th arguments:\n\n   var anySound = makeSound(source, loadHandler, loadTheSound?, xhrObject);\n\n`loadTheSound?` is a Boolean (true/false) value that, if `false` prevents the sound file\nfrom being loaded. You would only want to set it to `false` like this if you were\nusing another file loading library to load the sound, and didn't want it to be loaded\ntwice.\n\n`xhrObject`, the optional 4th argument, is the XHR object that was used to load the sound. Again, you \nwould only supply this if you were using another file loading library to load the sound,\nand that library had generated its own XHR object. If you supply the `xhr` argument, `makeSound`\nwill skip the file loading step (because you've already done that), but still decode the audio buffer for you.\n(If you are loading the sound file using another file loading library, make sure that your sound\nfiles are loaded with the XHR `responseType = \"arraybuffer\"` option.)\n\nFor example, here's how you could use this advanced configuration to decode a sound that you've already loaded\nusing your own custom loading system:\n\n   var soundSprite = makeSound(source, decodeHandler.bind(this), false, xhr);\n\nWhen the file has finished being decoded, your custom `decodeHandler` will run, which tells you\nthat the file has finished decoding.\n\nIf you're creating more than one sound like this, use counter variables to track the number of sounds\nyou need to decode, and the number of sounds that have been decoded. When both sets of counters are the\nsame, you'll know that all your sound files have finished decoding and you can proceed with the rest\nof you application. (The [Hexi game engine](https://github.com/kittykatattack/hexi) uses `makeSound` in this way.)\n\n*/\n\nfunction makeSound(source, loadHandler, loadSound, xhr) {\n  //The sound object that this function returns.\n  var o = {}; //Set the default properties.\n\n  o.volumeNode = actx.createGain(); //Create the pan node using the efficient `createStereoPanner`\n  //method, if it's available.\n\n  if (!actx.createStereoPanner) {\n    o.panNode = actx.createPanner();\n  } else {\n    o.panNode = actx.createStereoPanner();\n  }\n\n  o.delayNode = actx.createDelay();\n  o.feedbackNode = actx.createGain();\n  o.filterNode = actx.createBiquadFilter();\n  o.convolverNode = actx.createConvolver();\n  o.soundNode = null;\n  o.buffer = null;\n  o.source = source;\n  o.loop = false;\n  o.playing = false; //The function that should run when the sound is loaded.\n\n  o.loadHandler = undefined; //Values for the `pan` and `volume` getters/setters.\n\n  o.panValue = 0;\n  o.volumeValue = 1; //Values to help track and set the start and pause times.\n\n  o.startTime = 0;\n  o.startOffset = 0; //Set the playback rate.\n\n  o.playbackRate = 1; //Echo properties.\n\n  o.echo = false;\n  o.delayValue = 0.3;\n  o.feebackValue = 0.3;\n  o.filterValue = 0; //Reverb properties\n\n  o.reverb = false;\n  o.reverbImpulse = null; //The sound object's methods.\n\n  o.play = function () {\n    //Set the start time (it will be `0` when the sound\n    //first starts.\n    o.startTime = actx.currentTime; //Create a sound node.\n\n    o.soundNode = actx.createBufferSource(); //Set the sound node's buffer property to the loaded sound.\n\n    o.soundNode.buffer = o.buffer; //Set the playback rate\n\n    o.soundNode.playbackRate.value = this.playbackRate; //Connect the sound to the pan, connect the pan to the\n    //volume, and connect the volume to the destination.\n\n    o.soundNode.connect(o.volumeNode); //If there's no reverb, bypass the convolverNode\n\n    if (o.reverb === false) {\n      o.volumeNode.connect(o.panNode);\n    } //If there is reverb, connect the `convolverNode` and apply\n    //the impulse response\n    else {\n        o.volumeNode.connect(o.convolverNode);\n        o.convolverNode.connect(o.panNode);\n        o.convolverNode.buffer = o.reverbImpulse;\n      } //Connect the `panNode` to the destination to complete the chain.\n\n\n    o.panNode.connect(actx.destination); //Add optional echo.\n\n    if (o.echo) {\n      //Set the values.\n      o.feedbackNode.gain.value = o.feebackValue;\n      o.delayNode.delayTime.value = o.delayValue;\n      o.filterNode.frequency.value = o.filterValue; //Create the delay loop, with optional filtering.\n\n      o.delayNode.connect(o.feedbackNode);\n\n      if (o.filterValue > 0) {\n        o.feedbackNode.connect(o.filterNode);\n        o.filterNode.connect(o.delayNode);\n      } else {\n        o.feedbackNode.connect(o.delayNode);\n      } //Capture the sound from the main node chain, send it to the\n      //delay loop, and send the final echo effect to the `panNode` which\n      //will then route it to the destination.\n\n\n      o.volumeNode.connect(o.delayNode);\n      o.delayNode.connect(o.panNode);\n    } //Will the sound loop? This can be `true` or `false`.\n\n\n    o.soundNode.loop = o.loop; //Finally, use the `start` method to play the sound.\n    //The start time will either be `0`,\n    //or a later time if the sound was paused.\n\n    o.soundNode.start(0, o.startOffset % o.buffer.duration); //Set `playing` to `true` to help control the\n    //`pause` and `restart` methods.\n\n    o.playing = true;\n  };\n\n  o.pause = function () {\n    //Pause the sound if it's playing, and calculate the\n    //`startOffset` to save the current position.\n    if (o.playing) {\n      o.soundNode.stop(0);\n      o.startOffset += actx.currentTime - o.startTime;\n      o.playing = false;\n    }\n  };\n\n  o.restart = function () {\n    //Stop the sound if it's playing, reset the start and offset times,\n    //then call the `play` method again.\n    if (o.playing) {\n      o.soundNode.stop(0);\n    }\n\n    o.startOffset = 0;\n    o.play();\n  };\n\n  o.playFrom = function (value) {\n    if (o.playing) {\n      o.soundNode.stop(0);\n    }\n\n    o.startOffset = value;\n    o.play();\n  };\n\n  o.setEcho = function (delayValue, feedbackValue, filterValue) {\n    if (delayValue === undefined) delayValue = 0.3;\n    if (feedbackValue === undefined) feedbackValue = 0.3;\n    if (filterValue === undefined) filterValue = 0;\n    o.delayValue = delayValue;\n    o.feebackValue = feedbackValue;\n    o.filterValue = filterValue;\n    o.echo = true;\n  };\n\n  o.setReverb = function (duration, decay, reverse) {\n    if (duration === undefined) duration = 2;\n    if (decay === undefined) decay = 2;\n    if (reverse === undefined) reverse = false;\n    o.reverbImpulse = impulseResponse(duration, decay, reverse, actx);\n    o.reverb = true;\n  }; //A general purpose `fade` method for fading sounds in or out.\n  //The first argument is the volume that the sound should\n  //fade to, and the second value is the duration, in seconds,\n  //that the fade should last.\n\n\n  o.fade = function (endValue, durationInSeconds) {\n    if (o.playing) {\n      o.volumeNode.gain.linearRampToValueAtTime(o.volumeNode.gain.value, actx.currentTime);\n      o.volumeNode.gain.linearRampToValueAtTime(endValue, actx.currentTime + durationInSeconds);\n    }\n  }; //Fade a sound in, from an initial volume level of zero.\n\n\n  o.fadeIn = function (durationInSeconds) {\n    //Set the volume to 0 so that you can fade\n    //in from silence\n    o.volumeNode.gain.value = 0;\n    o.fade(1, durationInSeconds);\n  }; //Fade a sound out, from its current volume level to zero.\n\n\n  o.fadeOut = function (durationInSeconds) {\n    o.fade(0, durationInSeconds);\n  }; //Volume and pan getters/setters.\n\n\n  Object.defineProperties(o, {\n    volume: {\n      get: function get() {\n        return o.volumeValue;\n      },\n      set: function set(value) {\n        o.volumeNode.gain.value = value;\n        o.volumeValue = value;\n      },\n      enumerable: true,\n      configurable: true\n    },\n    //The pan node uses the high-efficiency stereo panner, if it's\n    //available. But, because this is a new addition to the \n    //WebAudio spec, it might not be available on all browsers.\n    //So the code checks for this and uses the older 3D panner\n    //if 2D isn't available.\n    pan: {\n      get: function get() {\n        if (!actx.createStereoPanner) {\n          return o.panValue;\n        } else {\n          return o.panNode.pan.value;\n        }\n      },\n      set: function set(value) {\n        if (!actx.createStereoPanner) {\n          //Panner objects accept x, y and z coordinates for 3D\n          //sound. However, because we're only doing 2D left/right\n          //panning we're only interested in the x coordinate,\n          //the first one. However, for a natural effect, the z\n          //value also has to be set proportionately.\n          var x = value,\n              y = 0,\n              z = 1 - Math.abs(x);\n          o.panNode.setPosition(x, y, z);\n          o.panValue = value;\n        } else {\n          o.panNode.pan.value = value;\n        }\n      },\n      enumerable: true,\n      configurable: true\n    }\n  }); //Optionally Load and decode the sound.\n\n  if (loadSound) {\n    this.loadSound(o, source, loadHandler);\n  } //Optionally, if you've loaded the sound using some other loader, just decode the sound\n\n\n  if (xhr) {\n    this.decodeAudio(o, xhr, loadHandler);\n  } //Return the sound object.\n\n\n  return o;\n} //The `loadSound` function loads the sound file using XHR\n\n\nfunction loadSound(o, source, loadHandler) {\n  var xhr = new XMLHttpRequest(); //Use xhr to load the sound file.\n\n  xhr.open(\"GET\", source, true);\n  xhr.responseType = \"arraybuffer\"; //When the sound has finished loading, decode it using the\n  //`decodeAudio` function (which you'll see ahead)\n\n  xhr.addEventListener(\"load\", decodeAudio.bind(this, o, xhr, loadHandler)); //Send the request to load the file.\n\n  xhr.send();\n} //The `decodeAudio` function decodes the audio file for you and \n//launches the `loadHandler` when it's done\n\n\nfunction decodeAudio(o, xhr, loadHandler) {\n  //Decode the sound and store a reference to the buffer.\n  actx.decodeAudioData(xhr.response, function (buffer) {\n    o.buffer = buffer;\n    o.hasLoaded = true; //This next bit is optional, but important.\n    //If you have a load manager in your game, call it here so that\n    //the sound is registered as having loaded.\n\n    if (loadHandler) {\n      loadHandler();\n    }\n  }, //Throw an error if the sound can't be decoded.\n  function (error) {\n    throw new Error(\"Audio could not be decoded: \" + error);\n  });\n}\n/*\nsoundEffect\n-----------\n\nThe `soundEffect` function let's you generate your sounds and musical notes from scratch\n(Reverb effect requires the `impulseResponse` function that you'll see further ahead in this file)\n\nTo create a custom sound effect, define all the parameters that characterize your sound. Here's how to\ncreate a laser shooting sound:\n\n    soundEffect(\n      1046.5,           //frequency\n      0,                //attack\n      0.3,              //decay\n      \"sawtooth\",       //waveform\n      1,                //Volume\n      -0.8,             //pan\n      0,                //wait before playing\n      1200,             //pitch bend amount\n      false,            //reverse bend\n      0,                //random pitch range\n      25,               //dissonance\n      [0.2, 0.2, 2000], //echo: [delay, feedback, filter]\n      undefined         //reverb: [duration, decay, reverse?]\n      3                 //Maximum duration of sound, in seconds\n    );\n\nExperiment by changing these parameters to see what kinds of effects you can create, and build\nyour own library of custom sound effects for games.\n*/\n\n\nfunction soundEffect(frequencyValue, //The sound's fequency pitch in Hertz\nattack, //The time, in seconds, to fade the sound in\ndecay, //The time, in seconds, to fade the sound out\ntype, //waveform type: \"sine\", \"triangle\", \"square\", \"sawtooth\"\nvolumeValue, //The sound's maximum volume\npanValue, //The speaker pan. left: -1, middle: 0, right: 1\nwait, //The time, in seconds, to wait before playing the sound\npitchBendAmount, //The number of Hz in which to bend the sound's pitch down\nreverse, //If `reverse` is true the pitch will bend up\nrandomValue, //A range, in Hz, within which to randomize the pitch\ndissonance, //A value in Hz. It creates 2 dissonant frequencies above and below the target pitch\necho, //An array: [delayTimeInSeconds, feedbackTimeInSeconds, filterValueInHz]\nreverb, //An array: [durationInSeconds, decayRateInSeconds, reverse]\ntimeout //A number, in seconds, which is the maximum duration for sound effects\n) {\n  //Set the default values\n  if (frequencyValue === undefined) frequencyValue = 200;\n  if (attack === undefined) attack = 0;\n  if (decay === undefined) decay = 1;\n  if (type === undefined) type = \"sine\";\n  if (volumeValue === undefined) volumeValue = 1;\n  if (panValue === undefined) panValue = 0;\n  if (wait === undefined) wait = 0;\n  if (pitchBendAmount === undefined) pitchBendAmount = 0;\n  if (reverse === undefined) reverse = false;\n  if (randomValue === undefined) randomValue = 0;\n  if (dissonance === undefined) dissonance = 0;\n  if (echo === undefined) echo = undefined;\n  if (reverb === undefined) reverb = undefined;\n  if (timeout === undefined) timeout = undefined; //Create an oscillator, gain and pan nodes, and connect them\n  //together to the destination\n\n  var oscillator, volume, pan;\n  oscillator = actx.createOscillator();\n  volume = actx.createGain();\n\n  if (!actx.createStereoPanner) {\n    pan = actx.createPanner();\n  } else {\n    pan = actx.createStereoPanner();\n  }\n\n  oscillator.connect(volume);\n  volume.connect(pan);\n  pan.connect(actx.destination); //Set the supplied values\n\n  volume.gain.value = volumeValue;\n\n  if (!actx.createStereoPanner) {\n    pan.setPosition(panValue, 0, 1 - Math.abs(panValue));\n  } else {\n    pan.pan.value = panValue;\n  }\n\n  oscillator.type = type; //Optionally randomize the pitch. If the `randomValue` is greater\n  //than zero, a random pitch is selected that's within the range\n  //specified by `frequencyValue`. The random pitch will be either\n  //above or below the target frequency.\n\n  var frequency;\n\n  var randomInt = function randomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  };\n\n  if (randomValue > 0) {\n    frequency = randomInt(frequencyValue - randomValue / 2, frequencyValue + randomValue / 2);\n  } else {\n    frequency = frequencyValue;\n  }\n\n  oscillator.frequency.value = frequency; //Apply effects\n\n  if (attack > 0) fadeIn(volume);\n  fadeOut(volume);\n  if (pitchBendAmount > 0) pitchBend(oscillator);\n  if (echo) addEcho(volume);\n  if (reverb) addReverb(volume);\n  if (dissonance > 0) addDissonance(); //Play the sound\n\n  play(oscillator); //The helper functions:\n\n  function addReverb(volumeNode) {\n    var convolver = actx.createConvolver();\n    convolver.buffer = impulseResponse(reverb[0], reverb[1], reverb[2], actx);\n    volumeNode.connect(convolver);\n    convolver.connect(pan);\n  }\n\n  function addEcho(volumeNode) {\n    //Create the nodes\n    var feedback = actx.createGain(),\n        delay = actx.createDelay(),\n        filter = actx.createBiquadFilter(); //Set their values (delay time, feedback time and filter frequency)\n\n    delay.delayTime.value = echo[0];\n    feedback.gain.value = echo[1];\n    if (echo[2]) filter.frequency.value = echo[2]; //Create the delay feedback loop, with\n    //optional filtering\n\n    delay.connect(feedback);\n\n    if (echo[2]) {\n      feedback.connect(filter);\n      filter.connect(delay);\n    } else {\n      feedback.connect(delay);\n    } //Connect the delay loop to the oscillator's volume\n    //node, and then to the destination\n\n\n    volumeNode.connect(delay); //Connect the delay loop to the main sound chain's\n    //pan node, so that the echo effect is directed to\n    //the correct speaker\n\n    delay.connect(pan);\n  } //The `fadeIn` function\n\n\n  function fadeIn(volumeNode) {\n    //Set the volume to 0 so that you can fade\n    //in from silence\n    volumeNode.gain.value = 0;\n    volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait);\n    volumeNode.gain.linearRampToValueAtTime(volumeValue, actx.currentTime + wait + attack);\n  } //The `fadeOut` function\n\n\n  function fadeOut(volumeNode) {\n    volumeNode.gain.linearRampToValueAtTime(volumeValue, actx.currentTime + attack + wait);\n    volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait + attack + decay);\n  } //The `pitchBend` function\n\n\n  function pitchBend(oscillatorNode) {\n    //If `reverse` is true, make the note drop in frequency. Useful for\n    //shooting sounds\n    //Get the frequency of the current oscillator\n    var frequency = oscillatorNode.frequency.value; //If `reverse` is true, make the sound drop in pitch\n\n    if (!reverse) {\n      oscillatorNode.frequency.linearRampToValueAtTime(frequency, actx.currentTime + wait);\n      oscillatorNode.frequency.linearRampToValueAtTime(frequency - pitchBendAmount, actx.currentTime + wait + attack + decay);\n    } //If `reverse` is false, make the note rise in pitch. Useful for\n    //jumping sounds\n    else {\n        oscillatorNode.frequency.linearRampToValueAtTime(frequency, actx.currentTime + wait);\n        oscillatorNode.frequency.linearRampToValueAtTime(frequency + pitchBendAmount, actx.currentTime + wait + attack + decay);\n      }\n  } //The `addDissonance` function\n\n\n  function addDissonance() {\n    //Create two more oscillators and gain nodes\n    var d1 = actx.createOscillator(),\n        d2 = actx.createOscillator(),\n        d1Volume = actx.createGain(),\n        d2Volume = actx.createGain(); //Set the volume to the `volumeValue`\n\n    d1Volume.gain.value = volumeValue;\n    d2Volume.gain.value = volumeValue; //Connect the oscillators to the gain and destination nodes\n\n    d1.connect(d1Volume);\n    d1Volume.connect(actx.destination);\n    d2.connect(d2Volume);\n    d2Volume.connect(actx.destination); //Set the waveform to \"sawtooth\" for a harsh effect\n\n    d1.type = \"sawtooth\";\n    d2.type = \"sawtooth\"; //Make the two oscillators play at frequencies above and\n    //below the main sound's frequency. Use whatever value was\n    //supplied by the `dissonance` argument\n\n    d1.frequency.value = frequency + dissonance;\n    d2.frequency.value = frequency - dissonance; //Fade in/out, pitch bend and play the oscillators\n    //to match the main sound\n\n    if (attack > 0) {\n      fadeIn(d1Volume);\n      fadeIn(d2Volume);\n    }\n\n    if (decay > 0) {\n      fadeOut(d1Volume);\n      fadeOut(d2Volume);\n    }\n\n    if (pitchBendAmount > 0) {\n      pitchBend(d1);\n      pitchBend(d2);\n    }\n\n    if (echo) {\n      addEcho(d1Volume);\n      addEcho(d2Volume);\n    }\n\n    if (reverb) {\n      addReverb(d1Volume);\n      addReverb(d2Volume);\n    }\n\n    play(d1);\n    play(d2);\n  } //The `play` function\n\n\n  function play(node) {\n    node.start(actx.currentTime + wait); //Oscillators have to be stopped otherwise they accumulate in \n    //memory and tax the CPU. They'll be stopped after a default\n    //timeout of 2 seconds, which should be enough for most sound \n    //effects. Override this in the `soundEffect` parameters if you\n    //need a longer sound\n\n    node.stop(actx.currentTime + wait + 2);\n  }\n}\n/*\nimpulseResponse\n---------------\n\nThe `makeSound` and `soundEffect` functions uses `impulseResponse`  to help create an optional reverb effect.  \nIt simulates a model of sound reverberation in an acoustic space which \na convolver node can blend with the source sound. Make sure to include this function along with `makeSound`\nand `soundEffect` if you need to use the reverb feature.\n*/\n\n\nfunction impulseResponse(duration, decay, reverse, actx) {\n  //The length of the buffer.\n  var length = actx.sampleRate * duration; //Create an audio buffer (an empty sound container) to store the reverb effect.\n\n  var impulse = actx.createBuffer(2, length, actx.sampleRate); //Use `getChannelData` to initialize empty arrays to store sound data for\n  //the left and right channels.\n\n  var left = impulse.getChannelData(0),\n      right = impulse.getChannelData(1); //Loop through each sample-frame and fill the channel\n  //data with random noise.\n\n  for (var i = 0; i < length; i++) {\n    //Apply the reverse effect, if `reverse` is `true`.\n    var n;\n\n    if (reverse) {\n      n = length - i;\n    } else {\n      n = i;\n    } //Fill the left and right channels with random white noise which\n    //decays exponentially.\n\n\n    left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);\n    right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);\n  } //Return the `impulse`.\n\n\n  return impulse;\n}\n/*\nkeyboard\n--------\n\nThis isn't really necessary - I just included it for fun to help with the \nexamples in the `index.html` files.\nThe `keyboard` helper function creates `key` objects\nthat listen for keyboard events. Create a new key object like\nthis:\n\n    var keyObject = g.keyboard(asciiKeyCodeNumber);\n\nThen assign `press` and `release` methods like this:\n\n    keyObject.press = function() {\n      //key object pressed\n    };\n    keyObject.release = function() {\n      //key object released\n    };\n\nKeyboard objects also have `isDown` and `isUp` Booleans that you can check.\nThis is so much easier than having to write out tedious keyboard even capture \ncode from scratch.\n\nLike I said, the `keyboard` function has nothing to do with generating sounds,\nso just delete it if you don't want it!\n*/\n\n\nfunction keyboard(keyCode) {\n  var key = {};\n  key.code = keyCode;\n  key.isDown = false;\n  key.isUp = true;\n  key.press = undefined;\n  key.release = undefined; //The `downHandler`\n\n  key.downHandler = function (event) {\n    if (event.keyCode === key.code) {\n      if (key.isUp && key.press) key.press();\n      key.isDown = true;\n      key.isUp = false;\n    }\n\n    event.preventDefault();\n  }; //The `upHandler`\n\n\n  key.upHandler = function (event) {\n    if (event.keyCode === key.code) {\n      if (key.isDown && key.release) key.release();\n      key.isDown = false;\n      key.isUp = true;\n    }\n\n    event.preventDefault();\n  }; //Attach event listeners\n\n\n  window.addEventListener(\"keydown\", key.downHandler.bind(key), false);\n  window.addEventListener(\"keyup\", key.upHandler.bind(key), false);\n  return key;\n}\n/*** EXPORTS FROM exports-loader ***/\n\n\nexports[\"sounds\"] = sounds;\nexports[\"loadSound\"] = loadSound;\n\n//# sourceURL=webpack:///./src/js/lib/sound.js?");

/***/ }),

/***/ "./src/js/lib/webfontloader.js":
/*!*************************************!*\
  !*** ./src/js/lib/webfontloader.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */\n(function () {\n  function aa(a, b, c) {\n    return a.call.apply(a.bind, arguments);\n  }\n\n  function ba(a, b, c) {\n    if (!a) throw Error();\n\n    if (2 < arguments.length) {\n      var d = Array.prototype.slice.call(arguments, 2);\n      return function () {\n        var c = Array.prototype.slice.call(arguments);\n        Array.prototype.unshift.apply(c, d);\n        return a.apply(b, c);\n      };\n    }\n\n    return function () {\n      return a.apply(b, arguments);\n    };\n  }\n\n  function p(a, b, c) {\n    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf(\"native code\") ? aa : ba;\n    return p.apply(null, arguments);\n  }\n\n  var q = Date.now || function () {\n    return +new Date();\n  };\n\n  function ca(a, b) {\n    this.a = a;\n    this.o = b || a;\n    this.c = this.o.document;\n  }\n\n  var da = !!window.FontFace;\n\n  function t(a, b, c, d) {\n    b = a.c.createElement(b);\n    if (c) for (var e in c) {\n      c.hasOwnProperty(e) && (\"style\" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));\n    }\n    d && b.appendChild(a.c.createTextNode(d));\n    return b;\n  }\n\n  function u(a, b, c) {\n    a = a.c.getElementsByTagName(b)[0];\n    a || (a = document.documentElement);\n    a.insertBefore(c, a.lastChild);\n  }\n\n  function v(a) {\n    a.parentNode && a.parentNode.removeChild(a);\n  }\n\n  function w(a, b, c) {\n    b = b || [];\n    c = c || [];\n\n    for (var d = a.className.split(/\\s+/), e = 0; e < b.length; e += 1) {\n      for (var f = !1, g = 0; g < d.length; g += 1) {\n        if (b[e] === d[g]) {\n          f = !0;\n          break;\n        }\n      }\n\n      f || d.push(b[e]);\n    }\n\n    b = [];\n\n    for (e = 0; e < d.length; e += 1) {\n      f = !1;\n\n      for (g = 0; g < c.length; g += 1) {\n        if (d[e] === c[g]) {\n          f = !0;\n          break;\n        }\n      }\n\n      f || b.push(d[e]);\n    }\n\n    a.className = b.join(\" \").replace(/\\s+/g, \" \").replace(/^\\s+|\\s+$/, \"\");\n  }\n\n  function y(a, b) {\n    for (var c = a.className.split(/\\s+/), d = 0, e = c.length; d < e; d++) {\n      if (c[d] == b) return !0;\n    }\n\n    return !1;\n  }\n\n  function ea(a) {\n    return a.o.location.hostname || a.a.location.hostname;\n  }\n\n  function z(a, b, c) {\n    function d() {\n      m && e && f && (m(g), m = null);\n    }\n\n    b = t(a, \"link\", {\n      rel: \"stylesheet\",\n      href: b,\n      media: \"all\"\n    });\n    var e = !1,\n        f = !0,\n        g = null,\n        m = c || null;\n    da ? (b.onload = function () {\n      e = !0;\n      d();\n    }, b.onerror = function () {\n      e = !0;\n      g = Error(\"Stylesheet failed to load\");\n      d();\n    }) : setTimeout(function () {\n      e = !0;\n      d();\n    }, 0);\n    u(a, \"head\", b);\n  }\n\n  function A(a, b, c, d) {\n    var e = a.c.getElementsByTagName(\"head\")[0];\n\n    if (e) {\n      var f = t(a, \"script\", {\n        src: b\n      }),\n          g = !1;\n\n      f.onload = f.onreadystatechange = function () {\n        g || this.readyState && \"loaded\" != this.readyState && \"complete\" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, \"HEAD\" == f.parentNode.tagName && e.removeChild(f));\n      };\n\n      e.appendChild(f);\n      setTimeout(function () {\n        g || (g = !0, c && c(Error(\"Script load timeout\")));\n      }, d || 5E3);\n      return f;\n    }\n\n    return null;\n  }\n\n  ;\n\n  function B() {\n    this.a = 0;\n    this.c = null;\n  }\n\n  function C(a) {\n    a.a++;\n    return function () {\n      a.a--;\n      D(a);\n    };\n  }\n\n  function E(a, b) {\n    a.c = b;\n    D(a);\n  }\n\n  function D(a) {\n    0 == a.a && a.c && (a.c(), a.c = null);\n  }\n\n  ;\n\n  function F(a) {\n    this.a = a || \"-\";\n  }\n\n  F.prototype.c = function (a) {\n    for (var b = [], c = 0; c < arguments.length; c++) {\n      b.push(arguments[c].replace(/[\\W_]+/g, \"\").toLowerCase());\n    }\n\n    return b.join(this.a);\n  };\n\n  function G(a, b) {\n    this.c = a;\n    this.f = 4;\n    this.a = \"n\";\n    var c = (b || \"n4\").match(/^([nio])([1-9])$/i);\n    c && (this.a = c[1], this.f = parseInt(c[2], 10));\n  }\n\n  function fa(a) {\n    return H(a) + \" \" + (a.f + \"00\") + \" 300px \" + I(a.c);\n  }\n\n  function I(a) {\n    var b = [];\n    a = a.split(/,\\s*/);\n\n    for (var c = 0; c < a.length; c++) {\n      var d = a[c].replace(/['\"]/g, \"\");\n      -1 != d.indexOf(\" \") || /^\\d/.test(d) ? b.push(\"'\" + d + \"'\") : b.push(d);\n    }\n\n    return b.join(\",\");\n  }\n\n  function J(a) {\n    return a.a + a.f;\n  }\n\n  function H(a) {\n    var b = \"normal\";\n    \"o\" === a.a ? b = \"oblique\" : \"i\" === a.a && (b = \"italic\");\n    return b;\n  }\n\n  function ga(a) {\n    var b = 4,\n        c = \"n\",\n        d = null;\n    a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));\n    return c + b;\n  }\n\n  ;\n\n  function ha(a, b) {\n    this.c = a;\n    this.f = a.o.document.documentElement;\n    this.h = b;\n    this.a = new F(\"-\");\n    this.j = !1 !== b.events;\n    this.g = !1 !== b.classes;\n  }\n\n  function ia(a) {\n    a.g && w(a.f, [a.a.c(\"wf\", \"loading\")]);\n    K(a, \"loading\");\n  }\n\n  function L(a) {\n    if (a.g) {\n      var b = y(a.f, a.a.c(\"wf\", \"active\")),\n          c = [],\n          d = [a.a.c(\"wf\", \"loading\")];\n      b || c.push(a.a.c(\"wf\", \"inactive\"));\n      w(a.f, c, d);\n    }\n\n    K(a, \"inactive\");\n  }\n\n  function K(a, b, c) {\n    if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));else a.h[b]();\n  }\n\n  ;\n\n  function ja() {\n    this.c = {};\n  }\n\n  function ka(a, b, c) {\n    var d = [],\n        e;\n\n    for (e in b) {\n      if (b.hasOwnProperty(e)) {\n        var f = a.c[e];\n        f && d.push(f(b[e], c));\n      }\n    }\n\n    return d;\n  }\n\n  ;\n\n  function M(a, b) {\n    this.c = a;\n    this.f = b;\n    this.a = t(this.c, \"span\", {\n      \"aria-hidden\": \"true\"\n    }, this.f);\n  }\n\n  function N(a) {\n    u(a.c, \"body\", a.a);\n  }\n\n  function O(a) {\n    return \"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:\" + I(a.c) + \";\" + (\"font-style:\" + H(a) + \";font-weight:\" + (a.f + \"00\") + \";\");\n  }\n\n  ;\n\n  function P(a, b, c, d, e, f) {\n    this.g = a;\n    this.j = b;\n    this.a = d;\n    this.c = c;\n    this.f = e || 3E3;\n    this.h = f || void 0;\n  }\n\n  P.prototype.start = function () {\n    var a = this.c.o.document,\n        b = this,\n        c = q(),\n        d = new Promise(function (d, e) {\n      function f() {\n        q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {\n          1 <= a.length ? d() : setTimeout(f, 25);\n        }, function () {\n          e();\n        });\n      }\n\n      f();\n    }),\n        e = null,\n        f = new Promise(function (a, d) {\n      e = setTimeout(d, b.f);\n    });\n    Promise.race([f, d]).then(function () {\n      e && (clearTimeout(e), e = null);\n      b.g(b.a);\n    }, function () {\n      b.j(b.a);\n    });\n  };\n\n  function Q(a, b, c, d, e, f, g) {\n    this.v = a;\n    this.B = b;\n    this.c = c;\n    this.a = d;\n    this.s = g || \"BESbswy\";\n    this.f = {};\n    this.w = e || 3E3;\n    this.u = f || null;\n    this.m = this.j = this.h = this.g = null;\n    this.g = new M(this.c, this.s);\n    this.h = new M(this.c, this.s);\n    this.j = new M(this.c, this.s);\n    this.m = new M(this.c, this.s);\n    a = new G(this.a.c + \",serif\", J(this.a));\n    a = O(a);\n    this.g.a.style.cssText = a;\n    a = new G(this.a.c + \",sans-serif\", J(this.a));\n    a = O(a);\n    this.h.a.style.cssText = a;\n    a = new G(\"serif\", J(this.a));\n    a = O(a);\n    this.j.a.style.cssText = a;\n    a = new G(\"sans-serif\", J(this.a));\n    a = O(a);\n    this.m.a.style.cssText = a;\n    N(this.g);\n    N(this.h);\n    N(this.j);\n    N(this.m);\n  }\n\n  var R = {\n    D: \"serif\",\n    C: \"sans-serif\"\n  },\n      S = null;\n\n  function T() {\n    if (null === S) {\n      var a = /AppleWebKit\\/([0-9]+)(?:\\.([0-9]+))/.exec(window.navigator.userAgent);\n      S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));\n    }\n\n    return S;\n  }\n\n  Q.prototype.start = function () {\n    this.f.serif = this.j.a.offsetWidth;\n    this.f[\"sans-serif\"] = this.m.a.offsetWidth;\n    this.A = q();\n    U(this);\n  };\n\n  function la(a, b, c) {\n    for (var d in R) {\n      if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;\n    }\n\n    return !1;\n  }\n\n  function U(a) {\n    var b = a.g.a.offsetWidth,\n        c = a.h.a.offsetWidth,\n        d;\n    (d = b === a.f.serif && c === a.f[\"sans-serif\"]) || (d = T() && la(a, b, c));\n    d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);\n  }\n\n  function ma(a) {\n    setTimeout(p(function () {\n      U(this);\n    }, a), 50);\n  }\n\n  function V(a, b) {\n    setTimeout(p(function () {\n      v(this.g.a);\n      v(this.h.a);\n      v(this.j.a);\n      v(this.m.a);\n      b(this.a);\n    }, a), 0);\n  }\n\n  ;\n\n  function W(a, b, c) {\n    this.c = a;\n    this.a = b;\n    this.f = 0;\n    this.m = this.j = !1;\n    this.s = c;\n  }\n\n  var X = null;\n\n  W.prototype.g = function (a) {\n    var b = this.a;\n    b.g && w(b.f, [b.a.c(\"wf\", a.c, J(a).toString(), \"active\")], [b.a.c(\"wf\", a.c, J(a).toString(), \"loading\"), b.a.c(\"wf\", a.c, J(a).toString(), \"inactive\")]);\n    K(b, \"fontactive\", a);\n    this.m = !0;\n    na(this);\n  };\n\n  W.prototype.h = function (a) {\n    var b = this.a;\n\n    if (b.g) {\n      var c = y(b.f, b.a.c(\"wf\", a.c, J(a).toString(), \"active\")),\n          d = [],\n          e = [b.a.c(\"wf\", a.c, J(a).toString(), \"loading\")];\n      c || d.push(b.a.c(\"wf\", a.c, J(a).toString(), \"inactive\"));\n      w(b.f, d, e);\n    }\n\n    K(b, \"fontinactive\", a);\n    na(this);\n  };\n\n  function na(a) {\n    0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c(\"wf\", \"active\")], [a.a.c(\"wf\", \"loading\"), a.a.c(\"wf\", \"inactive\")]), K(a, \"active\")) : L(a.a));\n  }\n\n  ;\n\n  function oa(a) {\n    this.j = a;\n    this.a = new ja();\n    this.h = 0;\n    this.f = this.g = !0;\n  }\n\n  oa.prototype.load = function (a) {\n    this.c = new ca(this.j, a.context || this.j);\n    this.g = !1 !== a.events;\n    this.f = !1 !== a.classes;\n    pa(this, new ha(this.c, a), a);\n  };\n\n  function qa(a, b, c, d, e) {\n    var f = 0 == --a.h;\n    (a.f || a.g) && setTimeout(function () {\n      var a = e || null,\n          m = d || null || {};\n      if (0 === c.length && f) L(b.a);else {\n        b.f += c.length;\n        f && (b.j = f);\n        var h,\n            l = [];\n\n        for (h = 0; h < c.length; h++) {\n          var k = c[h],\n              n = m[k.c],\n              r = b.a,\n              x = k;\n          r.g && w(r.f, [r.a.c(\"wf\", x.c, J(x).toString(), \"loading\")]);\n          K(r, \"fontloading\", x);\n          r = null;\n          if (null === X) if (window.FontFace) {\n            var x = /Gecko.*Firefox\\/(\\d+)/.exec(window.navigator.userAgent),\n                xa = /OS X.*Version\\/10\\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);\n            X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;\n          } else X = !1;\n          X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);\n          l.push(r);\n        }\n\n        for (h = 0; h < l.length; h++) {\n          l[h].start();\n        }\n      }\n    }, 0);\n  }\n\n  function pa(a, b, c) {\n    var d = [],\n        e = c.timeout;\n    ia(b);\n    var d = ka(a.a, c, a.c),\n        f = new W(a.c, b, e);\n    a.h = d.length;\n    b = 0;\n\n    for (c = d.length; b < c; b++) {\n      d[b].load(function (b, d, c) {\n        qa(a, f, b, d, c);\n      });\n    }\n  }\n\n  ;\n\n  function ra(a, b) {\n    this.c = a;\n    this.a = b;\n  }\n\n  ra.prototype.load = function (a) {\n    function b() {\n      if (f[\"__mti_fntLst\" + d]) {\n        var c = f[\"__mti_fntLst\" + d](),\n            e = [],\n            h;\n        if (c) for (var l = 0; l < c.length; l++) {\n          var k = c[l].fontfamily;\n          void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));\n        }\n        a(e);\n      } else setTimeout(function () {\n        b();\n      }, 50);\n    }\n\n    var c = this,\n        d = c.a.projectId,\n        e = c.a.version;\n\n    if (d) {\n      var f = c.c.o;\n      A(this.c, (c.a.api || \"https://fast.fonts.net/jsapi\") + \"/\" + d + \".js\" + (e ? \"?v=\" + e : \"\"), function (e) {\n        e ? a([]) : (f[\"__MonotypeConfiguration__\" + d] = function () {\n          return c.a;\n        }, b());\n      }).id = \"__MonotypeAPIScript__\" + d;\n    } else a([]);\n  };\n\n  function sa(a, b) {\n    this.c = a;\n    this.a = b;\n  }\n\n  sa.prototype.load = function (a) {\n    var b,\n        c,\n        d = this.a.urls || [],\n        e = this.a.families || [],\n        f = this.a.testStrings || {},\n        g = new B();\n    b = 0;\n\n    for (c = d.length; b < c; b++) {\n      z(this.c, d[b], C(g));\n    }\n\n    var m = [];\n    b = 0;\n\n    for (c = e.length; b < c; b++) {\n      if (d = e[b].split(\":\"), d[1]) for (var h = d[1].split(\",\"), l = 0; l < h.length; l += 1) {\n        m.push(new G(d[0], h[l]));\n      } else m.push(new G(d[0]));\n    }\n\n    E(g, function () {\n      a(m, f);\n    });\n  };\n\n  function ta(a, b) {\n    a ? this.c = a : this.c = ua;\n    this.a = [];\n    this.f = [];\n    this.g = b || \"\";\n  }\n\n  var ua = \"https://fonts.googleapis.com/css\";\n\n  function va(a, b) {\n    for (var c = b.length, d = 0; d < c; d++) {\n      var e = b[d].split(\":\");\n      3 == e.length && a.f.push(e.pop());\n      var f = \"\";\n      2 == e.length && \"\" != e[1] && (f = \":\");\n      a.a.push(e.join(f));\n    }\n  }\n\n  function wa(a) {\n    if (0 == a.a.length) throw Error(\"No fonts to load!\");\n    if (-1 != a.c.indexOf(\"kit=\")) return a.c;\n\n    for (var b = a.a.length, c = [], d = 0; d < b; d++) {\n      c.push(a.a[d].replace(/ /g, \"+\"));\n    }\n\n    b = a.c + \"?family=\" + c.join(\"%7C\");\n    0 < a.f.length && (b += \"&subset=\" + a.f.join(\",\"));\n    0 < a.g.length && (b += \"&text=\" + encodeURIComponent(a.g));\n    return b;\n  }\n\n  ;\n\n  function ya(a) {\n    this.f = a;\n    this.a = [];\n    this.c = {};\n  }\n\n  var za = {\n    latin: \"BESbswy\",\n    \"latin-ext\": \"\\xE7\\xF6\\xFC\\u011F\\u015F\",\n    cyrillic: \"\\u0439\\u044F\\u0416\",\n    greek: \"\\u03B1\\u03B2\\u03A3\",\n    khmer: \"\\u1780\\u1781\\u1782\",\n    Hanuman: \"\\u1780\\u1781\\u1782\"\n  },\n      Aa = {\n    thin: \"1\",\n    extralight: \"2\",\n    \"extra-light\": \"2\",\n    ultralight: \"2\",\n    \"ultra-light\": \"2\",\n    light: \"3\",\n    regular: \"4\",\n    book: \"4\",\n    medium: \"5\",\n    \"semi-bold\": \"6\",\n    semibold: \"6\",\n    \"demi-bold\": \"6\",\n    demibold: \"6\",\n    bold: \"7\",\n    \"extra-bold\": \"8\",\n    extrabold: \"8\",\n    \"ultra-bold\": \"8\",\n    ultrabold: \"8\",\n    black: \"9\",\n    heavy: \"9\",\n    l: \"3\",\n    r: \"4\",\n    b: \"7\"\n  },\n      Ba = {\n    i: \"i\",\n    italic: \"i\",\n    n: \"n\",\n    normal: \"n\"\n  },\n      Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;\n\n  function Da(a) {\n    for (var b = a.f.length, c = 0; c < b; c++) {\n      var d = a.f[c].split(\":\"),\n          e = d[0].replace(/\\+/g, \" \"),\n          f = [\"n4\"];\n\n      if (2 <= d.length) {\n        var g;\n        var m = d[1];\n        g = [];\n        if (m) for (var m = m.split(\",\"), h = m.length, l = 0; l < h; l++) {\n          var k;\n          k = m[l];\n\n          if (k.match(/^[\\w-]+$/)) {\n            var n = Ca.exec(k.toLowerCase());\n            if (null == n) k = \"\";else {\n              k = n[2];\n              k = null == k || \"\" == k ? \"n\" : Ba[k];\n              n = n[1];\n              if (null == n || \"\" == n) n = \"4\";else var r = Aa[n],\n                  n = r ? r : isNaN(n) ? \"4\" : n.substr(0, 1);\n              k = [k, n].join(\"\");\n            }\n          } else k = \"\";\n\n          k && g.push(k);\n        }\n        0 < g.length && (f = g);\n        3 == d.length && (d = d[2], g = [], d = d ? d.split(\",\") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));\n      }\n\n      a.c[e] || (d = za[e]) && (a.c[e] = d);\n\n      for (d = 0; d < f.length; d += 1) {\n        a.a.push(new G(e, f[d]));\n      }\n    }\n  }\n\n  ;\n\n  function Ea(a, b) {\n    this.c = a;\n    this.a = b;\n  }\n\n  var Fa = {\n    Arimo: !0,\n    Cousine: !0,\n    Tinos: !0\n  };\n\n  Ea.prototype.load = function (a) {\n    var b = new B(),\n        c = this.c,\n        d = new ta(this.a.api, this.a.text),\n        e = this.a.families;\n    va(d, e);\n    var f = new ya(e);\n    Da(f);\n    z(c, wa(d), C(b));\n    E(b, function () {\n      a(f.a, f.c, Fa);\n    });\n  };\n\n  function Ga(a, b) {\n    this.c = a;\n    this.a = b;\n  }\n\n  Ga.prototype.load = function (a) {\n    var b = this.a.id,\n        c = this.c.o;\n    b ? A(this.c, (this.a.api || \"https://use.typekit.net\") + \"/\" + b + \".js\", function (b) {\n      if (b) a([]);else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {\n        b = c.Typekit.config.fn;\n\n        for (var e = [], f = 0; f < b.length; f += 2) {\n          for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) {\n            e.push(new G(g, m[h]));\n          }\n        }\n\n        try {\n          c.Typekit.load({\n            events: !1,\n            classes: !1,\n            async: !0\n          });\n        } catch (l) {}\n\n        a(e);\n      }\n    }, 2E3) : a([]);\n  };\n\n  function Ha(a, b) {\n    this.c = a;\n    this.f = b;\n    this.a = [];\n  }\n\n  Ha.prototype.load = function (a) {\n    var b = this.f.id,\n        c = this.c.o,\n        d = this;\n    b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {\n      for (var g = 0, m = c.fonts.length; g < m; ++g) {\n        var h = c.fonts[g];\n        d.a.push(new G(h.name, ga(\"font-weight:\" + h.weight + \";font-style:\" + h.style)));\n      }\n\n      a(d.a);\n    }, A(this.c, (this.f.api || \"https://f.fontdeck.com/s/css/js/\") + ea(this.c) + \"/\" + b + \".js\", function (b) {\n      b && a([]);\n    })) : a([]);\n  };\n\n  var Y = new oa(window);\n\n  Y.a.c.custom = function (a, b) {\n    return new sa(b, a);\n  };\n\n  Y.a.c.fontdeck = function (a, b) {\n    return new Ha(b, a);\n  };\n\n  Y.a.c.monotype = function (a, b) {\n    return new ra(b, a);\n  };\n\n  Y.a.c.typekit = function (a, b) {\n    return new Ga(b, a);\n  };\n\n  Y.a.c.google = function (a, b) {\n    return new Ea(b, a);\n  };\n\n  var Z = {\n    load: p(Y.load, Y)\n  };\n   true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n    return Z;\n  }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;\n})();\n\n//# sourceURL=webpack:///./src/js/lib/webfontloader.js?");

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./src/js/lib/sound.js ./src/js/lib/webfontloader.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/lib/sound.js */\"./src/js/lib/sound.js\");\nmodule.exports = __webpack_require__(/*! ./src/js/lib/webfontloader.js */\"./src/js/lib/webfontloader.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/lib/sound.js_./src/js/lib/webfontloader.js?");

/***/ })

/******/ });