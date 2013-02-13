define(["require","exports","module","../lib/oop","../lib/lang","./doc_comment_highlight_rules","./text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/lang"),s=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,u=function(){var e=i.arrayToMap("true|else|false|break|case|return|goto|if|const|continue|struct|default|switch|for|func|import|package|chan|defer|fallthrough|go|interface|map|rangeselect|type|var".split("|")),t=i.arrayToMap("nit|true|false|iota".split("|"));this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},s.getStartRule("doc-start"),{token:"comment",merge:!0,regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:!0,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:!0,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant",regex:"<[a-zA-Z0-9.]+>"},{token:"keyword",regex:"(?:#include|#pragma|#line|#define|#undef|#ifdef|#else|#elif|#endif|#ifndef)"},{token:function(n){return n=="this"?"variable.language":e.hasOwnProperty(n)?"keyword":t.hasOwnProperty(n)?"constant.language":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:!0,regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:!0,regex:".+"}]},this.embedRules(s,"doc-",[s.getEndRule("start")])};r.inherits(u,o),t.GolangHighlightRules=u});