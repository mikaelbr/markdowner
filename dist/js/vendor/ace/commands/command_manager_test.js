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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./command_manager","../lib/keys","../test/assertions"],function(e,t,n){var r=e("./command_manager").CommandManager,i=e("../lib/keys"),s=e("../test/assertions");n.exports={setUp:function(){this.command={name:"gotoline",bindKey:{mac:"Command-L",win:"Ctrl-L"},called:!1,exec:function(e){this.called=!0}},this.cm=new r("mac",[this.command])},"test: register command":function(){this.cm.exec("gotoline"),s.ok(this.command.called)},"test: mac hotkeys":function(){var e=this.cm.findKeyCommand(i.KEY_MODS.command,"L");s.equal(e,this.command);var e=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"L");s.equal(e,undefined)},"test: win hotkeys":function(){var e=new r("win",[this.command]),t=e.findKeyCommand(i.KEY_MODS.command,"L");s.equal(t,undefined);var t=e.findKeyCommand(i.KEY_MODS.ctrl,"L");s.equal(t,this.command)},"test: remove command by object":function(){this.cm.removeCommand(this.command),this.cm.exec("gotoline"),s.ok(!this.command.called);var e=this.cm.findKeyCommand(i.KEY_MODS.command,"L");s.equal(e,null)},"test: remove command by name":function(){this.cm.removeCommand("gotoline"),this.cm.exec("gotoline"),s.ok(!this.command.called);var e=this.cm.findKeyCommand(i.KEY_MODS.command,"L");s.equal(e,null)},"test: adding a new command with the same name as an existing one should remove the old one first":function(){var e={name:"gotoline",bindKey:{mac:"Command-L",win:"Ctrl-L"},called:!1,exec:function(e){this.called=!0}};this.cm.addCommand(e),this.cm.exec("gotoline"),s.ok(e.called),s.ok(!this.command.called),s.equal(this.cm.findKeyCommand(i.KEY_MODS.command,"L"),e)},"test: adding commands and recording a macro":function(){var e="";this.cm.addCommands({togglerecording:function(e){e.cm.toggleRecording()},replay:function(e){e.cm.replay()},cm1:function(t,n){e+="1"+(n||"")},cm2:function(t){e+="2"}}),this.cm.exec("togglerecording",this),s.ok(this.cm.recording),this.cm.exec("cm1",this,"-"),this.cm.exec("cm2"),this.cm.exec("replay",this),s.ok(!this.cm.recording),s.equal(e,"1-2"),e="",this.cm.exec("replay",this),s.equal(e,"1-2")},"test: bindkeys":function(){var e="";this.cm.addCommands({cm1:function(t,n){e+="1"+(n||"")},cm2:function(t){e+="2"}}),this.cm.bindKeys({"Ctrl-L|Command-C":"cm1","Ctrl-R":"cm2"});var t=this.cm.findKeyCommand(i.KEY_MODS.command,"C");s.equal(t,"cm1");var t=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"R");s.equal(t,"cm2"),this.cm.bindKeys({"Ctrl-R":null});var t=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"R");s.equal(t,null)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();