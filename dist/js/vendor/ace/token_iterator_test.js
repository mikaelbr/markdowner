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
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./mode/javascript","./token_iterator","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./mode/javascript").Mode,s=e("./token_iterator").TokenIterator,o=e("./test/assertions");n.exports={"test: token iterator initialization in JavaScript document":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=new s(t,0,0);o.equal(n.getCurrentToken().value,"function"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0),n.stepForward(),o.equal(n.getCurrentToken().value," "),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),8);var n=new s(t,0,4);o.equal(n.getCurrentToken().value,"function"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0),n.stepForward(),o.equal(n.getCurrentToken().value," "),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),8);var n=new s(t,2,18);o.equal(n.getCurrentToken().value,"items"),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),14),n.stepForward(),o.equal(n.getCurrentToken().value,"["),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),19);var n=new s(t,4,0);o.equal(n.getCurrentToken().value,"}"),o.equal(n.getCurrentTokenRow(),4),o.equal(n.getCurrentTokenColumn(),0),n.stepBackward(),o.equal(n.getCurrentToken().value,"// Real Tab."),o.equal(n.getCurrentTokenRow(),3),o.equal(n.getCurrentTokenColumn(),6);var n=new s(t,5,0);o.equal(n.getCurrentToken(),null)},"test: token iterator initialization in text document":function(){var e=["Lorem ipsum dolor sit amet, consectetur adipisicing elit,","sed do eiusmod tempor incididunt ut labore et dolore magna","aliqua. Ut enim ad minim veniam, quis nostrud exercitation","ullamco laboris nisi ut aliquip ex ea commodo consequat."],t=new r(e.join("\n")),n=new s(t,0,0);o.equal(n.getCurrentToken().value,e[0]),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,0,4);o.equal(n.getCurrentToken().value,e[0]),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,2,18);o.equal(n.getCurrentToken().value,e[2]),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,3,e[3].length-1);o.equal(n.getCurrentToken().value,e[3]),o.equal(n.getCurrentTokenRow(),3),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,4,0);o.equal(n.getCurrentToken(),null)},"test: token iterator step forward in JavaScript document":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=[],u=t.getLength();for(var a=0;a<u;a++)n=n.concat(t.getTokens(a));var f=new s(t,0,0);for(var a=1;a<n.length;a++)o.equal(f.stepForward(),n[a]);o.equal(f.stepForward(),null),o.equal(f.getCurrentToken(),null)},"test: token iterator step backward in JavaScript document":function(){var e=["function foo(items) {","     for (var i=0; i<items.length; i++) {",'         alert(items[i] + "juhu");',"     } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=[],u=t.getLength();for(var a=0;a<u;a++)n=n.concat(t.getTokens(a));var f=new s(t,4,0);for(var a=n.length-2;a>=0;a--)o.equal(f.stepBackward(),n[a]);o.equal(f.stepBackward(),null),o.equal(f.getCurrentToken(),null)},"test: token iterator reports correct row and column":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=new s(t,0,0);n.stepForward(),n.stepForward(),o.equal(n.getCurrentToken().value,"foo"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),9),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),o.equal(n.getCurrentToken().value,"for"),o.equal(n.getCurrentTokenRow(),1),o.equal(n.getCurrentTokenColumn(),4)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();