define(["require","exports","module","../lib/oop","./text","../tokenizer","./lucene_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./lucene_highlight_rules").LuceneHighlightRules,u=function(){this.$tokenizer=new s((new o).getRules())};r.inherits(u,i),t.Mode=u});