self.webpackChunk([4],{17:function(e,n,r){"use strict";r.r(n),n.default='/*! *****************************************************************************\nCopyright (c) Microsoft Corporation. All rights reserved.\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use\nthis file except in compliance with the License. You may obtain a copy of the\nLicense at http://www.apache.org/licenses/LICENSE-2.0\n\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\nMERCHANTABLITY OR NON-INFRINGEMENT.\n\nSee the Apache Version 2.0 License for specific language governing permissions\nand limitations under the License.\n***************************************************************************** */\n\n\n\n/// <reference no-default-lib="true"/>\r\n\n\ninterface Map<K, V> {\r\n    clear(): void;\r\n    delete(key: K): boolean;\r\n    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;\r\n    get(key: K): V | undefined;\r\n    has(key: K): boolean;\r\n    set(key: K, value: V): this;\r\n    readonly size: number;\r\n}\r\n\r\ninterface MapConstructor {\r\n    new(): Map<any, any>;\r\n    new<K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;\r\n    readonly prototype: Map<any, any>;\r\n}\r\ndeclare var Map: MapConstructor;\r\n\r\ninterface ReadonlyMap<K, V> {\r\n    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;\r\n    get(key: K): V | undefined;\r\n    has(key: K): boolean;\r\n    readonly size: number;\r\n}\r\n\r\ninterface WeakMap<K extends object, V> {\r\n    delete(key: K): boolean;\r\n    get(key: K): V | undefined;\r\n    has(key: K): boolean;\r\n    set(key: K, value: V): this;\r\n}\r\n\r\ninterface WeakMapConstructor {\r\n    new <K extends object = object, V = any>(entries?: readonly [K, V][] | null): WeakMap<K, V>;\r\n    readonly prototype: WeakMap<object, any>;\r\n}\r\ndeclare var WeakMap: WeakMapConstructor;\r\n\r\ninterface Set<T> {\r\n    add(value: T): this;\r\n    clear(): void;\r\n    delete(value: T): boolean;\r\n    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;\r\n    has(value: T): boolean;\r\n    readonly size: number;\r\n}\r\n\r\ninterface SetConstructor {\r\n    new <T = any>(values?: readonly T[] | null): Set<T>;\r\n    readonly prototype: Set<any>;\r\n}\r\ndeclare var Set: SetConstructor;\r\n\r\ninterface ReadonlySet<T> {\r\n    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;\r\n    has(value: T): boolean;\r\n    readonly size: number;\r\n}\r\n\r\ninterface WeakSet<T extends object> {\r\n    add(value: T): this;\r\n    delete(value: T): boolean;\r\n    has(value: T): boolean;\r\n}\r\n\r\ninterface WeakSetConstructor {\r\n    new <T extends object = object>(values?: readonly T[] | null): WeakSet<T>;\r\n    readonly prototype: WeakSet<object>;\r\n}\r\ndeclare var WeakSet: WeakSetConstructor;\r\n'}});