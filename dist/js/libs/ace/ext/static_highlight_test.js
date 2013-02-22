typeof process!="undefined"&&(require("amd-loader"),require("../test/mockdom")),define(["require","exports","module","assert","./static_highlight","../mode/javascript","../theme/tomorrow","../theme/tomorrow","../theme/tomorrow"],function(e,t,n){var r=e("assert"),i=e("./static_highlight"),s=e("../mode/javascript").Mode;n.exports={timeout:1e4,"test simple snippet":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=i.render(o,u,n);r.equal(a.html,"<div class='ace-tomorrow'>        <div class='ace_editor ace_scroller ace_text-layer'>            <div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>1</span><span class='ace_comment ace_doc'>/** this is a function</span></div><div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>2</span><span class='ace_comment ace_doc'>*</span></div><div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>3</span><span class='ace_comment ace_doc'>*/</span></div><div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>4</span><span class='ace_storage ace_type'>function</span> <span class='ace_entity ace_name ace_function'>hello</span> <span class='ace_paren ace_lparen'>(</span><span class='ace_variable ace_parameter'>a</span><span class='ace_punctuation ace_operator'>, </span><span class='ace_variable ace_parameter'>b</span><span class='ace_punctuation ace_operator'>, </span><span class='ace_variable ace_parameter'>c</span><span class='ace_paren ace_rparen'>)</span> <span class='ace_paren ace_lparen'>{</span></div><div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>5</span>    <span class='ace_storage ace_type'>console</span><span class='ace_punctuation ace_operator'>.</span><span class='ace_support ace_function ace_firebug'>log</span><span class='ace_paren ace_lparen'>(</span><span class='ace_identifier'>a</span> <span class='ace_keyword ace_operator'>*</span> <span class='ace_identifier'>b</span> <span class='ace_keyword ace_operator'>+</span> <span class='ace_identifier'>c</span> <span class='ace_keyword ace_operator'>+</span> <span class='ace_string'>'sup?'</span><span class='ace_paren ace_rparen'>)</span><span class='ace_punctuation ace_operator'>;</span></div><div class='ace_line'><span class='ace_gutter ace_gutter-cell' unselectable='on'>6</span><span class='ace_paren ace_rparen'>}</span></div>        </div>    </div>"),r.ok(!!a.css),t()},"test css from theme is used":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=!1,f;f=i.render(o,u,n),r.ok(f.css.indexOf(n.cssText)!==-1),t()},"test theme classname should be in output html":function(t){var n=e("../theme/tomorrow"),o="/** this is a function\n*\n*/\nfunction hello (a, b, c) {\n    console.log(a * b + c + 'sup?');\n}",u=new s,a=!1,f;f=i.render(o,u,n),r.equal(!!f.html.match(/<div class='ace-tomorrow'>/),!0),t()}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();