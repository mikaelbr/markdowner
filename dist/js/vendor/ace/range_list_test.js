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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./range","./range_list","./edit_session","./test/assertions"],function(e,t,n){function u(e){var t=[];return e.ranges.forEach(function(e){t.push(e.start.row,e.start.column,e.end.row,e.end.column)}),t}function a(e,t){o.equal(""+u(e),""+t)}var r=e("./range").Range,i=e("./range_list").RangeList,s=e("./edit_session").EditSession,o=e("./test/assertions");n.exports={name:"ACE range_list.js","test: rangeList pointIndex":function(){var e=new i;e.ranges=[new r(1,2,3,4),new r(4,2,5,4),new r(8,8,9,9)],o.equal(e.pointIndex({row:0,column:1}),-1),o.equal(e.pointIndex({row:1,column:2}),0),o.equal(e.pointIndex({row:1,column:3}),0),o.equal(e.pointIndex({row:3,column:4}),0),o.equal(e.pointIndex({row:4,column:1}),-2),o.equal(e.pointIndex({row:5,column:1}),1),o.equal(e.pointIndex({row:8,column:9}),2),o.equal(e.pointIndex({row:18,column:9}),-4)},"test: rangeList add":function(){var e=new i;e.addList([new r(9,0,9,1),new r(1,2,3,4),new r(8,8,9,9),new r(4,2,5,4),new r(3,20,3,24),new r(6,6,7,7)]),o.equal(e.ranges.length,5),e.add(new r(1,2,3,5)),o.range(e.ranges[0],1,2,3,5),o.equal(e.ranges.length,5),e.add(new r(7,7,7,7)),o.range(e.ranges[3],7,7,7,7),e.add(new r(7,8,7,8)),o.range(e.ranges[4],7,8,7,8)},"test: rangeList add empty":function(){var e=new i;e.addList([new r(7,10,7,10),new r(9,10,9,10),new r(8,10,8,10)]),o.equal(e.ranges.length,3),e.add(new r(9,10,9,10)),a(e,[7,10,7,10,8,10,8,10,9,10,9,10])},"test: rangeList merge":function(){var e=new i;e.addList([new r(1,2,3,4),new r(4,2,5,4),new r(6,6,7,7),new r(8,8,9,9)]);var t=[];o.equal(e.ranges.length,4),e.ranges[1].end.row=7,t=e.merge(),o.equal(t.length,1),o.range(e.ranges[1],4,2,7,7),o.equal(e.ranges.length,3),e.ranges[0].end.row=10,t=e.merge(),o.range(e.ranges[0],1,2,10,4),o.equal(t.length,2),o.equal(e.ranges.length,1),e.ranges.push(new r(10,10,10,10)),e.ranges.push(new r(10,10,10,10)),t=e.merge(),o.equal(e.ranges.length,2)},"test: rangeList remove":function(){var e=new i,t=[new r(1,2,3,4),new r(4,2,5,4),new r(6,6,7,7),new r(8,8,9,9)];e.addList(t),o.equal(e.ranges.length,4),e.substractPoint({row:1,column:2}),o.equal(e.ranges.length,3),e.substractPoint({row:6,column:7}),o.equal(e.ranges.length,2)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();