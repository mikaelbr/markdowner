/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
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
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Mihai Sucan.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Mihai Sucan <mihai.sucan@gmail.com>
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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./test/assertions"],function(e,t,n){function a(e,t,n){var r=0,i={drawSingleLineMarker:function(){r++}};return e.$searchHighlight.update([],i,e,{firstRow:t,lastRow:n}),r}var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./test/assertions"),u="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at arcu mi, eu lobortis mauris. Quisque ut libero eget diam congue vehicula. Quisque ut odio ut mi aliquam tincidunt. Duis lacinia aliquam lorem eget eleifend. Morbi eget felis mi. Duis quam ligula, consequat vitae convallis volutpat, blandit nec neque. Nulla facilisi. Etiam suscipit lorem ac justo sollicitudin tristique. Phasellus ut posuere nunc. Aliquam scelerisque mollis felis non gravida. Vestibulum lacus sem, posuere non bibendum id, luctus non dolor. Aenean id metus lorem, vel dapibus est. Donec gravida feugiat augue nec accumsan.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, velit vitae tincidunt congue, nunc augue accumsan velit, eu consequat turpis lectus ac orci. Pellentesque ornare dolor feugiat dui auctor eu varius nulla fermentum. Sed aliquam odio at velit lacinia vel fermentum felis sodales. In dignissim magna eget nunc lobortis non fringilla nibh ullamcorper. Donec facilisis malesuada elit at egestas. Etiam bibendum, diam vitae tempor aliquet, dui libero vehicula odio, eget bibendum mauris velit eu lorem.\nconsectetur";n.exports={setUp:function(e){this.session=new r(u),this.editor=new i(new s,this.session),this.selection=this.session.getSelection(),this.search=this.editor.$search,e()},"test: highlight selected words by default":function(){o.equal(this.editor.getHighlightSelectedWord(),!0)},"test: highlight a word":function(){this.editor.moveCursorTo(0,9),this.selection.selectWord();var e=this.editor.session.$searchHighlight;o.ok(e!=null);var t=this.selection.getRange();o.equal(this.session.getTextRange(t),"ipsum"),o.equal(e.cache.length,0),o.equal(a(this.session,0,0),2)},"test: highlight a word and clear highlight":function(){this.editor.moveCursorTo(0,8),this.selection.selectWord();var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"ipsum"),o.equal(a(this.session,0,0),2),this.session.highlight(""),o.equal(this.session.$searchHighlight.cache.length,0),o.equal(a(this.session,0,0),0)},"test: highlight another word":function(){this.selection.moveCursorTo(0,14),this.selection.selectWord();var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"dolor"),o.equal(a(this.session,0,0),4)},"test: no selection, no highlight":function(){this.selection.clearSelection(),o.equal(a(this.session,0,0),0)},"test: select a word, no highlight":function(){this.selection.moveCursorTo(0,14),this.selection.selectWord(),this.editor.setHighlightSelectedWord(!1);var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"dolor"),o.equal(a(this.session,0,0),0)},"test: select a word with no matches":function(){this.editor.setHighlightSelectedWord(!0);var e=this.search.getOptions(),t={wrap:!0,wholeWord:!0,caseSensitive:!0,needle:"Mauris"};this.search.set(t);var n=this.search.find(this.session);o.notEqual(n,null,"found a match for 'Mauris'"),this.search.set(e),this.selection.setSelectionRange(n),o.equal(this.session.getTextRange(n),"Mauris"),o.equal(a(this.session,0,0),1)},"test: partial word selection 1":function(){this.selection.moveCursorTo(0,14),this.selection.selectWord(),this.selection.selectLeft();var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"dolo"),o.equal(a(this.session,0,0),0)},"test: partial word selection 2":function(){this.selection.moveCursorTo(0,13),this.selection.selectWord(),this.selection.selectRight();var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"dolor "),o.equal(a(this.session,0,0),0)},"test: partial word selection 3":function(){this.selection.moveCursorTo(0,14),this.selection.selectWord(),this.selection.selectLeft(),this.selection.shiftSelection(1);var e=this.selection.getRange();o.equal(this.session.getTextRange(e),"olor"),o.equal(a(this.session,0,0),0)},"test: select last word":function(){this.selection.moveCursorTo(0,1);var e=this.search.getOptions(),t={wrap:!0,wholeWord:!0,caseSensitive:!0,backwards:!0,needle:"consectetur"};this.search.set(t);var n=this.search.find(this.session);o.notEqual(n,null,"found a match for 'consectetur'"),o.position(n.start,1,0),this.search.set(e),this.selection.setSelectionRange(n),o.equal(this.session.getTextRange(n),"consectetur"),o.equal(a(this.session,0,1),3)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();