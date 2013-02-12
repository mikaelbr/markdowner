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
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Jan Jongboom <fabian AT ajax DOT org>
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

define(["require","exports","module","../edit_session","../layer/text","../requirejs/text!./static.css"],function(e,t,n){var r=e("../edit_session").EditSession,i=e("../layer/text").Text,s=e("../requirejs/text!./static.css");t.render=function(e,t,n,o,u){o=parseInt(o||1,10);var a=new r("");a.setMode(t),a.setUseWorker(!1);var f=new i(document.createElement("div"));f.setSession(a),f.config={characterWidth:10,lineHeight:20},a.setValue(e);var l=[],c=a.getLength();for(var h=0;h<c;h++){var p=a.getTokens(h);l.push("<div class='ace_line'>"),u||l.push("<span class='ace_gutter ace_gutter-cell' unselectable='on'>"+(h+o)+"</span>"),f.$renderLine(l,0,p,!0),l.push("</div>")}var d="<div class=':cssClass'>        <div class='ace_editor ace_scroller ace_text-layer'>            :code        </div>    </div>".replace(/:cssClass/,n.cssClass).replace(/:code/,l.join(""));return f.destroy(),{css:s+n.cssText,html:d}}});