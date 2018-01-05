/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
$(function() {
    var table = $("<table />").addClass("table table-striped table-hover");
    var tr = $("<tr />");
    tr.append($("<th />"));
    var thead = $("<thead />"),tr;
  $.each(bedsPayload.table_headers,function(_,text) {
        tr.append("<th> "+text+" </th>");
        tr.appendTo(thead);
  });

    var tbody = $("<tbody />"),tr;
  $.each(bedsPayload.beds,function(_,obj) {
        tr = $("<tr />");
        tr.append("<td></td>");
        tr.append("<td> "+obj.name+" </td>");
        tr.append("<td> "+obj.top_or_bottom+" </td>");
        tr.append("<td> "+obj.occupied+" </td>");
        tr.appendTo(tbody);
      
  });
    thead.appendTo(table);    
    tbody.appendTo(table);
    table.appendTo("#table_beds_payload");    
});

var bedsPayload = {
  "beds": [

    {
      "name": "John Booker",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "betty careface",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "Dan booler",
      "top_or_bottom": "top",
      "occupied": true
    },
    {
      "name": "Chuck Norris",
      "top_or_bottom": "bottom",
      "occupied": false
    },
    {
      "name": "Frank bool",
      "top_or_bottom": "top",
      "occupied": true
    }
  ],
 
  "table_headers": [
    "name",
    "top or bottom",
    "occupied"  
            
  ]
}; 
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
//function submitResidentsForm() {
    //var url = "http://localhost:3004/api/v1/residents";
    //var data = {
        //resident: {
              //first_name: document.forms.residents.first_name.value,
              //last_name: document.forms.residents.last_name.value,
              //date: document.forms.residents.date.value,
              //hmis_number: document.forms.residents.hmis_number.value,
              //hmis_entry_date: document.forms.residents.hmis_entry_date.value,
              //documented: document.forms.residents.documented.value,
              //gender: document.forms.residents.gender.value,
              //ethnicity: document.forms.residents.ethnicity.value,
              //bed_id: document.forms.residents.bed_id.value,
              //resident_race: document.forms.residents.resident_race.value,
              //cause_of_homeslessness: document.forms.residents.cause_of_homelessness.value,
              //length_of_homelessness: document.forms.residents.length_of_homelessness.value,
              //prior_living_situation: document.forms.residents.prior_living_situation.value,
              //number_of_shelters: document.forms.residents.number_of_shelters.value,
              //chronically_homeless: document.forms.residents.chronically_homeless.value
        //}
    //};

    //var myHeaders = new Headers();

    //myHeaders.append('Content-Type', 'application/json');

    //fetch(url, {
        //method: 'POST',
        //headers: myHeaders,
        //mode: 'cors',
        //cache: 'default',
        //body: JSON.stringify(data)
    //});
//}


//var url = "http://localhost:3004/api/v1/residents/1";
//fetch(url)
//.then((resp) => resp.json())
//.then(function(data) {
  //debugger;
//});

//function getResident(residentId) {
  //var url = "http://localhost:3004/api/v1/residents/" + residentId;
  ////var url = "http://localhost:3004/api/v1/residents/5";
    //var myHeaders = new Headers();

    //myHeaders.append('Content-Type', 'application/json');
//console.log(url)
    //fetch(url, {
        //method: 'GET',
        //headers: myHeaders,
        //mode: 'cors',
        //cache: 'default'
    //})
    //.then((resp) => resp.json())
    //.then(function(data) {
        //debugger
        //console.log('this shit worked')
    //});
//}

//function getAllResidents () {
  //var url = "http://localhost:3000/api/v1/residents";
  //fetch(url)
    //.then((resp) => resp.json())
    //.then(function(data) {
      //$(function() {
        //var table = $("<div />").addClass("table2");
        //var tr = $("<div />").addClass("table-row");
        //tr.append($("<span />")).addClass("table-head");
        //var thead = $("<span />").addClass("table-head");
        //$.each(data.table_headers,function(_,text) {
          //tr.append("<span class='table-head'> "+text+" </span>");
          //tr.appendTo(thead);
        //});

        //var tbody = $("<div />").addClass("tbody");
        //var t = 1;
        //$.each(data.residents,function(_,obj) {
          //tr = $(`<a onclick=getResident(${obj.id}) href="residents/${obj.id}"></a>`).addClass("table-row");
          //obj.id = t;
          //t += 1;
          //tr.append("<div class='table-cell'> "+obj.id+" </div>");
          //tr.append("<div class='table-cell'> "+obj.first_name+" </div>");
          //tr.append("<div class='table-cell'> "+obj.gender+" </div>");
          //var date = new Date(obj.date);
          //var rando = Math.floor((Math.random() * 3) + 1);
          //var tenure = (date.getMonth()+1+rando)-(date.getMonth()+1);
          //tr.append("<div class='table-cell'> "+(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          //tr.append("<div class='table-cell'> "+(date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() +" </div>");
          //tr.append("<div class='table-cell'> "+(tenure+ " month(s)")+" </div>");
          //tr.append("<div class='table-cell'> "+obj.documented+" </div>");
          //tr.append("<div class='table-cell'> "+obj.bed_id+" </div>");
          //tr.appendTo(tbody);

        //});
        //thead.appendTo(table);
        //tbody.appendTo(table);
        //table.appendTo("#table1");
      //});
    //});
//}
//getAllResidents();



//fetch(url)
//.then((resp) => resp.json())
//.then(function(data) {
    //$(function() {
      //var table = $("<table />").addClass("table table-striped table-hover");
      //var tr = $("<tr />");
      //tr.append($("<th />"));
      //var thead = $("<thead />"),tr;
      //$.each(data.table_headers,function(_,text) {
        //tr.append("<th> "+text+" </th>");
        //tr.appendTo(thead);
      //});

      //var tbody = $("<tbody />"),atag, tr;
      //var t = 1;
      //$.each(data.residents,function(_,obj) {
        //tr = $('<tr></tr>');
        //obj.id = t;
        //t += 1;
        //tr.append("<td> "+obj.id+" </td>");
        //tr.append("<td> "+obj.first_name+" </td>");
        //tr.append("<td> "+obj.gender+" </td>");
        //var date = new Date(obj.date);
        //var rando = Math.floor((Math.random() * 3) + 1);
        //var tenure = (date.getMonth()+1+rando)-(date.getMonth()+1)
        //tr.append("<td> "+(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() +" </td>");
        //tr.append("<td> "+(date.getMonth()+1+rando) + "/" + date.getDate() + "/" + date.getFullYear() +" </td>");
        //tr.append("<td> "+(tenure+ " month(s)")+" </td>");
        //tr.append("<td> "+obj.documented+" </td>");
        //tr.append("<td> "+obj.bed_id+" </td>");
        //tr.appendTo(tbody);

      //});
      //thead.appendTo(table);    
      //tbody.appendTo(table);
      //table.appendTo("#table1");    
    //});
//});


//function getResident(residentId) {
  //var url = "http://localhost:3000/api/v1/residents/" + residentId;
  ////var url = "http://localhost:3004/api/v1/residents/5";
    //var myHeaders = new Headers();

  //debugger
    //myHeaders.append('Content-Type', 'application/json');
//console.log('DID THIS SHIT WORK')
//console.log(url)
    //fetch(url, {
        //method: 'GET',
        //headers: {'Content-Type', 'application/json'},
        //mode: 'cors',
        //cache: 'default'
    //})
    //.then((resp) => resp.json())
    //.then(function(data) {
        //debugger
        //console.log('this shit worked')
    //});
//}

;
(function() {


}).call(this);
(function() {


}).call(this);
$(function() {
    var table = $("<table />").addClass("table table-striped table-hover");
    var tr = $("<tr />");
    tr.append($("<th />"));
    var thead = $("<thead />"),tr;
  $.each(userPayload.table_headers,function(_,text) {
        tr.append("<th> "+text+" </th>");
        tr.appendTo(thead);
  });

    var tbody = $("<tbody />"),tr;
  $.each(userPayload.users,function(_,obj) {
        tr = $("<tr />");
        tr.append("<td></td>");
        tr.append("<td> "+obj.email+" </td>");
        tr.append("<td> "+obj.role+" </td>");
        tr.appendTo(tbody);
      
  });
    thead.appendTo(table);    
    tbody.appendTo(table);
    table.appendTo("#users_table");    
});

var userPayload = {
    "users": [
        {
            "id": 1,
            "email": "a@mail.com",
            "password_digest": "$2a$10$/5WNuSCMU/TM20YZgk8N2OQC.IdgTVO6v9JUkHqhh0AaDZv4dDti.",
            "role": "admin",
            "created_at": "2017-10-26T23:50:43.620Z",
            "updated_at": "2017-10-26T23:50:43.620Z"
        },
        {
            "id": 2,
            "email": "cm@mail.com",
            "password_digest": "$2a$10$CBsn3DaNKzI3WHeNXQo9a.U8UvYpXXFYR0A5MAjJMtpGPW0kxF/Yi",
            "role": "case manager",
            "created_at": "2017-10-26T23:50:43.717Z",
            "updated_at": "2017-10-26T23:50:43.717Z"
        },
        {
            "id": 3,
            "email": "ra@mail.com",
            "password_digest": "$2a$10$kCiGKAemVhJoQdfE3HPJMeXwM4GeWE9EAbcqmhf1G9zoPNKafFlT.",
            "role": "residential aide",
            "created_at": "2017-10-26T23:50:43.791Z",
            "updated_at": "2017-10-26T23:50:43.791Z"
        },
        {
            "id": 4,
            "email": "s@mail.com",
            "password_digest": "$2a$10$qmBjrUHSlp21vDnjPzgdz.vkmjIC56jhYAJ3ZJDA8ltqQttoueY2e",
            "role": "security",
            "created_at": "2017-10-26T23:50:43.874Z",
            "updated_at": "2017-10-26T23:50:43.874Z"
        }
    ],
    "table_headers": [
        "email",
        "role"
    ]
}
;
/*!
 * Vue.js v2.4.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
////(function (global, factory) {
  //typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  //typeof define === 'function' && define.amd ? define(factory) :
  //(global.Vue = factory());
//}(this, (function () { 'use strict';

//[>  <]

//// these helpers produces better vm code in JS engines due to their
//// explicitness and function inlining
//function isUndef (v) {
  //return v === undefined || v === null
//}

//function isDef (v) {
  //return v !== undefined && v !== null
//}

//function isTrue (v) {
  //return v === true
//}

//function isFalse (v) {
  //return v === false
//}

/**
 * Check if value is primitive
 */
//function isPrimitive (value) {
  //return (
    //typeof value === 'string' ||
    //typeof value === 'number' ||
    //typeof value === 'boolean'
  //)
//}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
//function isObject (obj) {
  //return obj !== null && typeof obj === 'object'
//}

//var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
//function isPlainObject (obj) {
  //return _toString.call(obj) === '[object Object]'
//}

//function isRegExp (v) {
  //return _toString.call(v) === '[object RegExp]'
//}

/**
 * Check if val is a valid array index.
 */
//function isValidArrayIndex (val) {
  //var n = parseFloat(val);
  //return n >= 0 && Math.floor(n) === n && isFinite(val)
//}

/**
 * Convert a value to a string that is actually rendered.
 */
//function toString (val) {
  //return val == null
    //? ''
    //: typeof val === 'object'
      //? JSON.stringify(val, null, 2)
      //: String(val)
//}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
//function toNumber (val) {
  //var n = parseFloat(val);
  //return isNaN(n) ? val : n
//}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
//function makeMap (
  //str,
  //expectsLowerCase
//) {
  //var map = Object.create(null);
  //var list = str.split(',');
  //for (var i = 0; i < list.length; i++) {
    //map[list[i]] = true;
  //}
  //return expectsLowerCase
    //? function (val) { return map[val.toLowerCase()]; }
    //: function (val) { return map[val]; }
//}

/**
 * Check if a tag is a built-in tag.
 */
//var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
//var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
//function remove (arr, item) {
  //if (arr.length) {
    //var index = arr.indexOf(item);
    //if (index > -1) {
      //return arr.splice(index, 1)
    //}
  //}
//}

/**
 * Check whether the object has the property.
 */
//var hasOwnProperty = Object.prototype.hasOwnProperty;
//function hasOwn (obj, key) {
  //return hasOwnProperty.call(obj, key)
//}

/**
 * Create a cached version of a pure function.
 */
//function cached (fn) {
  //var cache = Object.create(null);
  //return (function cachedFn (str) {
    //var hit = cache[str];
    //return hit || (cache[str] = fn(str))
  //})
//}

/**
 * Camelize a hyphen-delimited string.
 */
//var camelizeRE = /-(\w)/g;
//var camelize = cached(function (str) {
  //return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
//});

/**
 * Capitalize a string.
 */
//var capitalize = cached(function (str) {
  //return str.charAt(0).toUpperCase() + str.slice(1)
//});

/**
 * Hyphenate a camelCase string.
 */
//var hyphenateRE = /([^-])([A-Z])/g;
//var hyphenate = cached(function (str) {
  //return str
    //.replace(hyphenateRE, '$1-$2')
    //.replace(hyphenateRE, '$1-$2')
    //.toLowerCase()
//});

/**
 * Simple bind, faster than native
 */
//function bind (fn, ctx) {
  //function boundFn (a) {
    //var l = arguments.length;
    //return l
      //? l > 1
        //? fn.apply(ctx, arguments)
        //: fn.call(ctx, a)
      //: fn.call(ctx)
  //}
  //// record original fn length
  //boundFn._length = fn.length;
  //return boundFn
//}

/**
 * Convert an Array-like object to a real Array.
 */
//function toArray (list, start) {
  //start = start || 0;
  //var i = list.length - start;
  //var ret = new Array(i);
  //while (i--) {
    //ret[i] = list[i + start];
  //}
  //return ret
//}

/**
 * Mix properties into target object.
 */
//function extend (to, _from) {
  //for (var key in _from) {
    //to[key] = _from[key];
  //}
  //return to
//}

/**
 * Merge an Array of Objects into a single Object.
 */
//function toObject (arr) {
  //var res = {};
  //for (var i = 0; i < arr.length; i++) {
    //if (arr[i]) {
      //extend(res, arr[i]);
    //}
  //}
  //return res
//}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
//function noop (a, b, c) {}

/**
 * Always return false.
 */
//var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
//var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
//function genStaticKeys (modules) {
  //return modules.reduce(function (keys, m) {
    //return keys.concat(m.staticKeys || [])
  //}, []).join(',')
//}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
//function looseEqual (a, b) {
  //if (a === b) { return true }
  //var isObjectA = isObject(a);
  //var isObjectB = isObject(b);
  //if (isObjectA && isObjectB) {
    //try {
      //var isArrayA = Array.isArray(a);
      //var isArrayB = Array.isArray(b);
      //if (isArrayA && isArrayB) {
        //return a.length === b.length && a.every(function (e, i) {
          //return looseEqual(e, b[i])
        //})
      //} else if (!isArrayA && !isArrayB) {
        //var keysA = Object.keys(a);
        //var keysB = Object.keys(b);
        //return keysA.length === keysB.length && keysA.every(function (key) {
          //return looseEqual(a[key], b[key])
        //})
      //} else {
        //[> istanbul ignore next <]
        //return false
      //}
    //} catch (e) {
      //[> istanbul ignore next <]
      //return false
    //}
  //} else if (!isObjectA && !isObjectB) {
    //return String(a) === String(b)
  //} else {
    //return false
  //}
//}

//function looseIndexOf (arr, val) {
  //for (var i = 0; i < arr.length; i++) {
    //if (looseEqual(arr[i], val)) { return i }
  //}
  //return -1
//}

/**
 * Ensure a function is called only once.
 */
//function once (fn) {
  //var called = false;
  //return function () {
    //if (!called) {
      //called = true;
      //fn.apply(this, arguments);
    //}
  //}
//}

//var SSR_ATTR = 'data-server-rendered';

//var ASSET_TYPES = [
  //'component',
  //'directive',
  //'filter'
//];

//var LIFECYCLE_HOOKS = [
  //'beforeCreate',
  //'created',
  //'beforeMount',
  //'mounted',
  //'beforeUpdate',
  //'updated',
  //'beforeDestroy',
  //'destroyed',
  //'activated',
  //'deactivated'
//];

//[>  <]

//var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  //optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  //silent: false,

  /**
   * Show production mode tip message on boot?
   */
  //productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  //devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  //performance: false,

  /**
   * Error handler for watcher errors
   */
  //errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  //warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  //ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  //keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  //isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  //isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  //isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  //getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  //parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  //mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  //_lifecycleHooks: LIFECYCLE_HOOKS
//});

//[>  <]

//var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
//function isReserved (str) {
  //var c = (str + '').charCodeAt(0);
  //return c === 0x24 || c === 0x5F
//}

/**
 * Define a property.
 */
//function def (obj, key, val, enumerable) {
  //Object.defineProperty(obj, key, {
    //value: val,
    //enumerable: !!enumerable,
    //writable: true,
    //configurable: true
  //});
//}

/**
 * Parse simple path.
 */
//var bailRE = /[^\w.$]/;
//function parsePath (path) {
  //if (bailRE.test(path)) {
    //return
  //}
  //var segments = path.split('.');
  //return function (obj) {
    //for (var i = 0; i < segments.length; i++) {
      //if (!obj) { return }
      //obj = obj[segments[i]];
    //}
    //return obj
  //}
//}

//[>  <]

//var warn = noop;
//var tip = noop;
//var formatComponentName = (null); // work around flow check

//{
  //var hasConsole = typeof console !== 'undefined';
  //var classifyRE = /(?:^|[-_])(\w)/g;
  //var classify = function (str) { return str
    //.replace(classifyRE, function (c) { return c.toUpperCase(); })
    //.replace(/[-_]/g, ''); };

  //warn = function (msg, vm) {
    //var trace = vm ? generateComponentTrace(vm) : '';

    //if (config.warnHandler) {
      //config.warnHandler.call(null, msg, vm, trace);
    //} else if (hasConsole && (!config.silent)) {
      //console.error(("[Vue warn]: " + msg + trace));
    //}
  //};

  //tip = function (msg, vm) {
    //if (hasConsole && (!config.silent)) {
      //console.warn("[Vue tip]: " + msg + (
        //vm ? generateComponentTrace(vm) : ''
      //));
    //}
  //};

  //formatComponentName = function (vm, includeFile) {
    //if (vm.$root === vm) {
      //return '<Root>'
    //}
    //var name = typeof vm === 'string'
      //? vm
      //: typeof vm === 'function' && vm.options
        //? vm.options.name
        //: vm._isVue
          //? vm.$options.name || vm.$options._componentTag
          //: vm.name;

    //var file = vm._isVue && vm.$options.__file;
    //if (!name && file) {
      //var match = file.match(/([^/\\]+)\.vue$/);
      //name = match && match[1];
    //}

    //return (
      //(name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      //(file && includeFile !== false ? (" at " + file) : '')
    //)
  //};

  //var repeat = function (str, n) {
    //var res = '';
    //while (n) {
      //if (n % 2 === 1) { res += str; }
      //if (n > 1) { str += str; }
      //n >>= 1;
    //}
    //return res
  //};

  //var generateComponentTrace = function (vm) {
    //if (vm._isVue && vm.$parent) {
      //var tree = [];
      //var currentRecursiveSequence = 0;
      //while (vm) {
        //if (tree.length > 0) {
          //var last = tree[tree.length - 1];
          //if (last.constructor === vm.constructor) {
            //currentRecursiveSequence++;
            //vm = vm.$parent;
            //continue
          //} else if (currentRecursiveSequence > 0) {
            //tree[tree.length - 1] = [last, currentRecursiveSequence];
            //currentRecursiveSequence = 0;
          //}
        //}
        //tree.push(vm);
        //vm = vm.$parent;
      //}
      //return '\n\nfound in\n\n' + tree
        //.map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            //? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            //: formatComponentName(vm))); })
        //.join('\n')
    //} else {
      //return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    //}
  //};
//}

//[>  <]

//function handleError (err, vm, info) {
  //if (config.errorHandler) {
    //config.errorHandler.call(null, err, vm, info);
  //} else {
    //{
      //warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    //}
    //[> istanbul ignore else <]
    //if (inBrowser && typeof console !== 'undefined') {
      //console.error(err);
    //} else {
      //throw err
    //}
  //}
//}

//[>  <]
//[> globals MutationObserver <]

//// can we use __proto__?
//var hasProto = '__proto__' in {};

//// Browser environment sniffing
//var inBrowser = typeof window !== 'undefined';
//var UA = inBrowser && window.navigator.userAgent.toLowerCase();
//var isIE = UA && /msie|trident/.test(UA);
//var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
//var isEdge = UA && UA.indexOf('edge/') > 0;
//var isAndroid = UA && UA.indexOf('android') > 0;
//var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
//var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

//// Firefix has a "watch" function on Object.prototype...
//var nativeWatch = ({}).watch;

//var supportsPassive = false;
//if (inBrowser) {
  //try {
    //var opts = {};
    //Object.defineProperty(opts, 'passive', ({
      //get: function get () {
        //[> istanbul ignore next <]
        //supportsPassive = true;
      //}
    //})); // https://github.com/facebook/flow/issues/285
    //window.addEventListener('test-passive', null, opts);
  //} catch (e) {}
//}

//// this needs to be lazy-evaled because vue may be required before
//// vue-server-renderer can set VUE_ENV
//var _isServer;
//var isServerRendering = function () {
  //if (_isServer === undefined) {
    //[> istanbul ignore if <]
    //if (!inBrowser && typeof global !== 'undefined') {
      //// detect presence of vue-server-renderer and avoid
      //// Webpack shimming the process
      //_isServer = global['process'].env.VUE_ENV === 'server';
    //} else {
      //_isServer = false;
    //}
  //}
  //return _isServer
//};

//// detect devtools
//var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

//[> istanbul ignore next <]
//function isNative (Ctor) {
  //return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
//}

//var hasSymbol =
  //typeof Symbol !== 'undefined' && isNative(Symbol) &&
  //typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
//var nextTick = (function () {
  //var callbacks = [];
  //var pending = false;
  //var timerFunc;

  //function nextTickHandler () {
    //pending = false;
    //var copies = callbacks.slice(0);
    //callbacks.length = 0;
    //for (var i = 0; i < copies.length; i++) {
      //copies[i]();
    //}
  //}

  //// the nextTick behavior leverages the microtask queue, which can be accessed
  //// via either native Promise.then or MutationObserver.
  //// MutationObserver has wider support, however it is seriously bugged in
  //// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  //// completely stops working after triggering a few times... so, if native
  //// Promise is available, we will use it:
  //[> istanbul ignore if <]
  //if (typeof Promise !== 'undefined' && isNative(Promise)) {
    //var p = Promise.resolve();
    //var logError = function (err) { console.error(err); };
    //timerFunc = function () {
      //p.then(nextTickHandler).catch(logError);
      //// in problematic UIWebViews, Promise.then doesn't completely break, but
      //// it can get stuck in a weird state where callbacks are pushed into the
      //// microtask queue but the queue isn't being flushed, until the browser
      //// needs to do some other work, e.g. handle a timer. Therefore we can
      //// "force" the microtask queue to be flushed by adding an empty timer.
      //if (isIOS) { setTimeout(noop); }
    //};
  //} else if (typeof MutationObserver !== 'undefined' && (
    //isNative(MutationObserver) ||
    //// PhantomJS and iOS 7.x
    //MutationObserver.toString() === '[object MutationObserverConstructor]'
  //)) {
    //// use MutationObserver where native Promise is not available,
    //// e.g. PhantomJS IE11, iOS7, Android 4.4
    //var counter = 1;
    //var observer = new MutationObserver(nextTickHandler);
    //var textNode = document.createTextNode(String(counter));
    //observer.observe(textNode, {
      //characterData: true
    //});
    //timerFunc = function () {
      //counter = (counter + 1) % 2;
      //textNode.data = String(counter);
    //};
  //} else {
    //// fallback to setTimeout
    //[> istanbul ignore next <]
    //timerFunc = function () {
      //setTimeout(nextTickHandler, 0);
    //};
  //}

  //return function queueNextTick (cb, ctx) {
    //var _resolve;
    //callbacks.push(function () {
      //if (cb) {
        //try {
          //cb.call(ctx);
        //} catch (e) {
          //handleError(e, ctx, 'nextTick');
        //}
      //} else if (_resolve) {
        //_resolve(ctx);
      //}
    //});
    //if (!pending) {
      //pending = true;
      //timerFunc();
    //}
    //if (!cb && typeof Promise !== 'undefined') {
      //return new Promise(function (resolve, reject) {
        //_resolve = resolve;
      //})
    //}
  //}
//})();

//var _Set;
//[> istanbul ignore if <]
//if (typeof Set !== 'undefined' && isNative(Set)) {
  //// use native Set when available.
  //_Set = Set;
//} else {
  //// a non-standard Set polyfill that only works with primitive keys.
  //_Set = (function () {
    //function Set () {
      //this.set = Object.create(null);
    //}
    //Set.prototype.has = function has (key) {
      //return this.set[key] === true
    //};
    //Set.prototype.add = function add (key) {
      //this.set[key] = true;
    //};
    //Set.prototype.clear = function clear () {
      //this.set = Object.create(null);
    //};

    //return Set;
  //}());
//}

//[>  <]


//var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
//var Dep = function Dep () {
  //this.id = uid++;
  //this.subs = [];
//};

//Dep.prototype.addSub = function addSub (sub) {
  //this.subs.push(sub);
//};

//Dep.prototype.removeSub = function removeSub (sub) {
  //remove(this.subs, sub);
//};

//Dep.prototype.depend = function depend () {
  //if (Dep.target) {
    //Dep.target.addDep(this);
  //}
//};

//Dep.prototype.notify = function notify () {
  //// stabilize the subscriber list first
  //var subs = this.subs.slice();
  //for (var i = 0, l = subs.length; i < l; i++) {
    //subs[i].update();
  //}
//};

//// the current target watcher being evaluated.
//// this is globally unique because there could be only one
//// watcher being evaluated at any time.
//Dep.target = null;
//var targetStack = [];

//function pushTarget (_target) {
  //if (Dep.target) { targetStack.push(Dep.target); }
  //Dep.target = _target;
//}

//function popTarget () {
  //Dep.target = targetStack.pop();
//}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

//var arrayProto = Array.prototype;
//var arrayMethods = Object.create(arrayProto);[
  //'push',
  //'pop',
  //'shift',
  //'unshift',
  //'splice',
  //'sort',
  //'reverse'
//]
//.forEach(function (method) {
  //// cache original method
  //var original = arrayProto[method];
  //def(arrayMethods, method, function mutator () {
    //var args = [], len = arguments.length;
    //while ( len-- ) args[ len ] = arguments[ len ];

    //var result = original.apply(this, args);
    //var ob = this.__ob__;
    //var inserted;
    //switch (method) {
      //case 'push':
      //case 'unshift':
        //inserted = args;
        //break
      //case 'splice':
        //inserted = args.slice(2);
        //break
    //}
    //if (inserted) { ob.observeArray(inserted); }
    //// notify change
    //ob.dep.notify();
    //return result
  //});
//});

//[>  <]

//var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
//var observerState = {
  //shouldConvert: true
//};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
//var Observer = function Observer (value) {
  //this.value = value;
  //this.dep = new Dep();
  //this.vmCount = 0;
  //def(value, '__ob__', this);
  //if (Array.isArray(value)) {
    //var augment = hasProto
      //? protoAugment
      //: copyAugment;
    //augment(value, arrayMethods, arrayKeys);
    //this.observeArray(value);
  //} else {
    //this.walk(value);
  //}
//};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
//Observer.prototype.walk = function walk (obj) {
  //var keys = Object.keys(obj);
  //for (var i = 0; i < keys.length; i++) {
    //defineReactive$$1(obj, keys[i], obj[keys[i]]);
  //}
//};

/**
 * Observe a list of Array items.
 */
//Observer.prototype.observeArray = function observeArray (items) {
  //for (var i = 0, l = items.length; i < l; i++) {
    //observe(items[i]);
  //}
//};

//// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
//function protoAugment (target, src, keys) {
  //[> eslint-disable no-proto <]
  //target.__proto__ = src;
  //[> eslint-enable no-proto <]
//}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
//[> istanbul ignore next <]
//function copyAugment (target, src, keys) {
  //for (var i = 0, l = keys.length; i < l; i++) {
    //var key = keys[i];
    //def(target, key, src[key]);
  //}
//}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
//function observe (value, asRootData) {
  //if (!isObject(value)) {
    //return
  //}
  //var ob;
  //if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    //ob = value.__ob__;
  //} else if (
    //observerState.shouldConvert &&
    //!isServerRendering() &&
    //(Array.isArray(value) || isPlainObject(value)) &&
    //Object.isExtensible(value) &&
    //!value._isVue
  //) {
    //ob = new Observer(value);
  //}
  //if (asRootData && ob) {
    //ob.vmCount++;
  //}
  //return ob
//}

/**
 * Define a reactive property on an Object.
 */
//function defineReactive$$1 (
  //obj,
  //key,
  //val,
  //customSetter,
  //shallow
//) {
  //var dep = new Dep();

  //var property = Object.getOwnPropertyDescriptor(obj, key);
  //if (property && property.configurable === false) {
    //return
  //}

  //// cater for pre-defined getter/setters
  //var getter = property && property.get;
  //var setter = property && property.set;

  //var childOb = !shallow && observe(val);
  //Object.defineProperty(obj, key, {
    //enumerable: true,
    //configurable: true,
    //get: function reactiveGetter () {
      //var value = getter ? getter.call(obj) : val;
      //if (Dep.target) {
        //dep.depend();
        //if (childOb) {
          //childOb.dep.depend();
        //}
        //if (Array.isArray(value)) {
          //dependArray(value);
        //}
      //}
      //return value
    //},
    //set: function reactiveSetter (newVal) {
      //var value = getter ? getter.call(obj) : val;
      //[> eslint-disable no-self-compare <]
      //if (newVal === value || (newVal !== newVal && value !== value)) {
        //return
      //}
      //[> eslint-enable no-self-compare <]
      //if ("development" !== 'production' && customSetter) {
        //customSetter();
      //}
      //if (setter) {
        //setter.call(obj, newVal);
      //} else {
        //val = newVal;
      //}
      //childOb = !shallow && observe(newVal);
      //dep.notify();
    //}
  //});
//}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
//function set (target, key, val) {
  //if (Array.isArray(target) && isValidArrayIndex(key)) {
    //target.length = Math.max(target.length, key);
    //target.splice(key, 1, val);
    //return val
  //}
  //if (hasOwn(target, key)) {
    //target[key] = val;
    //return val
  //}
  //var ob = (target).__ob__;
  //if (target._isVue || (ob && ob.vmCount)) {
    //"development" !== 'production' && warn(
      //'Avoid adding reactive properties to a Vue instance or its root $data ' +
      //'at runtime - declare it upfront in the data option.'
    //);
    //return val
  //}
  //if (!ob) {
    //target[key] = val;
    //return val
  //}
  //defineReactive$$1(ob.value, key, val);
  //ob.dep.notify();
  //return val
//}

/**
 * Delete a property and trigger change if necessary.
 */
//function del (target, key) {
  //if (Array.isArray(target) && isValidArrayIndex(key)) {
    //target.splice(key, 1);
    //return
  //}
  //var ob = (target).__ob__;
  //if (target._isVue || (ob && ob.vmCount)) {
    //"development" !== 'production' && warn(
      //'Avoid deleting properties on a Vue instance or its root $data ' +
      //'- just set it to null.'
    //);
    //return
  //}
  //if (!hasOwn(target, key)) {
    //return
  //}
  //delete target[key];
  //if (!ob) {
    //return
  //}
  //ob.dep.notify();
//}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
//function dependArray (value) {
  //for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    //e = value[i];
    //e && e.__ob__ && e.__ob__.dep.depend();
    //if (Array.isArray(e)) {
      //dependArray(e);
    //}
  //}
//}

//[>  <]

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
//var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
//{
  //strats.el = strats.propsData = function (parent, child, vm, key) {
    //if (!vm) {
      //warn(
        //"option \"" + key + "\" can only be used during instance " +
        //'creation with the `new` keyword.'
      //);
    //}
    //return defaultStrat(parent, child)
  //};
//}

/**
 * Helper that recursively merges two data objects together.
 */
//function mergeData (to, from) {
  //if (!from) { return to }
  //var key, toVal, fromVal;
  //var keys = Object.keys(from);
  //for (var i = 0; i < keys.length; i++) {
    //key = keys[i];
    //toVal = to[key];
    //fromVal = from[key];
    //if (!hasOwn(to, key)) {
      //set(to, key, fromVal);
    //} else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      //mergeData(toVal, fromVal);
    //}
  //}
  //return to
//}

/**
 * Data
 */
//function mergeDataOrFn (
  //parentVal,
  //childVal,
  //vm
//) {
  //if (!vm) {
    //// in a Vue.extend merge, both should be functions
    //if (!childVal) {
      //return parentVal
    //}
    //if (!parentVal) {
      //return childVal
    //}
    //// when parentVal & childVal are both present,
    //// we need to return a function that returns the
    //// merged result of both functions... no need to
    //// check if parentVal is a function here because
    //// it has to be a function to pass previous merges.
    //return function mergedDataFn () {
      //return mergeData(
        //typeof childVal === 'function' ? childVal.call(this) : childVal,
        //typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      //)
    //}
  //} else if (parentVal || childVal) {
    //return function mergedInstanceDataFn () {
      //// instance merge
      //var instanceData = typeof childVal === 'function'
        //? childVal.call(vm)
        //: childVal;
      //var defaultData = typeof parentVal === 'function'
        //? parentVal.call(vm)
        //: undefined;
      //if (instanceData) {
        //return mergeData(instanceData, defaultData)
      //} else {
        //return defaultData
      //}
    //}
  //}
//}

//strats.data = function (
  //parentVal,
  //childVal,
  //vm
//) {
  //if (!vm) {
    //if (childVal && typeof childVal !== 'function') {
      //"development" !== 'production' && warn(
        //'The "data" option should be a function ' +
        //'that returns a per-instance value in component ' +
        //'definitions.',
        //vm
      //);

      //return parentVal
    //}
    //return mergeDataOrFn.call(this, parentVal, childVal)
  //}

  //return mergeDataOrFn(parentVal, childVal, vm)
//};

/**
 * Hooks and props are merged as arrays.
 */
//function mergeHook (
  //parentVal,
  //childVal
//) {
  //return childVal
    //? parentVal
      //? parentVal.concat(childVal)
      //: Array.isArray(childVal)
        //? childVal
        //: [childVal]
    //: parentVal
//}

//LIFECYCLE_HOOKS.forEach(function (hook) {
  //strats[hook] = mergeHook;
//});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
//function mergeAssets (parentVal, childVal) {
  //var res = Object.create(parentVal || null);
  //return childVal
    //? extend(res, childVal)
    //: res
//}

//ASSET_TYPES.forEach(function (type) {
  //strats[type + 's'] = mergeAssets;
//});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
//strats.watch = function (parentVal, childVal) {
  //// work around Firefox's Object.prototype.watch...
  //if (parentVal === nativeWatch) { parentVal = undefined; }
  //if (childVal === nativeWatch) { childVal = undefined; }
  //[> istanbul ignore if <]
  //if (!childVal) { return Object.create(parentVal || null) }
  //if (!parentVal) { return childVal }
  //var ret = {};
  //extend(ret, parentVal);
  //for (var key in childVal) {
    //var parent = ret[key];
    //var child = childVal[key];
    //if (parent && !Array.isArray(parent)) {
      //parent = [parent];
    //}
    //ret[key] = parent
      //? parent.concat(child)
      //: Array.isArray(child) ? child : [child];
  //}
  //return ret
//};

/**
 * Other object hashes.
 */
//strats.props =
//strats.methods =
//strats.inject =
//strats.computed = function (parentVal, childVal) {
  //if (!parentVal) { return childVal }
  //var ret = Object.create(null);
  //extend(ret, parentVal);
  //if (childVal) { extend(ret, childVal); }
  //return ret
//};
//strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
//var defaultStrat = function (parentVal, childVal) {
  //return childVal === undefined
    //? parentVal
    //: childVal
//};

/**
 * Validate component names
 */
//function checkComponents (options) {
  //for (var key in options.components) {
    //var lower = key.toLowerCase();
    //if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      //warn(
        //'Do not use built-in or reserved HTML elements as component ' +
        //'id: ' + key
      //);
    //}
  //}
//}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
//function normalizeProps (options) {
  //var props = options.props;
  //if (!props) { return }
  //var res = {};
  //var i, val, name;
  //if (Array.isArray(props)) {
    //i = props.length;
    //while (i--) {
      //val = props[i];
      //if (typeof val === 'string') {
        //name = camelize(val);
        //res[name] = { type: null };
      //} else {
        //warn('props must be strings when using array syntax.');
      //}
    //}
  //} else if (isPlainObject(props)) {
    //for (var key in props) {
      //val = props[key];
      //name = camelize(key);
      //res[name] = isPlainObject(val)
        //? val
        //: { type: val };
    //}
  //}
  //options.props = res;
//}

/**
 * Normalize all injections into Object-based format
 */
//function normalizeInject (options) {
  //var inject = options.inject;
  //if (Array.isArray(inject)) {
    //var normalized = options.inject = {};
    //for (var i = 0; i < inject.length; i++) {
      //normalized[inject[i]] = inject[i];
    //}
  //}
//}

/**
 * Normalize raw function directives into object format.
 */
//function normalizeDirectives (options) {
  //var dirs = options.directives;
  //if (dirs) {
    //for (var key in dirs) {
      //var def = dirs[key];
      //if (typeof def === 'function') {
        //dirs[key] = { bind: def, update: def };
      //}
    //}
  //}
//}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
//function mergeOptions (
  //parent,
  //child,
  //vm
//) {
  //{
    //checkComponents(child);
  //}

  //if (typeof child === 'function') {
    //child = child.options;
  //}

  //normalizeProps(child);
  //normalizeInject(child);
  //normalizeDirectives(child);
  //var extendsFrom = child.extends;
  //if (extendsFrom) {
    //parent = mergeOptions(parent, extendsFrom, vm);
  //}
  //if (child.mixins) {
    //for (var i = 0, l = child.mixins.length; i < l; i++) {
      //parent = mergeOptions(parent, child.mixins[i], vm);
    //}
  //}
  //var options = {};
  //var key;
  //for (key in parent) {
    //mergeField(key);
  //}
  //for (key in child) {
    //if (!hasOwn(parent, key)) {
      //mergeField(key);
    //}
  //}
  //function mergeField (key) {
    //var strat = strats[key] || defaultStrat;
    //options[key] = strat(parent[key], child[key], vm, key);
  //}
  //return options
//}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
//function resolveAsset (
  //options,
  //type,
  //id,
  //warnMissing
//) {
  //[> istanbul ignore if <]
  //if (typeof id !== 'string') {
    //return
  //}
  //var assets = options[type];
  //// check local registration variations first
  //if (hasOwn(assets, id)) { return assets[id] }
  //var camelizedId = camelize(id);
  //if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  //var PascalCaseId = capitalize(camelizedId);
  //if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  //// fallback to prototype chain
  //var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  //if ("development" !== 'production' && warnMissing && !res) {
    //warn(
      //'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      //options
    //);
  //}
  //return res
//}

//[>  <]

//function validateProp (
  //key,
  //propOptions,
  //propsData,
  //vm
//) {
  //var prop = propOptions[key];
  //var absent = !hasOwn(propsData, key);
  //var value = propsData[key];
  //// handle boolean props
  //if (isType(Boolean, prop.type)) {
    //if (absent && !hasOwn(prop, 'default')) {
      //value = false;
    //} else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      //value = true;
    //}
  //}
  //// check default value
  //if (value === undefined) {
    //value = getPropDefaultValue(vm, prop, key);
    //// since the default value is a fresh copy,
    //// make sure to observe it.
    //var prevShouldConvert = observerState.shouldConvert;
    //observerState.shouldConvert = true;
    //observe(value);
    //observerState.shouldConvert = prevShouldConvert;
  //}
  //{
    //assertProp(prop, key, value, vm, absent);
  //}
  //return value
//}

/**
 * Get the default value of a prop.
 */
//function getPropDefaultValue (vm, prop, key) {
  //// no default, return undefined
  //if (!hasOwn(prop, 'default')) {
    //return undefined
  //}
  //var def = prop.default;
  //// warn against non-factory defaults for Object & Array
  //if ("development" !== 'production' && isObject(def)) {
    //warn(
      //'Invalid default value for prop "' + key + '": ' +
      //'Props with type Object/Array must use a factory function ' +
      //'to return the default value.',
      //vm
    //);
  //}
  //// the raw prop value was also undefined from previous render,
  //// return previous default value to avoid unnecessary watcher trigger
  //if (vm && vm.$options.propsData &&
    //vm.$options.propsData[key] === undefined &&
    //vm._props[key] !== undefined
  //) {
    //return vm._props[key]
  //}
  //// call factory function for non-Function types
  //// a value is Function if its prototype is function even across different execution context
  //return typeof def === 'function' && getType(prop.type) !== 'Function'
    //? def.call(vm)
    //: def
//}

/**
 * Assert whether a prop is valid.
 */
//function assertProp (
  //prop,
  //name,
  //value,
  //vm,
  //absent
//) {
  //if (prop.required && absent) {
    //warn(
      //'Missing required prop: "' + name + '"',
      //vm
    //);
    //return
  //}
  //if (value == null && !prop.required) {
    //return
  //}
  //var type = prop.type;
  //var valid = !type || type === true;
  //var expectedTypes = [];
  //if (type) {
    //if (!Array.isArray(type)) {
      //type = [type];
    //}
    //for (var i = 0; i < type.length && !valid; i++) {
      //var assertedType = assertType(value, type[i]);
      //expectedTypes.push(assertedType.expectedType || '');
      //valid = assertedType.valid;
    //}
  //}
  //if (!valid) {
    //warn(
      //'Invalid prop: type check failed for prop "' + name + '".' +
      //' Expected ' + expectedTypes.map(capitalize).join(', ') +
      //', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      //vm
    //);
    //return
  //}
  //var validator = prop.validator;
  //if (validator) {
    //if (!validator(value)) {
      //warn(
        //'Invalid prop: custom validator check failed for prop "' + name + '".',
        //vm
      //);
    //}
  //}
//}

//var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

//function assertType (value, type) {
  //var valid;
  //var expectedType = getType(type);
  //if (simpleCheckRE.test(expectedType)) {
    //valid = typeof value === expectedType.toLowerCase();
  //} else if (expectedType === 'Object') {
    //valid = isPlainObject(value);
  //} else if (expectedType === 'Array') {
    //valid = Array.isArray(value);
  //} else {
    //valid = value instanceof type;
  //}
  //return {
    //valid: valid,
    //expectedType: expectedType
  //}
//}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
//function getType (fn) {
  //var match = fn && fn.toString().match(/^\s*function (\w+)/);
  //return match ? match[1] : ''
//}

//function isType (type, fn) {
  //if (!Array.isArray(fn)) {
    //return getType(fn) === getType(type)
  //}
  //for (var i = 0, len = fn.length; i < len; i++) {
    //if (getType(fn[i]) === getType(type)) {
      //return true
    //}
  //}
  //[> istanbul ignore next <]
  //return false
//}

//[>  <]

//var mark;
//var measure;

//{
  //var perf = inBrowser && window.performance;
  //[> istanbul ignore if <]
  //if (
    //perf &&
    //perf.mark &&
    //perf.measure &&
    //perf.clearMarks &&
    //perf.clearMeasures
  //) {
    //mark = function (tag) { return perf.mark(tag); };
    //measure = function (name, startTag, endTag) {
      //perf.measure(name, startTag, endTag);
      //perf.clearMarks(startTag);
      //perf.clearMarks(endTag);
      //perf.clearMeasures(name);
    //};
  //}
//}

//[> not type checking this file because flow doesn't play well with Proxy <]

//var initProxy;

//{
  //var allowedGlobals = makeMap(
    //'Infinity,undefined,NaN,isFinite,isNaN,' +
    //'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    //'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    //'require' // for Webpack/Browserify
  //);

  //var warnNonPresent = function (target, key) {
    //warn(
      //"Property or method \"" + key + "\" is not defined on the instance but " +
      //"referenced during render. Make sure to declare reactive data " +
      //"properties in the data option.",
      //target
    //);
  //};

  //var hasProxy =
    //typeof Proxy !== 'undefined' &&
    //Proxy.toString().match(/native code/);

  //if (hasProxy) {
    //var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    //config.keyCodes = new Proxy(config.keyCodes, {
      //set: function set (target, key, value) {
        //if (isBuiltInModifier(key)) {
          //warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          //return false
        //} else {
          //target[key] = value;
          //return true
        //}
      //}
    //});
  //}

  //var hasHandler = {
    //has: function has (target, key) {
      //var has = key in target;
      //var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      //if (!has && !isAllowed) {
        //warnNonPresent(target, key);
      //}
      //return has || !isAllowed
    //}
  //};

  //var getHandler = {
    //get: function get (target, key) {
      //if (typeof key === 'string' && !(key in target)) {
        //warnNonPresent(target, key);
      //}
      //return target[key]
    //}
  //};

  //initProxy = function initProxy (vm) {
    //if (hasProxy) {
      //// determine which proxy handler to use
      //var options = vm.$options;
      //var handlers = options.render && options.render._withStripped
        //? getHandler
        //: hasHandler;
      //vm._renderProxy = new Proxy(vm, handlers);
    //} else {
      //vm._renderProxy = vm;
    //}
  //};
//}

//[>  <]

//var VNode = function VNode (
  //tag,
  //data,
  //children,
  //text,
  //elm,
  //context,
  //componentOptions,
  //asyncFactory
//) {
  //this.tag = tag;
  //this.data = data;
  //this.children = children;
  //this.text = text;
  //this.elm = elm;
  //this.ns = undefined;
  //this.context = context;
  //this.functionalContext = undefined;
  //this.key = data && data.key;
  //this.componentOptions = componentOptions;
  //this.componentInstance = undefined;
  //this.parent = undefined;
  //this.raw = false;
  //this.isStatic = false;
  //this.isRootInsert = true;
  //this.isComment = false;
  //this.isCloned = false;
  //this.isOnce = false;
  //this.asyncFactory = asyncFactory;
  //this.asyncMeta = undefined;
  //this.isAsyncPlaceholder = false;
//};

//var prototypeAccessors = { child: {} };

//// DEPRECATED: alias for componentInstance for backwards compat.
//[> istanbul ignore next <]
//prototypeAccessors.child.get = function () {
  //return this.componentInstance
//};

//Object.defineProperties( VNode.prototype, prototypeAccessors );

//var createEmptyVNode = function (text) {
  //if ( text === void 0 ) text = '';

  //var node = new VNode();
  //node.text = text;
  //node.isComment = true;
  //return node
//};

//function createTextVNode (val) {
  //return new VNode(undefined, undefined, undefined, String(val))
//}

//// optimized shallow clone
//// used for static nodes and slot nodes because they may be reused across
//// multiple renders, cloning them avoids errors when DOM manipulations rely
//// on their elm reference.
//function cloneVNode (vnode) {
  //var cloned = new VNode(
    //vnode.tag,
    //vnode.data,
    //vnode.children,
    //vnode.text,
    //vnode.elm,
    //vnode.context,
    //vnode.componentOptions,
    //vnode.asyncFactory
  //);
  //cloned.ns = vnode.ns;
  //cloned.isStatic = vnode.isStatic;
  //cloned.key = vnode.key;
  //cloned.isComment = vnode.isComment;
  //cloned.isCloned = true;
  //return cloned
//}

//function cloneVNodes (vnodes) {
  //var len = vnodes.length;
  //var res = new Array(len);
  //for (var i = 0; i < len; i++) {
    //res[i] = cloneVNode(vnodes[i]);
  //}
  //return res
//}

//[>  <]

//var normalizeEvent = cached(function (name) {
  //var passive = name.charAt(0) === '&';
  //name = passive ? name.slice(1) : name;
  //var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  //name = once$$1 ? name.slice(1) : name;
  //var capture = name.charAt(0) === '!';
  //name = capture ? name.slice(1) : name;
  //return {
    //name: name,
    //once: once$$1,
    //capture: capture,
    //passive: passive
  //}
//});

//function createFnInvoker (fns) {
  //function invoker () {
    //var arguments$1 = arguments;

    //var fns = invoker.fns;
    //if (Array.isArray(fns)) {
      //var cloned = fns.slice();
      //for (var i = 0; i < cloned.length; i++) {
        //cloned[i].apply(null, arguments$1);
      //}
    //} else {
      //// return handler return value for single handlers
      //return fns.apply(null, arguments)
    //}
  //}
  //invoker.fns = fns;
  //return invoker
//}

//function updateListeners (
  //on,
  //oldOn,
  //add,
  //remove$$1,
  //vm
//) {
  //var name, cur, old, event;
  //for (name in on) {
    //cur = on[name];
    //old = oldOn[name];
    //event = normalizeEvent(name);
    //if (isUndef(cur)) {
      //"development" !== 'production' && warn(
        //"Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        //vm
      //);
    //} else if (isUndef(old)) {
      //if (isUndef(cur.fns)) {
        //cur = on[name] = createFnInvoker(cur);
      //}
      //add(event.name, cur, event.once, event.capture, event.passive);
    //} else if (cur !== old) {
      //old.fns = cur;
      //on[name] = old;
    //}
  //}
  //for (name in oldOn) {
    //if (isUndef(on[name])) {
      //event = normalizeEvent(name);
      //remove$$1(event.name, oldOn[name], event.capture);
    //}
  //}
//}

//[>  <]

//function mergeVNodeHook (def, hookKey, hook) {
  //var invoker;
  //var oldHook = def[hookKey];

  //function wrappedHook () {
    //hook.apply(this, arguments);
    //// important: remove merged hook to ensure it's called only once
    //// and prevent memory leak
    //remove(invoker.fns, wrappedHook);
  //}

  //if (isUndef(oldHook)) {
    //// no existing hook
    //invoker = createFnInvoker([wrappedHook]);
  //} else {
    //[> istanbul ignore if <]
    //if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      //// already a merged invoker
      //invoker = oldHook;
      //invoker.fns.push(wrappedHook);
    //} else {
      //// existing plain hook
      //invoker = createFnInvoker([oldHook, wrappedHook]);
    //}
  //}

  //invoker.merged = true;
  //def[hookKey] = invoker;
//}

//[>  <]

//function extractPropsFromVNodeData (
  //data,
  //Ctor,
  //tag
//) {
  //// we are only extracting raw values here.
  //// validation and default values are handled in the child
  //// component itself.
  //var propOptions = Ctor.options.props;
  //if (isUndef(propOptions)) {
    //return
  //}
  //var res = {};
  //var attrs = data.attrs;
  //var props = data.props;
  //if (isDef(attrs) || isDef(props)) {
    //for (var key in propOptions) {
      //var altKey = hyphenate(key);
      //{
        //var keyInLowerCase = key.toLowerCase();
        //if (
          //key !== keyInLowerCase &&
          //attrs && hasOwn(attrs, keyInLowerCase)
        //) {
          //tip(
            //"Prop \"" + keyInLowerCase + "\" is passed to component " +
            //(formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            //" \"" + key + "\". " +
            //"Note that HTML attributes are case-insensitive and camelCased " +
            //"props need to use their kebab-case equivalents when using in-DOM " +
            //"templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          //);
        //}
      //}
      //checkProp(res, props, key, altKey, true) ||
      //checkProp(res, attrs, key, altKey, false);
    //}
  //}
  //return res
//}

//function checkProp (
  //res,
  //hash,
  //key,
  //altKey,
  //preserve
//) {
  //if (isDef(hash)) {
    //if (hasOwn(hash, key)) {
      //res[key] = hash[key];
      //if (!preserve) {
        //delete hash[key];
      //}
      //return true
    //} else if (hasOwn(hash, altKey)) {
      //res[key] = hash[altKey];
      //if (!preserve) {
        //delete hash[altKey];
      //}
      //return true
    //}
  //}
  //return false
//}

//[>  <]

//// The template compiler attempts to minimize the need for normalization by
//// statically analyzing the template at compile time.
////
//// For plain HTML markup, normalization can be completely skipped because the
//// generated render function is guaranteed to return Array<VNode>. There are
//// two cases where extra normalization is needed:

//// 1. When the children contains components - because a functional component
//// may return an Array instead of a single root. In this case, just a simple
//// normalization is needed - if any child is an Array, we flatten the whole
//// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
//// because functional components already normalize their own children.
//function simpleNormalizeChildren (children) {
  //for (var i = 0; i < children.length; i++) {
    //if (Array.isArray(children[i])) {
      //return Array.prototype.concat.apply([], children)
    //}
  //}
  //return children
//}

//// 2. When the children contains constructs that always generated nested Arrays,
//// e.g. <template>, <slot>, v-for, or when the children is provided by user
//// with hand-written render functions / JSX. In such cases a full normalization
//// is needed to cater to all possible types of children values.
//function normalizeChildren (children) {
  //return isPrimitive(children)
    //? [createTextVNode(children)]
    //: Array.isArray(children)
      //? normalizeArrayChildren(children)
      //: undefined
//}

//function isTextNode (node) {
  //return isDef(node) && isDef(node.text) && isFalse(node.isComment)
//}

//function normalizeArrayChildren (children, nestedIndex) {
  //var res = [];
  //var i, c, last;
  //for (i = 0; i < children.length; i++) {
    //c = children[i];
    //if (isUndef(c) || typeof c === 'boolean') { continue }
    //last = res[res.length - 1];
    ////  nested
    //if (Array.isArray(c)) {
      //res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    //} else if (isPrimitive(c)) {
      //if (isTextNode(last)) {
        //// merge adjacent text nodes
        //// this is necessary for SSR hydration because text nodes are
        //// essentially merged when rendered to HTML strings
        //(last).text += String(c);
      //} else if (c !== '') {
        //// convert primitive to vnode
        //res.push(createTextVNode(c));
      //}
    //} else {
      //if (isTextNode(c) && isTextNode(last)) {
        //// merge adjacent text nodes
        //res[res.length - 1] = createTextVNode(last.text + c.text);
      //} else {
        //// default key for nested array children (likely generated by v-for)
        //if (isTrue(children._isVList) &&
          //isDef(c.tag) &&
          //isUndef(c.key) &&
          //isDef(nestedIndex)) {
          //c.key = "__vlist" + nestedIndex + "_" + i + "__";
        //}
        //res.push(c);
      //}
    //}
  //}
  //return res
//}

//[>  <]

//function ensureCtor (comp, base) {
  //if (comp.__esModule && comp.default) {
    //comp = comp.default;
  //}
  //return isObject(comp)
    //? base.extend(comp)
    //: comp
//}

//function createAsyncPlaceholder (
  //factory,
  //data,
  //context,
  //children,
  //tag
//) {
  //var node = createEmptyVNode();
  //node.asyncFactory = factory;
  //node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  //return node
//}

//function resolveAsyncComponent (
  //factory,
  //baseCtor,
  //context
//) {
  //if (isTrue(factory.error) && isDef(factory.errorComp)) {
    //return factory.errorComp
  //}

  //if (isDef(factory.resolved)) {
    //return factory.resolved
  //}

  //if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    //return factory.loadingComp
  //}

  //if (isDef(factory.contexts)) {
    //// already pending
    //factory.contexts.push(context);
  //} else {
    //var contexts = factory.contexts = [context];
    //var sync = true;

    //var forceRender = function () {
      //for (var i = 0, l = contexts.length; i < l; i++) {
        //contexts[i].$forceUpdate();
      //}
    //};

    //var resolve = once(function (res) {
      //// cache resolved
      //factory.resolved = ensureCtor(res, baseCtor);
      //// invoke callbacks only if this is not a synchronous resolve
      //// (async resolves are shimmed as synchronous during SSR)
      //if (!sync) {
        //forceRender();
      //}
    //});

    //var reject = once(function (reason) {
      //"development" !== 'production' && warn(
        //"Failed to resolve async component: " + (String(factory)) +
        //(reason ? ("\nReason: " + reason) : '')
      //);
      //if (isDef(factory.errorComp)) {
        //factory.error = true;
        //forceRender();
      //}
    //});

    //var res = factory(resolve, reject);

    //if (isObject(res)) {
      //if (typeof res.then === 'function') {
        //// () => Promise
        //if (isUndef(factory.resolved)) {
          //res.then(resolve, reject);
        //}
      //} else if (isDef(res.component) && typeof res.component.then === 'function') {
        //res.component.then(resolve, reject);

        //if (isDef(res.error)) {
          //factory.errorComp = ensureCtor(res.error, baseCtor);
        //}

        //if (isDef(res.loading)) {
          //factory.loadingComp = ensureCtor(res.loading, baseCtor);
          //if (res.delay === 0) {
            //factory.loading = true;
          //} else {
            //setTimeout(function () {
              //if (isUndef(factory.resolved) && isUndef(factory.error)) {
                //factory.loading = true;
                //forceRender();
              //}
            //}, res.delay || 200);
          //}
        //}

        //if (isDef(res.timeout)) {
          //setTimeout(function () {
            //if (isUndef(factory.resolved)) {
              //reject(
                //"timeout (" + (res.timeout) + "ms)"
              //);
            //}
          //}, res.timeout);
        //}
      //}
    //}

    //sync = false;
    //// return in case resolved synchronously
    //return factory.loading
      //? factory.loadingComp
      //: factory.resolved
  //}
//}

//[>  <]

//function getFirstComponentChild (children) {
  //if (Array.isArray(children)) {
    //for (var i = 0; i < children.length; i++) {
      //var c = children[i];
      //if (isDef(c) && isDef(c.componentOptions)) {
        //return c
      //}
    //}
  //}
//}

//[>  <]

//[>  <]

//function initEvents (vm) {
  //vm._events = Object.create(null);
  //vm._hasHookEvent = false;
  //// init parent attached events
  //var listeners = vm.$options._parentListeners;
  //if (listeners) {
    //updateComponentListeners(vm, listeners);
  //}
//}

//var target;

//function add (event, fn, once$$1) {
  //if (once$$1) {
    //target.$once(event, fn);
  //} else {
    //target.$on(event, fn);
  //}
//}

//function remove$1 (event, fn) {
  //target.$off(event, fn);
//}

//function updateComponentListeners (
  //vm,
  //listeners,
  //oldListeners
//) {
  //target = vm;
  //updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
//}

//function eventsMixin (Vue) {
  //var hookRE = /^hook:/;
  //Vue.prototype.$on = function (event, fn) {
    //var this$1 = this;

    //var vm = this;
    //if (Array.isArray(event)) {
      //for (var i = 0, l = event.length; i < l; i++) {
        //this$1.$on(event[i], fn);
      //}
    //} else {
      //(vm._events[event] || (vm._events[event] = [])).push(fn);
      //// optimize hook:event cost by using a boolean flag marked at registration
      //// instead of a hash lookup
      //if (hookRE.test(event)) {
        //vm._hasHookEvent = true;
      //}
    //}
    //return vm
  //};

  //Vue.prototype.$once = function (event, fn) {
    //var vm = this;
    //function on () {
      //vm.$off(event, on);
      //fn.apply(vm, arguments);
    //}
    //on.fn = fn;
    //vm.$on(event, on);
    //return vm
  //};

  //Vue.prototype.$off = function (event, fn) {
    //var this$1 = this;

    //var vm = this;
    //// all
    //if (!arguments.length) {
      //vm._events = Object.create(null);
      //return vm
    //}
    //// array of events
    //if (Array.isArray(event)) {
      //for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        //this$1.$off(event[i$1], fn);
      //}
      //return vm
    //}
    //// specific event
    //var cbs = vm._events[event];
    //if (!cbs) {
      //return vm
    //}
    //if (arguments.length === 1) {
      //vm._events[event] = null;
      //return vm
    //}
    //// specific handler
    //var cb;
    //var i = cbs.length;
    //while (i--) {
      //cb = cbs[i];
      //if (cb === fn || cb.fn === fn) {
        //cbs.splice(i, 1);
        //break
      //}
    //}
    //return vm
  //};

  //Vue.prototype.$emit = function (event) {
    //var vm = this;
    //{
      //var lowerCaseEvent = event.toLowerCase();
      //if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        //tip(
          //"Event \"" + lowerCaseEvent + "\" is emitted in component " +
          //(formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          //"Note that HTML attributes are case-insensitive and you cannot use " +
          //"v-on to listen to camelCase events when using in-DOM templates. " +
          //"You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        //);
      //}
    //}
    //var cbs = vm._events[event];
    //if (cbs) {
      //cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      //var args = toArray(arguments, 1);
      //for (var i = 0, l = cbs.length; i < l; i++) {
        //try {
          //cbs[i].apply(vm, args);
        //} catch (e) {
          //handleError(e, vm, ("event handler for \"" + event + "\""));
        //}
      //}
    //}
    //return vm
  //};
//}

//[>  <]

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
//function resolveSlots (
  //children,
  //context
//) {
  //var slots = {};
  //if (!children) {
    //return slots
  //}
  //var defaultSlot = [];
  //for (var i = 0, l = children.length; i < l; i++) {
    //var child = children[i];
    //// named slots should only be respected if the vnode was rendered in the
    //// same context.
    //if ((child.context === context || child.functionalContext === context) &&
      //child.data && child.data.slot != null
    //) {
      //var name = child.data.slot;
      //var slot = (slots[name] || (slots[name] = []));
      //if (child.tag === 'template') {
        //slot.push.apply(slot, child.children);
      //} else {
        //slot.push(child);
      //}
    //} else {
      //defaultSlot.push(child);
    //}
  //}
  //// ignore whitespace
  //if (!defaultSlot.every(isWhitespace)) {
    //slots.default = defaultSlot;
  //}
  //return slots
//}

//function isWhitespace (node) {
  //return node.isComment || node.text === ' '
//}

//function resolveScopedSlots (
  //fns, // see flow/vnode
  //res
//) {
  //res = res || {};
  //for (var i = 0; i < fns.length; i++) {
    //if (Array.isArray(fns[i])) {
      //resolveScopedSlots(fns[i], res);
    //} else {
      //res[fns[i].key] = fns[i].fn;
    //}
  //}
  //return res
//}

//[>  <]

//var activeInstance = null;
//var isUpdatingChildComponent = false;

//function initLifecycle (vm) {
  //var options = vm.$options;

  //// locate first non-abstract parent
  //var parent = options.parent;
  //if (parent && !options.abstract) {
    //while (parent.$options.abstract && parent.$parent) {
      //parent = parent.$parent;
    //}
    //parent.$children.push(vm);
  //}

  //vm.$parent = parent;
  //vm.$root = parent ? parent.$root : vm;

  //vm.$children = [];
  //vm.$refs = {};

  //vm._watcher = null;
  //vm._inactive = null;
  //vm._directInactive = false;
  //vm._isMounted = false;
  //vm._isDestroyed = false;
  //vm._isBeingDestroyed = false;
//}

//function lifecycleMixin (Vue) {
  //Vue.prototype._update = function (vnode, hydrating) {
    //var vm = this;
    //if (vm._isMounted) {
      //callHook(vm, 'beforeUpdate');
    //}
    //var prevEl = vm.$el;
    //var prevVnode = vm._vnode;
    //var prevActiveInstance = activeInstance;
    //activeInstance = vm;
    //vm._vnode = vnode;
    //// Vue.prototype.__patch__ is injected in entry points
    //// based on the rendering backend used.
    //if (!prevVnode) {
      //// initial render
      //vm.$el = vm.__patch__(
        //vm.$el, vnode, hydrating, false [> removeOnly <],
        //vm.$options._parentElm,
        //vm.$options._refElm
      //);
      //// no need for the ref nodes after initial patch
      //// this prevents keeping a detached DOM tree in memory (#5851)
      //vm.$options._parentElm = vm.$options._refElm = null;
    //} else {
      //// updates
      //vm.$el = vm.__patch__(prevVnode, vnode);
    //}
    //activeInstance = prevActiveInstance;
    //// update __vue__ reference
    //if (prevEl) {
      //prevEl.__vue__ = null;
    //}
    //if (vm.$el) {
      //vm.$el.__vue__ = vm;
    //}
    //// if parent is an HOC, update its $el as well
    //if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      //vm.$parent.$el = vm.$el;
    //}
    //// updated hook is called by the scheduler to ensure that children are
    //// updated in a parent's updated hook.
  //};

  //Vue.prototype.$forceUpdate = function () {
    //var vm = this;
    //if (vm._watcher) {
      //vm._watcher.update();
    //}
  //};

  //Vue.prototype.$destroy = function () {
    //var vm = this;
    //if (vm._isBeingDestroyed) {
      //return
    //}
    //callHook(vm, 'beforeDestroy');
    //vm._isBeingDestroyed = true;
    //// remove self from parent
    //var parent = vm.$parent;
    //if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      //remove(parent.$children, vm);
    //}
    //// teardown watchers
    //if (vm._watcher) {
      //vm._watcher.teardown();
    //}
    //var i = vm._watchers.length;
    //while (i--) {
      //vm._watchers[i].teardown();
    //}
    //// remove reference from data ob
    //// frozen object may not have observer.
    //if (vm._data.__ob__) {
      //vm._data.__ob__.vmCount--;
    //}
    //// call the last hook...
    //vm._isDestroyed = true;
    //// invoke destroy hooks on current rendered tree
    //vm.__patch__(vm._vnode, null);
    //// fire destroyed hook
    //callHook(vm, 'destroyed');
    //// turn off all instance listeners.
    //vm.$off();
    //// remove __vue__ reference
    //if (vm.$el) {
      //vm.$el.__vue__ = null;
    //}
  //};
//}

//function mountComponent (
  //vm,
  //el,
  //hydrating
//) {
  //vm.$el = el;
  //if (!vm.$options.render) {
    //vm.$options.render = createEmptyVNode;
    //{
      //[> istanbul ignore if <]
      //if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        //vm.$options.el || el) {
        //warn(
          //'You are using the runtime-only build of Vue where the template ' +
          //'compiler is not available. Either pre-compile the templates into ' +
          //'render functions, or use the compiler-included build.',
          //vm
        //);
      //} else {
        //warn(
          //'Failed to mount component: template or render function not defined.',
          //vm
        //);
      //}
    //}
  //}
  //callHook(vm, 'beforeMount');

  //var updateComponent;
  //[> istanbul ignore if <]
  //if ("development" !== 'production' && config.performance && mark) {
    //updateComponent = function () {
      //var name = vm._name;
      //var id = vm._uid;
      //var startTag = "vue-perf-start:" + id;
      //var endTag = "vue-perf-end:" + id;

      //mark(startTag);
      //var vnode = vm._render();
      //mark(endTag);
      //measure((name + " render"), startTag, endTag);

      //mark(startTag);
      //vm._update(vnode, hydrating);
      //mark(endTag);
      //measure((name + " patch"), startTag, endTag);
    //};
  //} else {
    //updateComponent = function () {
      //vm._update(vm._render(), hydrating);
    //};
  //}

  //vm._watcher = new Watcher(vm, updateComponent, noop);
  //hydrating = false;

  //// manually mounted instance, call mounted on self
  //// mounted is called for render-created child components in its inserted hook
  //if (vm.$vnode == null) {
    //vm._isMounted = true;
    //callHook(vm, 'mounted');
  //}
  //return vm
//}

//function updateChildComponent (
  //vm,
  //propsData,
  //listeners,
  //parentVnode,
  //renderChildren
//) {
  //{
    //isUpdatingChildComponent = true;
  //}

  //// determine whether component has slot children
  //// we need to do this before overwriting $options._renderChildren
  //var hasChildren = !!(
    //renderChildren ||               // has new static slots
    //vm.$options._renderChildren ||  // has old static slots
    //parentVnode.data.scopedSlots || // has new scoped slots
    //vm.$scopedSlots !== emptyObject // has old scoped slots
  //);

  //vm.$options._parentVnode = parentVnode;
  //vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  //if (vm._vnode) { // update child tree's parent
    //vm._vnode.parent = parentVnode;
  //}
  //vm.$options._renderChildren = renderChildren;

  //// update $attrs and $listensers hash
  //// these are also reactive so they may trigger child update if the child
  //// used them during render
  //vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  //vm.$listeners = listeners;

  //// update props
  //if (propsData && vm.$options.props) {
    //observerState.shouldConvert = false;
    //var props = vm._props;
    //var propKeys = vm.$options._propKeys || [];
    //for (var i = 0; i < propKeys.length; i++) {
      //var key = propKeys[i];
      //props[key] = validateProp(key, vm.$options.props, propsData, vm);
    //}
    //observerState.shouldConvert = true;
    //// keep a copy of raw propsData
    //vm.$options.propsData = propsData;
  //}

  //// update listeners
  //if (listeners) {
    //var oldListeners = vm.$options._parentListeners;
    //vm.$options._parentListeners = listeners;
    //updateComponentListeners(vm, listeners, oldListeners);
  //}
  //// resolve slots + force update if has children
  //if (hasChildren) {
    //vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    //vm.$forceUpdate();
  //}

  //{
    //isUpdatingChildComponent = false;
  //}
//}

//function isInInactiveTree (vm) {
  //while (vm && (vm = vm.$parent)) {
    //if (vm._inactive) { return true }
  //}
  //return false
//}

//function activateChildComponent (vm, direct) {
  //if (direct) {
    //vm._directInactive = false;
    //if (isInInactiveTree(vm)) {
      //return
    //}
  //} else if (vm._directInactive) {
    //return
  //}
  //if (vm._inactive || vm._inactive === null) {
    //vm._inactive = false;
    //for (var i = 0; i < vm.$children.length; i++) {
      //activateChildComponent(vm.$children[i]);
    //}
    //callHook(vm, 'activated');
  //}
//}

//function deactivateChildComponent (vm, direct) {
  //if (direct) {
    //vm._directInactive = true;
    //if (isInInactiveTree(vm)) {
      //return
    //}
  //}
  //if (!vm._inactive) {
    //vm._inactive = true;
    //for (var i = 0; i < vm.$children.length; i++) {
      //deactivateChildComponent(vm.$children[i]);
    //}
    //callHook(vm, 'deactivated');
  //}
//}

//function callHook (vm, hook) {
  //var handlers = vm.$options[hook];
  //if (handlers) {
    //for (var i = 0, j = handlers.length; i < j; i++) {
      //try {
        //handlers[i].call(vm);
      //} catch (e) {
        //handleError(e, vm, (hook + " hook"));
      //}
    //}
  //}
  //if (vm._hasHookEvent) {
    //vm.$emit('hook:' + hook);
  //}
//}

//[>  <]


//var MAX_UPDATE_COUNT = 100;

//var queue = [];
//var activatedChildren = [];
//var has = {};
//var circular = {};
//var waiting = false;
//var flushing = false;
//var index = 0;

/**
 * Reset the scheduler's state.
 */
//function resetSchedulerState () {
  //index = queue.length = activatedChildren.length = 0;
  //has = {};
  //{
    //circular = {};
  //}
  //waiting = flushing = false;
//}

/**
 * Flush both queues and run the watchers.
 */
//function flushSchedulerQueue () {
  //flushing = true;
  //var watcher, id;

  //// Sort queue before flush.
  //// This ensures that:
  //// 1. Components are updated from parent to child. (because parent is always
  ////    created before the child)
  //// 2. A component's user watchers are run before its render watcher (because
  ////    user watchers are created before the render watcher)
  //// 3. If a component is destroyed during a parent component's watcher run,
  ////    its watchers can be skipped.
  //queue.sort(function (a, b) { return a.id - b.id; });

  //// do not cache length because more watchers might be pushed
  //// as we run existing watchers
  //for (index = 0; index < queue.length; index++) {
    //watcher = queue[index];
    //id = watcher.id;
    //has[id] = null;
    //watcher.run();
    //// in dev build, check and stop circular updates.
    //if ("development" !== 'production' && has[id] != null) {
      //circular[id] = (circular[id] || 0) + 1;
      //if (circular[id] > MAX_UPDATE_COUNT) {
        //warn(
          //'You may have an infinite update loop ' + (
            //watcher.user
              //? ("in watcher with expression \"" + (watcher.expression) + "\"")
              //: "in a component render function."
          //),
          //watcher.vm
        //);
        //break
      //}
    //}
  //}

  //// keep copies of post queues before resetting state
  //var activatedQueue = activatedChildren.slice();
  //var updatedQueue = queue.slice();

  //resetSchedulerState();

  //// call component updated and activated hooks
  //callActivatedHooks(activatedQueue);
  //callUpdatedHooks(updatedQueue);

  //// devtool hook
  //[> istanbul ignore if <]
  //if (devtools && config.devtools) {
    //devtools.emit('flush');
  //}
//}

//function callUpdatedHooks (queue) {
  //var i = queue.length;
  //while (i--) {
    //var watcher = queue[i];
    //var vm = watcher.vm;
    //if (vm._watcher === watcher && vm._isMounted) {
      //callHook(vm, 'updated');
    //}
  //}
//}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
//function queueActivatedComponent (vm) {
  //// setting _inactive to false here so that a render function can
  //// rely on checking whether it's in an inactive tree (e.g. router-view)
  //vm._inactive = false;
  //activatedChildren.push(vm);
//}

//function callActivatedHooks (queue) {
  //for (var i = 0; i < queue.length; i++) {
    //queue[i]._inactive = true;
    //activateChildComponent(queue[i], true [> true <]);
  //}
//}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
//function queueWatcher (watcher) {
  //var id = watcher.id;
  //if (has[id] == null) {
    //has[id] = true;
    //if (!flushing) {
      //queue.push(watcher);
    //} else {
      //// if already flushing, splice the watcher based on its id
      //// if already past its id, it will be run next immediately.
      //var i = queue.length - 1;
      //while (i > index && queue[i].id > watcher.id) {
        //i--;
      //}
      //queue.splice(i + 1, 0, watcher);
    //}
    //// queue the flush
    //if (!waiting) {
      //waiting = true;
      //nextTick(flushSchedulerQueue);
    //}
  //}
//}

//[>  <]

//var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
//var Watcher = function Watcher (
  //vm,
  //expOrFn,
  //cb,
  //options
//) {
  //this.vm = vm;
  //vm._watchers.push(this);
  //// options
  //if (options) {
    //this.deep = !!options.deep;
    //this.user = !!options.user;
    //this.lazy = !!options.lazy;
    //this.sync = !!options.sync;
  //} else {
    //this.deep = this.user = this.lazy = this.sync = false;
  //}
  //this.cb = cb;
  //this.id = ++uid$2; // uid for batching
  //this.active = true;
  //this.dirty = this.lazy; // for lazy watchers
  //this.deps = [];
  //this.newDeps = [];
  //this.depIds = new _Set();
  //this.newDepIds = new _Set();
  //this.expression = expOrFn.toString();
  //// parse expression for getter
  //if (typeof expOrFn === 'function') {
    //this.getter = expOrFn;
  //} else {
    //this.getter = parsePath(expOrFn);
    //if (!this.getter) {
      //this.getter = function () {};
      //"development" !== 'production' && warn(
        //"Failed watching path: \"" + expOrFn + "\" " +
        //'Watcher only accepts simple dot-delimited paths. ' +
        //'For full control, use a function instead.',
        //vm
      //);
    //}
  //}
  //this.value = this.lazy
    //? undefined
    //: this.get();
//};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
//Watcher.prototype.get = function get () {
  //pushTarget(this);
  //var value;
  //var vm = this.vm;
  //try {
    //value = this.getter.call(vm, vm);
  //} catch (e) {
    //if (this.user) {
      //handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    //} else {
      //throw e
    //}
  //} finally {
    //// "touch" every property so they are all tracked as
    //// dependencies for deep watching
    //if (this.deep) {
      //traverse(value);
    //}
    //popTarget();
    //this.cleanupDeps();
  //}
  //return value
//};

/**
 * Add a dependency to this directive.
 */
//Watcher.prototype.addDep = function addDep (dep) {
  //var id = dep.id;
  //if (!this.newDepIds.has(id)) {
    //this.newDepIds.add(id);
    //this.newDeps.push(dep);
    //if (!this.depIds.has(id)) {
      //dep.addSub(this);
    //}
  //}
//};

/**
 * Clean up for dependency collection.
 */
//Watcher.prototype.cleanupDeps = function cleanupDeps () {
    //var this$1 = this;

  //var i = this.deps.length;
  //while (i--) {
    //var dep = this$1.deps[i];
    //if (!this$1.newDepIds.has(dep.id)) {
      //dep.removeSub(this$1);
    //}
  //}
  //var tmp = this.depIds;
  //this.depIds = this.newDepIds;
  //this.newDepIds = tmp;
  //this.newDepIds.clear();
  //tmp = this.deps;
  //this.deps = this.newDeps;
  //this.newDeps = tmp;
  //this.newDeps.length = 0;
//};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
//Watcher.prototype.update = function update () {
  //[> istanbul ignore else <]
  //if (this.lazy) {
    //this.dirty = true;
  //} else if (this.sync) {
    //this.run();
  //} else {
    //queueWatcher(this);
  //}
//};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
//Watcher.prototype.run = function run () {
  //if (this.active) {
    //var value = this.get();
    //if (
      //value !== this.value ||
      //// Deep watchers and watchers on Object/Arrays should fire even
      //// when the value is the same, because the value may
      //// have mutated.
      //isObject(value) ||
      //this.deep
    //) {
      //// set new value
      //var oldValue = this.value;
      //this.value = value;
      //if (this.user) {
        //try {
          //this.cb.call(this.vm, value, oldValue);
        //} catch (e) {
          //handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        //}
      //} else {
        //this.cb.call(this.vm, value, oldValue);
      //}
    //}
  //}
//};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
//Watcher.prototype.evaluate = function evaluate () {
  //this.value = this.get();
  //this.dirty = false;
//};

/**
 * Depend on all deps collected by this watcher.
 */
//Watcher.prototype.depend = function depend () {
    //var this$1 = this;

  //var i = this.deps.length;
  //while (i--) {
    //this$1.deps[i].depend();
  //}
//};

/**
 * Remove self from all dependencies' subscriber list.
 */
//Watcher.prototype.teardown = function teardown () {
    //var this$1 = this;

  //if (this.active) {
    //// remove self from vm's watcher list
    //// this is a somewhat expensive operation so we skip it
    //// if the vm is being destroyed.
    //if (!this.vm._isBeingDestroyed) {
      //remove(this.vm._watchers, this);
    //}
    //var i = this.deps.length;
    //while (i--) {
      //this$1.deps[i].removeSub(this$1);
    //}
    //this.active = false;
  //}
//};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
//var seenObjects = new _Set();
//function traverse (val) {
  //seenObjects.clear();
  //_traverse(val, seenObjects);
//}

//function _traverse (val, seen) {
  //var i, keys;
  //var isA = Array.isArray(val);
  //if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    //return
  //}
  //if (val.__ob__) {
    //var depId = val.__ob__.dep.id;
    //if (seen.has(depId)) {
      //return
    //}
    //seen.add(depId);
  //}
  //if (isA) {
    //i = val.length;
    //while (i--) { _traverse(val[i], seen); }
  //} else {
    //keys = Object.keys(val);
    //i = keys.length;
    //while (i--) { _traverse(val[keys[i]], seen); }
  //}
//}

//[>  <]

//var sharedPropertyDefinition = {
  //enumerable: true,
  //configurable: true,
  //get: noop,
  //set: noop
//};

//function proxy (target, sourceKey, key) {
  //sharedPropertyDefinition.get = function proxyGetter () {
    //return this[sourceKey][key]
  //};
  //sharedPropertyDefinition.set = function proxySetter (val) {
    //this[sourceKey][key] = val;
  //};
  //Object.defineProperty(target, key, sharedPropertyDefinition);
//}

//function initState (vm) {
  //vm._watchers = [];
  //var opts = vm.$options;
  //if (opts.props) { initProps(vm, opts.props); }
  //if (opts.methods) { initMethods(vm, opts.methods); }
  //if (opts.data) {
    //initData(vm);
  //} else {
    //observe(vm._data = {}, true [> asRootData <]);
  //}
  //if (opts.computed) { initComputed(vm, opts.computed); }
  //if (opts.watch && opts.watch !== nativeWatch) {
    //initWatch(vm, opts.watch);
  //}
//}

//function checkOptionType (vm, name) {
  //var option = vm.$options[name];
  //if (!isPlainObject(option)) {
    //warn(
      //("component option \"" + name + "\" should be an object."),
      //vm
    //);
  //}
//}

//function initProps (vm, propsOptions) {
  //var propsData = vm.$options.propsData || {};
  //var props = vm._props = {};
  //// cache prop keys so that future props updates can iterate using Array
  //// instead of dynamic object key enumeration.
  //var keys = vm.$options._propKeys = [];
  //var isRoot = !vm.$parent;
  //// root instance props should be converted
  //observerState.shouldConvert = isRoot;
  //var loop = function ( key ) {
    //keys.push(key);
    //var value = validateProp(key, propsOptions, propsData, vm);
    //[> istanbul ignore else <]
    //{
      //if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        //warn(
          //("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          //vm
        //);
      //}
      //defineReactive$$1(props, key, value, function () {
        //if (vm.$parent && !isUpdatingChildComponent) {
          //warn(
            //"Avoid mutating a prop directly since the value will be " +
            //"overwritten whenever the parent component re-renders. " +
            //"Instead, use a data or computed property based on the prop's " +
            //"value. Prop being mutated: \"" + key + "\"",
            //vm
          //);
        //}
      //});
    //}
    //// static props are already proxied on the component's prototype
    //// during Vue.extend(). We only need to proxy props defined at
    //// instantiation here.
    //if (!(key in vm)) {
      //proxy(vm, "_props", key);
    //}
  //};

  //for (var key in propsOptions) loop( key );
  //observerState.shouldConvert = true;
//}

//function initData (vm) {
  //var data = vm.$options.data;
  //data = vm._data = typeof data === 'function'
    //? getData(data, vm)
    //: data || {};
  //if (!isPlainObject(data)) {
    //data = {};
    //"development" !== 'production' && warn(
      //'data functions should return an object:\n' +
      //'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      //vm
    //);
  //}
  //// proxy data on instance
  //var keys = Object.keys(data);
  //var props = vm.$options.props;
  //var methods = vm.$options.methods;
  //var i = keys.length;
  //while (i--) {
    //var key = keys[i];
    //{
      //if (methods && hasOwn(methods, key)) {
        //warn(
          //("method \"" + key + "\" has already been defined as a data property."),
          //vm
        //);
      //}
    //}
    //if (props && hasOwn(props, key)) {
      //"development" !== 'production' && warn(
        //"The data property \"" + key + "\" is already declared as a prop. " +
        //"Use prop default value instead.",
        //vm
      //);
    //} else if (!isReserved(key)) {
      //proxy(vm, "_data", key);
    //}
  //}
  //// observe data
  //observe(data, true [> asRootData <]);
//}

//function getData (data, vm) {
  //try {
    //return data.call(vm)
  //} catch (e) {
    //handleError(e, vm, "data()");
    //return {}
  //}
//}

//var computedWatcherOptions = { lazy: true };

//function initComputed (vm, computed) {
  //"development" !== 'production' && checkOptionType(vm, 'computed');
  //var watchers = vm._computedWatchers = Object.create(null);

  //for (var key in computed) {
    //var userDef = computed[key];
    //var getter = typeof userDef === 'function' ? userDef : userDef.get;
    //if ("development" !== 'production' && getter == null) {
      //warn(
        //("Getter is missing for computed property \"" + key + "\"."),
        //vm
      //);
    //}
    //// create internal watcher for the computed property.
    //watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

    //// component-defined computed properties are already defined on the
    //// component prototype. We only need to define computed properties defined
    //// at instantiation here.
    //if (!(key in vm)) {
      //defineComputed(vm, key, userDef);
    //} else {
      //if (key in vm.$data) {
        //warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      //} else if (vm.$options.props && key in vm.$options.props) {
        //warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      //}
    //}
  //}
//}

//function defineComputed (target, key, userDef) {
  //if (typeof userDef === 'function') {
    //sharedPropertyDefinition.get = createComputedGetter(key);
    //sharedPropertyDefinition.set = noop;
  //} else {
    //sharedPropertyDefinition.get = userDef.get
      //? userDef.cache !== false
        //? createComputedGetter(key)
        //: userDef.get
      //: noop;
    //sharedPropertyDefinition.set = userDef.set
      //? userDef.set
      //: noop;
  //}
  //if ("development" !== 'production' &&
      //sharedPropertyDefinition.set === noop) {
    //sharedPropertyDefinition.set = function () {
      //warn(
        //("Computed property \"" + key + "\" was assigned to but it has no setter."),
        //this
      //);
    //};
  //}
  //Object.defineProperty(target, key, sharedPropertyDefinition);
//}

//function createComputedGetter (key) {
  //return function computedGetter () {
    //var watcher = this._computedWatchers && this._computedWatchers[key];
    //if (watcher) {
      //if (watcher.dirty) {
        //watcher.evaluate();
      //}
      //if (Dep.target) {
        //watcher.depend();
      //}
      //return watcher.value
    //}
  //}
//}

//function initMethods (vm, methods) {
  //"development" !== 'production' && checkOptionType(vm, 'methods');
  //var props = vm.$options.props;
  //for (var key in methods) {
    //vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    //{
      //if (methods[key] == null) {
        //warn(
          //"method \"" + key + "\" has an undefined value in the component definition. " +
          //"Did you reference the function correctly?",
          //vm
        //);
      //}
      //if (props && hasOwn(props, key)) {
        //warn(
          //("method \"" + key + "\" has already been defined as a prop."),
          //vm
        //);
      //}
    //}
  //}
//}

//function initWatch (vm, watch) {
  //"development" !== 'production' && checkOptionType(vm, 'watch');
  //for (var key in watch) {
    //var handler = watch[key];
    //if (Array.isArray(handler)) {
      //for (var i = 0; i < handler.length; i++) {
        //createWatcher(vm, key, handler[i]);
      //}
    //} else {
      //createWatcher(vm, key, handler);
    //}
  //}
//}

//function createWatcher (
  //vm,
  //keyOrFn,
  //handler,
  //options
//) {
  //if (isPlainObject(handler)) {
    //options = handler;
    //handler = handler.handler;
  //}
  //if (typeof handler === 'string') {
    //handler = vm[handler];
  //}
  //return vm.$watch(keyOrFn, handler, options)
//}

//function stateMixin (Vue) {
  //// flow somehow has problems with directly declared definition object
  //// when using Object.defineProperty, so we have to procedurally build up
  //// the object here.
  //var dataDef = {};
  //dataDef.get = function () { return this._data };
  //var propsDef = {};
  //propsDef.get = function () { return this._props };
  //{
    //dataDef.set = function (newData) {
      //warn(
        //'Avoid replacing instance root $data. ' +
        //'Use nested data properties instead.',
        //this
      //);
    //};
    //propsDef.set = function () {
      //warn("$props is readonly.", this);
    //};
  //}
  //Object.defineProperty(Vue.prototype, '$data', dataDef);
  //Object.defineProperty(Vue.prototype, '$props', propsDef);

  //Vue.prototype.$set = set;
  //Vue.prototype.$delete = del;

  //Vue.prototype.$watch = function (
    //expOrFn,
    //cb,
    //options
  //) {
    //var vm = this;
    //if (isPlainObject(cb)) {
      //return createWatcher(vm, expOrFn, cb, options)
    //}
    //options = options || {};
    //options.user = true;
    //var watcher = new Watcher(vm, expOrFn, cb, options);
    //if (options.immediate) {
      //cb.call(vm, watcher.value);
    //}
    //return function unwatchFn () {
      //watcher.teardown();
    //}
  //};
//}

//[>  <]

//function initProvide (vm) {
  //var provide = vm.$options.provide;
  //if (provide) {
    //vm._provided = typeof provide === 'function'
      //? provide.call(vm)
      //: provide;
  //}
//}

//function initInjections (vm) {
  //var result = resolveInject(vm.$options.inject, vm);
  //if (result) {
    //observerState.shouldConvert = false;
    //Object.keys(result).forEach(function (key) {
      //[> istanbul ignore else <]
      //{
        //defineReactive$$1(vm, key, result[key], function () {
          //warn(
            //"Avoid mutating an injected value directly since the changes will be " +
            //"overwritten whenever the provided component re-renders. " +
            //"injection being mutated: \"" + key + "\"",
            //vm
          //);
        //});
      //}
    //});
    //observerState.shouldConvert = true;
  //}
//}

//function resolveInject (inject, vm) {
  //if (inject) {
    //// inject is :any because flow is not smart enough to figure out cached
    //var result = Object.create(null);
    //var keys = hasSymbol
        //? Reflect.ownKeys(inject)
        //: Object.keys(inject);

    //for (var i = 0; i < keys.length; i++) {
      //var key = keys[i];
      //var provideKey = inject[key];
      //var source = vm;
      //while (source) {
        //if (source._provided && provideKey in source._provided) {
          //result[key] = source._provided[provideKey];
          //break
        //}
        //source = source.$parent;
      //}
      //if ("development" !== 'production' && !source) {
        //warn(("Injection \"" + key + "\" not found"), vm);
      //}
    //}
    //return result
  //}
//}

//[>  <]

//function createFunctionalComponent (
  //Ctor,
  //propsData,
  //data,
  //context,
  //children
//) {
  //var props = {};
  //var propOptions = Ctor.options.props;
  //if (isDef(propOptions)) {
    //for (var key in propOptions) {
      //props[key] = validateProp(key, propOptions, propsData || {});
    //}
  //} else {
    //if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    //if (isDef(data.props)) { mergeProps(props, data.props); }
  //}
  //// ensure the createElement function in functional components
  //// gets a unique context - this is necessary for correct named slot check
  //var _context = Object.create(context);
  //var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  //var vnode = Ctor.options.render.call(null, h, {
    //data: data,
    //props: props,
    //children: children,
    //parent: context,
    //listeners: data.on || {},
    //injections: resolveInject(Ctor.options.inject, context),
    //slots: function () { return resolveSlots(children, context); }
  //});
  //if (vnode instanceof VNode) {
    //vnode.functionalContext = context;
    //vnode.functionalOptions = Ctor.options;
    //if (data.slot) {
      //(vnode.data || (vnode.data = {})).slot = data.slot;
    //}
  //}
  //return vnode
//}

//function mergeProps (to, from) {
  //for (var key in from) {
    //to[camelize(key)] = from[key];
  //}
//}

//[>  <]

//// hooks to be invoked on component VNodes during patch
//var componentVNodeHooks = {
  //init: function init (
    //vnode,
    //hydrating,
    //parentElm,
    //refElm
  //) {
    //if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      //var child = vnode.componentInstance = createComponentInstanceForVnode(
        //vnode,
        //activeInstance,
        //parentElm,
        //refElm
      //);
      //child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    //} else if (vnode.data.keepAlive) {
      //// kept-alive components, treat as a patch
      //var mountedNode = vnode; // work around flow
      //componentVNodeHooks.prepatch(mountedNode, mountedNode);
    //}
  //},

  //prepatch: function prepatch (oldVnode, vnode) {
    //var options = vnode.componentOptions;
    //var child = vnode.componentInstance = oldVnode.componentInstance;
    //updateChildComponent(
      //child,
      //options.propsData, // updated props
      //options.listeners, // updated listeners
      //vnode, // new parent vnode
      //options.children // new children
    //);
  //},

  //insert: function insert (vnode) {
    //var context = vnode.context;
    //var componentInstance = vnode.componentInstance;
    //if (!componentInstance._isMounted) {
      //componentInstance._isMounted = true;
      //callHook(componentInstance, 'mounted');
    //}
    //if (vnode.data.keepAlive) {
      //if (context._isMounted) {
        //// vue-router#1212
        //// During updates, a kept-alive component's child components may
        //// change, so directly walking the tree here may call activated hooks
        //// on incorrect children. Instead we push them into a queue which will
        //// be processed after the whole patch process ended.
        //queueActivatedComponent(componentInstance);
      //} else {
        //activateChildComponent(componentInstance, true [> direct <]);
      //}
    //}
  //},

  //destroy: function destroy (vnode) {
    //var componentInstance = vnode.componentInstance;
    //if (!componentInstance._isDestroyed) {
      //if (!vnode.data.keepAlive) {
        //componentInstance.$destroy();
      //} else {
        //deactivateChildComponent(componentInstance, true [> direct <]);
      //}
    //}
  //}
//};

//var hooksToMerge = Object.keys(componentVNodeHooks);

//function createComponent (
  //Ctor,
  //data,
  //context,
  //children,
  //tag
//) {
  //if (isUndef(Ctor)) {
    //return
  //}

  //var baseCtor = context.$options._base;

  //// plain options object: turn it into a constructor
  //if (isObject(Ctor)) {
    //Ctor = baseCtor.extend(Ctor);
  //}

  //// if at this stage it's not a constructor or an async component factory,
  //// reject.
  //if (typeof Ctor !== 'function') {
    //{
      //warn(("Invalid Component definition: " + (String(Ctor))), context);
    //}
    //return
  //}

  //// async component
  //var asyncFactory;
  //if (isUndef(Ctor.cid)) {
    //asyncFactory = Ctor;
    //Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    //if (Ctor === undefined) {
      //// return a placeholder node for async component, which is rendered
      //// as a comment node but preserves all the raw information for the node.
      //// the information will be used for async server-rendering and hydration.
      //return createAsyncPlaceholder(
        //asyncFactory,
        //data,
        //context,
        //children,
        //tag
      //)
    //}
  //}

  //data = data || {};

  //// resolve constructor options in case global mixins are applied after
  //// component constructor creation
  //resolveConstructorOptions(Ctor);

  //// transform component v-model data into props & events
  //if (isDef(data.model)) {
    //transformModel(Ctor.options, data);
  //}

  //// extract props
  //var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  //// functional component
  //if (isTrue(Ctor.options.functional)) {
    //return createFunctionalComponent(Ctor, propsData, data, context, children)
  //}

  //// extract listeners, since these needs to be treated as
  //// child component listeners instead of DOM listeners
  //var listeners = data.on;
  //// replace with listeners with .native modifier
  //// so it gets processed during parent component patch.
  //data.on = data.nativeOn;

  //if (isTrue(Ctor.options.abstract)) {
    //// abstract components do not keep anything
    //// other than props & listeners & slot

    //// work around flow
    //var slot = data.slot;
    //data = {};
    //if (slot) {
      //data.slot = slot;
    //}
  //}

  //// merge component management hooks onto the placeholder node
  //mergeHooks(data);

  //// return a placeholder vnode
  //var name = Ctor.options.name || tag;
  //var vnode = new VNode(
    //("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    //data, undefined, undefined, undefined, context,
    //{ Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    //asyncFactory
  //);
  //return vnode
//}

//function createComponentInstanceForVnode (
  //vnode, // we know it's MountedComponentVNode but flow doesn't
  //parent, // activeInstance in lifecycle state
  //parentElm,
  //refElm
//) {
  //var vnodeComponentOptions = vnode.componentOptions;
  //var options = {
    //_isComponent: true,
    //parent: parent,
    //propsData: vnodeComponentOptions.propsData,
    //_componentTag: vnodeComponentOptions.tag,
    //_parentVnode: vnode,
    //_parentListeners: vnodeComponentOptions.listeners,
    //_renderChildren: vnodeComponentOptions.children,
    //_parentElm: parentElm || null,
    //_refElm: refElm || null
  //};
  //// check inline-template render functions
  //var inlineTemplate = vnode.data.inlineTemplate;
  //if (isDef(inlineTemplate)) {
    //options.render = inlineTemplate.render;
    //options.staticRenderFns = inlineTemplate.staticRenderFns;
  //}
  //return new vnodeComponentOptions.Ctor(options)
//}

//function mergeHooks (data) {
  //if (!data.hook) {
    //data.hook = {};
  //}
  //for (var i = 0; i < hooksToMerge.length; i++) {
    //var key = hooksToMerge[i];
    //var fromParent = data.hook[key];
    //var ours = componentVNodeHooks[key];
    //data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  //}
//}

//function mergeHook$1 (one, two) {
  //return function (a, b, c, d) {
    //one(a, b, c, d);
    //two(a, b, c, d);
  //}
//}

//// transform component v-model info (value and callback) into
//// prop and event handler respectively.
//function transformModel (options, data) {
  //var prop = (options.model && options.model.prop) || 'value';
  //var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  //var on = data.on || (data.on = {});
  //if (isDef(on[event])) {
    //on[event] = [data.model.callback].concat(on[event]);
  //} else {
    //on[event] = data.model.callback;
  //}
//}

//[>  <]

//var SIMPLE_NORMALIZE = 1;
//var ALWAYS_NORMALIZE = 2;

//// wrapper function for providing a more flexible interface
//// without getting yelled at by flow
//function createElement (
  //context,
  //tag,
  //data,
  //children,
  //normalizationType,
  //alwaysNormalize
//) {
  //if (Array.isArray(data) || isPrimitive(data)) {
    //normalizationType = children;
    //children = data;
    //data = undefined;
  //}
  //if (isTrue(alwaysNormalize)) {
    //normalizationType = ALWAYS_NORMALIZE;
  //}
  //return _createElement(context, tag, data, children, normalizationType)
//}

//function _createElement (
  //context,
  //tag,
  //data,
  //children,
  //normalizationType
//) {
  //if (isDef(data) && isDef((data).__ob__)) {
    //"development" !== 'production' && warn(
      //"Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      //'Always create fresh vnode data objects in each render!',
      //context
    //);
    //return createEmptyVNode()
  //}
  //// object syntax in v-bind
  //if (isDef(data) && isDef(data.is)) {
    //tag = data.is;
  //}
  //if (!tag) {
    //// in case of component :is set to falsy value
    //return createEmptyVNode()
  //}
  //// warn against non-primitive key
  //if ("development" !== 'production' &&
    //isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  //) {
    //warn(
      //'Avoid using non-primitive value as key, ' +
      //'use string/number value instead.',
      //context
    //);
  //}
  //// support single function children as default scoped slot
  //if (Array.isArray(children) &&
    //typeof children[0] === 'function'
  //) {
    //data = data || {};
    //data.scopedSlots = { default: children[0] };
    //children.length = 0;
  //}
  //if (normalizationType === ALWAYS_NORMALIZE) {
    //children = normalizeChildren(children);
  //} else if (normalizationType === SIMPLE_NORMALIZE) {
    //children = simpleNormalizeChildren(children);
  //}
  //var vnode, ns;
  //if (typeof tag === 'string') {
    //var Ctor;
    //ns = config.getTagNamespace(tag);
    //if (config.isReservedTag(tag)) {
      //// platform built-in elements
      //vnode = new VNode(
        //config.parsePlatformTagName(tag), data, children,
        //undefined, undefined, context
      //);
    //} else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      //// component
      //vnode = createComponent(Ctor, data, context, children, tag);
    //} else {
      //// unknown or unlisted namespaced elements
      //// check at runtime because it may get assigned a namespace when its
      //// parent normalizes children
      //vnode = new VNode(
        //tag, data, children,
        //undefined, undefined, context
      //);
    //}
  //} else {
    //// direct component options / constructor
    //vnode = createComponent(tag, data, context, children);
  //}
  //if (isDef(vnode)) {
    //if (ns) { applyNS(vnode, ns); }
    //return vnode
  //} else {
    //return createEmptyVNode()
  //}
//}

//function applyNS (vnode, ns) {
  //vnode.ns = ns;
  //if (vnode.tag === 'foreignObject') {
    //// use default namespace inside foreignObject
    //return
  //}
  //if (isDef(vnode.children)) {
    //for (var i = 0, l = vnode.children.length; i < l; i++) {
      //var child = vnode.children[i];
      //if (isDef(child.tag) && isUndef(child.ns)) {
        //applyNS(child, ns);
      //}
    //}
  //}
//}

//[>  <]

/**
 * Runtime helper for rendering v-for lists.
 */
//function renderList (
  //val,
  //render
//) {
  //var ret, i, l, keys, key;
  //if (Array.isArray(val) || typeof val === 'string') {
    //ret = new Array(val.length);
    //for (i = 0, l = val.length; i < l; i++) {
      //ret[i] = render(val[i], i);
    //}
  //} else if (typeof val === 'number') {
    //ret = new Array(val);
    //for (i = 0; i < val; i++) {
      //ret[i] = render(i + 1, i);
    //}
  //} else if (isObject(val)) {
    //keys = Object.keys(val);
    //ret = new Array(keys.length);
    //for (i = 0, l = keys.length; i < l; i++) {
      //key = keys[i];
      //ret[i] = render(val[key], key, i);
    //}
  //}
  //if (isDef(ret)) {
    //(ret)._isVList = true;
  //}
  //return ret
//}

//[>  <]

/**
 * Runtime helper for rendering <slot>
 */
//function renderSlot (
  //name,
  //fallback,
  //props,
  //bindObject
//) {
  //var scopedSlotFn = this.$scopedSlots[name];
  //if (scopedSlotFn) { // scoped slot
    //props = props || {};
    //if (bindObject) {
      //props = extend(extend({}, bindObject), props);
    //}
    //return scopedSlotFn(props) || fallback
  //} else {
    //var slotNodes = this.$slots[name];
    //// warn duplicate slot usage
    //if (slotNodes && "development" !== 'production') {
      //slotNodes._rendered && warn(
        //"Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        //"- this will likely cause render errors.",
        //this
      //);
      //slotNodes._rendered = true;
    //}
    //return slotNodes || fallback
  //}
//}

//[>  <]

/**
 * Runtime helper for resolving filters
 */
//function resolveFilter (id) {
  //return resolveAsset(this.$options, 'filters', id, true) || identity
//}

//[>  <]

/**
 * Runtime helper for checking keyCodes from config.
 */
//function checkKeyCodes (
  //eventKeyCode,
  //key,
  //builtInAlias
//) {
  //var keyCodes = config.keyCodes[key] || builtInAlias;
  //if (Array.isArray(keyCodes)) {
    //return keyCodes.indexOf(eventKeyCode) === -1
  //} else {
    //return keyCodes !== eventKeyCode
  //}
//}

//[>  <]

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
//function bindObjectProps (
  //data,
  //tag,
  //value,
  //asProp,
  //isSync
//) {
  //if (value) {
    //if (!isObject(value)) {
      //"development" !== 'production' && warn(
        //'v-bind without argument expects an Object or Array value',
        //this
      //);
    //} else {
      //if (Array.isArray(value)) {
        //value = toObject(value);
      //}
      //var hash;
      //var loop = function ( key ) {
        //if (
          //key === 'class' ||
          //key === 'style' ||
          //isReservedAttribute(key)
        //) {
          //hash = data;
        //} else {
          //var type = data.attrs && data.attrs.type;
          //hash = asProp || config.mustUseProp(tag, type, key)
            //? data.domProps || (data.domProps = {})
            //: data.attrs || (data.attrs = {});
        //}
        //if (!(key in hash)) {
          //hash[key] = value[key];

          //if (isSync) {
            //var on = data.on || (data.on = {});
            //on[("update:" + key)] = function ($event) {
              //value[key] = $event;
            //};
          //}
        //}
      //};

      //for (var key in value) loop( key );
    //}
  //}
  //return data
//}

//[>  <]

/**
 * Runtime helper for rendering static trees.
 */
//function renderStatic (
  //index,
  //isInFor
//) {
  //var tree = this._staticTrees[index];
  //// if has already-rendered static tree and not inside v-for,
  //// we can reuse the same tree by doing a shallow clone.
  //if (tree && !isInFor) {
    //return Array.isArray(tree)
      //? cloneVNodes(tree)
      //: cloneVNode(tree)
  //}
  //// otherwise, render a fresh tree.
  //tree = this._staticTrees[index] =
    //this.$options.staticRenderFns[index].call(this._renderProxy);
  //markStatic(tree, ("__static__" + index), false);
  //return tree
//}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
//function markOnce (
  //tree,
  //index,
  //key
//) {
  //markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  //return tree
//}

//function markStatic (
  //tree,
  //key,
  //isOnce
//) {
  //if (Array.isArray(tree)) {
    //for (var i = 0; i < tree.length; i++) {
      //if (tree[i] && typeof tree[i] !== 'string') {
        //markStaticNode(tree[i], (key + "_" + i), isOnce);
      //}
    //}
  //} else {
    //markStaticNode(tree, key, isOnce);
  //}
//}

//function markStaticNode (node, key, isOnce) {
  //node.isStatic = true;
  //node.key = key;
  //node.isOnce = isOnce;
//}

//[>  <]

//function bindObjectListeners (data, value) {
  //if (value) {
    //if (!isPlainObject(value)) {
      //"development" !== 'production' && warn(
        //'v-on without argument expects an Object value',
        //this
      //);
    //} else {
      //var on = data.on = data.on ? extend({}, data.on) : {};
      //for (var key in value) {
        //var existing = on[key];
        //var ours = value[key];
        //on[key] = existing ? [].concat(ours, existing) : ours;
      //}
    //}
  //}
  //return data
//}

//[>  <]

//function initRender (vm) {
  //vm._vnode = null; // the root of the child tree
  //vm._staticTrees = null;
  //var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  //var renderContext = parentVnode && parentVnode.context;
  //vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  //vm.$scopedSlots = emptyObject;
  //// bind the createElement fn to this instance
  //// so that we get proper render context inside it.
  //// args order: tag, data, children, normalizationType, alwaysNormalize
  //// internal version is used by render functions compiled from templates
  //vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  //// normalization is always applied for the public version, used in
  //// user-written render functions.
  //vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  //// $attrs & $listeners are exposed for easier HOC creation.
  //// they need to be reactive so that HOCs using them are always updated
  //var parentData = parentVnode && parentVnode.data;
  //[> istanbul ignore else <]
  //{
    //defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
      //!isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    //}, true);
    //defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
      //!isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    //}, true);
  //}
//}

//function renderMixin (Vue) {
  //Vue.prototype.$nextTick = function (fn) {
    //return nextTick(fn, this)
  //};

  //Vue.prototype._render = function () {
    //var vm = this;
    //var ref = vm.$options;
    //var render = ref.render;
    //var staticRenderFns = ref.staticRenderFns;
    //var _parentVnode = ref._parentVnode;

    //if (vm._isMounted) {
      //// clone slot nodes on re-renders
      //for (var key in vm.$slots) {
        //vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      //}
    //}

    //vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    //if (staticRenderFns && !vm._staticTrees) {
      //vm._staticTrees = [];
    //}
    //// set parent vnode. this allows render functions to have access
    //// to the data on the placeholder node.
    //vm.$vnode = _parentVnode;
    //// render self
    //var vnode;
    //try {
      //vnode = render.call(vm._renderProxy, vm.$createElement);
    //} catch (e) {
      //handleError(e, vm, "render function");
      //// return error render result,
      //// or previous vnode to prevent render error causing blank component
      //[> istanbul ignore else <]
      //{
        //vnode = vm.$options.renderError
          //? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          //: vm._vnode;
      //}
    //}
    //// return empty vnode in case the render function errored out
    //if (!(vnode instanceof VNode)) {
      //if ("development" !== 'production' && Array.isArray(vnode)) {
        //warn(
          //'Multiple root nodes returned from render function. Render function ' +
          //'should return a single root node.',
          //vm
        //);
      //}
      //vnode = createEmptyVNode();
    //}
    //// set parent
    //vnode.parent = _parentVnode;
    //return vnode
  //};

  //// internal render helpers.
  //// these are exposed on the instance prototype to reduce generated render
  //// code size.
  //Vue.prototype._o = markOnce;
  //Vue.prototype._n = toNumber;
  //Vue.prototype._s = toString;
  //Vue.prototype._l = renderList;
  //Vue.prototype._t = renderSlot;
  //Vue.prototype._q = looseEqual;
  //Vue.prototype._i = looseIndexOf;
  //Vue.prototype._m = renderStatic;
  //Vue.prototype._f = resolveFilter;
  //Vue.prototype._k = checkKeyCodes;
  //Vue.prototype._b = bindObjectProps;
  //Vue.prototype._v = createTextVNode;
  //Vue.prototype._e = createEmptyVNode;
  //Vue.prototype._u = resolveScopedSlots;
  //Vue.prototype._g = bindObjectListeners;
//}

//[>  <]

//var uid$1 = 0;

//function initMixin (Vue) {
  //Vue.prototype._init = function (options) {
    //var vm = this;
    //// a uid
    //vm._uid = uid$1++;

    //var startTag, endTag;
    //[> istanbul ignore if <]
    //if ("development" !== 'production' && config.performance && mark) {
      //startTag = "vue-perf-init:" + (vm._uid);
      //endTag = "vue-perf-end:" + (vm._uid);
      //mark(startTag);
    //}

    //// a flag to avoid this being observed
    //vm._isVue = true;
    //// merge options
    //if (options && options._isComponent) {
      //// optimize internal component instantiation
      //// since dynamic options merging is pretty slow, and none of the
      //// internal component options needs special treatment.
      //initInternalComponent(vm, options);
    //} else {
      //vm.$options = mergeOptions(
        //resolveConstructorOptions(vm.constructor),
        //options || {},
        //vm
      //);
    //}
    //[> istanbul ignore else <]
    //{
      //initProxy(vm);
    //}
    //// expose real self
    //vm._self = vm;
    //initLifecycle(vm);
    //initEvents(vm);
    //initRender(vm);
    //callHook(vm, 'beforeCreate');
    //initInjections(vm); // resolve injections before data/props
    //initState(vm);
    //initProvide(vm); // resolve provide after data/props
    //callHook(vm, 'created');

    //[> istanbul ignore if <]
    //if ("development" !== 'production' && config.performance && mark) {
      //vm._name = formatComponentName(vm, false);
      //mark(endTag);
      //measure(((vm._name) + " init"), startTag, endTag);
    //}

    //if (vm.$options.el) {
      //vm.$mount(vm.$options.el);
    //}
  //};
//}

//function initInternalComponent (vm, options) {
  //var opts = vm.$options = Object.create(vm.constructor.options);
  //// doing this because it's faster than dynamic enumeration.
  //opts.parent = options.parent;
  //opts.propsData = options.propsData;
  //opts._parentVnode = options._parentVnode;
  //opts._parentListeners = options._parentListeners;
  //opts._renderChildren = options._renderChildren;
  //opts._componentTag = options._componentTag;
  //opts._parentElm = options._parentElm;
  //opts._refElm = options._refElm;
  //if (options.render) {
    //opts.render = options.render;
    //opts.staticRenderFns = options.staticRenderFns;
  //}
//}

//function resolveConstructorOptions (Ctor) {
  //var options = Ctor.options;
  //if (Ctor.super) {
    //var superOptions = resolveConstructorOptions(Ctor.super);
    //var cachedSuperOptions = Ctor.superOptions;
    //if (superOptions !== cachedSuperOptions) {
      //// super option changed,
      //// need to resolve new options.
      //Ctor.superOptions = superOptions;
      //// check if there are any late-modified/attached options (#4976)
      //var modifiedOptions = resolveModifiedOptions(Ctor);
      //// update base extend options
      //if (modifiedOptions) {
        //extend(Ctor.extendOptions, modifiedOptions);
      //}
      //options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      //if (options.name) {
        //options.components[options.name] = Ctor;
      //}
    //}
  //}
  //return options
//}

//function resolveModifiedOptions (Ctor) {
  //var modified;
  //var latest = Ctor.options;
  //var extended = Ctor.extendOptions;
  //var sealed = Ctor.sealedOptions;
  //for (var key in latest) {
    //if (latest[key] !== sealed[key]) {
      //if (!modified) { modified = {}; }
      //modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    //}
  //}
  //return modified
//}

//function dedupe (latest, extended, sealed) {
  //// compare latest and sealed to ensure lifecycle hooks won't be duplicated
  //// between merges
  //if (Array.isArray(latest)) {
    //var res = [];
    //sealed = Array.isArray(sealed) ? sealed : [sealed];
    //extended = Array.isArray(extended) ? extended : [extended];
    //for (var i = 0; i < latest.length; i++) {
      //// push original options and not sealed options to exclude duplicated options
      //if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        //res.push(latest[i]);
      //}
    //}
    //return res
  //} else {
    //return latest
  //}
//}

//function Vue$3 (options) {
  //if ("development" !== 'production' &&
    //!(this instanceof Vue$3)
  //) {
    //warn('Vue is a constructor and should be called with the `new` keyword');
  //}
  //this._init(options);
//}

//initMixin(Vue$3);
//stateMixin(Vue$3);
//eventsMixin(Vue$3);
//lifecycleMixin(Vue$3);
//renderMixin(Vue$3);

//[>  <]

//function initUse (Vue) {
  //Vue.use = function (plugin) {
    //var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    //if (installedPlugins.indexOf(plugin) > -1) {
      //return this
    //}

    //// additional parameters
    //var args = toArray(arguments, 1);
    //args.unshift(this);
    //if (typeof plugin.install === 'function') {
      //plugin.install.apply(plugin, args);
    //} else if (typeof plugin === 'function') {
      //plugin.apply(null, args);
    //}
    //installedPlugins.push(plugin);
    //return this
  //};
//}

//[>  <]

//function initMixin$1 (Vue) {
  //Vue.mixin = function (mixin) {
    //this.options = mergeOptions(this.options, mixin);
    //return this
  //};
//}

//[>  <]

//function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  //Vue.cid = 0;
  //var cid = 1;

  /**
   * Class inheritance
   */
  //Vue.extend = function (extendOptions) {
    //extendOptions = extendOptions || {};
    //var Super = this;
    //var SuperId = Super.cid;
    //var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    //if (cachedCtors[SuperId]) {
      //return cachedCtors[SuperId]
    //}

    //var name = extendOptions.name || Super.options.name;
    //{
      //if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        //warn(
          //'Invalid component name: "' + name + '". Component names ' +
          //'can only contain alphanumeric characters and the hyphen, ' +
          //'and must start with a letter.'
        //);
      //}
    //}

    //var Sub = function VueComponent (options) {
      //this._init(options);
    //};
    //Sub.prototype = Object.create(Super.prototype);
    //Sub.prototype.constructor = Sub;
    //Sub.cid = cid++;
    //Sub.options = mergeOptions(
      //Super.options,
      //extendOptions
    //);
    //Sub['super'] = Super;

    //// For props and computed properties, we define the proxy getters on
    //// the Vue instances at extension time, on the extended prototype. This
    //// avoids Object.defineProperty calls for each instance created.
    //if (Sub.options.props) {
      //initProps$1(Sub);
    //}
    //if (Sub.options.computed) {
      //initComputed$1(Sub);
    //}

    //// allow further extension/mixin/plugin usage
    //Sub.extend = Super.extend;
    //Sub.mixin = Super.mixin;
    //Sub.use = Super.use;

    //// create asset registers, so extended classes
    //// can have their private assets too.
    //ASSET_TYPES.forEach(function (type) {
      //Sub[type] = Super[type];
    //});
    //// enable recursive self-lookup
    //if (name) {
      //Sub.options.components[name] = Sub;
    //}

    //// keep a reference to the super options at extension time.
    //// later at instantiation we can check if Super's options have
    //// been updated.
    //Sub.superOptions = Super.options;
    //Sub.extendOptions = extendOptions;
    //Sub.sealedOptions = extend({}, Sub.options);

    //// cache constructor
    //cachedCtors[SuperId] = Sub;
    //return Sub
  //};
//}

//function initProps$1 (Comp) {
  //var props = Comp.options.props;
  //for (var key in props) {
    //proxy(Comp.prototype, "_props", key);
  //}
//}

//function initComputed$1 (Comp) {
  //var computed = Comp.options.computed;
  //for (var key in computed) {
    //defineComputed(Comp.prototype, key, computed[key]);
  //}
//}

//[>  <]

//function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  //ASSET_TYPES.forEach(function (type) {
    //Vue[type] = function (
      //id,
      //definition
    //) {
      //if (!definition) {
        //return this.options[type + 's'][id]
      //} else {
        //[> istanbul ignore if <]
        //{
          //if (type === 'component' && config.isReservedTag(id)) {
            //warn(
              //'Do not use built-in or reserved HTML elements as component ' +
              //'id: ' + id
            //);
          //}
        //}
        //if (type === 'component' && isPlainObject(definition)) {
          //definition.name = definition.name || id;
          //definition = this.options._base.extend(definition);
        //}
        //if (type === 'directive' && typeof definition === 'function') {
          //definition = { bind: definition, update: definition };
        //}
        //this.options[type + 's'][id] = definition;
        //return definition
      //}
    //};
  //});
//}

//[>  <]

//var patternTypes = [String, RegExp, Array];

//function getComponentName (opts) {
  //return opts && (opts.Ctor.options.name || opts.tag)
//}

//function matches (pattern, name) {
  //if (Array.isArray(pattern)) {
    //return pattern.indexOf(name) > -1
  //} else if (typeof pattern === 'string') {
    //return pattern.split(',').indexOf(name) > -1
  //} else if (isRegExp(pattern)) {
    //return pattern.test(name)
  //}
  //[> istanbul ignore next <]
  //return false
//}

//function pruneCache (cache, current, filter) {
  //for (var key in cache) {
    //var cachedNode = cache[key];
    //if (cachedNode) {
      //var name = getComponentName(cachedNode.componentOptions);
      //if (name && !filter(name)) {
        //if (cachedNode !== current) {
          //pruneCacheEntry(cachedNode);
        //}
        //cache[key] = null;
      //}
    //}
  //}
//}

//function pruneCacheEntry (vnode) {
  //if (vnode) {
    //vnode.componentInstance.$destroy();
  //}
//}

//var KeepAlive = {
  //name: 'keep-alive',
  //abstract: true,

  //props: {
    //include: patternTypes,
    //exclude: patternTypes
  //},

  //created: function created () {
    //this.cache = Object.create(null);
  //},

  //destroyed: function destroyed () {
    //var this$1 = this;

    //for (var key in this$1.cache) {
      //pruneCacheEntry(this$1.cache[key]);
    //}
  //},

  //watch: {
    //include: function include (val) {
      //pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    //},
    //exclude: function exclude (val) {
      //pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    //}
  //},

  //render: function render () {
    //var vnode = getFirstComponentChild(this.$slots.default);
    //var componentOptions = vnode && vnode.componentOptions;
    //if (componentOptions) {
      //// check pattern
      //var name = getComponentName(componentOptions);
      //if (name && (
        //(this.include && !matches(this.include, name)) ||
        //(this.exclude && matches(this.exclude, name))
      //)) {
        //return vnode
      //}
      //var key = vnode.key == null
        //// same constructor may get registered as different local components
        //// so cid alone is not enough (#3269)
        //? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        //: vnode.key;
      //if (this.cache[key]) {
        //vnode.componentInstance = this.cache[key].componentInstance;
      //} else {
        //this.cache[key] = vnode;
      //}
      //vnode.data.keepAlive = true;
    //}
    //return vnode
  //}
//};

//var builtInComponents = {
  //KeepAlive: KeepAlive
//};

//[>  <]

//function initGlobalAPI (Vue) {
  //// config
  //var configDef = {};
  //configDef.get = function () { return config; };
  //{
    //configDef.set = function () {
      //warn(
        //'Do not replace the Vue.config object, set individual fields instead.'
      //);
    //};
  //}
  //Object.defineProperty(Vue, 'config', configDef);

  //// exposed util methods.
  //// NOTE: these are not considered part of the public API - avoid relying on
  //// them unless you are aware of the risk.
  //Vue.util = {
    //warn: warn,
    //extend: extend,
    //mergeOptions: mergeOptions,
    //defineReactive: defineReactive$$1
  //};

  //Vue.set = set;
  //Vue.delete = del;
  //Vue.nextTick = nextTick;

  //Vue.options = Object.create(null);
  //ASSET_TYPES.forEach(function (type) {
    //Vue.options[type + 's'] = Object.create(null);
  //});

  //// this is used to identify the "base" constructor to extend all plain-object
  //// components with in Weex's multi-instance scenarios.
  //Vue.options._base = Vue;

  //extend(Vue.options.components, builtInComponents);

  //initUse(Vue);
  //initMixin$1(Vue);
  //initExtend(Vue);
  //initAssetRegisters(Vue);
//}

//initGlobalAPI(Vue$3);

//Object.defineProperty(Vue$3.prototype, '$isServer', {
  //get: isServerRendering
//});

//Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  //get: function get () {
    //[> istanbul ignore next <]
    //return this.$vnode && this.$vnode.ssrContext
  //}
//});

//Vue$3.version = '2.4.2';

//[>  <]

//// these are reserved for web because they are directly compiled away
//// during template compilation
//var isReservedAttr = makeMap('style,class');

//// attributes that should be using props for binding
//var acceptValue = makeMap('input,textarea,option,select');
//var mustUseProp = function (tag, type, attr) {
  //return (
    //(attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    //(attr === 'selected' && tag === 'option') ||
    //(attr === 'checked' && tag === 'input') ||
    //(attr === 'muted' && tag === 'video')
  //)
//};

//var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

//var isBooleanAttr = makeMap(
  //'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  //'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  //'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  //'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  //'required,reversed,scoped,seamless,selected,sortable,translate,' +
  //'truespeed,typemustmatch,visible'
//);

//var xlinkNS = 'http://www.w3.org/1999/xlink';

//var isXlink = function (name) {
  //return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
//};

//var getXlinkProp = function (name) {
  //return isXlink(name) ? name.slice(6, name.length) : ''
//};

//var isFalsyAttrValue = function (val) {
  //return val == null || val === false
//};

//[>  <]

//function genClassForVnode (vnode) {
  //var data = vnode.data;
  //var parentNode = vnode;
  //var childNode = vnode;
  //while (isDef(childNode.componentInstance)) {
    //childNode = childNode.componentInstance._vnode;
    //if (childNode.data) {
      //data = mergeClassData(childNode.data, data);
    //}
  //}
  //while (isDef(parentNode = parentNode.parent)) {
    //if (parentNode.data) {
      //data = mergeClassData(data, parentNode.data);
    //}
  //}
  //return renderClass(data.staticClass, data.class)
//}

//function mergeClassData (child, parent) {
  //return {
    //staticClass: concat(child.staticClass, parent.staticClass),
    //class: isDef(child.class)
      //? [child.class, parent.class]
      //: parent.class
  //}
//}

//function renderClass (
  //staticClass,
  //dynamicClass
//) {
  //if (isDef(staticClass) || isDef(dynamicClass)) {
    //return concat(staticClass, stringifyClass(dynamicClass))
  //}
  //[> istanbul ignore next <]
  //return ''
//}

//function concat (a, b) {
  //return a ? b ? (a + ' ' + b) : a : (b || '')
//}

//function stringifyClass (value) {
  //if (Array.isArray(value)) {
    //return stringifyArray(value)
  //}
  //if (isObject(value)) {
    //return stringifyObject(value)
  //}
  //if (typeof value === 'string') {
    //return value
  //}
  //[> istanbul ignore next <]
  //return ''
//}

//function stringifyArray (value) {
  //var res = '';
  //var stringified;
  //for (var i = 0, l = value.length; i < l; i++) {
    //if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      //if (res) { res += ' '; }
      //res += stringified;
    //}
  //}
  //return res
//}

//function stringifyObject (value) {
  //var res = '';
  //for (var key in value) {
    //if (value[key]) {
      //if (res) { res += ' '; }
      //res += key;
    //}
  //}
  //return res
//}

//[>  <]

//var namespaceMap = {
  //svg: 'http://www.w3.org/2000/svg',
  //math: 'http://www.w3.org/1998/Math/MathML'
//};

//var isHTMLTag = makeMap(
  //'html,body,base,head,link,meta,style,title,' +
  //'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  //'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  //'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  //'s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  //'embed,object,param,source,canvas,script,noscript,del,ins,' +
  //'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  //'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  //'output,progress,select,textarea,' +
  //'details,dialog,menu,menuitem,summary,' +
  //'content,element,shadow,template,blockquote,iframe,tfoot'
//);

//// this map is intentionally selective, only covering SVG elements that may
//// contain child elements.
//var isSVG = makeMap(
  //'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  //'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  //'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  //true
//);

//var isPreTag = function (tag) { return tag === 'pre'; };

//var isReservedTag = function (tag) {
  //return isHTMLTag(tag) || isSVG(tag)
//};

//function getTagNamespace (tag) {
  //if (isSVG(tag)) {
    //return 'svg'
  //}
  //// basic support for MathML
  //// note it doesn't support other MathML elements being component roots
  //if (tag === 'math') {
    //return 'math'
  //}
//}

//var unknownElementCache = Object.create(null);
//function isUnknownElement (tag) {
  //[> istanbul ignore if <]
  //if (!inBrowser) {
    //return true
  //}
  //if (isReservedTag(tag)) {
    //return false
  //}
  //tag = tag.toLowerCase();
  //[> istanbul ignore if <]
  //if (unknownElementCache[tag] != null) {
    //return unknownElementCache[tag]
  //}
  //var el = document.createElement(tag);
  //if (tag.indexOf('-') > -1) {
    //// http://stackoverflow.com/a/28210364/1070244
    //return (unknownElementCache[tag] = (
      //el.constructor === window.HTMLUnknownElement ||
      //el.constructor === window.HTMLElement
    //))
  //} else {
    //return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  //}
//}

//[>  <]

/**
 * Query an element selector if it's not an element already.
 */
//function query (el) {
  //if (typeof el === 'string') {
    //var selected = document.querySelector(el);
    //if (!selected) {
      //"development" !== 'production' && warn(
        //'Cannot find element: ' + el
      //);
      //return document.createElement('div')
    //}
    //return selected
  //} else {
    //return el
  //}
//}

//[>  <]

//function createElement$1 (tagName, vnode) {
  //var elm = document.createElement(tagName);
  //if (tagName !== 'select') {
    //return elm
  //}
  //// false or null will remove the attribute but undefined will not
  //if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    //elm.setAttribute('multiple', 'multiple');
  //}
  //return elm
//}

//function createElementNS (namespace, tagName) {
  //return document.createElementNS(namespaceMap[namespace], tagName)
//}

//function createTextNode (text) {
  //return document.createTextNode(text)
//}

//function createComment (text) {
  //return document.createComment(text)
//}

//function insertBefore (parentNode, newNode, referenceNode) {
  //parentNode.insertBefore(newNode, referenceNode);
//}

//function removeChild (node, child) {
  //node.removeChild(child);
//}

//function appendChild (node, child) {
  //node.appendChild(child);
//}

//function parentNode (node) {
  //return node.parentNode
//}

//function nextSibling (node) {
  //return node.nextSibling
//}

//function tagName (node) {
  //return node.tagName
//}

//function setTextContent (node, text) {
  //node.textContent = text;
//}

//function setAttribute (node, key, val) {
  //node.setAttribute(key, val);
//}


//var nodeOps = Object.freeze({
  //createElement: createElement$1,
  //createElementNS: createElementNS,
  //createTextNode: createTextNode,
  //createComment: createComment,
  //insertBefore: insertBefore,
  //removeChild: removeChild,
  //appendChild: appendChild,
  //parentNode: parentNode,
  //nextSibling: nextSibling,
  //tagName: tagName,
  //setTextContent: setTextContent,
  //setAttribute: setAttribute
//});

//[>  <]

//var ref = {
  //create: function create (_, vnode) {
    //registerRef(vnode);
  //},
  //update: function update (oldVnode, vnode) {
    //if (oldVnode.data.ref !== vnode.data.ref) {
      //registerRef(oldVnode, true);
      //registerRef(vnode);
    //}
  //},
  //destroy: function destroy (vnode) {
    //registerRef(vnode, true);
  //}
//};

//function registerRef (vnode, isRemoval) {
  //var key = vnode.data.ref;
  //if (!key) { return }

  //var vm = vnode.context;
  //var ref = vnode.componentInstance || vnode.elm;
  //var refs = vm.$refs;
  //if (isRemoval) {
    //if (Array.isArray(refs[key])) {
      //remove(refs[key], ref);
    //} else if (refs[key] === ref) {
      //refs[key] = undefined;
    //}
  //} else {
    //if (vnode.data.refInFor) {
      //if (!Array.isArray(refs[key])) {
        //refs[key] = [ref];
      //} else if (refs[key].indexOf(ref) < 0) {
        //// $flow-disable-line
        //refs[key].push(ref);
      //}
    //} else {
      //refs[key] = ref;
    //}
  //}
//}

//[>*
 //* Virtual DOM patching algorithm based on Snabbdom by
 //* Simon Friis Vindum (@paldepind)
 //* Licensed under the MIT License
 //* https://github.com/paldepind/snabbdom/blob/master/LICENSE
 //*
 //* modified by Evan You (@yyx990803)
 //*

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

//var emptyNode = new VNode('', {}, []);

//var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

//function sameVnode (a, b) {
  //return (
    //a.key === b.key && (
      //(
        //a.tag === b.tag &&
        //a.isComment === b.isComment &&
        //isDef(a.data) === isDef(b.data) &&
        //sameInputType(a, b)
      //) || (
        //isTrue(a.isAsyncPlaceholder) &&
        //a.asyncFactory === b.asyncFactory &&
        //isUndef(b.asyncFactory.error)
      //)
    //)
  //)
//}

//// Some browsers do not support dynamically changing type for <input>
//// so they need to be treated as different nodes
//function sameInputType (a, b) {
  //if (a.tag !== 'input') { return true }
  //var i;
  //var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  //var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  //return typeA === typeB
//}

//function createKeyToOldIdx (children, beginIdx, endIdx) {
  //var i, key;
  //var map = {};
  //for (i = beginIdx; i <= endIdx; ++i) {
    //key = children[i].key;
    //if (isDef(key)) { map[key] = i; }
  //}
  //return map
//}

//function createPatchFunction (backend) {
  //var i, j;
  //var cbs = {};

  //var modules = backend.modules;
  //var nodeOps = backend.nodeOps;

  //for (i = 0; i < hooks.length; ++i) {
    //cbs[hooks[i]] = [];
    //for (j = 0; j < modules.length; ++j) {
      //if (isDef(modules[j][hooks[i]])) {
        //cbs[hooks[i]].push(modules[j][hooks[i]]);
      //}
    //}
  //}

  //function emptyNodeAt (elm) {
    //return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  //}

  //function createRmCb (childElm, listeners) {
    //function remove$$1 () {
      //if (--remove$$1.listeners === 0) {
        //removeNode(childElm);
      //}
    //}
    //remove$$1.listeners = listeners;
    //return remove$$1
  //}

  //function removeNode (el) {
    //var parent = nodeOps.parentNode(el);
    //// element may have already been removed due to v-html / v-text
    //if (isDef(parent)) {
      //nodeOps.removeChild(parent, el);
    //}
  //}

  //var inPre = 0;
  //function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    //vnode.isRootInsert = !nested; // for transition enter check
    //if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      //return
    //}

    //var data = vnode.data;
    //var children = vnode.children;
    //var tag = vnode.tag;
    //if (isDef(tag)) {
      //{
        //if (data && data.pre) {
          //inPre++;
        //}
        //if (
          //!inPre &&
          //!vnode.ns &&
          //!(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          //config.isUnknownElement(tag)
        //) {
          //warn(
            //'Unknown custom element: <' + tag + '> - did you ' +
            //'register the component correctly? For recursive components, ' +
            //'make sure to provide the "name" option.',
            //vnode.context
          //);
        //}
      //}
      //vnode.elm = vnode.ns
        //? nodeOps.createElementNS(vnode.ns, tag)
        //: nodeOps.createElement(tag, vnode);
      //setScope(vnode);

      //[> istanbul ignore if <]
      //{
        //createChildren(vnode, children, insertedVnodeQueue);
        //if (isDef(data)) {
          //invokeCreateHooks(vnode, insertedVnodeQueue);
        //}
        //insert(parentElm, vnode.elm, refElm);
      //}

      //if ("development" !== 'production' && data && data.pre) {
        //inPre--;
      //}
    //} else if (isTrue(vnode.isComment)) {
      //vnode.elm = nodeOps.createComment(vnode.text);
      //insert(parentElm, vnode.elm, refElm);
    //} else {
      //vnode.elm = nodeOps.createTextNode(vnode.text);
      //insert(parentElm, vnode.elm, refElm);
    //}
  //}

  //function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    //var i = vnode.data;
    //if (isDef(i)) {
      //var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      //if (isDef(i = i.hook) && isDef(i = i.init)) {
        //i(vnode, false [> hydrating <], parentElm, refElm);
      //}
      //// after calling the init hook, if the vnode is a child component
      //// it should've created a child instance and mounted it. the child
      //// component also has set the placeholder vnode's elm.
      //// in that case we can just return the element and be done.
      //if (isDef(vnode.componentInstance)) {
        //initComponent(vnode, insertedVnodeQueue);
        //if (isTrue(isReactivated)) {
          //reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        //}
        //return true
      //}
    //}
  //}

  //function initComponent (vnode, insertedVnodeQueue) {
    //if (isDef(vnode.data.pendingInsert)) {
      //insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      //vnode.data.pendingInsert = null;
    //}
    //vnode.elm = vnode.componentInstance.$el;
    //if (isPatchable(vnode)) {
      //invokeCreateHooks(vnode, insertedVnodeQueue);
      //setScope(vnode);
    //} else {
      //// empty component root.
      //// skip all element-related modules except for ref (#3455)
      //registerRef(vnode);
      //// make sure to invoke the insert hook
      //insertedVnodeQueue.push(vnode);
    //}
  //}

  //function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    //var i;
    //// hack for #4339: a reactivated component with inner transition
    //// does not trigger because the inner node's created hooks are not called
    //// again. It's not ideal to involve module-specific logic in here but
    //// there doesn't seem to be a better way to do it.
    //var innerNode = vnode;
    //while (innerNode.componentInstance) {
      //innerNode = innerNode.componentInstance._vnode;
      //if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        //for (i = 0; i < cbs.activate.length; ++i) {
          //cbs.activate[i](emptyNode, innerNode);
        //}
        //insertedVnodeQueue.push(innerNode);
        //break
      //}
    //}
    //// unlike a newly created component,
    //// a reactivated keep-alive component doesn't insert itself
    //insert(parentElm, vnode.elm, refElm);
  //}

  //function insert (parent, elm, ref$$1) {
    //if (isDef(parent)) {
      //if (isDef(ref$$1)) {
        //if (ref$$1.parentNode === parent) {
          //nodeOps.insertBefore(parent, elm, ref$$1);
        //}
      //} else {
        //nodeOps.appendChild(parent, elm);
      //}
    //}
  //}

  //function createChildren (vnode, children, insertedVnodeQueue) {
    //if (Array.isArray(children)) {
      //for (var i = 0; i < children.length; ++i) {
        //createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      //}
    //} else if (isPrimitive(vnode.text)) {
      //nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    //}
  //}

  //function isPatchable (vnode) {
    //while (vnode.componentInstance) {
      //vnode = vnode.componentInstance._vnode;
    //}
    //return isDef(vnode.tag)
  //}

  //function invokeCreateHooks (vnode, insertedVnodeQueue) {
    //for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      //cbs.create[i$1](emptyNode, vnode);
    //}
    //i = vnode.data.hook; // Reuse variable
    //if (isDef(i)) {
      //if (isDef(i.create)) { i.create(emptyNode, vnode); }
      //if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    //}
  //}

  //// set scope id attribute for scoped CSS.
  //// this is implemented as a special case to avoid the overhead
  //// of going through the normal attribute patching process.
  //function setScope (vnode) {
    //var i;
    //var ancestor = vnode;
    //while (ancestor) {
      //if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        //nodeOps.setAttribute(vnode.elm, i, '');
      //}
      //ancestor = ancestor.parent;
    //}
    //// for slot content they should also get the scopeId from the host instance.
    //if (isDef(i = activeInstance) &&
      //i !== vnode.context &&
      //isDef(i = i.$options._scopeId)
    //) {
      //nodeOps.setAttribute(vnode.elm, i, '');
    //}
  //}

  //function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    //for (; startIdx <= endIdx; ++startIdx) {
      //createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    //}
  //}

  //function invokeDestroyHook (vnode) {
    //var i, j;
    //var data = vnode.data;
    //if (isDef(data)) {
      //if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      //for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    //}
    //if (isDef(i = vnode.children)) {
      //for (j = 0; j < vnode.children.length; ++j) {
        //invokeDestroyHook(vnode.children[j]);
      //}
    //}
  //}

  //function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    //for (; startIdx <= endIdx; ++startIdx) {
      //var ch = vnodes[startIdx];
      //if (isDef(ch)) {
        //if (isDef(ch.tag)) {
          //removeAndInvokeRemoveHook(ch);
          //invokeDestroyHook(ch);
        //} else { // Text node
          //removeNode(ch.elm);
        //}
      //}
    //}
  //}

  //function removeAndInvokeRemoveHook (vnode, rm) {
    //if (isDef(rm) || isDef(vnode.data)) {
      //var i;
      //var listeners = cbs.remove.length + 1;
      //if (isDef(rm)) {
        //// we have a recursively passed down rm callback
        //// increase the listeners count
        //rm.listeners += listeners;
      //} else {
        //// directly removing
        //rm = createRmCb(vnode.elm, listeners);
      //}
      //// recursively invoke hooks on child component root node
      //if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        //removeAndInvokeRemoveHook(i, rm);
      //}
      //for (i = 0; i < cbs.remove.length; ++i) {
        //cbs.remove[i](vnode, rm);
      //}
      //if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        //i(vnode, rm);
      //} else {
        //rm();
      //}
    //} else {
      //removeNode(vnode.elm);
    //}
  //}

  //function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    //var oldStartIdx = 0;
    //var newStartIdx = 0;
    //var oldEndIdx = oldCh.length - 1;
    //var oldStartVnode = oldCh[0];
    //var oldEndVnode = oldCh[oldEndIdx];
    //var newEndIdx = newCh.length - 1;
    //var newStartVnode = newCh[0];
    //var newEndVnode = newCh[newEndIdx];
    //var oldKeyToIdx, idxInOld, elmToMove, refElm;

    //// removeOnly is a special flag used only by <transition-group>
    //// to ensure removed elements stay in correct relative positions
    //// during leaving transitions
    //var canMove = !removeOnly;

    //while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      //if (isUndef(oldStartVnode)) {
        //oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      //} else if (isUndef(oldEndVnode)) {
        //oldEndVnode = oldCh[--oldEndIdx];
      //} else if (sameVnode(oldStartVnode, newStartVnode)) {
        //patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        //oldStartVnode = oldCh[++oldStartIdx];
        //newStartVnode = newCh[++newStartIdx];
      //} else if (sameVnode(oldEndVnode, newEndVnode)) {
        //patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        //oldEndVnode = oldCh[--oldEndIdx];
        //newEndVnode = newCh[--newEndIdx];
      //} else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        //patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        //canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        //oldStartVnode = oldCh[++oldStartIdx];
        //newEndVnode = newCh[--newEndIdx];
      //} else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        //patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        //canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        //oldEndVnode = oldCh[--oldEndIdx];
        //newStartVnode = newCh[++newStartIdx];
      //} else {
        //if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        //idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        //if (isUndef(idxInOld)) { // New element
          //createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          //newStartVnode = newCh[++newStartIdx];
        //} else {
          //elmToMove = oldCh[idxInOld];
          //[> istanbul ignore if <]
          //if ("development" !== 'production' && !elmToMove) {
            //warn(
              //'It seems there are duplicate keys that is causing an update error. ' +
              //'Make sure each v-for item has a unique key.'
            //);
          //}
          //if (sameVnode(elmToMove, newStartVnode)) {
            //patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            //oldCh[idxInOld] = undefined;
            //canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            //newStartVnode = newCh[++newStartIdx];
          //} else {
            //// same key but different element. treat as new element
            //createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            //newStartVnode = newCh[++newStartIdx];
          //}
        //}
      //}
    //}
    //if (oldStartIdx > oldEndIdx) {
      //refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      //addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    //} else if (newStartIdx > newEndIdx) {
      //removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    //}
  //}

  //function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    //if (oldVnode === vnode) {
      //return
    //}

    //var elm = vnode.elm = oldVnode.elm;

    //if (isTrue(oldVnode.isAsyncPlaceholder)) {
      //if (isDef(vnode.asyncFactory.resolved)) {
        //hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      //} else {
        //vnode.isAsyncPlaceholder = true;
      //}
      //return
    //}

    //// reuse element for static trees.
    //// note we only do this if the vnode is cloned -
    //// if the new node is not cloned it means the render functions have been
    //// reset by the hot-reload-api and we need to do a proper re-render.
    //if (isTrue(vnode.isStatic) &&
      //isTrue(oldVnode.isStatic) &&
      //vnode.key === oldVnode.key &&
      //(isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    //) {
      //vnode.componentInstance = oldVnode.componentInstance;
      //return
    //}

    //var i;
    //var data = vnode.data;
    //if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      //i(oldVnode, vnode);
    //}

    //var oldCh = oldVnode.children;
    //var ch = vnode.children;
    //if (isDef(data) && isPatchable(vnode)) {
      //for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      //if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    //}
    //if (isUndef(vnode.text)) {
      //if (isDef(oldCh) && isDef(ch)) {
        //if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      //} else if (isDef(ch)) {
        //if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        //addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      //} else if (isDef(oldCh)) {
        //removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      //} else if (isDef(oldVnode.text)) {
        //nodeOps.setTextContent(elm, '');
      //}
    //} else if (oldVnode.text !== vnode.text) {
      //nodeOps.setTextContent(elm, vnode.text);
    //}
    //if (isDef(data)) {
      //if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    //}
  //}

  //function invokeInsertHook (vnode, queue, initial) {
    //// delay insert hooks for component root nodes, invoke them after the
    //// element is really inserted
    //if (isTrue(initial) && isDef(vnode.parent)) {
      //vnode.parent.data.pendingInsert = queue;
    //} else {
      //for (var i = 0; i < queue.length; ++i) {
        //queue[i].data.hook.insert(queue[i]);
      //}
    //}
  //}

  //var bailed = false;
  //// list of modules that can skip create hook during hydration because they
  //// are already rendered on the client or has no need for initialization
  //var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  //// Note: this is a browser-only function so we can assume elms are DOM nodes.
  //function hydrate (elm, vnode, insertedVnodeQueue) {
    //if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      //vnode.elm = elm;
      //vnode.isAsyncPlaceholder = true;
      //return true
    //}
    //{
      //if (!assertNodeMatch(elm, vnode)) {
        //return false
      //}
    //}
    //vnode.elm = elm;
    //var tag = vnode.tag;
    //var data = vnode.data;
    //var children = vnode.children;
    //if (isDef(data)) {
      //if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true [> hydrating <]); }
      //if (isDef(i = vnode.componentInstance)) {
        //// child component. it should have hydrated its own tree.
        //initComponent(vnode, insertedVnodeQueue);
        //return true
      //}
    //}
    //if (isDef(tag)) {
      //if (isDef(children)) {
        //// empty element, allow client to pick up and populate children
        //if (!elm.hasChildNodes()) {
          //createChildren(vnode, children, insertedVnodeQueue);
        //} else {
          //var childrenMatch = true;
          //var childNode = elm.firstChild;
          //for (var i$1 = 0; i$1 < children.length; i$1++) {
            //if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              //childrenMatch = false;
              //break
            //}
            //childNode = childNode.nextSibling;
          //}
          //// if childNode is not null, it means the actual childNodes list is
          //// longer than the virtual children list.
          //if (!childrenMatch || childNode) {
            //if ("development" !== 'production' &&
              //typeof console !== 'undefined' &&
              //!bailed
            //) {
              //bailed = true;
              //console.warn('Parent: ', elm);
              //console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            //}
            //return false
          //}
        //}
      //}
      //if (isDef(data)) {
        //for (var key in data) {
          //if (!isRenderedModule(key)) {
            //invokeCreateHooks(vnode, insertedVnodeQueue);
            //break
          //}
        //}
      //}
    //} else if (elm.data !== vnode.text) {
      //elm.data = vnode.text;
    //}
    //return true
  //}

  //function assertNodeMatch (node, vnode) {
    //if (isDef(vnode.tag)) {
      //return (
        //vnode.tag.indexOf('vue-component') === 0 ||
        //vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      //)
    //} else {
      //return node.nodeType === (vnode.isComment ? 8 : 3)
    //}
  //}

  //return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    //if (isUndef(vnode)) {
      //if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      //return
    //}

    //var isInitialPatch = false;
    //var insertedVnodeQueue = [];

    //if (isUndef(oldVnode)) {
      //// empty mount (likely as component), create new root element
      //isInitialPatch = true;
      //createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    //} else {
      //var isRealElement = isDef(oldVnode.nodeType);
      //if (!isRealElement && sameVnode(oldVnode, vnode)) {
        //// patch existing root node
        //patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      //} else {
        //if (isRealElement) {
          //// mounting to a real element
          //// check if this is server-rendered content and if we can perform
          //// a successful hydration.
          //if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            //oldVnode.removeAttribute(SSR_ATTR);
            //hydrating = true;
          //}
          //if (isTrue(hydrating)) {
            //if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              //invokeInsertHook(vnode, insertedVnodeQueue, true);
              //return oldVnode
            //} else {
              //warn(
                //'The client-side rendered virtual DOM tree is not matching ' +
                //'server-rendered content. This is likely caused by incorrect ' +
                //'HTML markup, for example nesting block-level elements inside ' +
                //'<p>, or missing <tbody>. Bailing hydration and performing ' +
                //'full client-side render.'
              //);
            //}
          //}
          //// either not server-rendered, or hydration failed.
          //// create an empty node and replace it
          //oldVnode = emptyNodeAt(oldVnode);
        //}
        //// replacing existing element
        //var oldElm = oldVnode.elm;
        //var parentElm$1 = nodeOps.parentNode(oldElm);
        //createElm(
          //vnode,
          //insertedVnodeQueue,
          //// extremely rare edge case: do not insert if old element is in a
          //// leaving transition. Only happens when combining transition +
          //// keep-alive + HOCs. (#4590)
          //oldElm._leaveCb ? null : parentElm$1,
          //nodeOps.nextSibling(oldElm)
        //);

        //if (isDef(vnode.parent)) {
          //// component root element replaced.
          //// update parent placeholder node element, recursively
          //var ancestor = vnode.parent;
          //while (ancestor) {
            //ancestor.elm = vnode.elm;
            //ancestor = ancestor.parent;
          //}
          //if (isPatchable(vnode)) {
            //for (var i = 0; i < cbs.create.length; ++i) {
              //cbs.create[i](emptyNode, vnode.parent);
            //}
          //}
        //}

        //if (isDef(parentElm$1)) {
          //removeVnodes(parentElm$1, [oldVnode], 0, 0);
        //} else if (isDef(oldVnode.tag)) {
          //invokeDestroyHook(oldVnode);
        //}
      //}
    //}

    //invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    //return vnode.elm
  //}
//}

//[>  <]

//var directives = {
  //create: updateDirectives,
  //update: updateDirectives,
  //destroy: function unbindDirectives (vnode) {
    //updateDirectives(vnode, emptyNode);
  //}
//};

//function updateDirectives (oldVnode, vnode) {
  //if (oldVnode.data.directives || vnode.data.directives) {
    //_update(oldVnode, vnode);
  //}
//}

//function _update (oldVnode, vnode) {
  //var isCreate = oldVnode === emptyNode;
  //var isDestroy = vnode === emptyNode;
  //var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  //var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  //var dirsWithInsert = [];
  //var dirsWithPostpatch = [];

  //var key, oldDir, dir;
  //for (key in newDirs) {
    //oldDir = oldDirs[key];
    //dir = newDirs[key];
    //if (!oldDir) {
      //// new directive, bind
      //callHook$1(dir, 'bind', vnode, oldVnode);
      //if (dir.def && dir.def.inserted) {
        //dirsWithInsert.push(dir);
      //}
    //} else {
      //// existing directive, update
      //dir.oldValue = oldDir.value;
      //callHook$1(dir, 'update', vnode, oldVnode);
      //if (dir.def && dir.def.componentUpdated) {
        //dirsWithPostpatch.push(dir);
      //}
    //}
  //}

  //if (dirsWithInsert.length) {
    //var callInsert = function () {
      //for (var i = 0; i < dirsWithInsert.length; i++) {
        //callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      //}
    //};
    //if (isCreate) {
      //mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    //} else {
      //callInsert();
    //}
  //}

  //if (dirsWithPostpatch.length) {
    //mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      //for (var i = 0; i < dirsWithPostpatch.length; i++) {
        //callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      //}
    //});
  //}

  //if (!isCreate) {
    //for (key in oldDirs) {
      //if (!newDirs[key]) {
        //// no longer present, unbind
        //callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      //}
    //}
  //}
//}

//var emptyModifiers = Object.create(null);

//function normalizeDirectives$1 (
  //dirs,
  //vm
//) {
  //var res = Object.create(null);
  //if (!dirs) {
    //return res
  //}
  //var i, dir;
  //for (i = 0; i < dirs.length; i++) {
    //dir = dirs[i];
    //if (!dir.modifiers) {
      //dir.modifiers = emptyModifiers;
    //}
    //res[getRawDirName(dir)] = dir;
    //dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  //}
  //return res
//}

//function getRawDirName (dir) {
  //return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
//}

//function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  //var fn = dir.def && dir.def[hook];
  //if (fn) {
    //try {
      //fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    //} catch (e) {
      //handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    //}
  //}
//}

//var baseModules = [
  //ref,
  //directives
//];

//[>  <]

//function updateAttrs (oldVnode, vnode) {
  //var opts = vnode.componentOptions;
  //if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    //return
  //}
  //if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    //return
  //}
  //var key, cur, old;
  //var elm = vnode.elm;
  //var oldAttrs = oldVnode.data.attrs || {};
  //var attrs = vnode.data.attrs || {};
  //// clone observed objects, as the user probably wants to mutate it
  //if (isDef(attrs.__ob__)) {
    //attrs = vnode.data.attrs = extend({}, attrs);
  //}

  //for (key in attrs) {
    //cur = attrs[key];
    //old = oldAttrs[key];
    //if (old !== cur) {
      //setAttr(elm, key, cur);
    //}
  //}
  //// #4391: in IE9, setting type can reset value for input[type=radio]
  //[> istanbul ignore if <]
  //if (isIE9 && attrs.value !== oldAttrs.value) {
    //setAttr(elm, 'value', attrs.value);
  //}
  //for (key in oldAttrs) {
    //if (isUndef(attrs[key])) {
      //if (isXlink(key)) {
        //elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      //} else if (!isEnumeratedAttr(key)) {
        //elm.removeAttribute(key);
      //}
    //}
  //}
//}

//function setAttr (el, key, value) {
  //if (isBooleanAttr(key)) {
    //// set attribute for blank value
    //// e.g. <option disabled>Select one</option>
    //if (isFalsyAttrValue(value)) {
      //el.removeAttribute(key);
    //} else {
      //el.setAttribute(key, key);
    //}
  //} else if (isEnumeratedAttr(key)) {
    //el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  //} else if (isXlink(key)) {
    //if (isFalsyAttrValue(value)) {
      //el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    //} else {
      //el.setAttributeNS(xlinkNS, key, value);
    //}
  //} else {
    //if (isFalsyAttrValue(value)) {
      //el.removeAttribute(key);
    //} else {
      //el.setAttribute(key, value);
    //}
  //}
//}

//var attrs = {
  //create: updateAttrs,
  //update: updateAttrs
//};

//[>  <]

//function updateClass (oldVnode, vnode) {
  //var el = vnode.elm;
  //var data = vnode.data;
  //var oldData = oldVnode.data;
  //if (
    //isUndef(data.staticClass) &&
    //isUndef(data.class) && (
      //isUndef(oldData) || (
        //isUndef(oldData.staticClass) &&
        //isUndef(oldData.class)
      //)
    //)
  //) {
    //return
  //}

  //var cls = genClassForVnode(vnode);

  //// handle transition classes
  //var transitionClass = el._transitionClasses;
  //if (isDef(transitionClass)) {
    //cls = concat(cls, stringifyClass(transitionClass));
  //}

  //// set the class
  //if (cls !== el._prevClass) {
    //el.setAttribute('class', cls);
    //el._prevClass = cls;
  //}
//}

//var klass = {
  //create: updateClass,
  //update: updateClass
//};

//[>  <]

//var validDivisionCharRE = /[\w).+\-_$\]]/;

//function parseFilters (exp) {
  //var inSingle = false;
  //var inDouble = false;
  //var inTemplateString = false;
  //var inRegex = false;
  //var curly = 0;
  //var square = 0;
  //var paren = 0;
  //var lastFilterIndex = 0;
  //var c, prev, i, expression, filters;

  //for (i = 0; i < exp.length; i++) {
    //prev = c;
    //c = exp.charCodeAt(i);
    //if (inSingle) {
      //if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    //} else if (inDouble) {
      //if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    //} else if (inTemplateString) {
      //if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    //} else if (inRegex) {
      //if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    //} else if (
      //c === 0x7C && // pipe
      //exp.charCodeAt(i + 1) !== 0x7C &&
      //exp.charCodeAt(i - 1) !== 0x7C &&
      //!curly && !square && !paren
    //) {
      //if (expression === undefined) {
        //// first filter, end of expression
        //lastFilterIndex = i + 1;
        //expression = exp.slice(0, i).trim();
      //} else {
        //pushFilter();
      //}
    //} else {
      //switch (c) {
        //case 0x22: inDouble = true; break         // "
        //case 0x27: inSingle = true; break         // '
        //case 0x60: inTemplateString = true; break // `
        //case 0x28: paren++; break                 // (
        //case 0x29: paren--; break                 // )
        //case 0x5B: square++; break                // [
        //case 0x5D: square--; break                // ]
        //case 0x7B: curly++; break                 // {
        //case 0x7D: curly--; break                 // }
      //}
      //if (c === 0x2f) { // /
        //var j = i - 1;
        //var p = (void 0);
        //// find first non-whitespace prev char
        //for (; j >= 0; j--) {
          //p = exp.charAt(j);
          //if (p !== ' ') { break }
        //}
        //if (!p || !validDivisionCharRE.test(p)) {
          //inRegex = true;
        //}
      //}
    //}
  //}

  //if (expression === undefined) {
    //expression = exp.slice(0, i).trim();
  //} else if (lastFilterIndex !== 0) {
    //pushFilter();
  //}

  //function pushFilter () {
    //(filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    //lastFilterIndex = i + 1;
  //}

  //if (filters) {
    //for (i = 0; i < filters.length; i++) {
      //expression = wrapFilter(expression, filters[i]);
    //}
  //}

  //return expression
//}

//function wrapFilter (exp, filter) {
  //var i = filter.indexOf('(');
  //if (i < 0) {
    //// _f: resolveFilter
    //return ("_f(\"" + filter + "\")(" + exp + ")")
  //} else {
    //var name = filter.slice(0, i);
    //var args = filter.slice(i + 1);
    //return ("_f(\"" + name + "\")(" + exp + "," + args)
  //}
//}

//[>  <]

//function baseWarn (msg) {
  //console.error(("[Vue compiler]: " + msg));
//}

//function pluckModuleFunction (
  //modules,
  //key
//) {
  //return modules
    //? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    //: []
//}

//function addProp (el, name, value) {
  //(el.props || (el.props = [])).push({ name: name, value: value });
//}

//function addAttr (el, name, value) {
  //(el.attrs || (el.attrs = [])).push({ name: name, value: value });
//}

//function addDirective (
  //el,
  //name,
  //rawName,
  //value,
  //arg,
  //modifiers
//) {
  //(el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
//}

//function addHandler (
  //el,
  //name,
  //value,
  //modifiers,
  //important,
  //warn
//) {
  //// warn prevent and passive modifier
  //[> istanbul ignore if <]
  //if (
    //"development" !== 'production' && warn &&
    //modifiers && modifiers.prevent && modifiers.passive
  //) {
    //warn(
      //'passive and prevent can\'t be used together. ' +
      //'Passive handler can\'t prevent default event.'
    //);
  //}
  //// check capture modifier
  //if (modifiers && modifiers.capture) {
    //delete modifiers.capture;
    //name = '!' + name; // mark the event as captured
  //}
  //if (modifiers && modifiers.once) {
    //delete modifiers.once;
    //name = '~' + name; // mark the event as once
  //}
  //[> istanbul ignore if <]
  //if (modifiers && modifiers.passive) {
    //delete modifiers.passive;
    //name = '&' + name; // mark the event as passive
  //}
  //var events;
  //if (modifiers && modifiers.native) {
    //delete modifiers.native;
    //events = el.nativeEvents || (el.nativeEvents = {});
  //} else {
    //events = el.events || (el.events = {});
  //}
  //var newHandler = { value: value, modifiers: modifiers };
  //var handlers = events[name];
  //[> istanbul ignore if <]
  //if (Array.isArray(handlers)) {
    //important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  //} else if (handlers) {
    //events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  //} else {
    //events[name] = newHandler;
  //}
//}

//function getBindingAttr (
  //el,
  //name,
  //getStatic
//) {
  //var dynamicValue =
    //getAndRemoveAttr(el, ':' + name) ||
    //getAndRemoveAttr(el, 'v-bind:' + name);
  //if (dynamicValue != null) {
    //return parseFilters(dynamicValue)
  //} else if (getStatic !== false) {
    //var staticValue = getAndRemoveAttr(el, name);
    //if (staticValue != null) {
      //return JSON.stringify(staticValue)
    //}
  //}
//}

//function getAndRemoveAttr (el, name) {
  //var val;
  //if ((val = el.attrsMap[name]) != null) {
    //var list = el.attrsList;
    //for (var i = 0, l = list.length; i < l; i++) {
      //if (list[i].name === name) {
        //list.splice(i, 1);
        //break
      //}
    //}
  //}
  //return val
//}

//[>  <]

/**
 * Cross-platform code generation for component v-model
 */
//function genComponentModel (
  //el,
  //value,
  //modifiers
//) {
  //var ref = modifiers || {};
  //var number = ref.number;
  //var trim = ref.trim;

  //var baseValueExpression = '$$v';
  //var valueExpression = baseValueExpression;
  //if (trim) {
    //valueExpression =
      //"(typeof " + baseValueExpression + " === 'string'" +
        //"? " + baseValueExpression + ".trim()" +
        //": " + baseValueExpression + ")";
  //}
  //if (number) {
    //valueExpression = "_n(" + valueExpression + ")";
  //}
  //var assignment = genAssignmentCode(value, valueExpression);

  //el.model = {
    //value: ("(" + value + ")"),
    //expression: ("\"" + value + "\""),
    //callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  //};
//}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
//function genAssignmentCode (
  //value,
  //assignment
//) {
  //var modelRs = parseModel(value);
  //if (modelRs.idx === null) {
    //return (value + "=" + assignment)
  //} else {
    //return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  //}
//}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

//var len;
//var str;
//var chr;
//var index$1;
//var expressionPos;
//var expressionEndPos;

//function parseModel (val) {
  //str = val;
  //len = str.length;
  //index$1 = expressionPos = expressionEndPos = 0;

  //if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    //return {
      //exp: val,
      //idx: null
    //}
  //}

  //while (!eof()) {
    //chr = next();
    //[> istanbul ignore if <]
    //if (isStringStart(chr)) {
      //parseString(chr);
    //} else if (chr === 0x5B) {
      //parseBracket(chr);
    //}
  //}

  //return {
    //exp: val.substring(0, expressionPos),
    //idx: val.substring(expressionPos + 1, expressionEndPos)
  //}
//}

//function next () {
  //return str.charCodeAt(++index$1)
//}

//function eof () {
  //return index$1 >= len
//}

//function isStringStart (chr) {
  //return chr === 0x22 || chr === 0x27
//}

//function parseBracket (chr) {
  //var inBracket = 1;
  //expressionPos = index$1;
  //while (!eof()) {
    //chr = next();
    //if (isStringStart(chr)) {
      //parseString(chr);
      //continue
    //}
    //if (chr === 0x5B) { inBracket++; }
    //if (chr === 0x5D) { inBracket--; }
    //if (inBracket === 0) {
      //expressionEndPos = index$1;
      //break
    //}
  //}
//}

//function parseString (chr) {
  //var stringQuote = chr;
  //while (!eof()) {
    //chr = next();
    //if (chr === stringQuote) {
      //break
    //}
  //}
//}

//[>  <]

//var warn$1;

//// in some cases, the event used has to be determined at runtime
//// so we used some reserved tokens during compile.
//var RANGE_TOKEN = '__r';
//var CHECKBOX_RADIO_TOKEN = '__c';

//function model (
  //el,
  //dir,
  //_warn
//) {
  //warn$1 = _warn;
  //var value = dir.value;
  //var modifiers = dir.modifiers;
  //var tag = el.tag;
  //var type = el.attrsMap.type;

  //{
    //var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    //if (tag === 'input' && dynamicType) {
      //warn$1(
        //"<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        //"v-model does not support dynamic input types. Use v-if branches instead."
      //);
    //}
    //// inputs with type="file" are read only and setting the input's
    //// value will throw an error.
    //if (tag === 'input' && type === 'file') {
      //warn$1(
        //"<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        //"File inputs are read only. Use a v-on:change listener instead."
      //);
    //}
  //}

  //if (el.component) {
    //genComponentModel(el, value, modifiers);
    //// component v-model doesn't need extra runtime
    //return false
  //} else if (tag === 'select') {
    //genSelect(el, value, modifiers);
  //} else if (tag === 'input' && type === 'checkbox') {
    //genCheckboxModel(el, value, modifiers);
  //} else if (tag === 'input' && type === 'radio') {
    //genRadioModel(el, value, modifiers);
  //} else if (tag === 'input' || tag === 'textarea') {
    //genDefaultModel(el, value, modifiers);
  //} else if (!config.isReservedTag(tag)) {
    //genComponentModel(el, value, modifiers);
    //// component v-model doesn't need extra runtime
    //return false
  //} else {
    //warn$1(
      //"<" + (el.tag) + " v-model=\"" + value + "\">: " +
      //"v-model is not supported on this element type. " +
      //'If you are working with contenteditable, it\'s recommended to ' +
      //'wrap a library dedicated for that purpose inside a custom component.'
    //);
  //}

  //// ensure runtime directive metadata
  //return true
//}

//function genCheckboxModel (
  //el,
  //value,
  //modifiers
//) {
  //var number = modifiers && modifiers.number;
  //var valueBinding = getBindingAttr(el, 'value') || 'null';
  //var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  //var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  //addProp(el, 'checked',
    //"Array.isArray(" + value + ")" +
      //"?_i(" + value + "," + valueBinding + ")>-1" + (
        //trueValueBinding === 'true'
          //? (":(" + value + ")")
          //: (":_q(" + value + "," + trueValueBinding + ")")
      //)
  //);
  //addHandler(el, CHECKBOX_RADIO_TOKEN,
    //"var $$a=" + value + "," +
        //'$$el=$event.target,' +
        //"$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    //'if(Array.isArray($$a)){' +
      //"var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          //'$$i=_i($$a,$$v);' +
      //"if($$el.checked){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      //"else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    //"}else{" + (genAssignmentCode(value, '$$c')) + "}",
    //null, true
  //);
//}

//function genRadioModel (
    //el,
    //value,
    //modifiers
//) {
  //var number = modifiers && modifiers.number;
  //var valueBinding = getBindingAttr(el, 'value') || 'null';
  //valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  //addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  //addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
//}

//function genSelect (
    //el,
    //value,
    //modifiers
//) {
  //var number = modifiers && modifiers.number;
  //var selectedVal = "Array.prototype.filter" +
    //".call($event.target.options,function(o){return o.selected})" +
    //".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    //"return " + (number ? '_n(val)' : 'val') + "})";

  //var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  //var code = "var $$selectedVal = " + selectedVal + ";";
  //code = code + " " + (genAssignmentCode(value, assignment));
  //addHandler(el, 'change', code, null, true);
//}

//function genDefaultModel (
  //el,
  //value,
  //modifiers
//) {
  //var type = el.attrsMap.type;
  //var ref = modifiers || {};
  //var lazy = ref.lazy;
  //var number = ref.number;
  //var trim = ref.trim;
  //var needCompositionGuard = !lazy && type !== 'range';
  //var event = lazy
    //? 'change'
    //: type === 'range'
      //? RANGE_TOKEN
      //: 'input';

  //var valueExpression = '$event.target.value';
  //if (trim) {
    //valueExpression = "$event.target.value.trim()";
  //}
  //if (number) {
    //valueExpression = "_n(" + valueExpression + ")";
  //}

  //var code = genAssignmentCode(value, valueExpression);
  //if (needCompositionGuard) {
    //code = "if($event.target.composing)return;" + code;
  //}

  //addProp(el, 'value', ("(" + value + ")"));
  //addHandler(el, event, code, null, true);
  //if (trim || number) {
    //addHandler(el, 'blur', '$forceUpdate()');
  //}
//}

//[>  <]

//// normalize v-model event tokens that can only be determined at runtime.
//// it's important to place the event as the first in the array because
//// the whole point is ensuring the v-model callback gets called before
//// user-attached handlers.
//function normalizeEvents (on) {
  //var event;
  //[> istanbul ignore if <]
  //if (isDef(on[RANGE_TOKEN])) {
    //// IE input[type=range] only supports `change` event
    //event = isIE ? 'change' : 'input';
    //on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    //delete on[RANGE_TOKEN];
  //}
  //if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    //// Chrome fires microtasks in between click/change, leads to #4521
    //event = isChrome ? 'click' : 'change';
    //on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    //delete on[CHECKBOX_RADIO_TOKEN];
  //}
//}

//var target$1;

//function add$1 (
  //event,
  //handler,
  //once$$1,
  //capture,
  //passive
//) {
  //if (once$$1) {
    //var oldHandler = handler;
    //var _target = target$1; // save current target element in closure
    //handler = function (ev) {
      //var res = arguments.length === 1
        //? oldHandler(ev)
        //: oldHandler.apply(null, arguments);
      //if (res !== null) {
        //remove$2(event, handler, capture, _target);
      //}
    //};
  //}
  //target$1.addEventListener(
    //event,
    //handler,
    //supportsPassive
      //? { capture: capture, passive: passive }
      //: capture
  //);
//}

//function remove$2 (
  //event,
  //handler,
  //capture,
  //_target
//) {
  //(_target || target$1).removeEventListener(event, handler, capture);
//}

//function updateDOMListeners (oldVnode, vnode) {
  //if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    //return
  //}
  //var on = vnode.data.on || {};
  //var oldOn = oldVnode.data.on || {};
  //target$1 = vnode.elm;
  //normalizeEvents(on);
  //updateListeners(on, oldOn, add$1, remove$2, vnode.context);
//}

//var events = {
  //create: updateDOMListeners,
  //update: updateDOMListeners
//};

//[>  <]

//function updateDOMProps (oldVnode, vnode) {
  //if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    //return
  //}
  //var key, cur;
  //var elm = vnode.elm;
  //var oldProps = oldVnode.data.domProps || {};
  //var props = vnode.data.domProps || {};
  //// clone observed objects, as the user probably wants to mutate it
  //if (isDef(props.__ob__)) {
    //props = vnode.data.domProps = extend({}, props);
  //}

  //for (key in oldProps) {
    //if (isUndef(props[key])) {
      //elm[key] = '';
    //}
  //}
  //for (key in props) {
    //cur = props[key];
    //// ignore children if the node has textContent or innerHTML,
    //// as these will throw away existing DOM nodes and cause removal errors
    //// on subsequent patches (#3360)
    //if (key === 'textContent' || key === 'innerHTML') {
      //if (vnode.children) { vnode.children.length = 0; }
      //if (cur === oldProps[key]) { continue }
    //}

    //if (key === 'value') {
      //// store value as _value as well since
      //// non-string values will be stringified
      //elm._value = cur;
      //// avoid resetting cursor position when value is the same
      //var strCur = isUndef(cur) ? '' : String(cur);
      //if (shouldUpdateValue(elm, vnode, strCur)) {
        //elm.value = strCur;
      //}
    //} else {
      //elm[key] = cur;
    //}
  //}
//}

//// check platforms/web/util/attrs.js acceptValue


//function shouldUpdateValue (
  //elm,
  //vnode,
  //checkVal
//) {
  //return (!elm.composing && (
    //vnode.tag === 'option' ||
    //isDirty(elm, checkVal) ||
    //isInputChanged(elm, checkVal)
  //))
//}

//function isDirty (elm, checkVal) {
  //// return true when textbox (.number and .trim) loses focus and its value is
  //// not equal to the updated value
  //var notInFocus = true;
  //// #6157
  //// work around IE bug when accessing document.activeElement in an iframe
  //try { notInFocus = document.activeElement !== elm; } catch (e) {}
  //return notInFocus && elm.value !== checkVal
//}

//function isInputChanged (elm, newVal) {
  //var value = elm.value;
  //var modifiers = elm._vModifiers; // injected by v-model runtime
  //if (isDef(modifiers) && modifiers.number) {
    //return toNumber(value) !== toNumber(newVal)
  //}
  //if (isDef(modifiers) && modifiers.trim) {
    //return value.trim() !== newVal.trim()
  //}
  //return value !== newVal
//}

//var domProps = {
  //create: updateDOMProps,
  //update: updateDOMProps
//};

//[>  <]

//var parseStyleText = cached(function (cssText) {
  //var res = {};
  //var listDelimiter = /;(?![^(]*\))/g;
  //var propertyDelimiter = /:(.+)/;
  //cssText.split(listDelimiter).forEach(function (item) {
    //if (item) {
      //var tmp = item.split(propertyDelimiter);
      //tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    //}
  //});
  //return res
//});

//// merge static and dynamic style data on the same vnode
//function normalizeStyleData (data) {
  //var style = normalizeStyleBinding(data.style);
  //// static style is pre-processed into an object during compilation
  //// and is always a fresh object, so it's safe to merge into it
  //return data.staticStyle
    //? extend(data.staticStyle, style)
    //: style
//}

//// normalize possible array / string values into Object
//function normalizeStyleBinding (bindingStyle) {
  //if (Array.isArray(bindingStyle)) {
    //return toObject(bindingStyle)
  //}
  //if (typeof bindingStyle === 'string') {
    //return parseStyleText(bindingStyle)
  //}
  //return bindingStyle
//}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
//function getStyle (vnode, checkChild) {
  //var res = {};
  //var styleData;

  //if (checkChild) {
    //var childNode = vnode;
    //while (childNode.componentInstance) {
      //childNode = childNode.componentInstance._vnode;
      //if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        //extend(res, styleData);
      //}
    //}
  //}

  //if ((styleData = normalizeStyleData(vnode.data))) {
    //extend(res, styleData);
  //}

  //var parentNode = vnode;
  //while ((parentNode = parentNode.parent)) {
    //if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      //extend(res, styleData);
    //}
  //}
  //return res
//}

//[>  <]

//var cssVarRE = /^--/;
//var importantRE = /\s*!important$/;
//var setProp = function (el, name, val) {
  //[> istanbul ignore if <]
  //if (cssVarRE.test(name)) {
    //el.style.setProperty(name, val);
  //} else if (importantRE.test(val)) {
    //el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  //} else {
    //var normalizedName = normalize(name);
    //if (Array.isArray(val)) {
      //// Support values array created by autoprefixer, e.g.
      //// {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      //// Set them one by one, and the browser will only set those it can recognize
      //for (var i = 0, len = val.length; i < len; i++) {
        //el.style[normalizedName] = val[i];
      //}
    //} else {
      //el.style[normalizedName] = val;
    //}
  //}
//};

//var vendorNames = ['Webkit', 'Moz', 'ms'];

//var emptyStyle;
//var normalize = cached(function (prop) {
  //emptyStyle = emptyStyle || document.createElement('div').style;
  //prop = camelize(prop);
  //if (prop !== 'filter' && (prop in emptyStyle)) {
    //return prop
  //}
  //var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  //for (var i = 0; i < vendorNames.length; i++) {
    //var name = vendorNames[i] + capName;
    //if (name in emptyStyle) {
      //return name
    //}
  //}
//});

//function updateStyle (oldVnode, vnode) {
  //var data = vnode.data;
  //var oldData = oldVnode.data;

  //if (isUndef(data.staticStyle) && isUndef(data.style) &&
    //isUndef(oldData.staticStyle) && isUndef(oldData.style)
  //) {
    //return
  //}

  //var cur, name;
  //var el = vnode.elm;
  //var oldStaticStyle = oldData.staticStyle;
  //var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  //// if static style exists, stylebinding already merged into it when doing normalizeStyleData
  //var oldStyle = oldStaticStyle || oldStyleBinding;

  //var style = normalizeStyleBinding(vnode.data.style) || {};

  //// store normalized style under a different key for next diff
  //// make sure to clone it if it's reactive, since the user likley wants
  //// to mutate it.
  //vnode.data.normalizedStyle = isDef(style.__ob__)
    //? extend({}, style)
    //: style;

  //var newStyle = getStyle(vnode, true);

  //for (name in oldStyle) {
    //if (isUndef(newStyle[name])) {
      //setProp(el, name, '');
    //}
  //}
  //for (name in newStyle) {
    //cur = newStyle[name];
    //if (cur !== oldStyle[name]) {
      //// ie9 setting to null has no effect, must use empty string
      //setProp(el, name, cur == null ? '' : cur);
    //}
  //}
//}

//var style = {
  //create: updateStyle,
  //update: updateStyle
//};

//[>  <]

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
//function addClass (el, cls) {
  //[> istanbul ignore if <]
  //if (!cls || !(cls = cls.trim())) {
    //return
  //}

  //[> istanbul ignore else <]
  //if (el.classList) {
    //if (cls.indexOf(' ') > -1) {
      //cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    //} else {
      //el.classList.add(cls);
    //}
  //} else {
    //var cur = " " + (el.getAttribute('class') || '') + " ";
    //if (cur.indexOf(' ' + cls + ' ') < 0) {
      //el.setAttribute('class', (cur + cls).trim());
    //}
  //}
//}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
//function removeClass (el, cls) {
  //[> istanbul ignore if <]
  //if (!cls || !(cls = cls.trim())) {
    //return
  //}

  //[> istanbul ignore else <]
  //if (el.classList) {
    //if (cls.indexOf(' ') > -1) {
      //cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    //} else {
      //el.classList.remove(cls);
    //}
    //if (!el.classList.length) {
      //el.removeAttribute('class');
    //}
  //} else {
    //var cur = " " + (el.getAttribute('class') || '') + " ";
    //var tar = ' ' + cls + ' ';
    //while (cur.indexOf(tar) >= 0) {
      //cur = cur.replace(tar, ' ');
    //}
    //cur = cur.trim();
    //if (cur) {
      //el.setAttribute('class', cur);
    //} else {
      //el.removeAttribute('class');
    //}
  //}
//}

//[>  <]

//function resolveTransition (def$$1) {
  //if (!def$$1) {
    //return
  //}
  //[> istanbul ignore else <]
  //if (typeof def$$1 === 'object') {
    //var res = {};
    //if (def$$1.css !== false) {
      //extend(res, autoCssTransition(def$$1.name || 'v'));
    //}
    //extend(res, def$$1);
    //return res
  //} else if (typeof def$$1 === 'string') {
    //return autoCssTransition(def$$1)
  //}
//}

//var autoCssTransition = cached(function (name) {
  //return {
    //enterClass: (name + "-enter"),
    //enterToClass: (name + "-enter-to"),
    //enterActiveClass: (name + "-enter-active"),
    //leaveClass: (name + "-leave"),
    //leaveToClass: (name + "-leave-to"),
    //leaveActiveClass: (name + "-leave-active")
  //}
//});

//var hasTransition = inBrowser && !isIE9;
//var TRANSITION = 'transition';
//var ANIMATION = 'animation';

//// Transition property/event sniffing
//var transitionProp = 'transition';
//var transitionEndEvent = 'transitionend';
//var animationProp = 'animation';
//var animationEndEvent = 'animationend';
//if (hasTransition) {
  //[> istanbul ignore if <]
  //if (window.ontransitionend === undefined &&
    //window.onwebkittransitionend !== undefined
  //) {
    //transitionProp = 'WebkitTransition';
    //transitionEndEvent = 'webkitTransitionEnd';
  //}
  //if (window.onanimationend === undefined &&
    //window.onwebkitanimationend !== undefined
  //) {
    //animationProp = 'WebkitAnimation';
    //animationEndEvent = 'webkitAnimationEnd';
  //}
//}

//// binding to window is necessary to make hot reload work in IE in strict mode
//var raf = inBrowser && window.requestAnimationFrame
  //? window.requestAnimationFrame.bind(window)
  //: setTimeout;

//function nextFrame (fn) {
  //raf(function () {
    //raf(fn);
  //});
//}

//function addTransitionClass (el, cls) {
  //var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  //if (transitionClasses.indexOf(cls) < 0) {
    //transitionClasses.push(cls);
    //addClass(el, cls);
  //}
//}

//function removeTransitionClass (el, cls) {
  //if (el._transitionClasses) {
    //remove(el._transitionClasses, cls);
  //}
  //removeClass(el, cls);
//}

//function whenTransitionEnds (
  //el,
  //expectedType,
  //cb
//) {
  //var ref = getTransitionInfo(el, expectedType);
  //var type = ref.type;
  //var timeout = ref.timeout;
  //var propCount = ref.propCount;
  //if (!type) { return cb() }
  //var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  //var ended = 0;
  //var end = function () {
    //el.removeEventListener(event, onEnd);
    //cb();
  //};
  //var onEnd = function (e) {
    //if (e.target === el) {
      //if (++ended >= propCount) {
        //end();
      //}
    //}
  //};
  //setTimeout(function () {
    //if (ended < propCount) {
      //end();
    //}
  //}, timeout + 1);
  //el.addEventListener(event, onEnd);
//}

//var transformRE = /\b(transform|all)(,|$)/;

//function getTransitionInfo (el, expectedType) {
  //var styles = window.getComputedStyle(el);
  //var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  //var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  //var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  //var animationDelays = styles[animationProp + 'Delay'].split(', ');
  //var animationDurations = styles[animationProp + 'Duration'].split(', ');
  //var animationTimeout = getTimeout(animationDelays, animationDurations);

  //var type;
  //var timeout = 0;
  //var propCount = 0;
  //[> istanbul ignore if <]
  //if (expectedType === TRANSITION) {
    //if (transitionTimeout > 0) {
      //type = TRANSITION;
      //timeout = transitionTimeout;
      //propCount = transitionDurations.length;
    //}
  //} else if (expectedType === ANIMATION) {
    //if (animationTimeout > 0) {
      //type = ANIMATION;
      //timeout = animationTimeout;
      //propCount = animationDurations.length;
    //}
  //} else {
    //timeout = Math.max(transitionTimeout, animationTimeout);
    //type = timeout > 0
      //? transitionTimeout > animationTimeout
        //? TRANSITION
        //: ANIMATION
      //: null;
    //propCount = type
      //? type === TRANSITION
        //? transitionDurations.length
        //: animationDurations.length
      //: 0;
  //}
  //var hasTransform =
    //type === TRANSITION &&
    //transformRE.test(styles[transitionProp + 'Property']);
  //return {
    //type: type,
    //timeout: timeout,
    //propCount: propCount,
    //hasTransform: hasTransform
  //}
//}

//function getTimeout (delays, durations) {
  //[> istanbul ignore next <]
  //while (delays.length < durations.length) {
    //delays = delays.concat(delays);
  //}

  //return Math.max.apply(null, durations.map(function (d, i) {
    //return toMs(d) + toMs(delays[i])
  //}))
//}

//function toMs (s) {
  //return Number(s.slice(0, -1)) * 1000
//}

//[>  <]

//function enter (vnode, toggleDisplay) {
  //var el = vnode.elm;

  //// call leave callback now
  //if (isDef(el._leaveCb)) {
    //el._leaveCb.cancelled = true;
    //el._leaveCb();
  //}

  //var data = resolveTransition(vnode.data.transition);
  //if (isUndef(data)) {
    //return
  //}

  //[> istanbul ignore if <]
  //if (isDef(el._enterCb) || el.nodeType !== 1) {
    //return
  //}

  //var css = data.css;
  //var type = data.type;
  //var enterClass = data.enterClass;
  //var enterToClass = data.enterToClass;
  //var enterActiveClass = data.enterActiveClass;
  //var appearClass = data.appearClass;
  //var appearToClass = data.appearToClass;
  //var appearActiveClass = data.appearActiveClass;
  //var beforeEnter = data.beforeEnter;
  //var enter = data.enter;
  //var afterEnter = data.afterEnter;
  //var enterCancelled = data.enterCancelled;
  //var beforeAppear = data.beforeAppear;
  //var appear = data.appear;
  //var afterAppear = data.afterAppear;
  //var appearCancelled = data.appearCancelled;
  //var duration = data.duration;

  //// activeInstance will always be the <transition> component managing this
  //// transition. One edge case to check is when the <transition> is placed
  //// as the root node of a child component. In that case we need to check
  //// <transition>'s parent for appear check.
  //var context = activeInstance;
  //var transitionNode = activeInstance.$vnode;
  //while (transitionNode && transitionNode.parent) {
    //transitionNode = transitionNode.parent;
    //context = transitionNode.context;
  //}

  //var isAppear = !context._isMounted || !vnode.isRootInsert;

  //if (isAppear && !appear && appear !== '') {
    //return
  //}

  //var startClass = isAppear && appearClass
    //? appearClass
    //: enterClass;
  //var activeClass = isAppear && appearActiveClass
    //? appearActiveClass
    //: enterActiveClass;
  //var toClass = isAppear && appearToClass
    //? appearToClass
    //: enterToClass;

  //var beforeEnterHook = isAppear
    //? (beforeAppear || beforeEnter)
    //: beforeEnter;
  //var enterHook = isAppear
    //? (typeof appear === 'function' ? appear : enter)
    //: enter;
  //var afterEnterHook = isAppear
    //? (afterAppear || afterEnter)
    //: afterEnter;
  //var enterCancelledHook = isAppear
    //? (appearCancelled || enterCancelled)
    //: enterCancelled;

  //var explicitEnterDuration = toNumber(
    //isObject(duration)
      //? duration.enter
      //: duration
  //);

  //if ("development" !== 'production' && explicitEnterDuration != null) {
    //checkDuration(explicitEnterDuration, 'enter', vnode);
  //}

  //var expectsCSS = css !== false && !isIE9;
  //var userWantsControl = getHookArgumentsLength(enterHook);

  //var cb = el._enterCb = once(function () {
    //if (expectsCSS) {
      //removeTransitionClass(el, toClass);
      //removeTransitionClass(el, activeClass);
    //}
    //if (cb.cancelled) {
      //if (expectsCSS) {
        //removeTransitionClass(el, startClass);
      //}
      //enterCancelledHook && enterCancelledHook(el);
    //} else {
      //afterEnterHook && afterEnterHook(el);
    //}
    //el._enterCb = null;
  //});

  //if (!vnode.data.show) {
    //// remove pending leave element on enter by injecting an insert hook
    //mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      //var parent = el.parentNode;
      //var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      //if (pendingNode &&
        //pendingNode.tag === vnode.tag &&
        //pendingNode.elm._leaveCb
      //) {
        //pendingNode.elm._leaveCb();
      //}
      //enterHook && enterHook(el, cb);
    //});
  //}

  //// start enter transition
  //beforeEnterHook && beforeEnterHook(el);
  //if (expectsCSS) {
    //addTransitionClass(el, startClass);
    //addTransitionClass(el, activeClass);
    //nextFrame(function () {
      //addTransitionClass(el, toClass);
      //removeTransitionClass(el, startClass);
      //if (!cb.cancelled && !userWantsControl) {
        //if (isValidDuration(explicitEnterDuration)) {
          //setTimeout(cb, explicitEnterDuration);
        //} else {
          //whenTransitionEnds(el, type, cb);
        //}
      //}
    //});
  //}

  //if (vnode.data.show) {
    //toggleDisplay && toggleDisplay();
    //enterHook && enterHook(el, cb);
  //}

  //if (!expectsCSS && !userWantsControl) {
    //cb();
  //}
//}

//function leave (vnode, rm) {
  //var el = vnode.elm;

  //// call enter callback now
  //if (isDef(el._enterCb)) {
    //el._enterCb.cancelled = true;
    //el._enterCb();
  //}

  //var data = resolveTransition(vnode.data.transition);
  //if (isUndef(data)) {
    //return rm()
  //}

  //[> istanbul ignore if <]
  //if (isDef(el._leaveCb) || el.nodeType !== 1) {
    //return
  //}

  //var css = data.css;
  //var type = data.type;
  //var leaveClass = data.leaveClass;
  //var leaveToClass = data.leaveToClass;
  //var leaveActiveClass = data.leaveActiveClass;
  //var beforeLeave = data.beforeLeave;
  //var leave = data.leave;
  //var afterLeave = data.afterLeave;
  //var leaveCancelled = data.leaveCancelled;
  //var delayLeave = data.delayLeave;
  //var duration = data.duration;

  //var expectsCSS = css !== false && !isIE9;
  //var userWantsControl = getHookArgumentsLength(leave);

  //var explicitLeaveDuration = toNumber(
    //isObject(duration)
      //? duration.leave
      //: duration
  //);

  //if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    //checkDuration(explicitLeaveDuration, 'leave', vnode);
  //}

  //var cb = el._leaveCb = once(function () {
    //if (el.parentNode && el.parentNode._pending) {
      //el.parentNode._pending[vnode.key] = null;
    //}
    //if (expectsCSS) {
      //removeTransitionClass(el, leaveToClass);
      //removeTransitionClass(el, leaveActiveClass);
    //}
    //if (cb.cancelled) {
      //if (expectsCSS) {
        //removeTransitionClass(el, leaveClass);
      //}
      //leaveCancelled && leaveCancelled(el);
    //} else {
      //rm();
      //afterLeave && afterLeave(el);
    //}
    //el._leaveCb = null;
  //});

  //if (delayLeave) {
    //delayLeave(performLeave);
  //} else {
    //performLeave();
  //}

  //function performLeave () {
    //// the delayed leave may have already been cancelled
    //if (cb.cancelled) {
      //return
    //}
    //// record leaving element
    //if (!vnode.data.show) {
      //(el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    //}
    //beforeLeave && beforeLeave(el);
    //if (expectsCSS) {
      //addTransitionClass(el, leaveClass);
      //addTransitionClass(el, leaveActiveClass);
      //nextFrame(function () {
        //addTransitionClass(el, leaveToClass);
        //removeTransitionClass(el, leaveClass);
        //if (!cb.cancelled && !userWantsControl) {
          //if (isValidDuration(explicitLeaveDuration)) {
            //setTimeout(cb, explicitLeaveDuration);
          //} else {
            //whenTransitionEnds(el, type, cb);
          //}
        //}
      //});
    //}
    //leave && leave(el, cb);
    //if (!expectsCSS && !userWantsControl) {
      //cb();
    //}
  //}
//}

//// only used in dev mode
//function checkDuration (val, name, vnode) {
  //if (typeof val !== 'number') {
    //warn(
      //"<transition> explicit " + name + " duration is not a valid number - " +
      //"got " + (JSON.stringify(val)) + ".",
      //vnode.context
    //);
  //} else if (isNaN(val)) {
    //warn(
      //"<transition> explicit " + name + " duration is NaN - " +
      //'the duration expression might be incorrect.',
      //vnode.context
    //);
  //}
//}

//function isValidDuration (val) {
  //return typeof val === 'number' && !isNaN(val)
//}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
//function getHookArgumentsLength (fn) {
  //if (isUndef(fn)) {
    //return false
  //}
  //var invokerFns = fn.fns;
  //if (isDef(invokerFns)) {
    //// invoker
    //return getHookArgumentsLength(
      //Array.isArray(invokerFns)
        //? invokerFns[0]
        //: invokerFns
    //)
  //} else {
    //return (fn._length || fn.length) > 1
  //}
//}

//function _enter (_, vnode) {
  //if (vnode.data.show !== true) {
    //enter(vnode);
  //}
//}

//var transition = inBrowser ? {
  //create: _enter,
  //activate: _enter,
  //remove: function remove$$1 (vnode, rm) {
    //[> istanbul ignore else <]
    //if (vnode.data.show !== true) {
      //leave(vnode, rm);
    //} else {
      //rm();
    //}
  //}
//} : {};

//var platformModules = [
  //attrs,
  //klass,
  //events,
  //domProps,
  //style,
  //transition
//];

//[>  <]

//// the directive module should be applied last, after all
//// built-in modules have been applied.
//var modules = platformModules.concat(baseModules);

//var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

//var isTextInputType = makeMap('text,number,password,search,email,tel,url');

//[> istanbul ignore if <]
//if (isIE9) {
  //// http://www.matts411.com/post/internet-explorer-9-oninput/
  //document.addEventListener('selectionchange', function () {
    //var el = document.activeElement;
    //if (el && el.vmodel) {
      //trigger(el, 'input');
    //}
  //});
//}

//var model$1 = {
  //inserted: function inserted (el, binding, vnode) {
    //if (vnode.tag === 'select') {
      //var cb = function () {
        //setSelected(el, binding, vnode.context);
      //};
      //cb();
      //[> istanbul ignore if <]
      //if (isIE || isEdge) {
        //setTimeout(cb, 0);
      //}
      //el._vOptions = [].map.call(el.options, getValue);
    //} else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      //el._vModifiers = binding.modifiers;
      //if (!binding.modifiers.lazy) {
        //// Safari < 10.2 & UIWebView doesn't fire compositionend when
        //// switching focus before confirming composition choice
        //// this also fixes the issue where some browsers e.g. iOS Chrome
        //// fires "change" instead of "input" on autocomplete.
        //el.addEventListener('change', onCompositionEnd);
        //if (!isAndroid) {
          //el.addEventListener('compositionstart', onCompositionStart);
          //el.addEventListener('compositionend', onCompositionEnd);
        //}
        //[> istanbul ignore if <]
        //if (isIE9) {
          //el.vmodel = true;
        //}
      //}
    //}
  //},
  //componentUpdated: function componentUpdated (el, binding, vnode) {
    //if (vnode.tag === 'select') {
      //setSelected(el, binding, vnode.context);
      //// in case the options rendered by v-for have changed,
      //// it's possible that the value is out-of-sync with the rendered options.
      //// detect such cases and filter out values that no longer has a matching
      //// option in the DOM.
      //var prevOptions = el._vOptions;
      //var curOptions = el._vOptions = [].map.call(el.options, getValue);
      //if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        //trigger(el, 'change');
      //}
    //}
  //}
//};

//function setSelected (el, binding, vm) {
  //var value = binding.value;
  //var isMultiple = el.multiple;
  //if (isMultiple && !Array.isArray(value)) {
    //"development" !== 'production' && warn(
      //"<select multiple v-model=\"" + (binding.expression) + "\"> " +
      //"expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      //vm
    //);
    //return
  //}
  //var selected, option;
  //for (var i = 0, l = el.options.length; i < l; i++) {
    //option = el.options[i];
    //if (isMultiple) {
      //selected = looseIndexOf(value, getValue(option)) > -1;
      //if (option.selected !== selected) {
        //option.selected = selected;
      //}
    //} else {
      //if (looseEqual(getValue(option), value)) {
        //if (el.selectedIndex !== i) {
          //el.selectedIndex = i;
        //}
        //return
      //}
    //}
  //}
  //if (!isMultiple) {
    //el.selectedIndex = -1;
  //}
//}

//function getValue (option) {
  //return '_value' in option
    //? option._value
    //: option.value
//}

//function onCompositionStart (e) {
  //e.target.composing = true;
//}

//function onCompositionEnd (e) {
  //// prevent triggering an input event for no reason
  //if (!e.target.composing) { return }
  //e.target.composing = false;
  //trigger(e.target, 'input');
//}

//function trigger (el, type) {
  //var e = document.createEvent('HTMLEvents');
  //e.initEvent(type, true, true);
  //el.dispatchEvent(e);
//}

//[>  <]

//// recursively search for possible transition defined inside the component root
//function locateNode (vnode) {
  //return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    //? locateNode(vnode.componentInstance._vnode)
    //: vnode
//}

//var show = {
  //bind: function bind (el, ref, vnode) {
    //var value = ref.value;

    //vnode = locateNode(vnode);
    //var transition$$1 = vnode.data && vnode.data.transition;
    //var originalDisplay = el.__vOriginalDisplay =
      //el.style.display === 'none' ? '' : el.style.display;
    //if (value && transition$$1) {
      //vnode.data.show = true;
      //enter(vnode, function () {
        //el.style.display = originalDisplay;
      //});
    //} else {
      //el.style.display = value ? originalDisplay : 'none';
    //}
  //},

  //update: function update (el, ref, vnode) {
    //var value = ref.value;
    //var oldValue = ref.oldValue;

    //[> istanbul ignore if <]
    //if (value === oldValue) { return }
    //vnode = locateNode(vnode);
    //var transition$$1 = vnode.data && vnode.data.transition;
    //if (transition$$1) {
      //vnode.data.show = true;
      //if (value) {
        //enter(vnode, function () {
          //el.style.display = el.__vOriginalDisplay;
        //});
      //} else {
        //leave(vnode, function () {
          //el.style.display = 'none';
        //});
      //}
    //} else {
      //el.style.display = value ? el.__vOriginalDisplay : 'none';
    //}
  //},

  //unbind: function unbind (
    //el,
    //binding,
    //vnode,
    //oldVnode,
    //isDestroy
  //) {
    //if (!isDestroy) {
      //el.style.display = el.__vOriginalDisplay;
    //}
  //}
//};

//var platformDirectives = {
  //model: model$1,
  //show: show
//};

//[>  <]

//// Provides transition support for a single element/component.
//// supports transition mode (out-in / in-out)

//var transitionProps = {
  //name: String,
  //appear: Boolean,
  //css: Boolean,
  //mode: String,
  //type: String,
  //enterClass: String,
  //leaveClass: String,
  //enterToClass: String,
  //leaveToClass: String,
  //enterActiveClass: String,
  //leaveActiveClass: String,
  //appearClass: String,
  //appearActiveClass: String,
  //appearToClass: String,
  //duration: [Number, String, Object]
//};

//// in case the child is also an abstract component, e.g. <keep-alive>
//// we want to recursively retrieve the real component to be rendered
//function getRealChild (vnode) {
  //var compOptions = vnode && vnode.componentOptions;
  //if (compOptions && compOptions.Ctor.options.abstract) {
    //return getRealChild(getFirstComponentChild(compOptions.children))
  //} else {
    //return vnode
  //}
//}

//function extractTransitionData (comp) {
  //var data = {};
  //var options = comp.$options;
  //// props
  //for (var key in options.propsData) {
    //data[key] = comp[key];
  //}
  //// events.
  //// extract listeners and pass them directly to the transition methods
  //var listeners = options._parentListeners;
  //for (var key$1 in listeners) {
    //data[camelize(key$1)] = listeners[key$1];
  //}
  //return data
//}

//function placeholder (h, rawChild) {
  //if (/\d-keep-alive$/.test(rawChild.tag)) {
    //return h('keep-alive', {
      //props: rawChild.componentOptions.propsData
    //})
  //}
//}

//function hasParentTransition (vnode) {
  //while ((vnode = vnode.parent)) {
    //if (vnode.data.transition) {
      //return true
    //}
  //}
//}

//function isSameChild (child, oldChild) {
  //return oldChild.key === child.key && oldChild.tag === child.tag
//}

//function isAsyncPlaceholder (node) {
  //return node.isComment && node.asyncFactory
//}

//var Transition = {
  //name: 'transition',
  //props: transitionProps,
  //abstract: true,

  //render: function render (h) {
    //var this$1 = this;

    //var children = this.$options._renderChildren;
    //if (!children) {
      //return
    //}

    //// filter out text nodes (possible whitespaces)
    //children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    //[> istanbul ignore if <]
    //if (!children.length) {
      //return
    //}

    //// warn multiple elements
    //if ("development" !== 'production' && children.length > 1) {
      //warn(
        //'<transition> can only be used on a single element. Use ' +
        //'<transition-group> for lists.',
        //this.$parent
      //);
    //}

    //var mode = this.mode;

    //// warn invalid mode
    //if ("development" !== 'production' &&
      //mode && mode !== 'in-out' && mode !== 'out-in'
    //) {
      //warn(
        //'invalid <transition> mode: ' + mode,
        //this.$parent
      //);
    //}

    //var rawChild = children[0];

    //// if this is a component root node and the component's
    //// parent container node also has transition, skip.
    //if (hasParentTransition(this.$vnode)) {
      //return rawChild
    //}

    //// apply transition data to child
    //// use getRealChild() to ignore abstract components e.g. keep-alive
    //var child = getRealChild(rawChild);
    //[> istanbul ignore if <]
    //if (!child) {
      //return rawChild
    //}

    //if (this._leaving) {
      //return placeholder(h, rawChild)
    //}

    //// ensure a key that is unique to the vnode type and to this transition
    //// component instance. This key will be used to remove pending leaving nodes
    //// during entering.
    //var id = "__transition-" + (this._uid) + "-";
    //child.key = child.key == null
      //? child.isComment
        //? id + 'comment'
        //: id + child.tag
      //: isPrimitive(child.key)
        //? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        //: child.key;

    //var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    //var oldRawChild = this._vnode;
    //var oldChild = getRealChild(oldRawChild);

    //// mark v-show
    //// so that the transition module can hand over the control to the directive
    //if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      //child.data.show = true;
    //}

    //if (
      //oldChild &&
      //oldChild.data &&
      //!isSameChild(child, oldChild) &&
      //!isAsyncPlaceholder(oldChild)
    //) {
      //// replace old child transition data with fresh one
      //// important for dynamic transitions!
      //var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      //// handle transition mode
      //if (mode === 'out-in') {
        //// return placeholder node and queue update when leave finishes
        //this._leaving = true;
        //mergeVNodeHook(oldData, 'afterLeave', function () {
          //this$1._leaving = false;
          //this$1.$forceUpdate();
        //});
        //return placeholder(h, rawChild)
      //} else if (mode === 'in-out') {
        //if (isAsyncPlaceholder(child)) {
          //return oldRawChild
        //}
        //var delayedLeave;
        //var performLeave = function () { delayedLeave(); };
        //mergeVNodeHook(data, 'afterEnter', performLeave);
        //mergeVNodeHook(data, 'enterCancelled', performLeave);
        //mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      //}
    //}

    //return rawChild
  //}
//};

//[>  <]

//// Provides transition support for list items.
//// supports move transitions using the FLIP technique.

//// Because the vdom's children update algorithm is "unstable" - i.e.
//// it doesn't guarantee the relative positioning of removed elements,
//// we force transition-group to update its children into two passes:
//// in the first pass, we remove all nodes that need to be removed,
//// triggering their leaving transition; in the second pass, we insert/move
//// into the final desired state. This way in the second pass removed
//// nodes will remain where they should be.

//var props = extend({
  //tag: String,
  //moveClass: String
//}, transitionProps);

//delete props.mode;

//var TransitionGroup = {
  //props: props,

  //render: function render (h) {
    //var tag = this.tag || this.$vnode.data.tag || 'span';
    //var map = Object.create(null);
    //var prevChildren = this.prevChildren = this.children;
    //var rawChildren = this.$slots.default || [];
    //var children = this.children = [];
    //var transitionData = extractTransitionData(this);

    //for (var i = 0; i < rawChildren.length; i++) {
      //var c = rawChildren[i];
      //if (c.tag) {
        //if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          //children.push(c);
          //map[c.key] = c
          //;(c.data || (c.data = {})).transition = transitionData;
        //} else {
          //var opts = c.componentOptions;
          //var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          //warn(("<transition-group> children must be keyed: <" + name + ">"));
        //}
      //}
    //}

    //if (prevChildren) {
      //var kept = [];
      //var removed = [];
      //for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        //var c$1 = prevChildren[i$1];
        //c$1.data.transition = transitionData;
        //c$1.data.pos = c$1.elm.getBoundingClientRect();
        //if (map[c$1.key]) {
          //kept.push(c$1);
        //} else {
          //removed.push(c$1);
        //}
      //}
      //this.kept = h(tag, null, kept);
      //this.removed = removed;
    //}

    //return h(tag, null, children)
  //},

  //beforeUpdate: function beforeUpdate () {
    //// force removing pass
    //this.__patch__(
      //this._vnode,
      //this.kept,
      //false, // hydrating
      //true // removeOnly (!important, avoids unnecessary moves)
    //);
    //this._vnode = this.kept;
  //},

  //updated: function updated () {
    //var children = this.prevChildren;
    //var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    //if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      //return
    //}

    //// we divide the work into three loops to avoid mixing DOM reads and writes
    //// in each iteration - which helps prevent layout thrashing.
    //children.forEach(callPendingCbs);
    //children.forEach(recordPosition);
    //children.forEach(applyTranslation);

    //// force reflow to put everything in position
    //var body = document.body;
    //var f = body.offsetHeight; // eslint-disable-line

    //children.forEach(function (c) {
      //if (c.data.moved) {
        //var el = c.elm;
        //var s = el.style;
        //addTransitionClass(el, moveClass);
        //s.transform = s.WebkitTransform = s.transitionDuration = '';
        //el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          //if (!e || /transform$/.test(e.propertyName)) {
            //el.removeEventListener(transitionEndEvent, cb);
            //el._moveCb = null;
            //removeTransitionClass(el, moveClass);
          //}
        //});
      //}
    //});
  //},

  //methods: {
    //hasMove: function hasMove (el, moveClass) {
      //[> istanbul ignore if <]
      //if (!hasTransition) {
        //return false
      //}
      //[> istanbul ignore if <]
      //if (this._hasMove) {
        //return this._hasMove
      //}
      //// Detect whether an element with the move class applied has
      //// CSS transitions. Since the element may be inside an entering
      //// transition at this very moment, we make a clone of it and remove
      //// all other transition classes applied to ensure only the move class
      //// is applied.
      //var clone = el.cloneNode();
      //if (el._transitionClasses) {
        //el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      //}
      //addClass(clone, moveClass);
      //clone.style.display = 'none';
      //this.$el.appendChild(clone);
      //var info = getTransitionInfo(clone);
      //this.$el.removeChild(clone);
      //return (this._hasMove = info.hasTransform)
    //}
  //}
//};

//function callPendingCbs (c) {
  //[> istanbul ignore if <]
  //if (c.elm._moveCb) {
    //c.elm._moveCb();
  //}
  //[> istanbul ignore if <]
  //if (c.elm._enterCb) {
    //c.elm._enterCb();
  //}
//}

//function recordPosition (c) {
  //c.data.newPos = c.elm.getBoundingClientRect();
//}

//function applyTranslation (c) {
  //var oldPos = c.data.pos;
  //var newPos = c.data.newPos;
  //var dx = oldPos.left - newPos.left;
  //var dy = oldPos.top - newPos.top;
  //if (dx || dy) {
    //c.data.moved = true;
    //var s = c.elm.style;
    //s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    //s.transitionDuration = '0s';
  //}
//}

//var platformComponents = {
  //Transition: Transition,
  //TransitionGroup: TransitionGroup
//};

//[>  <]

//// install platform specific utils
//Vue$3.config.mustUseProp = mustUseProp;
//Vue$3.config.isReservedTag = isReservedTag;
//Vue$3.config.isReservedAttr = isReservedAttr;
//Vue$3.config.getTagNamespace = getTagNamespace;
//Vue$3.config.isUnknownElement = isUnknownElement;

//// install platform runtime directives & components
//extend(Vue$3.options.directives, platformDirectives);
//extend(Vue$3.options.components, platformComponents);

//// install platform patch function
//Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

//// public mount method
//Vue$3.prototype.$mount = function (
  //el,
  //hydrating
//) {
  //el = el && inBrowser ? query(el) : undefined;
  //return mountComponent(this, el, hydrating)
//};

//// devtools global hook
//[> istanbul ignore next <]
//setTimeout(function () {
  //if (config.devtools) {
    //if (devtools) {
      //devtools.emit('init', Vue$3);
    //} else if ("development" !== 'production' && isChrome) {
      //console[console.info ? 'info' : 'log'](
        //'Download the Vue Devtools extension for a better development experience:\n' +
        //'https://github.com/vuejs/vue-devtools'
      //);
    //}
  //}
  //if ("development" !== 'production' &&
    //config.productionTip !== false &&
    //inBrowser && typeof console !== 'undefined'
  //) {
    //console[console.info ? 'info' : 'log'](
      //"You are running Vue in development mode.\n" +
      //"Make sure to turn on production mode when deploying for production.\n" +
      //"See more tips at https://vuejs.org/guide/deployment.html"
    //);
  //}
//}, 0);

//[>  <]

//// check whether current browser encodes a char inside attribute values
//function shouldDecode (content, encoded) {
  //var div = document.createElement('div');
  //div.innerHTML = "<div a=\"" + content + "\"/>";
  //return div.innerHTML.indexOf(encoded) > 0
//}

//// #3663
//// IE encodes newlines inside attribute values while other browsers don't
//var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

//[>  <]

//var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
//var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

//var buildRegex = cached(function (delimiters) {
  //var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  //var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  //return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
//});

//function parseText (
  //text,
  //delimiters
//) {
  //var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  //if (!tagRE.test(text)) {
    //return
  //}
  //var tokens = [];
  //var lastIndex = tagRE.lastIndex = 0;
  //var match, index;
  //while ((match = tagRE.exec(text))) {
    //index = match.index;
    //// push text token
    //if (index > lastIndex) {
      //tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    //}
    //// tag token
    //var exp = parseFilters(match[1].trim());
    //tokens.push(("_s(" + exp + ")"));
    //lastIndex = index + match[0].length;
  //}
  //if (lastIndex < text.length) {
    //tokens.push(JSON.stringify(text.slice(lastIndex)));
  //}
  //return tokens.join('+')
//}

//[>  <]

//function transformNode (el, options) {
  //var warn = options.warn || baseWarn;
  //var staticClass = getAndRemoveAttr(el, 'class');
  //if ("development" !== 'production' && staticClass) {
    //var expression = parseText(staticClass, options.delimiters);
    //if (expression) {
      //warn(
        //"class=\"" + staticClass + "\": " +
        //'Interpolation inside attributes has been removed. ' +
        //'Use v-bind or the colon shorthand instead. For example, ' +
        //'instead of <div class="{{ val }}">, use <div :class="val">.'
      //);
    //}
  //}
  //if (staticClass) {
    //el.staticClass = JSON.stringify(staticClass);
  //}
  //var classBinding = getBindingAttr(el, 'class', false [> getStatic <]);
  //if (classBinding) {
    //el.classBinding = classBinding;
  //}
//}

//function genData (el) {
  //var data = '';
  //if (el.staticClass) {
    //data += "staticClass:" + (el.staticClass) + ",";
  //}
  //if (el.classBinding) {
    //data += "class:" + (el.classBinding) + ",";
  //}
  //return data
//}

//var klass$1 = {
  //staticKeys: ['staticClass'],
  //transformNode: transformNode,
  //genData: genData
//};

//[>  <]

//function transformNode$1 (el, options) {
  //var warn = options.warn || baseWarn;
  //var staticStyle = getAndRemoveAttr(el, 'style');
  //if (staticStyle) {
    //[> istanbul ignore if <]
    //{
      //var expression = parseText(staticStyle, options.delimiters);
      //if (expression) {
        //warn(
          //"style=\"" + staticStyle + "\": " +
          //'Interpolation inside attributes has been removed. ' +
          //'Use v-bind or the colon shorthand instead. For example, ' +
          //'instead of <div style="{{ val }}">, use <div :style="val">.'
        //);
      //}
    //}
    //el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  //}

  //var styleBinding = getBindingAttr(el, 'style', false [> getStatic <]);
  //if (styleBinding) {
    //el.styleBinding = styleBinding;
  //}
//}

//function genData$1 (el) {
  //var data = '';
  //if (el.staticStyle) {
    //data += "staticStyle:" + (el.staticStyle) + ",";
  //}
  //if (el.styleBinding) {
    //data += "style:(" + (el.styleBinding) + "),";
  //}
  //return data
//}

//var style$1 = {
  //staticKeys: ['staticStyle'],
  //transformNode: transformNode$1,
  //genData: genData$1
//};

//var modules$1 = [
  //klass$1,
  //style$1
//];

//[>  <]

//function text (el, dir) {
  //if (dir.value) {
    //addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  //}
//}

//[>  <]

//function html (el, dir) {
  //if (dir.value) {
    //addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  //}
//}

//var directives$1 = {
  //model: model,
  //text: text,
  //html: html
//};

//[>  <]

//var isUnaryTag = makeMap(
  //'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  //'link,meta,param,source,track,wbr'
//);

//// Elements that you can, intentionally, leave open
//// (and which close themselves)
//var canBeLeftOpenTag = makeMap(
  //'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
//);

//// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
//// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
//var isNonPhrasingTag = makeMap(
  //'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  //'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  //'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  //'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  //'title,tr,track'
//);

//[>  <]

//var baseOptions = {
  //expectHTML: true,
  //modules: modules$1,
  //directives: directives$1,
  //isPreTag: isPreTag,
  //isUnaryTag: isUnaryTag,
  //mustUseProp: mustUseProp,
  //canBeLeftOpenTag: canBeLeftOpenTag,
  //isReservedTag: isReservedTag,
  //getTagNamespace: getTagNamespace,
  //staticKeys: genStaticKeys(modules$1)
//};

//[>  <]

//var decoder;

//var he = {
  //decode: function decode (html) {
    //decoder = decoder || document.createElement('div');
    //decoder.innerHTML = html;
    //return decoder.textContent
  //}
//};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

//// Regular Expressions for parsing tags and attributes
//var singleAttrIdentifier = /([^\s"'<>/=]+)/;
//var singleAttrAssign = /(?:=)/;
//var singleAttrValues = [
  //// attr value double quotes
  ///"([^"]*)"+/.source,
  //// attr value, single quotes
  ///'([^']*)'+/.source,
  //// attr value, no quotes
  ///([^\s"'=<>`]+)/.source
//];
//var attribute = new RegExp(
  //'^\\s*' + singleAttrIdentifier.source +
  //'(?:\\s*(' + singleAttrAssign.source + ')' +
  //'\\s*(?:' + singleAttrValues.join('|') + '))?'
//);

//// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
//// but for Vue templates we can enforce a simple charset
//var ncname = '[a-zA-Z_][\\w\\-\\.]*';
//var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
//var startTagOpen = new RegExp('^<' + qnameCapture);
//var startTagClose = /^\s*(\/?)>/;
//var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
//var doctype = /^<!DOCTYPE [^>]+>/i;
//var comment = /^<!--/;
//var conditionalComment = /^<!\[/;

//var IS_REGEX_CAPTURING_BROKEN = false;
//'x'.replace(/x(.)?/g, function (m, g) {
  //IS_REGEX_CAPTURING_BROKEN = g === '';
//});

//// Special Elements (can contain anything)
//var isPlainTextElement = makeMap('script,style,textarea', true);
//var reCache = {};

//var decodingMap = {
  //'&lt;': '<',
  //'&gt;': '>',
  //'&quot;': '"',
  //'&amp;': '&',
  //'&#10;': '\n'
//};
//var encodedAttr = /&(?:lt|gt|quot|amp);/g;
//var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

//// #5992
//var isIgnoreNewlineTag = makeMap('pre,textarea', true);
//var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

//function decodeAttr (value, shouldDecodeNewlines) {
  //var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  //return value.replace(re, function (match) { return decodingMap[match]; })
//}

//function parseHTML (html, options) {
  //var stack = [];
  //var expectHTML = options.expectHTML;
  //var isUnaryTag$$1 = options.isUnaryTag || no;
  //var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  //var index = 0;
  //var last, lastTag;
  //while (html) {
    //last = html;
    //// Make sure we're not in a plaintext content element like script/style
    //if (!lastTag || !isPlainTextElement(lastTag)) {
      //var textEnd = html.indexOf('<');
      //if (textEnd === 0) {
        //// Comment:
        //if (comment.test(html)) {
          //var commentEnd = html.indexOf('-->');

          //if (commentEnd >= 0) {
            //if (options.shouldKeepComment) {
              //options.comment(html.substring(4, commentEnd));
            //}
            //advance(commentEnd + 3);
            //continue
          //}
        //}

        //// http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        //if (conditionalComment.test(html)) {
          //var conditionalEnd = html.indexOf(']>');

          //if (conditionalEnd >= 0) {
            //advance(conditionalEnd + 2);
            //continue
          //}
        //}

        //// Doctype:
        //var doctypeMatch = html.match(doctype);
        //if (doctypeMatch) {
          //advance(doctypeMatch[0].length);
          //continue
        //}

        //// End tag:
        //var endTagMatch = html.match(endTag);
        //if (endTagMatch) {
          //var curIndex = index;
          //advance(endTagMatch[0].length);
          //parseEndTag(endTagMatch[1], curIndex, index);
          //continue
        //}

        //// Start tag:
        //var startTagMatch = parseStartTag();
        //if (startTagMatch) {
          //handleStartTag(startTagMatch);
          //if (shouldIgnoreFirstNewline(lastTag, html)) {
            //advance(1);
          //}
          //continue
        //}
      //}

      //var text = (void 0), rest = (void 0), next = (void 0);
      //if (textEnd >= 0) {
        //rest = html.slice(textEnd);
        //while (
          //!endTag.test(rest) &&
          //!startTagOpen.test(rest) &&
          //!comment.test(rest) &&
          //!conditionalComment.test(rest)
        //) {
          //// < in plain text, be forgiving and treat it as text
          //next = rest.indexOf('<', 1);
          //if (next < 0) { break }
          //textEnd += next;
          //rest = html.slice(textEnd);
        //}
        //text = html.substring(0, textEnd);
        //advance(textEnd);
      //}

      //if (textEnd < 0) {
        //text = html;
        //html = '';
      //}

      //if (options.chars && text) {
        //options.chars(text);
      //}
    //} else {
      //var endTagLength = 0;
      //var stackedTag = lastTag.toLowerCase();
      //var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      //var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        //endTagLength = endTag.length;
        //if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          //text = text
            //.replace(/<!--([\s\S]*?)-->/g, '$1')
            //.replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        //}
        //if (shouldIgnoreFirstNewline(stackedTag, text)) {
          //text = text.slice(1);
        //}
        //if (options.chars) {
          //options.chars(text);
        //}
        //return ''
      //});
      //index += html.length - rest$1.length;
      //html = rest$1;
      //parseEndTag(stackedTag, index - endTagLength, index);
    //}

    //if (html === last) {
      //options.chars && options.chars(html);
      //if ("development" !== 'production' && !stack.length && options.warn) {
        //options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      //}
      //break
    //}
  //}

  //// Clean up any remaining tags
  //parseEndTag();

  //function advance (n) {
    //index += n;
    //html = html.substring(n);
  //}

  //function parseStartTag () {
    //var start = html.match(startTagOpen);
    //if (start) {
      //var match = {
        //tagName: start[1],
        //attrs: [],
        //start: index
      //};
      //advance(start[0].length);
      //var end, attr;
      //while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        //advance(attr[0].length);
        //match.attrs.push(attr);
      //}
      //if (end) {
        //match.unarySlash = end[1];
        //advance(end[0].length);
        //match.end = index;
        //return match
      //}
    //}
  //}

  //function handleStartTag (match) {
    //var tagName = match.tagName;
    //var unarySlash = match.unarySlash;

    //if (expectHTML) {
      //if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        //parseEndTag(lastTag);
      //}
      //if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        //parseEndTag(tagName);
      //}
    //}

    //var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    //var l = match.attrs.length;
    //var attrs = new Array(l);
    //for (var i = 0; i < l; i++) {
      //var args = match.attrs[i];
      //// hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      //if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        //if (args[3] === '') { delete args[3]; }
        //if (args[4] === '') { delete args[4]; }
        //if (args[5] === '') { delete args[5]; }
      //}
      //var value = args[3] || args[4] || args[5] || '';
      //attrs[i] = {
        //name: args[1],
        //value: decodeAttr(
          //value,
          //options.shouldDecodeNewlines
        //)
      //};
    //}

    //if (!unary) {
      //stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      //lastTag = tagName;
    //}

    //if (options.start) {
      //options.start(tagName, attrs, unary, match.start, match.end);
    //}
  //}

  //function parseEndTag (tagName, start, end) {
    //var pos, lowerCasedTagName;
    //if (start == null) { start = index; }
    //if (end == null) { end = index; }

    //if (tagName) {
      //lowerCasedTagName = tagName.toLowerCase();
    //}

    //// Find the closest opened tag of the same type
    //if (tagName) {
      //for (pos = stack.length - 1; pos >= 0; pos--) {
        //if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          //break
        //}
      //}
    //} else {
      //// If no tag name is provided, clean shop
      //pos = 0;
    //}

    //if (pos >= 0) {
      //// Close all the open elements, up the stack
      //for (var i = stack.length - 1; i >= pos; i--) {
        //if ("development" !== 'production' &&
          //(i > pos || !tagName) &&
          //options.warn
        //) {
          //options.warn(
            //("tag <" + (stack[i].tag) + "> has no matching end tag.")
          //);
        //}
        //if (options.end) {
          //options.end(stack[i].tag, start, end);
        //}
      //}

      //// Remove the open elements from the stack
      //stack.length = pos;
      //lastTag = pos && stack[pos - 1].tag;
    //} else if (lowerCasedTagName === 'br') {
      //if (options.start) {
        //options.start(tagName, [], true, start, end);
      //}
    //} else if (lowerCasedTagName === 'p') {
      //if (options.start) {
        //options.start(tagName, [], false, start, end);
      //}
      //if (options.end) {
        //options.end(tagName, start, end);
      //}
    //}
  //}
//}

//[>  <]

//var onRE = /^@|^v-on:/;
//var dirRE = /^v-|^@|^:/;
//var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
//var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

//var argRE = /:(.*)$/;
//var bindRE = /^:|^v-bind:/;
//var modifierRE = /\.[^.]+/g;

//var decodeHTMLCached = cached(he.decode);

//// configurable state
//var warn$2;
//var delimiters;
//var transforms;
//var preTransforms;
//var postTransforms;
//var platformIsPreTag;
//var platformMustUseProp;
//var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
//function parse (
  //template,
  //options
//) {
  //warn$2 = options.warn || baseWarn;

  //platformIsPreTag = options.isPreTag || no;
  //platformMustUseProp = options.mustUseProp || no;
  //platformGetTagNamespace = options.getTagNamespace || no;

  //transforms = pluckModuleFunction(options.modules, 'transformNode');
  //preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  //postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  //delimiters = options.delimiters;

  //var stack = [];
  //var preserveWhitespace = options.preserveWhitespace !== false;
  //var root;
  //var currentParent;
  //var inVPre = false;
  //var inPre = false;
  //var warned = false;

  //function warnOnce (msg) {
    //if (!warned) {
      //warned = true;
      //warn$2(msg);
    //}
  //}

  //function endPre (element) {
    //// check pre state
    //if (element.pre) {
      //inVPre = false;
    //}
    //if (platformIsPreTag(element.tag)) {
      //inPre = false;
    //}
  //}

  //parseHTML(template, {
    //warn: warn$2,
    //expectHTML: options.expectHTML,
    //isUnaryTag: options.isUnaryTag,
    //canBeLeftOpenTag: options.canBeLeftOpenTag,
    //shouldDecodeNewlines: options.shouldDecodeNewlines,
    //shouldKeepComment: options.comments,
    //start: function start (tag, attrs, unary) {
      //// check namespace.
      //// inherit parent ns if there is one
      //var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      //// handle IE svg bug
      //[> istanbul ignore if <]
      //if (isIE && ns === 'svg') {
        //attrs = guardIESVGBug(attrs);
      //}

      //var element = {
        //type: 1,
        //tag: tag,
        //attrsList: attrs,
        //attrsMap: makeAttrsMap(attrs),
        //parent: currentParent,
        //children: []
      //};
      //if (ns) {
        //element.ns = ns;
      //}

      //if (isForbiddenTag(element) && !isServerRendering()) {
        //element.forbidden = true;
        //"development" !== 'production' && warn$2(
          //'Templates should only be responsible for mapping the state to the ' +
          //'UI. Avoid placing tags with side-effects in your templates, such as ' +
          //"<" + tag + ">" + ', as they will not be parsed.'
        //);
      //}

      //// apply pre-transforms
      //for (var i = 0; i < preTransforms.length; i++) {
        //preTransforms[i](element, options);
      //}

      //if (!inVPre) {
        //processPre(element);
        //if (element.pre) {
          //inVPre = true;
        //}
      //}
      //if (platformIsPreTag(element.tag)) {
        //inPre = true;
      //}
      //if (inVPre) {
        //processRawAttrs(element);
      //} else {
        //processFor(element);
        //processIf(element);
        //processOnce(element);
        //processKey(element);

        //// determine whether this is a plain element after
        //// removing structural attributes
        //element.plain = !element.key && !attrs.length;

        //processRef(element);
        //processSlot(element);
        //processComponent(element);
        //for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          //transforms[i$1](element, options);
        //}
        //processAttrs(element);
      //}

      //function checkRootConstraints (el) {
        //{
          //if (el.tag === 'slot' || el.tag === 'template') {
            //warnOnce(
              //"Cannot use <" + (el.tag) + "> as component root element because it may " +
              //'contain multiple nodes.'
            //);
          //}
          //if (el.attrsMap.hasOwnProperty('v-for')) {
            //warnOnce(
              //'Cannot use v-for on stateful component root element because ' +
              //'it renders multiple elements.'
            //);
          //}
        //}
      //}

      //// tree management
      //if (!root) {
        //root = element;
        //checkRootConstraints(root);
      //} else if (!stack.length) {
        //// allow root elements with v-if, v-else-if and v-else
        //if (root.if && (element.elseif || element.else)) {
          //checkRootConstraints(element);
          //addIfCondition(root, {
            //exp: element.elseif,
            //block: element
          //});
        //} else {
          //warnOnce(
            //"Component template should contain exactly one root element. " +
            //"If you are using v-if on multiple elements, " +
            //"use v-else-if to chain them instead."
          //);
        //}
      //}
      //if (currentParent && !element.forbidden) {
        //if (element.elseif || element.else) {
          //processIfConditions(element, currentParent);
        //} else if (element.slotScope) { // scoped slot
          //currentParent.plain = false;
          //var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        //} else {
          //currentParent.children.push(element);
          //element.parent = currentParent;
        //}
      //}
      //if (!unary) {
        //currentParent = element;
        //stack.push(element);
      //} else {
        //endPre(element);
      //}
      //// apply post-transforms
      //for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        //postTransforms[i$2](element, options);
      //}
    //},

    //end: function end () {
      //// remove trailing whitespace
      //var element = stack[stack.length - 1];
      //var lastNode = element.children[element.children.length - 1];
      //if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        //element.children.pop();
      //}
      //// pop stack
      //stack.length -= 1;
      //currentParent = stack[stack.length - 1];
      //endPre(element);
    //},

    //chars: function chars (text) {
      //if (!currentParent) {
        //{
          //if (text === template) {
            //warnOnce(
              //'Component template requires a root element, rather than just text.'
            //);
          //} else if ((text = text.trim())) {
            //warnOnce(
              //("text \"" + text + "\" outside root element will be ignored.")
            //);
          //}
        //}
        //return
      //}
      //// IE textarea placeholder bug
      //[> istanbul ignore if <]
      //if (isIE &&
        //currentParent.tag === 'textarea' &&
        //currentParent.attrsMap.placeholder === text
      //) {
        //return
      //}
      //var children = currentParent.children;
      //text = inPre || text.trim()
        //? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        //// only preserve whitespace if its not right after a starting tag
        //: preserveWhitespace && children.length ? ' ' : '';
      //if (text) {
        //var expression;
        //if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          //children.push({
            //type: 2,
            //expression: expression,
            //text: text
          //});
        //} else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          //children.push({
            //type: 3,
            //text: text
          //});
        //}
      //}
    //},
    //comment: function comment (text) {
      //currentParent.children.push({
        //type: 3,
        //text: text,
        //isComment: true
      //});
    //}
  //});
  //return root
//}

//function processPre (el) {
  //if (getAndRemoveAttr(el, 'v-pre') != null) {
    //el.pre = true;
  //}
//}

//function processRawAttrs (el) {
  //var l = el.attrsList.length;
  //if (l) {
    //var attrs = el.attrs = new Array(l);
    //for (var i = 0; i < l; i++) {
      //attrs[i] = {
        //name: el.attrsList[i].name,
        //value: JSON.stringify(el.attrsList[i].value)
      //};
    //}
  //} else if (!el.pre) {
    //// non root node in pre blocks with no attributes
    //el.plain = true;
  //}
//}

//function processKey (el) {
  //var exp = getBindingAttr(el, 'key');
  //if (exp) {
    //if ("development" !== 'production' && el.tag === 'template') {
      //warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    //}
    //el.key = exp;
  //}
//}

//function processRef (el) {
  //var ref = getBindingAttr(el, 'ref');
  //if (ref) {
    //el.ref = ref;
    //el.refInFor = checkInFor(el);
  //}
//}

//function processFor (el) {
  //var exp;
  //if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    //var inMatch = exp.match(forAliasRE);
    //if (!inMatch) {
      //"development" !== 'production' && warn$2(
        //("Invalid v-for expression: " + exp)
      //);
      //return
    //}
    //el.for = inMatch[2].trim();
    //var alias = inMatch[1].trim();
    //var iteratorMatch = alias.match(forIteratorRE);
    //if (iteratorMatch) {
      //el.alias = iteratorMatch[1].trim();
      //el.iterator1 = iteratorMatch[2].trim();
      //if (iteratorMatch[3]) {
        //el.iterator2 = iteratorMatch[3].trim();
      //}
    //} else {
      //el.alias = alias;
    //}
  //}
//}

//function processIf (el) {
  //var exp = getAndRemoveAttr(el, 'v-if');
  //if (exp) {
    //el.if = exp;
    //addIfCondition(el, {
      //exp: exp,
      //block: el
    //});
  //} else {
    //if (getAndRemoveAttr(el, 'v-else') != null) {
      //el.else = true;
    //}
    //var elseif = getAndRemoveAttr(el, 'v-else-if');
    //if (elseif) {
      //el.elseif = elseif;
    //}
  //}
//}

//function processIfConditions (el, parent) {
  //var prev = findPrevElement(parent.children);
  //if (prev && prev.if) {
    //addIfCondition(prev, {
      //exp: el.elseif,
      //block: el
    //});
  //} else {
    //warn$2(
      //"v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      //"used on element <" + (el.tag) + "> without corresponding v-if."
    //);
  //}
//}

//function findPrevElement (children) {
  //var i = children.length;
  //while (i--) {
    //if (children[i].type === 1) {
      //return children[i]
    //} else {
      //if ("development" !== 'production' && children[i].text !== ' ') {
        //warn$2(
          //"text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          //"will be ignored."
        //);
      //}
      //children.pop();
    //}
  //}
//}

//function addIfCondition (el, condition) {
  //if (!el.ifConditions) {
    //el.ifConditions = [];
  //}
  //el.ifConditions.push(condition);
//}

//function processOnce (el) {
  //var once$$1 = getAndRemoveAttr(el, 'v-once');
  //if (once$$1 != null) {
    //el.once = true;
  //}
//}

//function processSlot (el) {
  //if (el.tag === 'slot') {
    //el.slotName = getBindingAttr(el, 'name');
    //if ("development" !== 'production' && el.key) {
      //warn$2(
        //"`key` does not work on <slot> because slots are abstract outlets " +
        //"and can possibly expand into multiple elements. " +
        //"Use the key on a wrapping element instead."
      //);
    //}
  //} else {
    //var slotTarget = getBindingAttr(el, 'slot');
    //if (slotTarget) {
      //el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    //}
    //if (el.tag === 'template') {
      //el.slotScope = getAndRemoveAttr(el, 'scope');
    //}
  //}
//}

//function processComponent (el) {
  //var binding;
  //if ((binding = getBindingAttr(el, 'is'))) {
    //el.component = binding;
  //}
  //if (getAndRemoveAttr(el, 'inline-template') != null) {
    //el.inlineTemplate = true;
  //}
//}

//function processAttrs (el) {
  //var list = el.attrsList;
  //var i, l, name, rawName, value, modifiers, isProp;
  //for (i = 0, l = list.length; i < l; i++) {
    //name = rawName = list[i].name;
    //value = list[i].value;
    //if (dirRE.test(name)) {
      //// mark element as dynamic
      //el.hasBindings = true;
      //// modifiers
      //modifiers = parseModifiers(name);
      //if (modifiers) {
        //name = name.replace(modifierRE, '');
      //}
      //if (bindRE.test(name)) { // v-bind
        //name = name.replace(bindRE, '');
        //value = parseFilters(value);
        //isProp = false;
        //if (modifiers) {
          //if (modifiers.prop) {
            //isProp = true;
            //name = camelize(name);
            //if (name === 'innerHtml') { name = 'innerHTML'; }
          //}
          //if (modifiers.camel) {
            //name = camelize(name);
          //}
          //if (modifiers.sync) {
            //addHandler(
              //el,
              //("update:" + (camelize(name))),
              //genAssignmentCode(value, "$event")
            //);
          //}
        //}
        //if (isProp || (
          //!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        //)) {
          //addProp(el, name, value);
        //} else {
          //addAttr(el, name, value);
        //}
      //} else if (onRE.test(name)) { // v-on
        //name = name.replace(onRE, '');
        //addHandler(el, name, value, modifiers, false, warn$2);
      //} else { // normal directives
        //name = name.replace(dirRE, '');
        //// parse arg
        //var argMatch = name.match(argRE);
        //var arg = argMatch && argMatch[1];
        //if (arg) {
          //name = name.slice(0, -(arg.length + 1));
        //}
        //addDirective(el, name, rawName, value, arg, modifiers);
        //if ("development" !== 'production' && name === 'model') {
          //checkForAliasModel(el, value);
        //}
      //}
    //} else {
      //// literal attribute
      //{
        //var expression = parseText(value, delimiters);
        //if (expression) {
          //warn$2(
            //name + "=\"" + value + "\": " +
            //'Interpolation inside attributes has been removed. ' +
            //'Use v-bind or the colon shorthand instead. For example, ' +
            //'instead of <div id="{{ val }}">, use <div :id="val">.'
          //);
        //}
      //}
      //addAttr(el, name, JSON.stringify(value));
    //}
  //}
//}

//function checkInFor (el) {
  //var parent = el;
  //while (parent) {
    //if (parent.for !== undefined) {
      //return true
    //}
    //parent = parent.parent;
  //}
  //return false
//}

//function parseModifiers (name) {
  //var match = name.match(modifierRE);
  //if (match) {
    //var ret = {};
    //match.forEach(function (m) { ret[m.slice(1)] = true; });
    //return ret
  //}
//}

//function makeAttrsMap (attrs) {
  //var map = {};
  //for (var i = 0, l = attrs.length; i < l; i++) {
    //if (
      //"development" !== 'production' &&
      //map[attrs[i].name] && !isIE && !isEdge
    //) {
      //warn$2('duplicate attribute: ' + attrs[i].name);
    //}
    //map[attrs[i].name] = attrs[i].value;
  //}
  //return map
//}

//// for script (e.g. type="x/template") or style, do not decode content
//function isTextTag (el) {
  //return el.tag === 'script' || el.tag === 'style'
//}

//function isForbiddenTag (el) {
  //return (
    //el.tag === 'style' ||
    //(el.tag === 'script' && (
      //!el.attrsMap.type ||
      //el.attrsMap.type === 'text/javascript'
    //))
  //)
//}

//var ieNSBug = /^xmlns:NS\d+/;
//var ieNSPrefix = /^NS\d+:/;

//[> istanbul ignore next <]
//function guardIESVGBug (attrs) {
  //var res = [];
  //for (var i = 0; i < attrs.length; i++) {
    //var attr = attrs[i];
    //if (!ieNSBug.test(attr.name)) {
      //attr.name = attr.name.replace(ieNSPrefix, '');
      //res.push(attr);
    //}
  //}
  //return res
//}

//function checkForAliasModel (el, value) {
  //var _el = el;
  //while (_el) {
    //if (_el.for && _el.alias === value) {
      //warn$2(
        //"<" + (el.tag) + " v-model=\"" + value + "\">: " +
        //"You are binding v-model directly to a v-for iteration alias. " +
        //"This will not be able to modify the v-for source array because " +
        //"writing to the alias is like modifying a function local variable. " +
        //"Consider using an array of objects and use v-model on an object property instead."
      //);
    //}
    //_el = _el.parent;
  //}
//}

//[>  <]

//var isStaticKey;
//var isPlatformReservedTag;

//var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
//function optimize (root, options) {
  //if (!root) { return }
  //isStaticKey = genStaticKeysCached(options.staticKeys || '');
  //isPlatformReservedTag = options.isReservedTag || no;
  //// first pass: mark all non-static nodes.
  //markStatic$1(root);
  //// second pass: mark static roots.
  //markStaticRoots(root, false);
//}

//function genStaticKeys$1 (keys) {
  //return makeMap(
    //'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    //(keys ? ',' + keys : '')
  //)
//}

//function markStatic$1 (node) {
  //node.static = isStatic(node);
  //if (node.type === 1) {
    //// do not make component slot content static. this avoids
    //// 1. components not able to mutate slot nodes
    //// 2. static slot content fails for hot-reloading
    //if (
      //!isPlatformReservedTag(node.tag) &&
      //node.tag !== 'slot' &&
      //node.attrsMap['inline-template'] == null
    //) {
      //return
    //}
    //for (var i = 0, l = node.children.length; i < l; i++) {
      //var child = node.children[i];
      //markStatic$1(child);
      //if (!child.static) {
        //node.static = false;
      //}
    //}
    //if (node.ifConditions) {
      //for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        //var block = node.ifConditions[i$1].block;
        //markStatic$1(block);
        //if (!block.static) {
          //node.static = false;
        //}
      //}
    //}
  //}
//}

//function markStaticRoots (node, isInFor) {
  //if (node.type === 1) {
    //if (node.static || node.once) {
      //node.staticInFor = isInFor;
    //}
    //// For a node to qualify as a static root, it should have children that
    //// are not just static text. Otherwise the cost of hoisting out will
    //// outweigh the benefits and it's better off to just always render it fresh.
    //if (node.static && node.children.length && !(
      //node.children.length === 1 &&
      //node.children[0].type === 3
    //)) {
      //node.staticRoot = true;
      //return
    //} else {
      //node.staticRoot = false;
    //}
    //if (node.children) {
      //for (var i = 0, l = node.children.length; i < l; i++) {
        //markStaticRoots(node.children[i], isInFor || !!node.for);
      //}
    //}
    //if (node.ifConditions) {
      //for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        //markStaticRoots(node.ifConditions[i$1].block, isInFor);
      //}
    //}
  //}
//}

//function isStatic (node) {
  //if (node.type === 2) { // expression
    //return false
  //}
  //if (node.type === 3) { // text
    //return true
  //}
  //return !!(node.pre || (
    //!node.hasBindings && // no dynamic bindings
    //!node.if && !node.for && // not v-if or v-for or v-else
    //!isBuiltInTag(node.tag) && // not a built-in
    //isPlatformReservedTag(node.tag) && // not a component
    //!isDirectChildOfTemplateFor(node) &&
    //Object.keys(node).every(isStaticKey)
  //))
//}

//function isDirectChildOfTemplateFor (node) {
  //while (node.parent) {
    //node = node.parent;
    //if (node.tag !== 'template') {
      //return false
    //}
    //if (node.for) {
      //return true
    //}
  //}
  //return false
//}

//[>  <]

//var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
//var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

//// keyCode aliases
//var keyCodes = {
  //esc: 27,
  //tab: 9,
  //enter: 13,
  //space: 32,
  //up: 38,
  //left: 37,
  //right: 39,
  //down: 40,
  //'delete': [8, 46]
//};

//// #4868: modifiers that prevent the execution of the listener
//// need to explicitly return null so that we can determine whether to remove
//// the listener for .once
//var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

//var modifierCode = {
  //stop: '$event.stopPropagation();',
  //prevent: '$event.preventDefault();',
  //self: genGuard("$event.target !== $event.currentTarget"),
  //ctrl: genGuard("!$event.ctrlKey"),
  //shift: genGuard("!$event.shiftKey"),
  //alt: genGuard("!$event.altKey"),
  //meta: genGuard("!$event.metaKey"),
  //left: genGuard("'button' in $event && $event.button !== 0"),
  //middle: genGuard("'button' in $event && $event.button !== 1"),
  //right: genGuard("'button' in $event && $event.button !== 2")
//};

//function genHandlers (
  //events,
  //isNative,
  //warn
//) {
  //var res = isNative ? 'nativeOn:{' : 'on:{';
  //for (var name in events) {
    //var handler = events[name];
    //// #5330: warn click.right, since right clicks do not actually fire click events.
    //if ("development" !== 'production' &&
      //name === 'click' &&
      //handler && handler.modifiers && handler.modifiers.right
    //) {
      //warn(
        //"Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        //"do not actually fire \"click\" events."
      //);
    //}
    //res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  //}
  //return res.slice(0, -1) + '}'
//}

//function genHandler (
  //name,
  //handler
//) {
  //if (!handler) {
    //return 'function(){}'
  //}

  //if (Array.isArray(handler)) {
    //return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  //}

  //var isMethodPath = simplePathRE.test(handler.value);
  //var isFunctionExpression = fnExpRE.test(handler.value);

  //if (!handler.modifiers) {
    //return isMethodPath || isFunctionExpression
      //? handler.value
      //: ("function($event){" + (handler.value) + "}") // inline statement
  //} else {
    //var code = '';
    //var genModifierCode = '';
    //var keys = [];
    //for (var key in handler.modifiers) {
      //if (modifierCode[key]) {
        //genModifierCode += modifierCode[key];
        //// left/right
        //if (keyCodes[key]) {
          //keys.push(key);
        //}
      //} else {
        //keys.push(key);
      //}
    //}
    //if (keys.length) {
      //code += genKeyFilter(keys);
    //}
    //// Make sure modifiers like prevent and stop get executed after key filtering
    //if (genModifierCode) {
      //code += genModifierCode;
    //}
    //var handlerCode = isMethodPath
      //? handler.value + '($event)'
      //: isFunctionExpression
        //? ("(" + (handler.value) + ")($event)")
        //: handler.value;
    //return ("function($event){" + code + handlerCode + "}")
  //}
//}

//function genKeyFilter (keys) {
  //return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
//}

//function genFilterCode (key) {
  //var keyVal = parseInt(key, 10);
  //if (keyVal) {
    //return ("$event.keyCode!==" + keyVal)
  //}
  //var alias = keyCodes[key];
  //return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
//}

//[>  <]

//function on (el, dir) {
  //if ("development" !== 'production' && dir.modifiers) {
    //warn("v-on without argument does not support modifiers.");
  //}
  //el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
//}

//[>  <]

//function bind$1 (el, dir) {
  //el.wrapData = function (code) {
    //return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  //};
//}

//[>  <]

//var baseDirectives = {
  //on: on,
  //bind: bind$1,
  //cloak: noop
//};

//[>  <]

//var CodegenState = function CodegenState (options) {
  //this.options = options;
  //this.warn = options.warn || baseWarn;
  //this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  //this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  //this.directives = extend(extend({}, baseDirectives), options.directives);
  //var isReservedTag = options.isReservedTag || no;
  //this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  //this.onceId = 0;
  //this.staticRenderFns = [];
//};



//function generate (
  //ast,
  //options
//) {
  //var state = new CodegenState(options);
  //var code = ast ? genElement(ast, state) : '_c("div")';
  //return {
    //render: ("with(this){return " + code + "}"),
    //staticRenderFns: state.staticRenderFns
  //}
//}

//function genElement (el, state) {
  //if (el.staticRoot && !el.staticProcessed) {
    //return genStatic(el, state)
  //} else if (el.once && !el.onceProcessed) {
    //return genOnce(el, state)
  //} else if (el.for && !el.forProcessed) {
    //return genFor(el, state)
  //} else if (el.if && !el.ifProcessed) {
    //return genIf(el, state)
  //} else if (el.tag === 'template' && !el.slotTarget) {
    //return genChildren(el, state) || 'void 0'
  //} else if (el.tag === 'slot') {
    //return genSlot(el, state)
  //} else {
    //// component or element
    //var code;
    //if (el.component) {
      //code = genComponent(el.component, el, state);
    //} else {
      //var data = el.plain ? undefined : genData$2(el, state);

      //var children = el.inlineTemplate ? null : genChildren(el, state, true);
      //code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    //}
    //// module transforms
    //for (var i = 0; i < state.transforms.length; i++) {
      //code = state.transforms[i](el, code);
    //}
    //return code
  //}
//}

//// hoist static sub-trees out
//function genStatic (el, state) {
  //el.staticProcessed = true;
  //state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  //return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
//}

//// v-once
//function genOnce (el, state) {
  //el.onceProcessed = true;
  //if (el.if && !el.ifProcessed) {
    //return genIf(el, state)
  //} else if (el.staticInFor) {
    //var key = '';
    //var parent = el.parent;
    //while (parent) {
      //if (parent.for) {
        //key = parent.key;
        //break
      //}
      //parent = parent.parent;
    //}
    //if (!key) {
      //"development" !== 'production' && state.warn(
        //"v-once can only be used inside v-for that is keyed. "
      //);
      //return genElement(el, state)
    //}
    //return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
  //} else {
    //return genStatic(el, state)
  //}
//}

//function genIf (
  //el,
  //state,
  //altGen,
  //altEmpty
//) {
  //el.ifProcessed = true; // avoid recursion
  //return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
//}

//function genIfConditions (
  //conditions,
  //state,
  //altGen,
  //altEmpty
//) {
  //if (!conditions.length) {
    //return altEmpty || '_e()'
  //}

  //var condition = conditions.shift();
  //if (condition.exp) {
    //return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  //} else {
    //return ("" + (genTernaryExp(condition.block)))
  //}

  //// v-if with v-once should generate code like (a)?_m(0):_m(1)
  //function genTernaryExp (el) {
    //return altGen
      //? altGen(el, state)
      //: el.once
        //? genOnce(el, state)
        //: genElement(el, state)
  //}
//}

//function genFor (
  //el,
  //state,
  //altGen,
  //altHelper
//) {
  //var exp = el.for;
  //var alias = el.alias;
  //var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  //var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  //if ("development" !== 'production' &&
    //state.maybeComponent(el) &&
    //el.tag !== 'slot' &&
    //el.tag !== 'template' &&
    //!el.key
  //) {
    //state.warn(
      //"<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      //"v-for should have explicit keys. " +
      //"See https://vuejs.org/guide/list.html#key for more info.",
      //true [> tip <]
    //);
  //}

  //el.forProcessed = true; // avoid recursion
  //return (altHelper || '_l') + "((" + exp + ")," +
    //"function(" + alias + iterator1 + iterator2 + "){" +
      //"return " + ((altGen || genElement)(el, state)) +
    //'})'
//}

//function genData$2 (el, state) {
  //var data = '{';

  //// directives first.
  //// directives may mutate the el's other properties before they are generated.
  //var dirs = genDirectives(el, state);
  //if (dirs) { data += dirs + ','; }

  //// key
  //if (el.key) {
    //data += "key:" + (el.key) + ",";
  //}
  //// ref
  //if (el.ref) {
    //data += "ref:" + (el.ref) + ",";
  //}
  //if (el.refInFor) {
    //data += "refInFor:true,";
  //}
  //// pre
  //if (el.pre) {
    //data += "pre:true,";
  //}
  //// record original tag name for components using "is" attribute
  //if (el.component) {
    //data += "tag:\"" + (el.tag) + "\",";
  //}
  //// module data generation functions
  //for (var i = 0; i < state.dataGenFns.length; i++) {
    //data += state.dataGenFns[i](el);
  //}
  //// attributes
  //if (el.attrs) {
    //data += "attrs:{" + (genProps(el.attrs)) + "},";
  //}
  //// DOM props
  //if (el.props) {
    //data += "domProps:{" + (genProps(el.props)) + "},";
  //}
  //// event handlers
  //if (el.events) {
    //data += (genHandlers(el.events, false, state.warn)) + ",";
  //}
  //if (el.nativeEvents) {
    //data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  //}
  //// slot target
  //if (el.slotTarget) {
    //data += "slot:" + (el.slotTarget) + ",";
  //}
  //// scoped slots
  //if (el.scopedSlots) {
    //data += (genScopedSlots(el.scopedSlots, state)) + ",";
  //}
  //// component v-model
  //if (el.model) {
    //data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  //}
  //// inline-template
  //if (el.inlineTemplate) {
    //var inlineTemplate = genInlineTemplate(el, state);
    //if (inlineTemplate) {
      //data += inlineTemplate + ",";
    //}
  //}
  //data = data.replace(/,$/, '') + '}';
  //// v-bind data wrap
  //if (el.wrapData) {
    //data = el.wrapData(data);
  //}
  //// v-on data wrap
  //if (el.wrapListeners) {
    //data = el.wrapListeners(data);
  //}
  //return data
//}

//function genDirectives (el, state) {
  //var dirs = el.directives;
  //if (!dirs) { return }
  //var res = 'directives:[';
  //var hasRuntime = false;
  //var i, l, dir, needRuntime;
  //for (i = 0, l = dirs.length; i < l; i++) {
    //dir = dirs[i];
    //needRuntime = true;
    //var gen = state.directives[dir.name];
    //if (gen) {
      //// compile-time directive that manipulates AST.
      //// returns true if it also needs a runtime counterpart.
      //needRuntime = !!gen(el, dir, state.warn);
    //}
    //if (needRuntime) {
      //hasRuntime = true;
      //res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    //}
  //}
  //if (hasRuntime) {
    //return res.slice(0, -1) + ']'
  //}
//}

//function genInlineTemplate (el, state) {
  //var ast = el.children[0];
  //if ("development" !== 'production' && (
    //el.children.length > 1 || ast.type !== 1
  //)) {
    //state.warn('Inline-template components must have exactly one child element.');
  //}
  //if (ast.type === 1) {
    //var inlineRenderFns = generate(ast, state.options);
    //return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  //}
//}

//function genScopedSlots (
  //slots,
  //state
//) {
  //return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      //return genScopedSlot(key, slots[key], state)
    //}).join(',')) + "])")
//}

//function genScopedSlot (
  //key,
  //el,
  //state
//) {
  //if (el.for && !el.forProcessed) {
    //return genForScopedSlot(key, el, state)
  //}
  //return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    //"return " + (el.tag === 'template'
      //? genChildren(el, state) || 'void 0'
      //: genElement(el, state)) + "}}"
//}

//function genForScopedSlot (
  //key,
  //el,
  //state
//) {
  //var exp = el.for;
  //var alias = el.alias;
  //var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  //var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  //el.forProcessed = true; // avoid recursion
  //return "_l((" + exp + ")," +
    //"function(" + alias + iterator1 + iterator2 + "){" +
      //"return " + (genScopedSlot(key, el, state)) +
    //'})'
//}

//function genChildren (
  //el,
  //state,
  //checkSkip,
  //altGenElement,
  //altGenNode
//) {
  //var children = el.children;
  //if (children.length) {
    //var el$1 = children[0];
    //// optimize single v-for
    //if (children.length === 1 &&
      //el$1.for &&
      //el$1.tag !== 'template' &&
      //el$1.tag !== 'slot'
    //) {
      //return (altGenElement || genElement)(el$1, state)
    //}
    //var normalizationType = checkSkip
      //? getNormalizationType(children, state.maybeComponent)
      //: 0;
    //var gen = altGenNode || genNode;
    //return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  //}
//}

//// determine the normalization needed for the children array.
//// 0: no normalization needed
//// 1: simple normalization needed (possible 1-level deep nested array)
//// 2: full normalization needed
//function getNormalizationType (
  //children,
  //maybeComponent
//) {
  //var res = 0;
  //for (var i = 0; i < children.length; i++) {
    //var el = children[i];
    //if (el.type !== 1) {
      //continue
    //}
    //if (needsNormalization(el) ||
        //(el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      //res = 2;
      //break
    //}
    //if (maybeComponent(el) ||
        //(el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      //res = 1;
    //}
  //}
  //return res
//}

//function needsNormalization (el) {
  //return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
//}

//function genNode (node, state) {
  //if (node.type === 1) {
    //return genElement(node, state)
  //} if (node.type === 3 && node.isComment) {
    //return genComment(node)
  //} else {
    //return genText(node)
  //}
//}

//function genText (text) {
  //return ("_v(" + (text.type === 2
    //? text.expression // no need for () because already wrapped in _s()
    //: transformSpecialNewlines(JSON.stringify(text.text))) + ")")
//}

//function genComment (comment) {
  //return ("_e(" + (JSON.stringify(comment.text)) + ")")
//}

//function genSlot (el, state) {
  //var slotName = el.slotName || '"default"';
  //var children = genChildren(el, state);
  //var res = "_t(" + slotName + (children ? ("," + children) : '');
  //var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  //var bind$$1 = el.attrsMap['v-bind'];
  //if ((attrs || bind$$1) && !children) {
    //res += ",null";
  //}
  //if (attrs) {
    //res += "," + attrs;
  //}
  //if (bind$$1) {
    //res += (attrs ? '' : ',null') + "," + bind$$1;
  //}
  //return res + ')'
//}

//// componentName is el.component, take it as argument to shun flow's pessimistic refinement
//function genComponent (
  //componentName,
  //el,
  //state
//) {
  //var children = el.inlineTemplate ? null : genChildren(el, state, true);
  //return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
//}

//function genProps (props) {
  //var res = '';
  //for (var i = 0; i < props.length; i++) {
    //var prop = props[i];
    //res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  //}
  //return res.slice(0, -1)
//}

//// #3895, #4268
//function transformSpecialNewlines (text) {
  //return text
    //.replace(/\u2028/g, '\\u2028')
    //.replace(/\u2029/g, '\\u2029')
//}

//[>  <]

//// these keywords should not appear inside expressions, but operators like
//// typeof, instanceof and in are allowed
//var prohibitedKeywordRE = new RegExp('\\b' + (
  //'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  //'super,throw,while,yield,delete,export,import,return,switch,default,' +
  //'extends,finally,continue,debugger,function,arguments'
//).split(',').join('\\b|\\b') + '\\b');

//// these unary operators should not be used as property/method names
//var unaryOperatorsRE = new RegExp('\\b' + (
  //'delete,typeof,void'
//).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

//// check valid identifier for v-for
//var identRE = /[A-Za-z_$][\w$]*/;

//// strip strings in expressions
//var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

//// detect problematic expressions in a template
//function detectErrors (ast) {
  //var errors = [];
  //if (ast) {
    //checkNode(ast, errors);
  //}
  //return errors
//}

//function checkNode (node, errors) {
  //if (node.type === 1) {
    //for (var name in node.attrsMap) {
      //if (dirRE.test(name)) {
        //var value = node.attrsMap[name];
        //if (value) {
          //if (name === 'v-for') {
            //checkFor(node, ("v-for=\"" + value + "\""), errors);
          //} else if (onRE.test(name)) {
            //checkEvent(value, (name + "=\"" + value + "\""), errors);
          //} else {
            //checkExpression(value, (name + "=\"" + value + "\""), errors);
          //}
        //}
      //}
    //}
    //if (node.children) {
      //for (var i = 0; i < node.children.length; i++) {
        //checkNode(node.children[i], errors);
      //}
    //}
  //} else if (node.type === 2) {
    //checkExpression(node.expression, node.text, errors);
  //}
//}

//function checkEvent (exp, text, errors) {
  //var stipped = exp.replace(stripStringRE, '');
  //var keywordMatch = stipped.match(unaryOperatorsRE);
  //if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    //errors.push(
      //"avoid using JavaScript unary operator as property name: " +
      //"\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    //);
  //}
  //checkExpression(exp, text, errors);
//}

//function checkFor (node, text, errors) {
  //checkExpression(node.for || '', text, errors);
  //checkIdentifier(node.alias, 'v-for alias', text, errors);
  //checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  //checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
//}

//function checkIdentifier (ident, type, text, errors) {
  //if (typeof ident === 'string' && !identRE.test(ident)) {
    //errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  //}
//}

//function checkExpression (exp, text, errors) {
  //try {
    //new Function(("return " + exp));
  //} catch (e) {
    //var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    //if (keywordMatch) {
      //errors.push(
        //"avoid using JavaScript keyword as property name: " +
        //"\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      //);
    //} else {
      //errors.push(("invalid expression: " + (text.trim())));
    //}
  //}
//}

//[>  <]

//function createFunction (code, errors) {
  //try {
    //return new Function(code)
  //} catch (err) {
    //errors.push({ err: err, code: code });
    //return noop
  //}
//}

//function createCompileToFunctionFn (compile) {
  //var cache = Object.create(null);

  //return function compileToFunctions (
    //template,
    //options,
    //vm
  //) {
    //options = options || {};

    //[> istanbul ignore if <]
    //{
      //// detect possible CSP restriction
      //try {
        //new Function('return 1');
      //} catch (e) {
        //if (e.toString().match(/unsafe-eval|CSP/)) {
          //warn(
            //'It seems you are using the standalone build of Vue.js in an ' +
            //'environment with Content Security Policy that prohibits unsafe-eval. ' +
            //'The template compiler cannot work in this environment. Consider ' +
            //'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            //'templates into render functions.'
          //);
        //}
      //}
    //}

    //// check cache
    //var key = options.delimiters
      //? String(options.delimiters) + template
      //: template;
    //if (cache[key]) {
      //return cache[key]
    //}

    //// compile
    //var compiled = compile(template, options);

    //// check compilation errors/tips
    //{
      //if (compiled.errors && compiled.errors.length) {
        //warn(
          //"Error compiling template:\n\n" + template + "\n\n" +
          //compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          //vm
        //);
      //}
      //if (compiled.tips && compiled.tips.length) {
        //compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      //}
    //}

    //// turn code into functions
    //var res = {};
    //var fnGenErrors = [];
    //res.render = createFunction(compiled.render, fnGenErrors);
    //res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      //return createFunction(code, fnGenErrors)
    //});

    //// check function generation errors.
    //// this should only happen if there is a bug in the compiler itself.
    //// mostly for codegen development use
    //[> istanbul ignore if <]
    //{
      //if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        //warn(
          //"Failed to generate render function:\n\n" +
          //fnGenErrors.map(function (ref) {
            //var err = ref.err;
            //var code = ref.code;

            //return ((err.toString()) + " in\n\n" + code + "\n");
        //}).join('\n'),
          //vm
        //);
      //}
    //}

    //return (cache[key] = res)
  //}
//}

//[>  <]

//function createCompilerCreator (baseCompile) {
  //return function createCompiler (baseOptions) {
    //function compile (
      //template,
      //options
    //) {
      //var finalOptions = Object.create(baseOptions);
      //var errors = [];
      //var tips = [];
      //finalOptions.warn = function (msg, tip) {
        //(tip ? tips : errors).push(msg);
      //};

      //if (options) {
        //// merge custom modules
        //if (options.modules) {
          //finalOptions.modules =
            //(baseOptions.modules || []).concat(options.modules);
        //}
        //// merge custom directives
        //if (options.directives) {
          //finalOptions.directives = extend(
            //Object.create(baseOptions.directives),
            //options.directives
          //);
        //}
        //// copy other options
        //for (var key in options) {
          //if (key !== 'modules' && key !== 'directives') {
            //finalOptions[key] = options[key];
          //}
        //}
      //}

      //var compiled = baseCompile(template, finalOptions);
      //{
        //errors.push.apply(errors, detectErrors(compiled.ast));
      //}
      //compiled.errors = errors;
      //compiled.tips = tips;
      //return compiled
    //}

    //return {
      //compile: compile,
      //compileToFunctions: createCompileToFunctionFn(compile)
    //}
  //}
//}

//[>  <]

//// `createCompilerCreator` allows creating compilers that use alternative
//// parser/optimizer/codegen, e.g the SSR optimizing compiler.
//// Here we just export a default compiler using the default parts.
//var createCompiler = createCompilerCreator(function baseCompile (
  //template,
  //options
//) {
  //var ast = parse(template.trim(), options);
  //optimize(ast, options);
  //var code = generate(ast, options);
  //return {
    //ast: ast,
    //render: code.render,
    //staticRenderFns: code.staticRenderFns
  //}
//});

//[>  <]

//var ref$1 = createCompiler(baseOptions);
//var compileToFunctions = ref$1.compileToFunctions;

//[>  <]

//var idToTemplate = cached(function (id) {
  //var el = query(id);
  //return el && el.innerHTML
//});

//var mount = Vue$3.prototype.$mount;
//Vue$3.prototype.$mount = function (
  //el,
  //hydrating
//) {
  //el = el && query(el);

  //[> istanbul ignore if <]
  //if (el === document.body || el === document.documentElement) {
    //"development" !== 'production' && warn(
      //"Do not mount Vue to <html> or <body> - mount to normal elements instead."
    //);
    //return this
  //}

  //var options = this.$options;
  //// resolve template/el and convert to render function
  //if (!options.render) {
    //var template = options.template;
    //if (template) {
      //if (typeof template === 'string') {
        //if (template.charAt(0) === '#') {
          //template = idToTemplate(template);
          //[> istanbul ignore if <]
          //if ("development" !== 'production' && !template) {
            //warn(
              //("Template element not found or is empty: " + (options.template)),
              //this
            //);
          //}
        //}
      //} else if (template.nodeType) {
        //template = template.innerHTML;
      //} else {
        //{
          //warn('invalid template option:' + template, this);
        //}
        //return this
      //}
    //} else if (el) {
      //template = getOuterHTML(el);
    //}
    //if (template) {
      //[> istanbul ignore if <]
      //if ("development" !== 'production' && config.performance && mark) {
        //mark('compile');
      //}

      //var ref = compileToFunctions(template, {
        //shouldDecodeNewlines: shouldDecodeNewlines,
        //delimiters: options.delimiters,
        //comments: options.comments
      //}, this);
      //var render = ref.render;
      //var staticRenderFns = ref.staticRenderFns;
      //options.render = render;
      //options.staticRenderFns = staticRenderFns;

      //[> istanbul ignore if <]
      //if ("development" !== 'production' && config.performance && mark) {
        //mark('compile end');
        //measure(((this._name) + " compile"), 'compile', 'compile end');
      //}
    //}
  //}
  //return mount.call(this, el, hydrating)
//};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
//function getOuterHTML (el) {
  //if (el.outerHTML) {
    //return el.outerHTML
  //} else {
    //var container = document.createElement('div');
    //container.appendChild(el.cloneNode(true));
    //return container.innerHTML
  //}
//}

//Vue$3.compile = compileToFunctions;

//return Vue$3;

//})));
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
