/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./range","./range_list","./edit_session","./test/assertions"],function(e,t,n){function u(e){var t=[];return e.ranges.forEach(function(e){t.push(e.start.row,e.start.column,e.end.row,e.end.column)}),t}function a(e,t){o.equal(""+u(e),""+t)}var r=e("./range").Range,i=e("./range_list").RangeList,s=e("./edit_session").EditSession,o=e("./test/assertions");n.exports={name:"ACE range_list.js","test: rangeList pointIndex":function(){var e=new i;e.ranges=[new r(1,2,3,4),new r(4,2,5,4),new r(8,8,9,9)],o.equal(e.pointIndex({row:0,column:1}),-1),o.equal(e.pointIndex({row:1,column:2}),0),o.equal(e.pointIndex({row:1,column:3}),0),o.equal(e.pointIndex({row:3,column:4}),0),o.equal(e.pointIndex({row:4,column:1}),-2),o.equal(e.pointIndex({row:5,column:1}),1),o.equal(e.pointIndex({row:8,column:9}),2),o.equal(e.pointIndex({row:18,column:9}),-4)},"test: rangeList pointIndex excludeEdges":function(){var e=new i;e.ranges=[new r(1,2,3,4),new r(4,2,5,4),new r(8,8,9,9),new r(10,10,10,10)],o.equal(e.pointIndex({row:0,column:1},!0),-1),o.equal(e.pointIndex({row:1,column:2},!0),-1),o.equal(e.pointIndex({row:1,column:3},!0),0),o.equal(e.pointIndex({row:3,column:4},!0),-2),o.equal(e.pointIndex({row:4,column:1},!0),-2),o.equal(e.pointIndex({row:5,column:1},!0),1),o.equal(e.pointIndex({row:8,column:9},!0),2),o.equal(e.pointIndex({row:10,column:10},!0),3),o.equal(e.pointIndex({row:18,column:9},!0),-5)},"test: rangeList add":function(){var e=new i;e.addList([new r(9,0,9,1),new r(1,2,3,4),new r(8,8,9,9),new r(4,2,5,4),new r(3,20,3,24),new r(6,6,7,7)]),o.equal(e.ranges.length,5),e.add(new r(1,2,3,5)),o.range(e.ranges[0],1,2,3,5),o.equal(e.ranges.length,5),e.add(new r(7,7,7,7)),o.range(e.ranges[3],7,7,7,7),e.add(new r(7,8,7,8)),o.range(e.ranges[4],7,8,7,8)},"test: rangeList add empty":function(){var e=new i;e.addList([new r(7,10,7,10),new r(9,10,9,10),new r(8,10,8,10)]),o.equal(e.ranges.length,3),e.add(new r(9,10,9,10)),a(e,[7,10,7,10,8,10,8,10,9,10,9,10])},"test: rangeList merge":function(){var e=new i;e.addList([new r(1,2,3,4),new r(4,2,5,4),new r(6,6,7,7),new r(8,8,9,9)]);var t=[];o.equal(e.ranges.length,4),e.ranges[1].end.row=7,t=e.merge(),o.equal(t.length,1),o.range(e.ranges[1],4,2,7,7),o.equal(e.ranges.length,3),e.ranges[0].end.row=10,t=e.merge(),o.range(e.ranges[0],1,2,10,4),o.equal(t.length,2),o.equal(e.ranges.length,1),e.ranges.push(new r(10,10,10,10)),e.ranges.push(new r(10,10,10,10)),t=e.merge(),o.equal(e.ranges.length,2)},"test: rangeList remove":function(){var e=new i,t=[new r(1,2,3,4),new r(4,2,5,4),new r(6,6,7,7),new r(8,8,9,9)];e.addList(t),o.equal(e.ranges.length,4),e.substractPoint({row:1,column:2}),o.equal(e.ranges.length,3),e.substractPoint({row:6,column:7}),o.equal(e.ranges.length,2)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();