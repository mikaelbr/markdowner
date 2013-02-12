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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./html","../test/assertions"],function(e,t,n){function o(e){return function(){for(var n=0;n<e.length;n++){var r=e[n],s=u.getLineTokens(r.text,r.state[0]);i.equal(JSON.stringify(s,null,4),JSON.stringify({tokens:r.tokens,state:r.state[1]},null,4))}}}var r=e("./html").Mode,i=e("../test/assertions"),s={"test: tokenize embedded script":[{text:"<script a='a'>var</script>'123'",state:["start","start"],tokens:[{type:"meta.tag",value:"<"},{type:"meta.tag.tag-name.script",value:"script"},{type:"text",value:" "},{type:"entity.other.attribute-name",value:"a"},{type:"keyword.operator",value:"="},{type:"string",value:"'a'"},{type:"meta.tag",value:">"},{type:"storage.type",value:"var"},{type:"meta.tag",value:"</"},{type:"meta.tag.tag-name.script",value:"script"},{type:"meta.tag",value:">"},{type:"text",value:"'123'"}]}],"test: tokenize multiline attribute value with double quotes":[{text:'<a href="abc',state:["start","tag_qqstring"],tokens:[{type:"meta.tag",value:"<"},{type:"meta.tag.tag-name.anchor",value:"a"},{type:"text",value:" "},{type:"entity.other.attribute-name",value:"href"},{type:"keyword.operator",value:"="},{type:"string",value:'"abc'}]},{text:'def">',state:["tag_qqstring","start"],tokens:[{type:"string",value:'def"'},{type:"meta.tag",value:">"}]}],"test: tokenize multiline attribute value with single quotes":[{text:"<a href='abc",state:["start","tag_qstring"],tokens:[{type:"meta.tag",value:"<"},{type:"meta.tag.tag-name.anchor",value:"a"},{type:"text",value:" "},{type:"entity.other.attribute-name",value:"href"},{type:"keyword.operator",value:"="},{type:"string",value:"'abc"}]},{text:"def\"'>",state:["tag_qstring","start"],tokens:[{type:"string",value:"def\"'"},{type:"meta.tag",value:">"}]}]},u;n.exports={setUp:function(){u=(new r).getTokenizer()}};for(var a in s)n.exports[a]=o(s[a])}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();