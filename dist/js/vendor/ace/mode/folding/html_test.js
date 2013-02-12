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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../html","../../edit_session","../../test/assertions"],function(e,t,n){var r=e("../html").Mode,i=e("../../edit_session").EditSession,s=e("../../test/assertions");n.exports={"test: fold mixed html and javascript":function(){var e=new i(['<script type="text/javascript"> ',"function() foo {","    var bar = 1;","}","</script>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),"start"),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),"end"),s.equal(e.getFoldWidget(4),"end"),s.range(e.getFoldWidgetRange(0),0,8,4,0),s.range(e.getFoldWidgetRange(4),0,8,4,0),s.range(e.getFoldWidgetRange(1),1,16,3,0),s.range(e.getFoldWidgetRange(3),1,16,3,0)},"test: fold mixed html and css":function(){var e=new i(['<style type="text/css">',"    .text-layer {",'        font-family: Monaco, "Courier New", monospace;',"    }","</style>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),"start"),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),"end"),s.equal(e.getFoldWidget(4),"end"),s.range(e.getFoldWidgetRange(0),0,7,4,0),s.range(e.getFoldWidgetRange(4),0,7,4,0),s.range(e.getFoldWidgetRange(1),1,17,3,4),s.range(e.getFoldWidgetRange(3),1,17,3,4)},"test: fold should skip self closing elements":function(){var e=new i(["<body>","<br />","</body>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,6,2,0),s.range(e.getFoldWidgetRange(2),0,6,2,0)},"test: fold should skip void elements":function(){var e=new i(["<body>","<br>","</body>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,6,2,0),s.range(e.getFoldWidgetRange(2),0,6,2,0)},"test: fold multiple unclosed elements":function(){var e=new i(["<div>","<p>","juhu","<p>","kinners","</div>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),""),s.equal(e.getFoldWidget(4),""),s.equal(e.getFoldWidget(5),"end"),s.range(e.getFoldWidgetRange(0),0,5,5,0),s.range(e.getFoldWidgetRange(5),0,5,5,0)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();