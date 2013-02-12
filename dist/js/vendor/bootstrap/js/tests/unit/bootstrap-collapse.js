$(function(){module("bootstrap-collapse"),test("should provide no conflict",function(){var e=$.fn.collapse.noConflict();ok(!$.fn.collapse,"collapse was set back to undefined (org value)"),$.fn.collapse=e}),test("should be defined on jquery object",function(){ok($(document.body).collapse,"collapse method is defined")}),test("should return element",function(){ok($(document.body).collapse()[0]==document.body,"document.body returned")}),test("should show a collapsed element",function(){var e=$('<div class="collapse"></div>').collapse("show");ok(e.hasClass("in"),"has class in"),ok(/height/.test(e.attr("style")),"has height set")}),test("should hide a collapsed element",function(){var e=$('<div class="collapse"></div>').collapse("hide");ok(!e.hasClass("in"),"does not have class in"),ok(/height/.test(e.attr("style")),"has height set")}),test("should not fire shown when show is prevented",function(){$.support.transition=!1,stop(),$('<div class="collapse"/>').bind("show",function(e){e.preventDefault(),ok(!0),start()}).bind("shown",function(){ok(!1)}).collapse("show")}),test("should reset style to auto after finishing opening collapse",function(){$.support.transition=!1,stop(),$('<div class="collapse" style="height: 0px"/>').bind("show",function(){ok(this.style.height=="0px")}).bind("shown",function(){ok(this.style.height=="auto"),start()}).collapse("show")}),test("should add active class to target when collapse shown",function(){$.support.transition=!1,stop();var e=$('<a data-toggle="collapse" href="#test1"></a>').appendTo($("#qunit-fixture")),t=$('<div id="test1"></div>').appendTo($("#qunit-fixture")).on("show",function(){ok(!e.hasClass("collapsed")),start()});e.click()}),test("should remove active class to target when collapse hidden",function(){$.support.transition=!1,stop();var e=$('<a data-toggle="collapse" href="#test1"></a>').appendTo($("#qunit-fixture")),t=$('<div id="test1" class="in"></div>').appendTo($("#qunit-fixture")).on("hide",function(){ok(e.hasClass("collapsed")),start()});e.click()})});