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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./command_manager","../lib/keys","../test/assertions"],function(e,t,n){var r=e("./command_manager").CommandManager,i=e("../lib/keys"),s=e("../test/assertions");n.exports={setUp:function(){this.command={name:"gotoline",bindKey:{mac:"Command-L",win:"Ctrl-L"},called:!1,exec:function(e){this.called=!0}},this.cm=new r("mac",[this.command])},"test: register command":function(){this.cm.exec("gotoline"),s.ok(this.command.called)},"test: mac hotkeys":function(){var e=this.cm.findKeyCommand(i.KEY_MODS.command,"l");s.equal(e,this.command);var e=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"l");s.equal(e,undefined)},"test: win hotkeys":function(){var e=new r("win",[this.command]),t=e.findKeyCommand(i.KEY_MODS.command,"l");s.equal(t,undefined);var t=e.findKeyCommand(i.KEY_MODS.ctrl,"l");s.equal(t,this.command)},"test: remove command by object":function(){this.cm.removeCommand(this.command),this.cm.exec("gotoline"),s.ok(!this.command.called);var e=this.cm.findKeyCommand(i.KEY_MODS.command,"l");s.equal(e,null)},"test: remove command by name":function(){this.cm.removeCommand("gotoline"),this.cm.exec("gotoline"),s.ok(!this.command.called);var e=this.cm.findKeyCommand(i.KEY_MODS.command,"l");s.equal(e,null)},"test: adding a new command with the same name as an existing one should remove the old one first":function(){var e={name:"gotoline",bindKey:{mac:"Command-L",win:"Ctrl-L"},called:!1,exec:function(e){this.called=!0}};this.cm.addCommand(e),this.cm.exec("gotoline"),s.ok(e.called),s.ok(!this.command.called),s.equal(this.cm.findKeyCommand(i.KEY_MODS.command,"l"),e)},"test: adding commands and recording a macro":function(){var e="";this.cm.addCommands({togglerecording:function(e){e.cm.toggleRecording(e)},replay:function(e){e.cm.replay()},cm1:function(t,n){e+="1"+(n||"")},cm2:function(t){e+="2"}});var t=!1;this._emit=function(){t=!0},this.cm.exec("togglerecording",this),s.ok(this.cm.recording),s.ok(t),this.cm.exec("cm1",this,"-"),this.cm.exec("cm2"),this.cm.exec("replay",this),s.ok(!this.cm.recording),s.equal(e,"1-2"),e="",this.cm.exec("replay",this),s.equal(e,"1-2")},"test: bindkeys":function(){this.cm.bindKeys({"Ctrl-L|Command-C":"cm1","Ctrl-R":"cm2"});var e=this.cm.findKeyCommand(i.KEY_MODS.command,"c");s.equal(e,"cm1");var e=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"r");s.equal(e,"cm2"),this.cm.bindKeys({"Ctrl-R":null});var e=this.cm.findKeyCommand(i.KEY_MODS.ctrl,"r");s.equal(e,null)},"test: binding keys without modifiers":function(){this.cm.bindKeys({R:"cm1","Shift-r":"cm2",Return:"cm4",Enter:"cm3"});var e=this.cm.findKeyCommand(-1,"r");s.equal(e,"cm1");var e=this.cm.findKeyCommand(-1,"R");s.equal(e,"cm2");var e=this.cm.findKeyCommand(0,"return");s.equal(e,"cm3")}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();