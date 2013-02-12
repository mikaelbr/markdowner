define(["require","exports","module","../lib/oop","./text","../tokenizer","./powershell_highlight_rules","./matching_brace_outdent","./behaviour/cstyle","./folding/cstyle"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./powershell_highlight_rules").PowershellHighlightRules,u=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("./behaviour/cstyle").CstyleBehaviour,f=e("./folding/cstyle").FoldMode,l=function(){this.$tokenizer=new s((new o).getRules()),this.$outdent=new u,this.$behaviour=new a,this.foldingRules=new f};r.inherits(l,i),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.$tokenizer.getLineTokens(t,e),s=i.tokens;if(s.length&&s[s.length-1].type=="comment")return r;if(e=="start"){var o=t.match(/^.*[\{\(\[]\s*$/);o&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){return null}}.call(l.prototype),t.Mode=l});