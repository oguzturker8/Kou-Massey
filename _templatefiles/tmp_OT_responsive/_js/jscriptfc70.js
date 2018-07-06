/* ============================================================
* bootstrap-dropdown.js v2.3.2
* http://twitter.github.com/bootstrap/javascript.html#dropdowns
* ============================================================
* Copyright 2012 Twitter, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ============================================================ */
!function ($) {
"use strict"; // jshint ;_;
/* DROPDOWN CLASS DEFINITION
* ========================= */
var toggle = '[data-toggle=dropdown]'
, Dropdown = function (element) {
var $el = $(element).on('click.dropdown.data-api', this.toggle)
$('html').on('click.dropdown.data-api', function () {
$el.parent().removeClass('open')
})
}
Dropdown.prototype = {
constructor: Dropdown
, toggle: function (e) {
var $this = $(this)
, $parent
, isActive
if ($this.is('.disabled, :disabled')) return
$parent = getParent($this)
isActive = $parent.hasClass('open')
clearMenus()
if (!isActive) {
if ('ontouchstart' in document.documentElement) {
// if mobile we we use a backdrop because click events don't delegate
$('<div class="dropdown-backdrop">').insertBefore($(this)).on('click', clearMenus)
}
$parent.toggleClass('open')
}
$this.focus()
return false
}
, keydown: function (e) {
var $this
, $items
, $active
, $parent
, isActive
, index
if (!/(38|40|27)/.test(e.keyCode)) return
$this = $(this)
e.preventDefault()
e.stopPropagation()
if ($this.is('.disabled, :disabled')) return
$parent = getParent($this)
isActive = $parent.hasClass('open')
if (!isActive || (isActive && e.keyCode == 27)) {
if (e.which == 27) $parent.find(toggle).focus()
return $this.click()
}
$items = $('[role=menu] li:not(.divider):visible a', $parent)
if (!$items.length) return
index = $items.index($items.filter(':focus'))
if (e.keyCode == 38 && index > 0) index-- // up
if (e.keyCode == 40 && index < $items.length - 1) index++ // down
if (!~index) index = 0
$items
.eq(index)
.focus()
}
}
function clearMenus() {
$('.dropdown-backdrop').remove()
$(toggle).each(function () {
getParent($(this)).removeClass('open')
})
}
function getParent($this) {
var selector = $this.attr('data-target')
, $parent
if (!selector) {
selector = $this.attr('href')
selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
}
$parent = selector && $(selector)
if (!$parent || !$parent.length) $parent = $this.parent()
return $parent
}
/* DROPDOWN PLUGIN DEFINITION
* ========================== */
var old = $.fn.dropdown
$.fn.dropdown = function (option) {
return this.each(function () {
var $this = $(this)
, data = $this.data('dropdown')
if (!data) $this.data('dropdown', (data = new Dropdown(this)))
if (typeof option == 'string') data[option].call($this)
})
}
$.fn.dropdown.Constructor = Dropdown
/* DROPDOWN NO CONFLICT
* ==================== */
$.fn.dropdown.noConflict = function () {
$.fn.dropdown = old
return this
}
/* APPLY TO STANDARD DROPDOWN ELEMENTS
* =================================== */
$(document)
.on('click.dropdown.data-api', clearMenus)
.on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
.on('click.dropdown.data-api' , toggle, Dropdown.prototype.toggle)
.on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
}(window.jQuery);
/*
http://www.JSON.org/json2.js
2011-02-23
Public Domain.
NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
See http://www.JSON.org/js.html
This code should be minified before deployment.
See http://javascript.crockford.com/jsmin.html
USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
NOT CONTROL.
This file creates a global JSON object containing two methods: stringify
and parse.
JSON.stringify(value, replacer, space)
value any JavaScript value, usually an object or array.
replacer an optional parameter that determines how object
values are stringified for objects. It can be a
function or an array of strings.
space an optional parameter that specifies the indentation
of nested structures. If it is omitted, the text will
be packed without extra whitespace. If it is a number,
it will specify the number of spaces to indent at each
level. If it is a string (such as '\t' or '&nbsp;'),
it contains the characters used to indent at each level.
This method produces a JSON text from a JavaScript value.
When an object value is found, if the object contains a toJSON
method, its toJSON method will be called and the result will be
stringified. A toJSON method does not serialize: it returns the
value represented by the name/value pair that should be serialized,
or undefined if nothing should be serialized. The toJSON method
will be passed the key associated with the value, and this will be
bound to the value
For example, this would serialize Dates as ISO strings.
Date.prototype.toJSON = function (key) {
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}
return this.getUTCFullYear() + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate()) + 'T' +
f(this.getUTCHours()) + ':' +
f(this.getUTCMinutes()) + ':' +
f(this.getUTCSeconds()) + 'Z';
};
You can provide an optional replacer method. It will be passed the
key and value of each member, with this bound to the containing
object. The value that is returned from your method will be
serialized. If your method returns undefined, then the member will
be excluded from the serialization.
If the replacer parameter is an array of strings, then it will be
used to select the members to be serialized. It filters the results
such that only members with keys listed in the replacer array are
stringified.
Values that do not have JSON representations, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays they will be replaced with null. You can use
a replacer function to replace those with JSON values.
JSON.stringify(undefined) returns undefined.
The optional space parameter produces a stringification of the
value that is filled with line breaks and indentation to make it
easier to read.
If the space parameter is a non-empty string, then that string will
be used for indentation. If the space parameter is a number, then
the indentation will be that many spaces.
Example:
text = JSON.stringify(['e', {pluribus: 'unum'}]);
// text is '["e",{"pluribus":"unum"}]'
text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
// text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
text = JSON.stringify([new Date()], function (key, value) {
return this[key] instanceof Date ?
'Date(' + this[key] + ')' : value;
});
// text is '["Date(---current time---)"]'
JSON.parse(text, reviver)
This method parses a JSON text to produce an object or array.
It can throw a SyntaxError exception.
The optional reviver parameter is a function that can filter and
transform the results. It receives each of the keys and values,
and its return value is used instead of the original value.
If it returns what it received, then the structure is not modified.
If it returns undefined then the member is deleted.
Example:
// Parse the text. Values that look like ISO date strings will
// be converted to Date objects.
myData = JSON.parse(text, function (key, value) {
var a;
if (typeof value === 'string') {
a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
if (a) {
return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
+a[5], +a[6]));
}
}
return value;
});
myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
var d;
if (typeof value === 'string' &&
value.slice(0, 5) === 'Date(' &&
value.slice(-1) === ')') {
d = new Date(value.slice(5, -1));
if (d) {
return d;
}
}
return value;
});
This is a reference implementation. You are free to copy, modify, or
redistribute.
*/
/*jslint evil: true, strict: false, regexp: false */
/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, prototype, push, replace, slice, stringify,
test, toJSON, toString, valueOf
*/
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
var JSON;
if (!JSON) {
JSON = {};
}
(function () {
"use strict";
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}
if (typeof Date.prototype.toJSON !== 'function') {
Date.prototype.toJSON = function (key) {
return isFinite(this.valueOf()) ?
this.getUTCFullYear() + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate()) + 'T' +
f(this.getUTCHours()) + ':' +
f(this.getUTCMinutes()) + ':' +
f(this.getUTCSeconds()) + 'Z' : null;
};
String.prototype.toJSON =
Number.prototype.toJSON =
Boolean.prototype.toJSON = function (key) {
return this.valueOf();
};
}
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap,
indent,
meta = { // table of character substitutions
'\b': '\\b',
'\t': '\\t',
'\n': '\\n',
'\f': '\\f',
'\r': '\\r',
'"' : '\\"',
'\\': '\\\\'
},
rep;
function quote(string) {
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.
escapable.lastIndex = 0;
return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
var c = meta[a];
return typeof c === 'string' ? c :
'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + string + '"';
}
function str(key, holder) {
// Produce a string from holder[key].
var i, // The loop counter.
k, // The member key.
v, // The member value.
length,
mind = gap,
partial,
value = holder[key];
// If the value has a toJSON method, call it to obtain a replacement value.
if (value && typeof value === 'object' &&
typeof value.toJSON === 'function') {
value = value.toJSON(key);
}
// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.
if (typeof rep === 'function') {
value = rep.call(holder, key, value);
}
// What happens next depends on the value's type.
switch (typeof value) {
case 'string':
return quote(value);
case 'number':
// JSON numbers must be finite. Encode non-finite numbers as null.
return isFinite(value) ? String(value) : 'null';
case 'boolean':
case 'null':
// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.
return String(value);
// If the type is 'object', we might be dealing with an object or an array or
// null.
case 'object':
// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.
if (!value) {
return 'null';
}
// Make an array to hold the partial results of stringifying this object value.
gap += indent;
partial = [];
// Is the value an array?
if (Object.prototype.toString.apply(value) === '[object Array]') {
// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.
length = value.length;
for (i = 0; i < length; i += 1) {
partial[i] = str(i, value) || 'null';
}
// Join all of the elements together, separated with commas, and wrap them in
// brackets.
v = partial.length === 0 ? '[]' : gap ?
'[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
'[' + partial.join(',') + ']';
gap = mind;
return v;
}
// If the replacer is an array, use it to select the members to be stringified.
if (rep && typeof rep === 'object') {
length = rep.length;
for (i = 0; i < length; i += 1) {
if (typeof rep[i] === 'string') {
k = rep[i];
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
}
}
}
} else {
// Otherwise, iterate through all of the keys in the object.
for (k in value) {
if (Object.prototype.hasOwnProperty.call(value, k)) {
v = str(k, value);
if (v) {
partial.push(quote(k) + (gap ? ': ' : ':') + v);
}
}
}
}
// Join all of the member texts together, separated with commas,
// and wrap them in braces.
v = partial.length === 0 ? '{}' : gap ?
'{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
'{' + partial.join(',') + '}';
gap = mind;
return v;
}
}
// If the JSON object does not yet have a stringify method, give it one.
if (typeof JSON.stringify !== 'function') {
JSON.stringify = function (value, replacer, space) {
// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.
var i;
gap = '';
indent = '';
// If the space parameter is a number, make an indent string containing that
// many spaces.
if (typeof space === 'number') {
for (i = 0; i < space; i += 1) {
indent += ' ';
}
// If the space parameter is a string, it will be used as the indent string.
} else if (typeof space === 'string') {
indent = space;
}
// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.
rep = replacer;
if (replacer && typeof replacer !== 'function' &&
(typeof replacer !== 'object' ||
typeof replacer.length !== 'number')) {
throw new Error('JSON.stringify');
}
// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.
return str('', {'': value});
};
}
// If the JSON object does not yet have a parse method, give it one.
if (typeof JSON.parse !== 'function') {
JSON.parse = function (text, reviver) {
// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.
var j;
function walk(holder, key) {
// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.
var k, v, value = holder[key];
if (value && typeof value === 'object') {
for (k in value) {
if (Object.prototype.hasOwnProperty.call(value, k)) {
v = walk(value, k);
if (v !== undefined) {
value[k] = v;
} else {
delete value[k];
}
}
}
}
return reviver.call(holder, key, value);
}
// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.
text = String(text);
cx.lastIndex = 0;
if (cx.test(text)) {
text = text.replace(cx, function (a) {
return '\\u' +
('0000' + a.charCodeAt(0).toString(16)).slice(-4);
});
}
// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.
// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.
j = eval('(' + text + ')');
// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.
return typeof reviver === 'function' ?
walk({'': j}, '') : j;
}
// If the text is not JSON parseable, then a SyntaxError is thrown.
throw new SyntaxError('JSON.parse');
};
}
}());
/****** CACHE functions ******/
function Cache( nativeStorage, serializer ){
this.storage = nativeStorage;
this.serializer = serializer;
}
Cache.prototype = {
// I clear the cache.
clear: function(){
// Clear the storage container.
this.storage.clear();
// Return this object reference for method chaining.
return( this );
},
// I get an item from the cache. If the item cannot be
// found, I can pass back an optional default value.
getItem: function( key, defaultValue ){
// Get the cached item.
var value = this.storage.getItem( key );
// Check to see if it exists. If it does, then we
// need to deserialize it.
if (value == null){
// No cached item could be found. Now, we either
// have to return the default value, or we have
// to return Null. We have to be careful here,
// though, because the default value might be a
// falsy.
return(
(typeof( defaultValue ) != "undefined") ?
defaultValue :
null
);
} else {
// The value was found; return it in its
// original form.
return(
this.serializer.parse( value )
);
}
},
// I check to see if the given key exists in the storage
// container.
hasItem: function( key ){
// Simply check to see if the key access results in a
// null value.
return(
this.storage.getItem( key ) != null
);
},
// I remove the given item from the cache.
removeItem: function( key ){
// Remove the key from the storage container.
this.storage.removeItem( key );
// Return this object reference for method chaining.
return( this );
},
// I store the item in the cache. When doing this, I
// automatically serialize the value.
//
// NOTE: Not all value (ex. functions and private
// variables) will serialize.
setItem: function( key, value ){
// Store the serialize value.
this.storage.setItem(
key,
this.serializer.stringify( value )
);
// Return this object reference for method chaining.
return( this );
}
};
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());
// place any jQuery/helper plugins in here, instead of separate, slower script files.
//var $j = jQuery.noConflict();
var cache = new Cache( localStorage, JSON );
function get_hostname(url) {
var m = url.match(/^http:\/\/[^/]+/);
return m[0];
}
function getShadoHostUrl(){
if ( location.protocol + "//www.massey.ac.nz" == location.origin ) {
return "";
} else {
return "//www.massey.ac.nz";
}
}
function getPaperSearchUrl(){
return "/massey/learning/programme-course/course.cfm";
}
function getProgSearchUrl(){
return "/massey/learning/programme-course/programme.cfm";
}
//var searchAllText = 'Search the site...';
var searchAllText = 'Search Massey';
var searchCoursesText = 'Search Programmes';
var searchPeopleText = 'Search People';
var searchSectionText = 'Search this zone / section...';
var searchAllValue = 'all';
var searchSectionValue = 'section';
var searchCoursesValue = 'programmes';
var searchPeopleValue = 'people';
// Use program search for course search, rather then Google
function getSearchAction() {
var selectedSearch = $j('.searchFilterOptions > li.active').attr('data-value');
var searchUrl = getProgSearchUrl();
var shadoUrl = getShadoHostUrl();
if(shadoUrl.length > 1){
shadoUrl = "//" + shadoUrl;
}
if (selectedSearch === searchCoursesValue) {
$j('#search_form').attr("action", shadoUrl + searchUrl);
$j('#searchInput').attr("name", "key_word");
}
else {
$j('#search_form').attr("action", shadoUrl + "/massey/search.cfm");
$j('#searchInput').attr("name", "q");
}
}
function getSelectedSearch() {
return $j('#search_form .search_radio:checked').val();
}
function loadDefaultSearchText() {
var searchText = $j.trim($j('#searchInput').val());
$j('#radio_select_ref').text("");
searchSectionText = $j('#searchtype_section').siblings('label').text();
//searchSectionText = "Search: " + searchSectionText + " zone / section";
searchSectionText = "Search zone: " + searchSectionText;
if (searchText === '' || searchText === searchAllText || searchText === searchSectionText || searchText === searchCoursesText || searchText === searchPeopleText) {
var selectedSearch = $j('.searchFilterOptions > li.active').attr('data-value');
if (selectedSearch === searchAllValue) {
$j('#searchInput').val(searchAllText);
}
else
if (selectedSearch === searchSectionValue) {
$j('#searchInput').val(searchSectionText);
}
else
if (selectedSearch === searchCoursesValue) {
$j('#searchInput').val(searchCoursesText);
}
else
if (selectedSearch === searchPeopleValue) {
$j('#searchInput').val(searchPeopleText);
}
}
}
function loadSearchKeywords() {
var search_form_searchkeyword = window.location.search; //retrieve query string from URL, and then get the keyword value out of it
var noKeyword = true;
if(search_form_searchkeyword.match(/(\?|&)q=/)) {
search_form_searchkeyword = search_form_searchkeyword.replace(/^.*[/&?]q=/,""); //remove the bit before ...q=
search_form_searchkeyword = search_form_searchkeyword.replace(/&.*$/,""); //remove bit after q=...
search_form_searchkeyword = search_form_searchkeyword.replace(/\+/g," ") //replace google's space character +
search_form_searchkeyword = decodeURIComponent(search_form_searchkeyword); //decode any encoded URL values
search_form_searchkeyword = $j.trim(search_form_searchkeyword); //trim the search string
if (search_form_searchkeyword.length > 0) {
$j('#searchInput').val(search_form_searchkeyword); //put the keyword in the search box
noKeyword = false;
}
}
if (noKeyword) {
loadDefaultSearchText();
}
}
function checkSubmission() {
var searchText = $j.trim($j('#searchInput').val());
var retVal = true;
if (searchText === '' || searchText === searchAllText || searchText === searchSectionText || searchText === searchCoursesText || searchText === searchPeopleText) {
retVal = false;
}
return retVal;
}
function clearSearchText() {
var searchText = $j('#searchInput').val();
if (searchText === searchAllText || searchText === searchSectionText || searchText === searchCoursesText || searchText === searchPeopleText) {
$j('#searchInput').val('');
}
}
$j('.searchFilterOptions > li').click(function(){
$j(this).parent().siblings('[name="searchtype"]').val($j(this).attr('data-value'));
$j(this).siblings().removeClass("active");
$j(this).addClass("active");
loadDefaultSearchText();
getSearchAction();
});
$j(document).ready(function () {
//clear search field
$j('#searchInput').on('focus', function () {
clearSearchText();
});
//load search text
loadDefaultSearchText();
$j('#searchInput').on('blur', function () {
loadDefaultSearchText();
});
//change search type
$j('#search_form .search_radio').on('change', function () {
loadDefaultSearchText();
});
//check search text on submit
$j('#search_form').on('submit', function () {
return checkSubmission();
});
loadSearchKeywords();
$j("#aHrefShowHideMore").click(function(){
if ($j(this).text() == "More"){
$j(this).text("Less");
$j("#mu_adv_search").slideDown("slow");
}else{
$j(this).text("More");
$j("#mu_adv_search").slideUp("slow");
}
return false;
});
});
$j(document).ready(function () {
if ($j('.children.topLevel.currentNav').length) {
$j('#showParents').addClass('inactive');
}
var currentNavHeight = $j('.currentNav').height() + $j('#sideNav div.hgroup').height();
$j('#sideNav').css('height', currentNavHeight);
setTitleTextLength();
$j("#sideNav").on("click", ".showChildren", function () {
//console.log('showChildren click');
//console.log(this);
var childCircuitUUID = $j(this).attr('id').replace('children_', '');
$j('#showParents').removeClass('inactive');
if ($j(this).siblings('ul').length === 0) {
shadoHostUrl = getShadoHostUrl();
if(shadoHostUrl.length == 0){
shadoHostUrl = "";
}
$j.ajax({
type:"GET",
url: shadoHostUrl + "/massey/app_templates/_pagetemplates/_templatefiles/tmp_OT_responsive/modules/middle/left/circuitservice.cfc?method=getCircuitNavObj&circuit_uuid=" + childCircuitUUID + "&lang=en&callback=?",
dataType:"jsonp",
jsonp:"jsonp",
async: false,
success: function (data) {
var tmpHTML = "<ul id='c_" + childCircuitUUID + "'>";
$j.each(data, function (i, item) {
tmpHTML += "<li>";
tmpHTML += "<a href='" + shadoHostUrl + "/massey" + item.SSURL + "'>" + item.TITLE + "</a>";
//console.log(item);
if (item.HASCHILDREN === 1) {
tmpHTML += "<span id='children_" + item.CIRCUIT_UUID + "' class='showChildren'></span>";
}
tmpHTML += "</li>";
});
tmpHTML += "</ul>";
$j('#children_' + childCircuitUUID).parent().append(tmpHTML);
setNavToChild(childCircuitUUID)
}
});
}
else{
setNavToChild(childCircuitUUID)
}
return false;
});
$j('#showParents').click(function () {
//console.log('showParents click');
var parentHtml = $j('.currentNav').parent('li').parent('ul').html();
var parentH3 = ($j('.currentNav').parent('li').parent('ul').siblings('a').text());
if (!parentH3) {
parentH3 = $j('#menuRootTitle').text();
}
$j('#h3Title').text(parentH3);
if (parentHtml) {
$j('ul.currentNav').removeClass('currentNav').addClass('outgoingNav').parent('li').parent('ul').addClass('currentNav');
$j('#sideNav > ul').animate({
left: '+=100%'
}, 400, function () {
//animation complete
var currentNavHeight = $j('.currentNav').height() + $j('#sideNav div.hgroup').height();
$j('#sideNav').css('height', currentNavHeight);
$j('.outgoingNav').hide().removeClass('outgoingNav');
});
}
$j('ul.currentNav li').css('display', 'block');
if ($j('.children.topLevel.currentNav').length) {
$j('#showParents').addClass('inactive');
}
setTitleTextLength();
return false;
});
function setTitleTextLength() {
var titleText = $j('#h3Title').text();
var leftnavWidth = $j('#sideNav').width();
var maxChars = 35;
var shortText = "";
if(leftnavWidth < 200){
maxChars = 20;
}
//console.log(maxChars +" " +leftnavWidth + " " +titleText.length);
//console.log(titleText.length + " - " + maxChars);
if (titleText.length > maxChars) {
shortText = jQuery.trim(titleText).substring(0, maxChars).split(" ").slice(0, -1).join(" ") + "...";
$j('#h3Title').text(shortText);
}
}
function setNavToChild(childCircuitUUID){
$j('ul.currentNav').removeClass('currentNav');
//console.log(childCircuitUUID);
$j('#c_' + childCircuitUUID).show().addClass('currentNav');
$j('ul.currentNav').closest('li').show();
$j('ul.currentNav').closest('li').siblings().hide();
//$j('#h3Title').text($j(clickedBtn).siblings('a').text());
$j('#h3Title').text($j('#c_' + childCircuitUUID).siblings('a').text());
setTitleTextLength();
$j('#sideNav > ul').animate({
left: '-=100%'
}, 400, function () {
var currentNavHeight = $j('.currentNav').height() + $j('#sideNav div.hgroup').height();
var t = $j('.currentNav');
$j('#sideNav').css('height', currentNavHeight);
});
}
var id;
$j(window).resize(function() {
clearTimeout(id);
id = setTimeout(doneResizing, 500);
});
function doneResizing(){
var currentNavHeight = $j('.currentNav').height() + $j('#sideNav div.hgroup').height();
$j('#sideNav').css('height', currentNavHeight);
}
});
function visibilityToggle(){
thetable = document.getElementById("tblAdvFilter");
thefield = document.getElementById("advFilters");
thefieldShow = document.getElementById("hrefShow");
thefieldHide = document.getElementById("hrefHide");
if(thetable.style.display == "none"){
thetable.style.display = "";
thefield.value=1;
thefieldShow.style.display = "none";
thefieldHide.style.display = "";
}else{
thetable.style.display = "none";
thefield.value=0;
thefieldShow.style.display = "";
thefieldHide.style.display = "none";
}
document.getElementById("keywords_id").focus();
}
function clearSearchForm(){
var obj_keywords = document.getElementById("keywords_id");
var obj_study_field = document.getElementById("study_field");
var obj_ethnicity = document.getElementById("ethnicity");
var obj_campus = document.getElementById("campus");
var loop=0;
for (loop=0; loop < obj_study_field.options.length; loop++) {
obj_study_field.options[loop].selected = false;
}
for (loop=0; loop < obj_ethnicity.options.length; loop++) {
obj_ethnicity.options[loop].selected = false;
}
for (loop=0; loop < obj_campus.options.length; loop++) {
obj_campus.options[loop].selected = false;
}
document.getElementById("keywords_id").value="";
document.getElementById("scholarship_close_date").selectedIndex=0;
document.getElementById("study_level").selectedIndex=0;
document.getElementById("gender").selectedIndex=0;
document.getElementById("disability").selectedIndex=0;
document.getElementById("mode_code").selectedIndex=0;
document.getElementById("keywords_id").focus();
}
$j(document).ready(function () {
if(cache.hasItem( "shortlistObj" )){
var shortlistObj = cache.getItem("shortlistObj");
} else {
var shortlistObj = new Array();
};
setCheckBoxes();
rebuildShortlist();
function checkActionLink(){
$j('.checkBox-my-shortlist').each(function () {
//console.log($j(this));
var id = $j(this).data('id');
for ( i=0, len=shortlistObj.length; i<len; ++i ){
if(shortlistObj[i].id == id){
//console.log('itsInCache');
$j('i',this).removeClass('icon-plus');
$j('i',this).addClass('icon-minus');
$j('span',this).text('Remove from my shortlist');
return;
};
}
$j('i',this).removeClass('icon-minus');
$j('i',this).addClass('icon-plus');
$j('span',this).text('Add to my shortlist');
});
}
$j('.checkBox-my-shortlist').click(function () {
var link = window.location.pathname;
var id = $j(this).data('id');
var text = $j(this).data('text');
var i = 0;
var len = 0;
var existsInCache = false;
for ( i=0, len=shortlistObj.length; i<len; ++i ){
if(shortlistObj[i].id == id){
existsInCache = true;
break;
};
}
if(existsInCache){
shortlistObj.splice(i, 1);
cache.setItem("shortlistObj", shortlistObj);
} else {
shortlistObj.push( {id:id,link:link,text:text});
cache.setItem("shortlistObj",shortlistObj)
}
rebuildShortlist();
});
function setCheckBoxes() {
for ( i=0, len=shortlistObj.length; i<len; ++i ){
$j('#checkbox'+shortlistObj[i].id).prop('checked', true);
}
}
function rebuildShortlist() {
var strOptions = "";
var i = 0;
var len = 0;
for ( i=0, len=shortlistObj.length; i<len; ++i ){
strOptions = strOptions + '<li><a href="'+shortlistObj[i].link+'?scholarship_id='+shortlistObj[i].id+'&hide_back=1&page=award_display" data-id="'+shortlistObj[i].id+'" >'+shortlistObj[i].text+'</a></li>';
}
if(len == 0){
strOptions = strOptions + "<li>No items</li>"
}
$j('#awards-my-shortlist ul').empty();
$j('#awards-my-shortlist ul').append(strOptions);
checkActionLink();
}
});
function submitOptionForm(func,theform){
document.getElementById(theform + "_function").value = func;
document.getElementById(theform).submit();
}
$j(document).ready(function () {
$j(".searchShowMore").click(function () {
var idx = $j(this).data('idx');
$j(this).hide();
$j('#hiddenSearchResults_' + idx).show("blind", {}, 1000);
});
$j('.advSearchFilter li').click(function () {
var inputClass = $j(this).data("frm");
var inputValue = $j(this).data("value");
$j(this).siblings().children().removeClass('searchFilterActive');
$j('span', this).addClass('searchFilterActive');
$j("input." + inputClass).val(inputValue);
});
$j('.muForm .btn-group li').click(function () {
var inputClass = $j(this).closest('div.btn-group').data("field");
var sList = '';
var sDisplayValue = $j(this).text();
if ((inputClass === 'course-level') && ($j(this).text() !== 'All')) {
var parent = $j(this).parent();
var itemToCheck = $j('input:checkbox:checked', parent);
if (itemToCheck.length >= 1) {
$j(itemToCheck, parent).each(function(){
sList += $j(this).data("value") + ",";
sDisplayValue = $j(this).attr("title");
});
if (itemToCheck.length > 1) {
sDisplayValue = 'Multi Level';
}
}
else if (itemToCheck.length < 1) {
sDisplayValue = 'Level';
}
}
else {
sDisplayValue = $j(this).text();
sList = $j(this).data("value");
}
$j(this).closest('div.btn-group').children('button:first-child').text(sDisplayValue);
$j("input." + inputClass).val("" + sList);
});
$j('#level-filter-All').on('click', function(e){
e.preventDefault();
var parent = $j(this).parent().siblings();
var itemToCheck = $j('input:checkbox:checked', parent);
$j(itemToCheck, parent).each(function(){
$j(this).attr("checked", false);
});
});
$j('.dropdown-menu').on('click', function(e){
if ($j(this).hasClass('dropdown-menu-form') || $j(this).hasClass('level-filter')) {
e.stopPropagation();
}
});
$j('#chkWithExam').click(function () {
var bChecked = $j(this).is(":checked");
$j("#withExam").val(bChecked);
});
$j('#chkWithoutExam').click(function () {
var bChecked = $j(this).is(":checked");
$j("#withoutExam").val(bChecked);
});
$j('#chkWithContactCourse').click(function () {
var bChecked = $j(this).is(":checked");
$j("#withContactCourse").val(bChecked);
});
$j('#chkWithoutContactCourse').click(function () {
var bChecked = $j(this).is(":checked");
$j("#withoutContactCourse").val(bChecked);
});
$j(".tbloffering td").click(function(){
var qs = $j(this).find("a").attr("href")
if(qs.length > 1 ){
window.location = qs;
}
});
});
function addLeftNavButton(title, link, icon) {
console.log('addLeftButton');
var sButton = '<div class="megaButton"><div ><h3><a href="' + link + '">' + title + '<i style="" class="' + icon + '"></i></a></h3></div></div>';
$j(".sideNavWrap").append(sButton);
}
$j(document).ready(function () {
$j("#contenttypeDialog").dialog({
width: 500,
modal: true,
autoOpen: false
});
// add the intermediary popup dialog to the create content links
$j('table tr:first-child td.shadomx_controlButton a.shadomx_controlButtonText').click(function (e) {
e.stopImmediatePropagation();
e.preventDefault();
e.stopPropagation();
var link = $j(e.target).attr('href');
$j('a.contenttypeDialogButton').unbind('click').click(function (e) {
e.stopImmediatePropagation();
e.preventDefault();
e.stopPropagation();
var newlink = link.replace("content_class=html", "content_class=" + $j(this).attr('title'));
window.location = newlink;
});
$j("#contenttypeDialog").dialog('open');
});
/*resize the bounding span for captioned fms images to the size of the image so that
the caption is the same width as the image*/
$j('.captionedImg').each(function(){
$j(this).width($j(this).children('img').width());
});
// Vertical height for 2-4 column snippets.
// doesn't work with chrome/ safari - try catch - equalizer.js & jquery.waitforimages.min.js required
// window.on load loads after everything on page has been loaded
$j(window).on("load", function() {
$j('.snippetBoxes').equalizer({ columns: '.featureBox' });
});
/*advanced search boxes for courses and awards*/
$j('.advSearchFilter li').click(function(){
var inputClass = $j(this).data("frm");
var inputValue = $j(this).data("value");
$j(this).siblings().children().removeClass('searchFilterActive');
$j('span',this).addClass('searchFilterActive');
$j("input."+inputClass).val(inputValue);
});
$j('.btn-group li').click(function(){
var filterName = $j(this).closest('div.btn-group').children('input').attr('class');
var inputClass = $j(this).data("frm");
var inputValue = $j(this).data("value");
$j('button.'+filterName).text($j(this).text());
$j("input."+inputClass).val(inputValue);
});
});
$j(document).ready(function () {
// try catch - equalizer.js required
try{
$j('.homepage_news').waitForImages(function() {
$j('.homepage_news').equalizer({ columns : '.featureBox' });
});
}
catch(e){
}
});
$j('a.pf_toggle').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j(this).parent().children('div.pf_toggle').slideToggle();
$j(this).parent().children('a.pf_toggle').toggle();
});
});
$j('.pf_section ul.supervision li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.supervision .view_more').toggle();
});
});
$j('.pf_section.ao_display p.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section.ao_display .view_more').toggle();
});
});
$j('.pf_section ul.prize_award li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.prize_award .view_more').toggle();
});
});
$j('.pf_section ul.media li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.media .view_more').toggle();
});
});
$j('.pf_section ul.links li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.links .view_more').toggle();
});
});
$j('.pf_section ul.locations li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.locations .view_more').toggle();
});
});
$j('.pf_section ul.qualifications li.view_more_link a').each(function() {
$j(this).on('click', function(e) {
e.preventDefault();
$j('.pf_section ul.qualifications .view_more').toggle();
});
});
var pageLoaded = false;
$j(document).ready(function () {
if (typeof(RESPONSIVEUI) != "undefined") {
RESPONSIVEUI.responsiveTabs();
}
resizeTabs();
pageLoaded = true;
});
/*some browsers trigger the resize during the load - use the pageloaded var to
* determine if the page has loaded to prevent duplicate calls to the resizeTabs functions*/
$j(window).resize(function() {
if (pageLoaded == true) {
resizeTabs();
}
});
function resizeTabs(){
try {
$j('.responsive-tabs').each(function(){
var minWidth = 720;//default for staff profiles
var dataMinWidth = $j(this).data("min-width");
if (($j.isNumeric(dataMinWidth)) && (dataMinWidth > 150)){//use 150 to catch faulty values like 1, 10 etc
minWidth = dataMinWidth;
}
var screenWidth = $j(window).width();
if(minWidth <= $j(window).width()){
$j(this).removeClass("showAccordian").addClass("showTabs");
}
else{
$j(this).removeClass("showTabs").addClass("showAccordian");
}
});
}
catch(e){
//do nothing
}
}
/* Using .live for legacy jquery on accordions */
$j(document).ready(function() {
$j('.vertAccordion .closed .accordionContent').hide();
$j('.closed .accordionHeader').live('click',function() {
var toOpen = $j(this);
$j(this).closest('.vertAccordion').parent().children().find('.open .accordionContent').slideUp(600, function() {
$j(this).closest('.accordion').removeClass('open').addClass('closed');
});
toOpen.closest('.accordion').removeClass('closed').addClass('open').children('.accordionContent').slideDown(600, function() {
var scrollToVal = $j('.vertAccordion .accordion.open').offset();
});
});
$j('.open .accordionHeader').live('click',function() {
$j(this).siblings('.accordionContent').slideUp(600);
$j(this).parent('.open').removeClass('open').addClass('closed');
});
});
function manageFooters(){
$dialog = $j('#footerset_dialog').dialog({
autoOpen: false,
title: 'Manage Footers',
width: $j(window).width() * 0.9,
height: $j(window).height() * 0.9,
modal: true,
close: function() {
document.getElementById('tmp_opt_footer_form').submit(); //$j('tmp_opt_footer_form').submit(); doesn't work - fails silently
}
});
//open footer set page in an iframe
$dialog.html('<iframe src="/massey/app_templates/webapps/index.cfm?shadoaction=apps/footer/index" width="100%" height="100%" style="border: 0px;"></iframe> ').dialog('open');
}
$j(document).ready(function () {
//open manage footers dialog
$j('#manage-footers').on('click', function () {
manageFooters();
});
//change the footer set
var lastValue;
$j('#footer-list').bind('click', function(e) {
lastValue = $j(this).val();
}).bind('change', function(e) {
if (confirm("This will change the footer for all pages in the section and and any subsections unless already overridden.") === true) {
document.getElementById('tmp_opt_footer_form').submit(); //$j('tmp_opt_footer_form').submit(); doesn't work - fails silently
}
else {
$j(this).val(lastValue);
}
});
});
/* qtip2 v3.0.3 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Wed May 11 2016 22:31:31 */
!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=F,this.elements={target:a},this._id=S+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:E,attr:e,onTooltip:E,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=E}function f(a){return a===F||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?E:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?(c=g(b)?E:b,b=a.content={text:c}):c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==E,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,F,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(d.isPlainObject(b.title)&&(b.button=b.title.button,b.title=b.title.text),g(b.title||E)&&(b.title=E))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===D?{ready:D}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(R,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)if(this.checks.hasOwnProperty(c))for(d in this.checks[c])this.checks[c].hasOwnProperty(d)&&(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return V.concat("").join(a?"-"+a+" ":" ")}function l(a,b){return b>0?setTimeout(d.proxy(a,this),b):void a.call(this)}function m(a){this.tooltip.hasClass(aa)||(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=l.call(this,function(){this.toggle(D,a)},this.options.show.delay))}function n(a){if(!this.tooltip.hasClass(aa)&&!this.destroyed){var b=d(a.relatedTarget),c=b.closest(W)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=l.call(this,function(){this.toggle(E,a)},this.options.hide.delay,this)}}function o(a){!this.tooltip.hasClass(aa)&&this.options.hide.inactive&&(clearTimeout(this.timers.inactive),this.timers.inactive=l.call(this,function(){this.hide(a)},this.options.hide.inactive))}function p(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function q(a,c,e){d(b.body).delegate(a,(c.split?c:c.join("."+S+" "))+"."+S,function(){var a=y.api[d.attr(this,U)];a&&!a.disabled&&e.apply(a,arguments)})}function r(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):F,p="html5"===f.metadata.type&&o?o[f.metadata.name]:F,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(D,{},y.defaults,f,"object"==typeof q?h(q):F,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===E||!j)return E;k.content.text=j}if(i.container.length||(i.container=m),i.target===E&&(i.target=n),k.show.target===E&&(k.show.target=n),k.show.solo===D&&(k.show.solo=i.container.closest("body")),k.hide.target===E&&(k.hide.target=n),k.position.viewport===D&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new A(i.at,D),i.my=new A(i.my),a.data(S))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===E)return E;return a.attr(T,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr(ca,l).attr("title",""),g=new e(a,k,c,!!j),a.data(S,g),g}function s(a){return a.charAt(0).toUpperCase()+a.slice(1)}function t(a,b){var d,e,f=b.charAt(0).toUpperCase()+b.slice(1),g=(b+" "+va.join(f+" ")+f).split(" "),h=0;if(ua[b])return a.css(ua[b]);for(;d=g[h++];)if((e=a.css(d))!==c)return ua[b]=d,e}function u(a,b){return Math.ceil(parseFloat(t(a,b)))}function v(a,b){this._ns="tip",this.options=b,this.offset=b.offset,this.size=[b.width,b.height],this.qtip=a,this.init(a)}function w(a,b){this.options=b,this._ns="-modal",this.qtip=a,this.init(a)}function x(a){this._ns="ie6",this.qtip=a,this.init(a)}var y,z,A,B,C,D=!0,E=!1,F=null,G="x",H="y",I="width",J="height",K="top",L="left",M="bottom",N="right",O="center",P="flipinvert",Q="shift",R={},S="qtip",T="data-hasqtip",U="data-qtip-id",V=["ui-widget","ui-tooltip"],W="."+S,X="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),Y=S+"-fixed",Z=S+"-default",$=S+"-focus",_=S+"-hover",aa=S+"-disabled",ba="_replacedByqTip",ca="oldtitle",da={ie:function(){var a,c;for(a=4,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];a+=1);return a>4?a:NaN}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||E};z=e.prototype,z._when=function(a){return d.when.apply(d,a)},z.render=function(a){if(this.rendered||this.destroyed)return this;var b=this,c=this.options,e=this.cache,f=this.elements,g=c.content.text,h=c.content.title,i=c.content.button,j=c.position,k=[];return d.attr(this.target[0],"aria-describedby",this._id),e.posClass=this._createPosClass((this.position={my:j.my,at:j.at}).my),this.tooltip=f.tooltip=d("<div>",{id:this._id,"class":[S,Z,c.style.classes,e.posClass].join(" "),width:c.style.width||"",height:c.style.height||"",tracking:"mouse"===j.target&&j.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":E,"aria-describedby":this._id+"-content","aria-hidden":D}).toggleClass(aa,this.disabled).attr(U,this.id).data(S,this).appendTo(j.container).append(f.content=d("<div>",{"class":S+"-content",id:this._id+"-content","aria-atomic":D})),this.rendered=-1,this.positioning=D,h&&(this._createTitle(),d.isFunction(h)||k.push(this._updateTitle(h,E))),i&&this._createButton(),d.isFunction(g)||k.push(this._updateContent(g,E)),this.rendered=D,this._setWidget(),d.each(R,function(a){var c;"render"===this.initialize&&(c=this(b))&&(b.plugins[a]=c)}),this._unassignEvents(),this._assignEvents(),this._when(k).then(function(){b._trigger("render"),b.positioning=E,b.hiddenDuringWait||!c.show.ready&&!a||b.toggle(D,e.event,E),b.hiddenDuringWait=E}),y.api[this.id]=this,this},z.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=D;var a,b=this.target,c=b.attr(ca);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()});for(a in this.timers)this.timers.hasOwnProperty(a)&&clearTimeout(this.timers[a]);b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"),this.options.suppress&&c&&b.attr("title",c).removeAttr(ca),this._unassignEvents(),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=F,delete y.api[this.id]}}return this.destroyed?this.target:(a===D&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},B=z.checks={builtin:{"^id$":function(a,b,c,e){var f=c===D?y.nextid:c,g=S+"-"+f;f!==E&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),void this._updateTitle(c)):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(this.position[b]=a[b]=new A(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(D)||this.toggle(D))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(Z,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},z.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var ea=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,fa=/^prerender|show\.ready/i;z.set=function(a,b){if(this.destroyed)return this;var c,e=this.rendered,f=E,g=this.options;return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&fa.test(b))return void delete a[b];var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=ea.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=D,d.each(a,d.proxy(j,this)),this.positioning=E,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?F:this.cache.event),this},z._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=D,a.then(function(a){return e.waiting=E,c._update(a,b)},F,function(a){return c._update(a,b)})):a===E||!a&&""!==a?E:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):E},z._waitForContent=function(a){var b=this.cache;return b.waiting=D,(d.fn.imagesLoaded?a.imagesLoaded():(new d.Deferred).resolve([])).done(function(){b.waiting=E}).promise()},z._updateContent=function(a,b){this._update(a,this.elements.content,b)},z._updateTitle=function(a,b){this._update(a,this.elements.title,b)===E&&this._removeTitle(E)},z._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div>",{"class":S+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div>",{id:b,"class":S+"-title","aria-atomic":D})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},z._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=F,a!==E&&this.reposition())},z._createPosClass=function(a){return S+"-pos-"+(a||this.options.position.my).abbrev()},z.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=D;var f,g,h,i,j=this.cache,k=this.tooltip,l=this.options.position,m=l.target,n=l.my,o=l.at,p=l.viewport,q=l.container,r=l.adjust,s=r.method.split(" "),t=k.outerWidth(E),u=k.outerHeight(E),v=0,w=0,x=k.css("position"),y={left:0,top:0},z=k[0].offsetWidth>0,A=c&&"scroll"===c.type,B=d(a),C=q[0].ownerDocument,F=this.mouse;if(d.isArray(m)&&2===m.length)o={x:L,y:K},y={left:m[0],top:m[1]};else if("mouse"===m)o={x:L,y:K},(!r.mouse||this.options.hide.distance)&&j.origin&&j.origin.pageX?c=j.origin:!c||c&&("resize"===c.type||"scroll"===c.type)?c=j.event:F&&F.pageX&&(c=F),"static"!==x&&(y=q.offset()),C.body.offsetWidth!==(a.innerWidth||C.documentElement.clientWidth)&&(g=d(b.body).offset()),y={left:c.pageX-y.left+(g&&g.left||0),top:c.pageY-y.top+(g&&g.top||0)},r.mouse&&A&&F&&(y.left-=(F.scrollX||0)-B.scrollLeft(),y.top-=(F.scrollY||0)-B.scrollTop());else{if("event"===m?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?j.target=d(c.target):c.target||(j.target=this.elements.target):"event"!==m&&(j.target=d(m.jquery?m:this.elements.target)),m=j.target,m=d(m).eq(0),0===m.length)return this;m[0]===b||m[0]===a?(v=da.iOS?a.innerWidth:m.width(),w=da.iOS?a.innerHeight:m.height(),m[0]===a&&(y={top:(p||m).scrollTop(),left:(p||m).scrollLeft()})):R.imagemap&&m.is("area")?f=R.imagemap(this,m,o,R.viewport?s:E):R.svg&&m&&m[0].ownerSVGElement?f=R.svg(this,m,o,R.viewport?s:E):(v=m.outerWidth(E),w=m.outerHeight(E),y=m.offset()),f&&(v=f.width,w=f.height,g=f.offset,y=f.position),y=this.reposition.offset(m,y,q),(da.iOS>3.1&&da.iOS<4.1||da.iOS>=4.3&&da.iOS<4.33||!da.iOS&&"fixed"===x)&&(y.left-=B.scrollLeft(),y.top-=B.scrollTop()),(!f||f&&f.adjustable!==E)&&(y.left+=o.x===N?v:o.x===O?v/2:0,y.top+=o.y===M?w:o.y===O?w/2:0)}return y.left+=r.x+(n.x===N?-t:n.x===O?-t/2:0),y.top+=r.y+(n.y===M?-u:n.y===O?-u/2:0),R.viewport?(h=y.adjusted=R.viewport(this,y,l,v,w,t,u),g&&h.left&&(y.left+=g.left),g&&h.top&&(y.top+=g.top),h.my&&(this.position.my=h.my)):y.adjusted={left:0,top:0},j.posClass!==(i=this._createPosClass(this.position.my))&&(j.posClass=i,k.removeClass(j.posClass).addClass(i)),this._trigger("move",[y,p.elem||p],c)?(delete y.adjusted,e===E||!z||isNaN(y.left)||isNaN(y.top)||"mouse"===m||!d.isFunction(l.effect)?k.css(y):d.isFunction(l.effect)&&(l.effect.call(k,this,d.extend({},y)),k.queue(function(a){d(this).css({opacity:"",height:""}),da.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=E,this):this},z.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!da.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var ga=(A=z.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,O).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?H:G}).prototype;ga.invert=function(a,b){this[a]=this[a]===L?N:this[a]===N?L:b||this[a]},ga.string=function(a){var b=this.x,c=this.y,d=b!==c?"center"===b||"center"!==c&&(this.precedance===H||this.forceY)?[c,b]:[b,c]:[b];return a!==!1?d.join(" "):d},ga.abbrev=function(){var a=this.string(!1);return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},ga.clone=function(){return new A(this.string(),this.forceY)},z.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&e.event&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=d.event.fix(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=D),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",l=this.options[k],m=this.options.position,n=this.options.content,o=this.tooltip.css("width"),p=this.tooltip.is(":visible"),q=a||1===l.target.length,r=!c||l.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!p),h=!g.is(":animated")&&p===a&&r,i=h?F:!!this._trigger(k,[90]),this.destroyed?this:(i!==E&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(this.mouse&&(e.origin=d.event.fix(this.mouse)),d.isFunction(n.text)&&this._updateContent(n.text,E),d.isFunction(n.title)&&this._updateTitle(n.title,E),!C&&"mouse"===m.target&&m.adjust.mouse&&(d(b).bind("mousemove."+S,this._storeMouse),C=D),o||g.css("width",g.outerWidth(E)),this.reposition(c,arguments[2]),o||g.css("width",""),l.solo&&("string"==typeof l.solo?d(l.solo):d(W,l.solo)).not(g).not(l.target).qtip("hide",new d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,C&&!d(W+'[tracking="true"]:visible',l.solo).not(g).length&&(d(b).unbind("mousemove."+S),C=E),this.blur(c)),j=d.proxy(function(){a?(da.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof l.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),l.effect===E||q===E?(g[k](),j()):d.isFunction(l.effect)?(g.stop(1,1),l.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&l.target.trigger("qtip-"+this.id+"-inactive"),this))},z.show=function(a){return this.toggle(D,a)},z.hide=function(a){return this.toggle(E,a)},z.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(W),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=y.zindex+b.length;return c.hasClass($)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+$).qtip("blur",a)),c.addClass($)[0].style.zIndex=f),this},z.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass($),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},z.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(aa):this.disabled):"boolean"!=typeof a&&(a=D),this.rendered&&this.tooltip.toggleClass(aa,a).attr("aria-disabled",a),this.disabled=!!a,this)},z.enable=function(){return this.disable(E)},z._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),e.jquery?b.button=e:b.button=d("<a>",{"class":"qtip-close "+(this.options.style.widget?"":S+"-icon"),title:g,"aria-label":g}).prepend(d("<span>",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(aa)||a.hide(b),E})},z._updateButton=function(a){if(!this.rendered)return E;var b=this.elements.button;a?this._createButton():b.remove()},z._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(aa);c.removeClass(aa),aa=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(aa,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(Z,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(S+"-icon",!a)},z._storeMouse=function(a){return(this.mouse=d.event.fix(a)).type="mousemove",this},z._bind=function(a,b,c,e,f){if(a&&c&&b.length){var g="."+this._id+(e?"-"+e:"");return d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this)),this}},z._unbind=function(a,b){return a&&d(a).unbind("."+this._id+(b?"-"+b:"")),this},z._trigger=function(a,b,c){var e=new d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||F,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=E,!e.isDefaultPrevented()},z._bindEvents=function(a,b,c,e,f,g){var h=c.filter(e).add(e.filter(c)),i=[];h.length&&(d.each(b,function(b,c){var e=d.inArray(c,a);e>-1&&i.push(a.splice(e,1)[0])}),i.length&&(this._bind(h,i,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)}),c=c.not(h),e=e.not(h))),this._bind(c,a,f),this._bind(e,b,g)},z._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?E:(this.cache.event=a&&d.event.fix(a),this.cache.target=a&&d(a.target),clearTimeout(this.timers.show),void(this.timers.show=l.call(this,function(){this.render("object"==typeof a||c.show.ready)},c.prerender?0:c.show.delay)))}var c=this.options,e=c.show.target,f=c.hide.target,g=c.show.event?d.trim(""+c.show.event).split(" "):[],h=c.hide.event?d.trim(""+c.hide.event).split(" "):[];this._bind(this.elements.target,["remove","removeqtip"],function(){this.destroy(!0)},"destroy"),/mouse(over|enter)/i.test(c.show.event)&&!/mouse(out|leave)/i.test(c.hide.event)&&h.push("mouseleave"),this._bind(e,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=D}),this._bindEvents(g,h,e,f,b,function(){return this.timers?void clearTimeout(this.timers.show):E}),(c.show.ready||c.prerender)&&b.call(this,a)},z._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),q=d(a),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(Y)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0,e=b.parents(W).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",o,"inactive"),this._bind(i.add(g),y.inactiveEvents,o)),this._bindEvents(r,s,h,i,m,n),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){return this.cache?void(this.cache.onTarget="mouseenter"===a.type):E}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:q,"resize",p),f.adjust.scroll&&this._bind(q.add(f.container),"scroll",p)},z._unassignEvents=function(){var c=this.options,e=c.show.target,f=c.hide.target,g=d.grep([this.elements.target[0],this.rendered&&this.tooltip[0],c.position.container[0],c.position.viewport[0],c.position.container.closest("html")[0],a,b],function(a){return"object"==typeof a});e&&e.toArray&&(g=g.concat(e.toArray())),f&&f.toArray&&(g=g.concat(f.toArray())),this._unbind(g)._unbind(g,"destroy")._unbind(g,"inactive")},d(function(){q(W,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(Y)&&!c.hasClass(aa)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.position.adjust.mouse&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass(_,b)}),q("["+U+"]",X,o)}),y=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=F,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],S):F;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,S);if(!a)return D;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),E;a.set(b,e)}}),g!==F?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(D,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===E||c.length<1||y.api[c]?y.nextid++:c,b=r(d(this),c,k),b===E?D:(y.api[c]=b,d.each(R,function(){"initialize"===this.initialize&&this(b)}),void b._assignInitialEvents(j))}))},d.qtip=e,y.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&f.options&&"object"==typeof f&&"object"==typeof f.options&&f.options.suppress)return arguments.length<2?d.attr(c,ca):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(ca,b))}return d.fn["attr"+ba].apply(this,arguments)},clone:function(a){var b=d.fn["clone"+ba].apply(this,arguments);return a||b.filter("["+ca+"]").attr("title",function(){return d.attr(this,ca)}).removeAttr(ca),b}},function(a,b){if(!b||d.fn[a+ba])return D;var c=d.fn[a+ba]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+ba]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(T))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+ba].apply(this,arguments)}),y.version="3.0.3",y.nextid=0,y.inactiveEvents=X,y.zindex=15e3,y.defaults={prerender:E,id:E,overwrite:D,suppress:D,content:{text:D,attr:"title",title:E,button:E},position:{my:"top left",at:"bottom right",target:E,container:E,viewport:E,adjust:{x:0,y:0,mouse:D,scroll:D,resize:D,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:E})}},show:{target:E,event:"mouseenter",effect:D,delay:90,solo:E,ready:E,autofocus:E},hide:{target:E,event:"mouseleave",effect:D,delay:0,fixed:E,inactive:E,leave:"window",distance:E},style:{classes:"",widget:E,width:E,height:E,def:D},events:{render:F,move:F,show:F,hide:F,toggle:F,visible:F,hidden:F,focus:F,blur:F}};var ha,ia,ja,ka,la,ma="margin",na="border",oa="color",pa="background-color",qa="transparent",ra=" !important",sa=!!b.createElement("canvas").getContext,ta=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,ua={},va=["Webkit","O","Moz","ms"];sa?(ka=a.devicePixelRatio||1,la=function(){var a=b.createElement("canvas").getContext("2d");return a.backingStorePixelRatio||a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||1}(),ja=ka/la):ia=function(a,b,c){return"<qtipvml:"+a+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(b||"")+' style="behavior: url(#default#VML); '+(c||"")+'">'},d.extend(v.prototype,{init:function(a){var b,c;c=this.element=a.elements.tip=d("<div>",{"class":S+"-tip"}).prependTo(a.tooltip),sa?(b=d("<canvas>").appendTo(this.element)[0].getContext("2d"),b.lineJoin="miter",b.miterLimit=1e5,b.save()):(b=ia("shape",'coordorigin="0,0"',"position:absolute;"),this.element.html(b+b),a._bind(d("*",c).add(c),["click","mousedown"],function(a){a.stopPropagation()},this._ns)),a._bind(a.tooltip,"tooltipmove",this.reposition,this._ns,this),this.create()},_swapDimensions:function(){this.size[0]=this.options.height,this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width,this.size[1]=this.options.height},_useTitle:function(a){var b=this.qtip.elements.titlebar;return b&&(a.y===K||a.y===O&&this.element.position().top+this.size[1]/2+this.options.offset<b.outerHeight(D))},_parseCorner:function(a){var b=this.qtip.options.position.my;return a===E||b===E?a=E:a===D?a=new A(b.string()):a.string||(a=new A(a),a.fixed=D),a},_parseWidth:function(a,b,c){var d=this.qtip.elements,e=na+s(b)+"Width";return(c?u(c,e):u(d.content,e)||u(this._useTitle(a)&&d.titlebar||d.content,e)||u(d.tooltip,e))||0},_parseRadius:function(a){var b=this.qtip.elements,c=na+s(a.y)+s(a.x)+"Radius";return da.ie<9?0:u(this._useTitle(a)&&b.titlebar||b.content,c)||u(b.tooltip,c)||0},_invalidColour:function(a,b,c){var d=a.css(b);return!d||c&&d===a.css(c)||ta.test(d)?E:d},_parseColours:function(a){var b=this.qtip.elements,c=this.element.css("cssText",""),e=na+s(a[a.precedance])+s(oa),f=this._useTitle(a)&&b.titlebar||b.content,g=this._invalidColour,h=[];return h[0]=g(c,pa)||g(f,pa)||g(b.content,pa)||g(b.tooltip,pa)||c.css(pa),h[1]=g(c,e,oa)||g(f,e,oa)||g(b.content,e,oa)||g(b.tooltip,e,oa)||b.tooltip.css(e),d("*",c).add(c).css("cssText",pa+":"+qa+ra+";"+na+":0"+ra+";"),h},_calculateSize:function(a){var b,c,d,e=a.precedance===H,f=this.options.width,g=this.options.height,h="c"===a.abbrev(),i=(e?f:g)*(h?.5:1),j=Math.pow,k=Math.round,l=Math.sqrt(j(i,2)+j(g,2)),m=[this.border/i*l,this.border/g*l];return m[2]=Math.sqrt(j(m[0],2)-j(this.border,2)),m[3]=Math.sqrt(j(m[1],2)-j(this.border,2)),b=l+m[2]+m[3]+(h?0:m[0]),c=b/l,d=[k(c*f),k(c*g)],e?d:d.reverse()},_calculateTip:function(a,b,c){c=c||1,b=b||this.size;var d=b[0]*c,e=b[1]*c,f=Math.ceil(d/2),g=Math.ceil(e/2),h={br:[0,0,d,e,d,0],bl:[0,0,d,0,0,e],tr:[0,e,d,0,d,e],tl:[0,0,0,e,d,e],tc:[0,e,f,0,d,e],bc:[0,0,d,0,f,e],rc:[0,0,d,g,0,e],lc:[d,0,d,e,0,g]};return h.lt=h.br,h.rt=h.bl,h.lb=h.tr,h.rb=h.tl,h[a.abbrev()]},_drawCoords:function(a,b){a.beginPath(),a.moveTo(b[0],b[1]),a.lineTo(b[2],b[3]),a.lineTo(b[4],b[5]),a.closePath()},create:function(){var a=this.corner=(sa||da.ie)&&this._parseCorner(this.options.corner);return this.enabled=!!this.corner&&"c"!==this.corner.abbrev(),this.enabled&&(this.qtip.cache.corner=a.clone(),this.update()),this.element.toggle(this.enabled),this.corner},update:function(b,c){if(!this.enabled)return this;var e,f,g,h,i,j,k,l,m=this.qtip.elements,n=this.element,o=n.children(),p=this.options,q=this.size,r=p.mimic,s=Math.round;b||(b=this.qtip.cache.corner||this.corner),r===E?r=b:(r=new A(r),r.precedance=b.precedance,"inherit"===r.x?r.x=b.x:"inherit"===r.y?r.y=b.y:r.x===r.y&&(r[b.precedance]=b[b.precedance])),f=r.precedance,b.precedance===G?this._swapDimensions():this._resetDimensions(),e=this.color=this._parseColours(b),e[1]!==qa?(l=this.border=this._parseWidth(b,b[b.precedance]),p.border&&1>l&&!ta.test(e[1])&&(e[0]=e[1]),this.border=l=p.border!==D?p.border:l):this.border=l=0,k=this.size=this._calculateSize(b),n.css({width:k[0],height:k[1],lineHeight:k[1]+"px"}),j=b.precedance===H?[s(r.x===L?l:r.x===N?k[0]-q[0]-l:(k[0]-q[0])/2),s(r.y===K?k[1]-q[1]:0)]:[s(r.x===L?k[0]-q[0]:0),s(r.y===K?l:r.y===M?k[1]-q[1]-l:(k[1]-q[1])/2)],sa?(g=o[0].getContext("2d"),g.restore(),g.save(),g.clearRect(0,0,6e3,6e3),h=this._calculateTip(r,q,ja),i=this._calculateTip(r,this.size,ja),o.attr(I,k[0]*ja).attr(J,k[1]*ja),o.css(I,k[0]).css(J,k[1]),this._drawCoords(g,i),g.fillStyle=e[1],g.fill(),g.translate(j[0]*ja,j[1]*ja),this._drawCoords(g,h),g.fillStyle=e[0],g.fill()):(h=this._calculateTip(r),h="m"+h[0]+","+h[1]+" l"+h[2]+","+h[3]+" "+h[4]+","+h[5]+" xe",j[2]=l&&/^(r|b)/i.test(b.string())?8===da.ie?2:1:0,o.css({coordsize:k[0]+l+" "+k[1]+l,antialias:""+(r.string().indexOf(O)>-1),left:j[0]-j[2]*Number(f===G),top:j[1]-j[2]*Number(f===H),width:k[0]+l,height:k[1]+l}).each(function(a){var b=d(this);b[b.prop?"prop":"attr"]({coordsize:k[0]+l+" "+k[1]+l,path:h,fillcolor:e[0],filled:!!a,stroked:!a}).toggle(!(!l&&!a)),!a&&b.html(ia("stroke",'weight="'+2*l+'px" color="'+e[1]+'" miterlimit="1000" joinstyle="miter"'))})),a.opera&&setTimeout(function(){m.tip.css({display:"inline-block",visibility:"visible"})},1),c!==E&&this.calculate(b,k)},calculate:function(a,b){if(!this.enabled)return E;var c,e,f=this,g=this.qtip.elements,h=this.element,i=this.options.offset,j={};
return a=a||this.corner,c=a.precedance,b=b||this._calculateSize(a),e=[a.x,a.y],c===G&&e.reverse(),d.each(e,function(d,e){var h,k,l;e===O?(h=c===H?L:K,j[h]="50%",j[ma+"-"+h]=-Math.round(b[c===H?0:1]/2)+i):(h=f._parseWidth(a,e,g.tooltip),k=f._parseWidth(a,e,g.content),l=f._parseRadius(a),j[e]=Math.max(-f.border,d?k:i+(l>h?l:-h)))}),j[a[c]]-=b[c===G?0:1],h.css({margin:"",top:"",bottom:"",left:"",right:""}).css(j),j},reposition:function(a,b,d){function e(a,b,c,d,e){a===Q&&j.precedance===b&&k[d]&&j[c]!==O?j.precedance=j.precedance===G?H:G:a!==Q&&k[d]&&(j[b]=j[b]===O?k[d]>0?d:e:j[b]===d?e:d)}function f(a,b,e){j[a]===O?p[ma+"-"+b]=o[a]=g[ma+"-"+b]-k[b]:(h=g[e]!==c?[k[b],-g[b]]:[-k[b],g[b]],(o[a]=Math.max(h[0],h[1]))>h[0]&&(d[b]-=k[b],o[b]=E),p[g[e]!==c?e:b]=o[a])}if(this.enabled){var g,h,i=b.cache,j=this.corner.clone(),k=d.adjusted,l=b.options.position.adjust.method.split(" "),m=l[0],n=l[1]||l[0],o={left:E,top:E,x:0,y:0},p={};this.corner.fixed!==D&&(e(m,G,H,L,N),e(n,H,G,K,M),j.string()===i.corner.string()&&i.cornerTop===k.top&&i.cornerLeft===k.left||this.update(j,E)),g=this.calculate(j),g.right!==c&&(g.left=-g.right),g.bottom!==c&&(g.top=-g.bottom),g.user=this.offset,o.left=m===Q&&!!k.left,o.left&&f(G,L,N),o.top=n===Q&&!!k.top,o.top&&f(H,K,M),this.element.css(p).toggle(!(o.x&&o.y||j.x===O&&o.y||j.y===O&&o.x)),d.left-=g.left.charAt?g.user:m!==Q||o.top||!o.left&&!o.top?g.left+this.border:0,d.top-=g.top.charAt?g.user:n!==Q||o.left||!o.left&&!o.top?g.top+this.border:0,i.cornerLeft=k.left,i.cornerTop=k.top,i.corner=j.clone()}},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns),this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()}}),ha=R.tip=function(a){return new v(a,a.options.style.tip)},ha.initialize="render",ha.sanitize=function(a){if(a.style&&"tip"in a.style){var b=a.style.tip;"object"!=typeof b&&(b=a.style.tip={corner:b}),/string|boolean/i.test(typeof b.corner)||(b.corner=D)}},B.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create(),this.qtip.reposition()},"^style.tip.(height|width)$":function(a){this.size=[a.width,a.height],this.update(),this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}},d.extend(D,y.defaults,{style:{tip:{corner:D,mimic:E,width:6,height:6,border:D,offset:0}}});var wa,xa,ya="qtip-modal",za="."+ya;xa=function(){function a(a){if(d.expr[":"].focusable)return d.expr[":"].focusable;var b,c,e,f=!isNaN(d.attr(a,"tabindex")),g=a.nodeName&&a.nodeName.toLowerCase();return"area"===g?(b=a.parentNode,c=b.name,a.href&&c&&"map"===b.nodeName.toLowerCase()?(e=d("img[usemap=#"+c+"]")[0],!!e&&e.is(":visible")):!1):/input|select|textarea|button|object/.test(g)?!a.disabled:"a"===g?a.href||f:f}function c(a){j.length<1&&a.length?a.not("body").blur():j.first().focus()}function e(a){if(h.is(":visible")){var b,e=d(a.target),g=f.tooltip,i=e.closest(W);b=i.length<1?E:parseInt(i[0].style.zIndex,10)>parseInt(g[0].style.zIndex,10),b||e.closest(W)[0]===g[0]||c(e)}}var f,g,h,i=this,j={};d.extend(i,{init:function(){return h=i.elem=d("<div>",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return E}}).hide(),d(b.body).bind("focusin"+za,e),d(b).bind("keydown"+za,function(a){f&&f.options.show.modal.escape&&27===a.keyCode&&f.hide(a)}),h.bind("click"+za,function(a){f&&f.options.show.modal.blur&&f.hide(a)}),i},update:function(b){f=b,j=b.options.show.modal.stealfocus!==E?b.tooltip.find("*").filter(function(){return a(this)}):[]},toggle:function(a,e,j){var k=a.tooltip,l=a.options.show.modal,m=l.effect,n=e?"show":"hide",o=h.is(":visible"),p=d(za).filter(":visible:not(:animated)").not(k);return i.update(a),e&&l.stealfocus!==E&&c(d(":focus")),h.toggleClass("blurs",l.blur),e&&h.appendTo(b.body),h.is(":animated")&&o===e&&g!==E||!e&&p.length?i:(h.stop(D,E),d.isFunction(m)?m.call(h,e):m===E?h[n]():h.fadeTo(parseInt(j,10)||90,e?1:0,function(){e||h.hide()}),e||h.queue(function(a){h.css({left:"",top:""}),d(za).length||h.detach(),a()}),g=e,f.destroyed&&(f=F),i)}}),i.init()},xa=new xa,d.extend(w.prototype,{init:function(a){var b=a.tooltip;return this.options.on?(a.elements.overlay=xa.elem,b.addClass(ya).css("z-index",y.modal_zindex+d(za).length),a._bind(b,["tooltipshow","tooltiphide"],function(a,c,e){var f=a.originalEvent;if(a.target===b[0])if(f&&"tooltiphide"===a.type&&/mouse(leave|enter)/.test(f.type)&&d(f.relatedTarget).closest(xa.elem[0]).length)try{a.preventDefault()}catch(g){}else(!f||f&&"tooltipsolo"!==f.type)&&this.toggle(a,"tooltipshow"===a.type,e)},this._ns,this),a._bind(b,"tooltipfocus",function(a,c){if(!a.isDefaultPrevented()&&a.target===b[0]){var e=d(za),f=y.modal_zindex+e.length,g=parseInt(b[0].style.zIndex,10);xa.elem[0].style.zIndex=f-1,e.each(function(){this.style.zIndex>g&&(this.style.zIndex-=1)}),e.filter("."+$).qtip("blur",a.originalEvent),b.addClass($)[0].style.zIndex=f,xa.update(c);try{a.preventDefault()}catch(h){}}},this._ns,this),void a._bind(b,"tooltiphide",function(a){a.target===b[0]&&d(za).filter(":visible").not(b).last().qtip("focus",a)},this._ns,this)):this},toggle:function(a,b,c){return a&&a.isDefaultPrevented()?this:void xa.toggle(this.qtip,!!b,c)},destroy:function(){this.qtip.tooltip.removeClass(ya),this.qtip._unbind(this.qtip.tooltip,this._ns),xa.toggle(this.qtip,E),delete this.qtip.elements.overlay}}),wa=R.modal=function(a){return new w(a,a.options.show.modal)},wa.sanitize=function(a){a.show&&("object"!=typeof a.show.modal?a.show.modal={on:!!a.show.modal}:"undefined"==typeof a.show.modal.on&&(a.show.modal.on=D))},y.modal_zindex=y.zindex-200,wa.initialize="render",B.modal={"^show.modal.(on|blur)$":function(){this.destroy(),this.init(),this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}},d.extend(D,y.defaults,{show:{modal:{on:E,effect:D,blur:D,stealfocus:D,escape:D}}}),R.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],s=u[a],t=v[a],w=c===Q,x=s===f?j:s===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=q[f]+r[f]-(n?0:m[f]),A=z-k,B=k+j-(h===I?o:p)-z,C=x-(u.precedance===a||s===u[b]?y:0)-(t===O?i/2:0);return w?(C=(s===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-m[f]+r[f],k-C,Math.min(Math.max(-m[f]+r[f]+(h===I?o:p),k+C),d[f],"center"===s?k-x:1e9))):(e*=c===P?2:0,A>0&&(s!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(s!==g||A>0)&&(d[f]-=(s===O?-C:C)+e,l.invert(a,g)),d[f]<q[f]&&-d[f]>B&&(d[f]=k,l=u.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s=e.target,t=c.elements.tooltip,u=e.my,v=e.at,w=e.adjust,x=w.method.split(" "),y=x[0],z=x[1]||x[0],A=e.viewport,B=e.container,C={left:0,top:0};return A.jquery&&s[0]!==a&&s[0]!==b.body&&"none"!==w.method?(m=B.offset()||C,n="static"===B.css("position"),k="fixed"===t.css("position"),o=A[0]===a?A.width():A.outerWidth(E),p=A[0]===a?A.height():A.outerHeight(E),q={left:k?0:A.scrollLeft(),top:k?0:A.scrollTop()},r=A.offset()||C,"shift"===y&&"shift"===z||(l=u.clone()),C={left:"none"!==y?j(G,H,y,w.x,L,N,I,f,h):0,top:"none"!==z?j(H,G,z,w.y,K,M,J,g,i):0,my:l}):C},R.polys={polygon:function(a,b){var c,d,e,f={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10},adjustable:E},g=0,h=[],i=1,j=1,k=0,l=0;for(g=a.length;g--;)c=[parseInt(a[--g],10),parseInt(a[g+1],10)],c[0]>f.position.right&&(f.position.right=c[0]),c[0]<f.position.left&&(f.position.left=c[0]),c[1]>f.position.bottom&&(f.position.bottom=c[1]),c[1]<f.position.top&&(f.position.top=c[1]),h.push(c);if(d=f.width=Math.abs(f.position.right-f.position.left),e=f.height=Math.abs(f.position.bottom-f.position.top),"c"===b.abbrev())f.position={left:f.position.left+f.width/2,top:f.position.top+f.height/2};else{for(;d>0&&e>0&&i>0&&j>0;)for(d=Math.floor(d/2),e=Math.floor(e/2),b.x===L?i=d:b.x===N?i=f.width-d:i+=Math.floor(d/2),b.y===K?j=e:b.y===M?j=f.height-e:j+=Math.floor(e/2),g=h.length;g--&&!(h.length<2);)k=h[g][0]-f.position.left,l=h[g][1]-f.position.top,(b.x===L&&k>=i||b.x===N&&i>=k||b.x===O&&(i>k||k>f.width-i)||b.y===K&&l>=j||b.y===M&&j>=l||b.y===O&&(j>l||l>f.height-j))&&h.splice(g,1);f.position={left:h[0][0],top:h[0][1]}}return f},rect:function(a,b,c,d){return{width:Math.abs(c-a),height:Math.abs(d-b),position:{left:Math.min(a,c),top:Math.min(b,d)}}},_angles:{tc:1.5,tr:7/4,tl:5/4,bc:.5,br:.25,bl:.75,rc:2,lc:1,c:0},ellipse:function(a,b,c,d,e){var f=R.polys._angles[e.abbrev()],g=0===f?0:c*Math.cos(f*Math.PI),h=d*Math.sin(f*Math.PI);return{width:2*c-Math.abs(g),height:2*d-Math.abs(h),position:{left:a+g,top:b+h},adjustable:E}},circle:function(a,b,c,d){return R.polys.ellipse(a,b,c,c,d)}},R.svg=function(a,c,e){for(var f,g,h,i,j,k,l,m,n,o=c[0],p=d(o.ownerSVGElement),q=o.ownerDocument,r=(parseInt(c.css("stroke-width"),10)||0)/2;!o.getBBox;)o=o.parentNode;if(!o.getBBox||!o.parentNode)return E;switch(o.nodeName){case"ellipse":case"circle":m=R.polys.ellipse(o.cx.baseVal.value,o.cy.baseVal.value,(o.rx||o.r).baseVal.value+r,(o.ry||o.r).baseVal.value+r,e);break;case"line":case"polygon":case"polyline":for(l=o.points||[{x:o.x1.baseVal.value,y:o.y1.baseVal.value},{x:o.x2.baseVal.value,y:o.y2.baseVal.value}],m=[],k=-1,i=l.numberOfItems||l.length;++k<i;)j=l.getItem?l.getItem(k):l[k],m.push.apply(m,[j.x,j.y]);m=R.polys.polygon(m,e);break;default:m=o.getBBox(),m={width:m.width,height:m.height,position:{left:m.x,top:m.y}}}return n=m.position,p=p[0],p.createSVGPoint&&(g=o.getScreenCTM(),l=p.createSVGPoint(),l.x=n.left,l.y=n.top,h=l.matrixTransform(g),n.left=h.x,n.top=h.y),q!==b&&"mouse"!==a.position.target&&(f=d((q.defaultView||q.parentWindow).frameElement).offset(),f&&(n.left+=f.left,n.top+=f.top)),q=d(q),n.left+=q.scrollLeft(),n.top+=q.scrollTop(),m},R.imagemap=function(a,b,c){b.jquery||(b=d(b));var e,f,g,h,i,j=(b.attr("shape")||"rect").toLowerCase().replace("poly","polygon"),k=d('img[usemap="#'+b.parent("map").attr("name")+'"]'),l=d.trim(b.attr("coords")),m=l.replace(/,$/,"").split(",");if(!k.length)return E;if("polygon"===j)h=R.polys.polygon(m,c);else{if(!R.polys[j])return E;for(g=-1,i=m.length,f=[];++g<i;)f.push(parseInt(m[g],10));h=R.polys[j].apply(this,f.concat(c))}return e=k.offset(),e.left+=Math.ceil((k.outerWidth(E)-k.width())/2),e.top+=Math.ceil((k.outerHeight(E)-k.height())/2),h.position.left+=e.left,h.position.top+=e.top,h};var Aa,Ba='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';d.extend(x.prototype,{_scroll:function(){var b=this.qtip.elements.overlay;b&&(b[0].style.top=d(a).scrollTop()+"px")},init:function(c){var e=c.tooltip;d("select, object").length<1&&(this.bgiframe=c.elements.bgiframe=d(Ba).appendTo(e),c._bind(e,"tooltipmove",this.adjustBGIFrame,this._ns,this)),this.redrawContainer=d("<div>",{id:S+"-rcontainer"}).appendTo(b.body),c.elements.overlay&&c.elements.overlay.addClass("qtipmodal-ie6fix")&&(c._bind(a,["scroll","resize"],this._scroll,this._ns,this),c._bind(e,["tooltipshow"],this._scroll,this._ns,this)),this.redraw()},adjustBGIFrame:function(){var a,b,c=this.qtip.tooltip,d={height:c.outerHeight(E),width:c.outerWidth(E)},e=this.qtip.plugins.tip,f=this.qtip.elements.tip;b=parseInt(c.css("borderLeftWidth"),10)||0,b={left:-b,top:-b},e&&f&&(a="x"===e.corner.precedance?[I,L]:[J,K],b[a[1]]-=f[a[0]]()),this.bgiframe.css(b).css(d)},redraw:function(){if(this.qtip.rendered<1||this.drawing)return this;var a,b,c,d,e=this.qtip.tooltip,f=this.qtip.options.style,g=this.qtip.options.position.container;return this.qtip.drawing=1,f.height&&e.css(J,f.height),f.width?e.css(I,f.width):(e.css(I,"").appendTo(this.redrawContainer),b=e.width(),1>b%2&&(b+=1),c=e.css("maxWidth")||"",d=e.css("minWidth")||"",a=(c+d).indexOf("%")>-1?g.width()/100:0,c=(c.indexOf("%")>-1?a:1*parseInt(c,10))||b,d=(d.indexOf("%")>-1?a:1*parseInt(d,10))||0,b=c+d?Math.min(Math.max(b,d),c):b,e.css(I,Math.round(b)).appendTo(g)),this.drawing=0,this},destroy:function(){this.bgiframe&&this.bgiframe.remove(),this.qtip._unbind([a,this.qtip.tooltip],this._ns)}}),Aa=R.ie6=function(a){return 6===da.ie?new x(a):E},Aa.initialize="render",B.ie6={"^content|style$":function(){this.redraw()}}})}(window,document);
//# sourceMappingURL=jquery.qtip.min.map
