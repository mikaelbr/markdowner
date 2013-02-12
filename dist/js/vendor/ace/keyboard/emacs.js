/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Julian Viereck (julian.viereck@gmail.com)
 *   Harutyun Amirjanyan (harutyun@c9.io)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../lib/dom","./hash_handler","../lib/keys"],function(e,t,n){var r=e("../lib/dom"),i=function(e,t){var n=this.scroller.getBoundingClientRect(),i=Math.floor((e+this.scrollLeft-n.left-this.$padding-r.getPageScrollLeft())/this.characterWidth),s=Math.floor((t+this.scrollTop-n.top-r.getPageScrollTop())/this.lineHeight);return this.session.screenToDocumentPosition(s,i)},s=e("./hash_handler").HashHandler;t.handler=new s;var o=!1;t.handler.attach=function(e){o||(o=!0,r.importCssString("            .emacs-mode .ace_cursor{                border: 2px rgba(50,250,50,0.8) solid!important;                -moz-box-sizing: border-box!important;                box-sizing: border-box!important;                background-color: rgba(0,250,0,0.9);                opacity: 0.5;            }            .emacs-mode .ace_cursor.ace_hidden{                opacity: 1;                background-color: transparent;            }            .emacs-mode .ace_cursor.ace_overwrite {                opacity: 1;                background-color: transparent;                border-width: 0 0 2px 2px !important;            }            .emacs-mode .ace_text-layer {                z-index: 4            }            .emacs-mode .ace_cursor-layer {                z-index: 2            }","emacsMode")),e.renderer.screenToTextCoordinates=i,e.setStyle("emacs-mode")},t.handler.detach=function(e){delete e.renderer.screenToTextCoordinates,e.unsetStyle("emacs-mode")};var u=e("../lib/keys").KEY_MODS,a={C:"ctrl",S:"shift",M:"alt"};["S-C-M","S-C","S-M","C-M","S","C","M"].forEach(function(e){var t=0;e.split("-").forEach(function(e){t|=u[a[e]]}),a[t]=e.toLowerCase()+"-"}),t.handler.bindKey=function(e,t){if(!e)return;var n=this.commmandKeyBinding;e.split("|").forEach(function(e){e=e.toLowerCase(),n[e]=t,e=e.split(" ")[0],n[e]||(n[e]="null")},this)},t.handler.handleKeyboard=function(e,t,n,r){if(t==-1&&e.count){var i=Array(e.count+1).join(n);return e.count=null,{command:"insertstring",args:i}}if(n=="\0")return;var s=a[t];if(s=="c-"||e.universalArgument){var o=parseInt(n[n.length-1]);if(o)return e.count=o,{command:"null"}}e.universalArgument=!1,s&&(n=s+n),e.keyChain&&(n=e.keyChain+=" "+n);var u=this.commmandKeyBinding[n];e.keyChain=u=="null"?n:"";if(!u)return;if(u=="null")return{command:"null"};if(u=="universalArgument")return e.universalArgument=!0,{command:"null"};if(typeof u!="string"){var f=u.args;u=u.command}typeof u=="string"&&(u=this.commands[u]||e.editor.commands.commands[u]),!u.readonly&&!u.isYank&&(e.lastCommand=null);if(e.count){var o=e.count;return e.count=0,{args:f,command:{exec:function(e,t){for(var n=0;n<o;n++)u.exec(e,t)}}}}return{command:u,args:f}},t.emacsKeys={"Up|C-p":"golineup","Down|C-n":"golinedown","Left|C-b":"gotoleft","Right|C-f":"gotoright","C-Left|M-b":"gotowordleft","C-Right|M-f":"gotowordright","Home|C-a":"gotolinestart","End|C-e":"gotolineend","C-Home|S-M-,":"gotostart","C-End|S-M-.":"gotoend","S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l|M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":"gotopagedown","C-Up":"gotopageup","PageDown|C-v":"gotopagedown","PageUp|M-v":"gotopageup","S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"findnext","C-r":"findprevious","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:"\n"},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion"},t.handler.bindKeys(t.emacsKeys),t.handler.addCommands({selectRectangularRegion:function(e){e.multiSelect.toggleBlockSelection()},setMark:function(){},exchangePointAndMark:{exec:function(e){var t=e.selection.getRange();e.selection.setSelectionRange(t,!e.selection.isBackwards())},readonly:!0,multiselectAction:"forEach"},killWord:{exec:function(e,n){e.clearSelection(),n=="left"?e.selection.selectWordLeft():e.selection.selectWordRight();var r=e.getSelectionRange(),i=e.session.getTextRange(r);t.killRing.add(i),e.session.remove(r),e.clearSelection()},multiselectAction:"forEach"},killLine:function(e){e.selection.selectLine();var n=e.getSelectionRange(),r=e.session.getTextRange(n);t.killRing.add(r),e.session.remove(n),e.clearSelection()},yank:function(e){e.onPaste(t.killRing.get()),e.keyBinding.$data.lastCommand="yank"},yankRotate:function(e){if(e.keyBinding.$data.lastCommand!="yank")return;e.undo(),e.onPaste(t.killRing.rotate()),e.keyBinding.$data.lastCommand="yank"},killRegion:function(e){t.killRing.add(e.getCopyText()),e.cut()},killRingSave:function(e){t.killRing.add(e.getCopyText())}});var f=t.handler.commands;f.yank.isYank=!0,f.yankRotate.isYank=!0,t.killRing={$data:[],add:function(e){e&&this.$data.push(e),this.$data.length>30&&this.$data.shift()},get:function(){return this.$data[this.$data.length-1]||""},pop:function(){return this.$data.length>1&&this.$data.pop(),this.get()},rotate:function(){return this.$data.unshift(this.$data.pop()),this.get()}}});