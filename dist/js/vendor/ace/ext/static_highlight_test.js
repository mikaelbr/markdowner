typeof process!="undefined"&&(require("amd-loader"),require("../test/mockdom")),define(["require","exports","module","assert","./static_highlight","../mode/javascript","../theme/tomorrow","../theme/tomorrow","../theme/tomorrow"],function(e,t,n){var r=e("assert"),i=e("./static_highlight"),s=e("../mode/javascript").Mode;n.exports={timeout:1e4,"test simple snippet":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=!1,f;try{f=i.render(o,u,n)}catch(l){console.log(l),a=!0}r.equal(a,!1),t()},"test css from theme is used":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=!1,f;f=i.render(o,u,n),r.ok(f.css.indexOf(n.cssText)!==-1),t()},"test theme classname should be in output html":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=!1,f;f=i.render(o,u,n),r.equal(!!f.html.match(/<div class='ace-tomorrow'>/),!0),t()}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();