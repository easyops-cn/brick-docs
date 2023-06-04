"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[8401],{78401:(e,t,i)=>{i.r(t),i.d(t,{Adapter:()=>_,CodeActionAdaptor:()=>K,DefinitionAdapter:()=>D,DiagnosticsAdapter:()=>w,DocumentHighlightAdapter:()=>C,FormatAdapter:()=>N,FormatHelper:()=>O,FormatOnTypeAdapter:()=>M,InlayHintsAdapter:()=>E,Kind:()=>I,LibFiles:()=>y,OutlineAdapter:()=>A,QuickInfoAdapter:()=>v,ReferenceAdapter:()=>F,RenameAdapter:()=>R,SignatureHelpAdapter:()=>x,SuggestAdapter:()=>S,WorkerManager:()=>m,flattenDiagnosticMessageText:()=>b,getJavaScriptWorker:()=>W,getTypeScriptWorker:()=>j,setupJavaScript:()=>V,setupTypeScript:()=>H});var s,r,n=i(43707),a=i(39585),o=Object.defineProperty,l=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,d=Object.prototype.hasOwnProperty,u=(e,t,i,s)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let r of c(t))d.call(e,r)||r===i||o(e,r,{get:()=>t[r],enumerable:!(s=l(t,r))||s.enumerable});return e},g=(e,t,i)=>(((e,t,i)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i})(e,"symbol"!=typeof t?t+"":t,i),i),p={};u(p,s=n,"default"),r&&u(r,s,"default");var m=class{constructor(e,t){this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker())),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((()=>this._updateExtraLibs()))}_configChangeListener;_updateExtraLibsToken;_extraLibsChangeListener;_worker;_client;dispose(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}async _updateExtraLibs(){if(!this._worker)return;const e=++this._updateExtraLibsToken,t=await this._worker.getProxy();this._updateExtraLibsToken===e&&t.updateExtraLibs(this._defaults.getExtraLibs())}_getClient(){return this._client||(this._client=(async()=>(this._worker=p.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}}),this._defaults.getEagerModelSync()?await this._worker.withSyncedResources(p.editor.getModels().filter((e=>e.getLanguageId()===this._modeId)).map((e=>e.uri))):await this._worker.getProxy()))()),this._client}async getLanguageServiceWorker(...e){const t=await this._getClient();return this._worker&&await this._worker.withSyncedResources(e),t}},h={};function b(e,t,i=0){if("string"==typeof e)return e;if(void 0===e)return"";let s="";if(i){s+=t;for(let e=0;e<i;e++)s+="  "}if(s+=e.messageText,i++,e.next)for(const r of e.next)s+=b(r,t,i);return s}function f(e){return e?e.map((e=>e.text)).join(""):""}h["lib.d.ts"]=!0,h["lib.decorators.d.ts"]=!0,h["lib.decorators.legacy.d.ts"]=!0,h["lib.dom.d.ts"]=!0,h["lib.dom.iterable.d.ts"]=!0,h["lib.es2015.collection.d.ts"]=!0,h["lib.es2015.core.d.ts"]=!0,h["lib.es2015.d.ts"]=!0,h["lib.es2015.generator.d.ts"]=!0,h["lib.es2015.iterable.d.ts"]=!0,h["lib.es2015.promise.d.ts"]=!0,h["lib.es2015.proxy.d.ts"]=!0,h["lib.es2015.reflect.d.ts"]=!0,h["lib.es2015.symbol.d.ts"]=!0,h["lib.es2015.symbol.wellknown.d.ts"]=!0,h["lib.es2016.array.include.d.ts"]=!0,h["lib.es2016.d.ts"]=!0,h["lib.es2016.full.d.ts"]=!0,h["lib.es2017.d.ts"]=!0,h["lib.es2017.full.d.ts"]=!0,h["lib.es2017.intl.d.ts"]=!0,h["lib.es2017.object.d.ts"]=!0,h["lib.es2017.sharedmemory.d.ts"]=!0,h["lib.es2017.string.d.ts"]=!0,h["lib.es2017.typedarrays.d.ts"]=!0,h["lib.es2018.asyncgenerator.d.ts"]=!0,h["lib.es2018.asynciterable.d.ts"]=!0,h["lib.es2018.d.ts"]=!0,h["lib.es2018.full.d.ts"]=!0,h["lib.es2018.intl.d.ts"]=!0,h["lib.es2018.promise.d.ts"]=!0,h["lib.es2018.regexp.d.ts"]=!0,h["lib.es2019.array.d.ts"]=!0,h["lib.es2019.d.ts"]=!0,h["lib.es2019.full.d.ts"]=!0,h["lib.es2019.intl.d.ts"]=!0,h["lib.es2019.object.d.ts"]=!0,h["lib.es2019.string.d.ts"]=!0,h["lib.es2019.symbol.d.ts"]=!0,h["lib.es2020.bigint.d.ts"]=!0,h["lib.es2020.d.ts"]=!0,h["lib.es2020.date.d.ts"]=!0,h["lib.es2020.full.d.ts"]=!0,h["lib.es2020.intl.d.ts"]=!0,h["lib.es2020.number.d.ts"]=!0,h["lib.es2020.promise.d.ts"]=!0,h["lib.es2020.sharedmemory.d.ts"]=!0,h["lib.es2020.string.d.ts"]=!0,h["lib.es2020.symbol.wellknown.d.ts"]=!0,h["lib.es2021.d.ts"]=!0,h["lib.es2021.full.d.ts"]=!0,h["lib.es2021.intl.d.ts"]=!0,h["lib.es2021.promise.d.ts"]=!0,h["lib.es2021.string.d.ts"]=!0,h["lib.es2021.weakref.d.ts"]=!0,h["lib.es2022.array.d.ts"]=!0,h["lib.es2022.d.ts"]=!0,h["lib.es2022.error.d.ts"]=!0,h["lib.es2022.full.d.ts"]=!0,h["lib.es2022.intl.d.ts"]=!0,h["lib.es2022.object.d.ts"]=!0,h["lib.es2022.regexp.d.ts"]=!0,h["lib.es2022.sharedmemory.d.ts"]=!0,h["lib.es2022.string.d.ts"]=!0,h["lib.es2023.array.d.ts"]=!0,h["lib.es2023.d.ts"]=!0,h["lib.es2023.full.d.ts"]=!0,h["lib.es5.d.ts"]=!0,h["lib.es6.d.ts"]=!0,h["lib.esnext.d.ts"]=!0,h["lib.esnext.full.d.ts"]=!0,h["lib.esnext.intl.d.ts"]=!0,h["lib.scripthost.d.ts"]=!0,h["lib.webworker.d.ts"]=!0,h["lib.webworker.importscripts.d.ts"]=!0,h["lib.webworker.iterable.d.ts"]=!0;var _=class{constructor(e){this._worker=e}_textSpanToRange(e,t){let i=e.getPositionAt(t.start),s=e.getPositionAt(t.start+t.length),{lineNumber:r,column:n}=i,{lineNumber:a,column:o}=s;return{startLineNumber:r,startColumn:n,endLineNumber:a,endColumn:o}}},y=class{constructor(e){this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}_libFiles;_hasFetchedLibFiles;_fetchLibFilesPromise;isLibFile(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!h[e.path.slice(1)])}getOrCreateModel(e){const t=p.Uri.parse(e),i=p.editor.getModel(t);if(i)return i;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return p.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);const s=a.typescriptDefaults.getExtraLibs()[e];return s?p.editor.createModel(s.content,"typescript",t):null}_containsLibFile(e){for(let t of e)if(this.isLibFile(t))return!0;return!1}async fetchLibFilesIfNecessary(e){this._containsLibFile(e)&&await this._fetchLibFiles()}_fetchLibFiles(){return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((e=>e.getLibFiles())).then((e=>{this._hasFetchedLibFiles=!0,this._libFiles=e}))),this._fetchLibFilesPromise}},w=class extends _{constructor(e,t,i,s){super(s),this._libFiles=e,this._defaults=t,this._selector=i;const r=e=>{if(e.getLanguageId()!==i)return;const t=()=>{const{onlyVisible:t}=this._defaults.getDiagnosticsOptions();t?e.isAttachedToEditor()&&this._doValidate(e):this._doValidate(e)};let s;const r=e.onDidChangeContent((()=>{clearTimeout(s),s=window.setTimeout(t,500)})),n=e.onDidChangeAttached((()=>{const{onlyVisible:i}=this._defaults.getDiagnosticsOptions();i&&(e.isAttachedToEditor()?t():p.editor.setModelMarkers(e,this._selector,[]))}));this._listener[e.uri.toString()]={dispose(){r.dispose(),n.dispose(),clearTimeout(s)}},t()},n=e=>{p.editor.setModelMarkers(e,this._selector,[]);const t=e.uri.toString();this._listener[t]&&(this._listener[t].dispose(),delete this._listener[t])};this._disposables.push(p.editor.onDidCreateModel((e=>r(e)))),this._disposables.push(p.editor.onWillDisposeModel(n)),this._disposables.push(p.editor.onDidChangeModelLanguage((e=>{n(e.model),r(e.model)}))),this._disposables.push({dispose(){for(const e of p.editor.getModels())n(e)}});const a=()=>{for(const e of p.editor.getModels())n(e),r(e)};this._disposables.push(this._defaults.onDidChange(a)),this._disposables.push(this._defaults.onDidExtraLibsChange(a)),p.editor.getModels().forEach((e=>r(e)))}_disposables=[];_listener=Object.create(null);dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables=[]}async _doValidate(e){const t=await this._worker(e.uri);if(e.isDisposed())return;const i=[],{noSyntaxValidation:s,noSemanticValidation:r,noSuggestionDiagnostics:n}=this._defaults.getDiagnosticsOptions();s||i.push(t.getSyntacticDiagnostics(e.uri.toString())),r||i.push(t.getSemanticDiagnostics(e.uri.toString())),n||i.push(t.getSuggestionDiagnostics(e.uri.toString()));const a=await Promise.all(i);if(!a||e.isDisposed())return;const o=a.reduce(((e,t)=>t.concat(e)),[]).filter((e=>-1===(this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code))),l=o.map((e=>e.relatedInformation||[])).reduce(((e,t)=>t.concat(e)),[]).map((e=>e.file?p.Uri.parse(e.file.fileName):null));await this._libFiles.fetchLibFilesIfNecessary(l),e.isDisposed()||p.editor.setModelMarkers(e,this._selector,o.map((t=>this._convertDiagnostics(e,t))))}_convertDiagnostics(e,t){const i=t.start||0,s=t.length||1,{lineNumber:r,column:n}=e.getPositionAt(i),{lineNumber:a,column:o}=e.getPositionAt(i+s),l=[];return t.reportsUnnecessary&&l.push(p.MarkerTag.Unnecessary),t.reportsDeprecated&&l.push(p.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:r,startColumn:n,endLineNumber:a,endColumn:o,message:b(t.messageText,"\n"),code:t.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}_convertRelatedInformation(e,t){if(!t)return[];const i=[];return t.forEach((t=>{let s=e;if(t.file&&(s=this._libFiles.getOrCreateModel(t.file.fileName)),!s)return;const r=t.start||0,n=t.length||1,{lineNumber:a,column:o}=s.getPositionAt(r),{lineNumber:l,column:c}=s.getPositionAt(r+n);i.push({resource:s.uri,startLineNumber:a,startColumn:o,endLineNumber:l,endColumn:c,message:b(t.messageText,"\n")})})),i}_tsDiagnosticCategoryToMarkerSeverity(e){switch(e){case 1:return p.MarkerSeverity.Error;case 3:return p.MarkerSeverity.Info;case 0:return p.MarkerSeverity.Warning;case 2:return p.MarkerSeverity.Hint}return p.MarkerSeverity.Info}},S=class extends _{get triggerCharacters(){return["."]}async provideCompletionItems(e,t,i,s){const r=e.getWordUntilPosition(t),n=new p.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),a=e.uri,o=e.getOffsetAt(t),l=await this._worker(a);if(e.isDisposed())return;const c=await l.getCompletionsAtPosition(a.toString(),o);if(!c||e.isDisposed())return;return{suggestions:c.entries.map((i=>{let s=n;if(i.replacementSpan){const t=e.getPositionAt(i.replacementSpan.start),r=e.getPositionAt(i.replacementSpan.start+i.replacementSpan.length);s=new p.Range(t.lineNumber,t.column,r.lineNumber,r.column)}const r=[];return void 0!==i.kindModifiers&&-1!==i.kindModifiers.indexOf("deprecated")&&r.push(p.languages.CompletionItemTag.Deprecated),{uri:a,position:t,offset:o,range:s,label:i.name,insertText:i.name,sortText:i.sortText,kind:S.convertKind(i.kind),tags:r}}))}}async resolveCompletionItem(e,t){const i=e,s=i.uri,r=i.position,n=i.offset,a=await this._worker(s),o=await a.getCompletionEntryDetails(s.toString(),n,i.label);return o?{uri:s,position:r,label:o.name,kind:S.convertKind(o.kind),detail:f(o.displayParts),documentation:{value:S.createDocumentationString(o)}}:i}static convertKind(e){switch(e){case I.primitiveType:case I.keyword:return p.languages.CompletionItemKind.Keyword;case I.variable:case I.localVariable:return p.languages.CompletionItemKind.Variable;case I.memberVariable:case I.memberGetAccessor:case I.memberSetAccessor:return p.languages.CompletionItemKind.Field;case I.function:case I.memberFunction:case I.constructSignature:case I.callSignature:case I.indexSignature:return p.languages.CompletionItemKind.Function;case I.enum:return p.languages.CompletionItemKind.Enum;case I.module:return p.languages.CompletionItemKind.Module;case I.class:return p.languages.CompletionItemKind.Class;case I.interface:return p.languages.CompletionItemKind.Interface;case I.warning:return p.languages.CompletionItemKind.File}return p.languages.CompletionItemKind.Property}static createDocumentationString(e){let t=f(e.documentation);if(e.tags)for(const i of e.tags)t+=`\n\n${k(i)}`;return t}};function k(e){let t=`*@${e.name}*`;if("param"===e.name&&e.text){const[i,...s]=e.text;t+=`\`${i.text}\``,s.length>0&&(t+=` \u2014 ${s.map((e=>e.text)).join(" ")}`)}else Array.isArray(e.text)?t+=` \u2014 ${e.text.map((e=>e.text)).join(" ")}`:e.text&&(t+=` \u2014 ${e.text}`);return t}var x=class extends _{signatureHelpTriggerCharacters=["(",","];static _toSignatureHelpTriggerReason(e){switch(e.triggerKind){case p.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case p.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case p.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}async provideSignatureHelp(e,t,i,s){const r=e.uri,n=e.getOffsetAt(t),a=await this._worker(r);if(e.isDisposed())return;const o=await a.getSignatureHelpItems(r.toString(),n,{triggerReason:x._toSignatureHelpTriggerReason(s)});if(!o||e.isDisposed())return;const l={activeSignature:o.selectedItemIndex,activeParameter:o.argumentIndex,signatures:[]};return o.items.forEach((e=>{const t={label:"",parameters:[]};t.documentation={value:f(e.documentation)},t.label+=f(e.prefixDisplayParts),e.parameters.forEach(((i,s,r)=>{const n=f(i.displayParts),a={label:n,documentation:{value:f(i.documentation)}};t.label+=n,t.parameters.push(a),s<r.length-1&&(t.label+=f(e.separatorDisplayParts))})),t.label+=f(e.suffixDisplayParts),l.signatures.push(t)})),{value:l,dispose(){}}}},v=class extends _{async provideHover(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const a=await n.getQuickInfoAtPosition(s.toString(),r);if(!a||e.isDisposed())return;const o=f(a.documentation),l=a.tags?a.tags.map((e=>k(e))).join("  \n\n"):"",c=f(a.displayParts);return{range:this._textSpanToRange(e,a.textSpan),contents:[{value:"```typescript\n"+c+"\n```\n"},{value:o+(l?"\n\n"+l:"")}]}}},C=class extends _{async provideDocumentHighlights(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const a=await n.getDocumentHighlights(s.toString(),r,[s.toString()]);return a&&!e.isDisposed()?a.flatMap((t=>t.highlightSpans.map((t=>({range:this._textSpanToRange(e,t.textSpan),kind:"writtenReference"===t.kind?p.languages.DocumentHighlightKind.Write:p.languages.DocumentHighlightKind.Text}))))):void 0}},D=class extends _{constructor(e,t){super(t),this._libFiles=e}async provideDefinition(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const a=await n.getDefinitionAtPosition(s.toString(),r);if(!a||e.isDisposed())return;if(await this._libFiles.fetchLibFilesIfNecessary(a.map((e=>p.Uri.parse(e.fileName)))),e.isDisposed())return;const o=[];for(let l of a){const e=this._libFiles.getOrCreateModel(l.fileName);e&&o.push({uri:e.uri,range:this._textSpanToRange(e,l.textSpan)})}return o}},F=class extends _{constructor(e,t){super(t),this._libFiles=e}async provideReferences(e,t,i,s){const r=e.uri,n=e.getOffsetAt(t),a=await this._worker(r);if(e.isDisposed())return;const o=await a.getReferencesAtPosition(r.toString(),n);if(!o||e.isDisposed())return;if(await this._libFiles.fetchLibFilesIfNecessary(o.map((e=>p.Uri.parse(e.fileName)))),e.isDisposed())return;const l=[];for(let c of o){const e=this._libFiles.getOrCreateModel(c.fileName);e&&l.push({uri:e.uri,range:this._textSpanToRange(e,c.textSpan)})}return l}},A=class extends _{async provideDocumentSymbols(e,t){const i=e.uri,s=await this._worker(i);if(e.isDisposed())return;const r=await s.getNavigationTree(i.toString());if(!r||e.isDisposed())return;const n=(t,i)=>{const s={name:t.text,detail:"",kind:L[t.kind]||p.languages.SymbolKind.Variable,range:this._textSpanToRange(e,t.spans[0]),selectionRange:this._textSpanToRange(e,t.spans[0]),tags:[],children:t.childItems?.map((e=>n(e,s.name))),containerName:i};return s};return r.childItems?r.childItems.map((e=>n(e))):[]}},I=class{};g(I,"unknown",""),g(I,"keyword","keyword"),g(I,"script","script"),g(I,"module","module"),g(I,"class","class"),g(I,"interface","interface"),g(I,"type","type"),g(I,"enum","enum"),g(I,"variable","var"),g(I,"localVariable","local var"),g(I,"function","function"),g(I,"localFunction","local function"),g(I,"memberFunction","method"),g(I,"memberGetAccessor","getter"),g(I,"memberSetAccessor","setter"),g(I,"memberVariable","property"),g(I,"constructorImplementation","constructor"),g(I,"callSignature","call"),g(I,"indexSignature","index"),g(I,"constructSignature","construct"),g(I,"parameter","parameter"),g(I,"typeParameter","type parameter"),g(I,"primitiveType","primitive type"),g(I,"label","label"),g(I,"alias","alias"),g(I,"const","const"),g(I,"let","let"),g(I,"warning","warning");var L=Object.create(null);L[I.module]=p.languages.SymbolKind.Module,L[I.class]=p.languages.SymbolKind.Class,L[I.enum]=p.languages.SymbolKind.Enum,L[I.interface]=p.languages.SymbolKind.Interface,L[I.memberFunction]=p.languages.SymbolKind.Method,L[I.memberVariable]=p.languages.SymbolKind.Property,L[I.memberGetAccessor]=p.languages.SymbolKind.Property,L[I.memberSetAccessor]=p.languages.SymbolKind.Property,L[I.variable]=p.languages.SymbolKind.Variable,L[I.const]=p.languages.SymbolKind.Variable,L[I.localVariable]=p.languages.SymbolKind.Variable,L[I.variable]=p.languages.SymbolKind.Variable,L[I.function]=p.languages.SymbolKind.Function,L[I.localFunction]=p.languages.SymbolKind.Function;var T,P,O=class extends _{static _convertOptions(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}_convertTextChanges(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}},N=class extends O{canFormatMultipleRanges=!1;async provideDocumentRangeFormattingEdits(e,t,i,s){const r=e.uri,n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),a=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),o=await this._worker(r);if(e.isDisposed())return;const l=await o.getFormattingEditsForRange(r.toString(),n,a,O._convertOptions(i));return l&&!e.isDisposed()?l.map((t=>this._convertTextChanges(e,t))):void 0}},M=class extends O{get autoFormatTriggerCharacters(){return[";","}","\n"]}async provideOnTypeFormattingEdits(e,t,i,s,r){const n=e.uri,a=e.getOffsetAt(t),o=await this._worker(n);if(e.isDisposed())return;const l=await o.getFormattingEditsAfterKeystroke(n.toString(),a,i,O._convertOptions(s));return l&&!e.isDisposed()?l.map((t=>this._convertTextChanges(e,t))):void 0}},K=class extends O{async provideCodeActions(e,t,i,s){const r=e.uri,n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),a=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),o=O._convertOptions(e.getOptions()),l=i.markers.filter((e=>e.code)).map((e=>e.code)).map(Number),c=await this._worker(r);if(e.isDisposed())return;const d=await c.getCodeFixesAtPosition(r.toString(),n,a,l,o);if(!d||e.isDisposed())return{actions:[],dispose:()=>{}};return{actions:d.filter((e=>0===e.changes.filter((e=>e.isNewFile)).length)).map((t=>this._tsCodeFixActionToMonacoCodeAction(e,i,t))),dispose:()=>{}}}_tsCodeFixActionToMonacoCodeAction(e,t,i){const s=[];for(const r of i.changes)for(const t of r.textChanges)s.push({resource:e.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(e,t.span),text:t.newText}});return{title:i.description,edit:{edits:s},diagnostics:t.markers,kind:"quickfix"}}},R=class extends _{constructor(e,t){super(t),this._libFiles=e}async provideRenameEdits(e,t,i,s){const r=e.uri,n=r.toString(),a=e.getOffsetAt(t),o=await this._worker(r);if(e.isDisposed())return;const l=await o.getRenameInfo(n,a,{allowRenameOfImportPath:!1});if(!1===l.canRename)return{edits:[],rejectReason:l.localizedErrorMessage};if(void 0!==l.fileToRename)throw new Error("Renaming files is not supported.");const c=await o.findRenameLocations(n,a,!1,!1,!1);if(!c||e.isDisposed())return;const d=[];for(const u of c){const e=this._libFiles.getOrCreateModel(u.fileName);if(!e)throw new Error(`Unknown file ${u.fileName}.`);d.push({resource:e.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(e,u.textSpan),text:i}})}return{edits:d}}},E=class extends _{async provideInlayHints(e,t,i){const s=e.uri,r=s.toString(),n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),a=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),o=await this._worker(s);if(e.isDisposed())return null;return{hints:(await o.provideInlayHints(r,n,a)).map((t=>({...t,label:t.text,position:e.getPositionAt(t.position),kind:this._convertHintKind(t.kind)}))),dispose:()=>{}}}_convertHintKind(e){return"Parameter"===e?p.languages.InlayHintKind.Parameter:p.languages.InlayHintKind.Type}};function H(e){P=B(e,"typescript")}function V(e){T=B(e,"javascript")}function W(){return new Promise(((e,t)=>{if(!T)return t("JavaScript not registered!");e(T)}))}function j(){return new Promise(((e,t)=>{if(!P)return t("TypeScript not registered!");e(P)}))}function B(e,t){const i=[],s=[],r=new m(t,e);i.push(r);const n=(...e)=>r.getLanguageServiceWorker(...e),a=new y(n);return function(){const{modeConfiguration:i}=e;U(s),i.completionItems&&s.push(p.languages.registerCompletionItemProvider(t,new S(n))),i.signatureHelp&&s.push(p.languages.registerSignatureHelpProvider(t,new x(n))),i.hovers&&s.push(p.languages.registerHoverProvider(t,new v(n))),i.documentHighlights&&s.push(p.languages.registerDocumentHighlightProvider(t,new C(n))),i.definitions&&s.push(p.languages.registerDefinitionProvider(t,new D(a,n))),i.references&&s.push(p.languages.registerReferenceProvider(t,new F(a,n))),i.documentSymbols&&s.push(p.languages.registerDocumentSymbolProvider(t,new A(n))),i.rename&&s.push(p.languages.registerRenameProvider(t,new R(a,n))),i.documentRangeFormattingEdits&&s.push(p.languages.registerDocumentRangeFormattingEditProvider(t,new N(n))),i.onTypeFormattingEdits&&s.push(p.languages.registerOnTypeFormattingEditProvider(t,new M(n))),i.codeActions&&s.push(p.languages.registerCodeActionProvider(t,new K(n))),i.inlayHints&&s.push(p.languages.registerInlayHintsProvider(t,new E(n))),i.diagnostics&&s.push(new w(a,e,t,n))}(),i.push(function(e){return{dispose:()=>U(e)}}(s)),n}function U(e){for(;e.length;)e.pop().dispose()}}}]);