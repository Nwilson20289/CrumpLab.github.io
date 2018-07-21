
Biojs.AnnotatorOpenTarget = Biojs.Annotator.extend(
/** @lends Biojs.Annotator# */
{
	constructor: function(options){
		
		if (this.opt.proxyUrl == undefined){
			this.opt.proxyUrl= '../biojs/dependencies/proxy/proxy.php';
		}
		
		if (this.opt.allowDuplicates == false){
			this.opt.optimizedVersion = false;
			this.opt.splitted = false;
		}
		
		this.resetStatus();
	},
	
	_getAnnotatorTypeLabel: function(){
		return "OpenTargets";
	},
	
	 /** 
	    * Default options (and its values) for the Citation component. 
	    * @name Biojs.Citation-opt
	    * @type Object
	    */
	opt: {
		_startSearch : 0,
		_startSearchElaboration : 0
	},
	
	eventTypes : [
	],
	
	_lastStep : true,
	//_legendTitle: "SENTENCES",
	
	setOptionsFromAncestor: function(ancestorAnnotator, className, sharedData){
		for (prop in ancestorAnnotator.opt) {
		    if (ancestorAnnotator.opt.hasOwnProperty(prop)) {
		        if (prop!="restRdfUrl" && prop!="annotationTypesStart" && prop!="prehighlight" && prop!="regExpSearch"){
		        	
		        	this.opt[prop] = ancestorAnnotator.opt[prop];
		        }
		    }
		}
		
		this._dataResultUnselected = ancestorAnnotator._dataResultUnselected;
		this._originalText = ancestorAnnotator._originalText;
		this._className= className;
		this._sharedData = sharedData;
		this.opt.optimizedVersion = false;
		this.opt.caseSensitive = false;
		this.opt.prehighlight=false;
		this.opt.regExpSearch=true;
		this.opt.regExpByCharacter=true;
		this.opt.fuzzySearch=false;
		/**this.opt.splitInterval=1000;
		this.opt.splitSize=10;*/
	},
	
	_getFixedAnnotationsStartup: function (){
		 return [""];
	},
	
	_createAlertMessageDone: function (){
		return 'Annotations loaded from OpenTarget totally in '+this._loadingTime+' ms \n Annotations highlighted totally in '+this._timeElapsed+' ms';
	},
	
	_createAlertMessageNoDataFound: function (){ 
		return "No annotations found from OpenTarget for the pmcId "+this.opt.pmcId;
	},
	
	_createAlertMessageError: function (){ 
		return "Error calling the OpenTarget TRIPLE STORE ";
	},
	
	_postHighlightDone: function(){
		
		if (this.opt.elaborationAnnotation){ 
			var startTime = new Date().getTime();
		    this._mergeDataResult(true, true);
			var endTime = new Date().getTime();
		}
		
		if (this.opt.specificId==0){ 
			this._hideLegend();
		}
	},
	
	_postErrorDone: function(){
		if (this.opt.specificId==0){ 
			this._hideLegend();
		}
	},
	
	_getAnnotationPosition: function (annotation){
		return '';
	},
	
	_sortAnnotations: function (a,b){
		/**if (a.start.value <= b.start.value){
			return -1;
		}else{
			return 1;
		}*/
		return -1;
	},

	_getAnnotationType: function (annotation){
		var type_ret = Biojs.AnnotatorBase.OPEN_TARGET;
		return  type_ret;
	},
	
   _elaboratePreFixAnnotation: function (prefix){
	    return "";
	},
	
	_elaboratePostFixAnnotation: function (postfix){
	   return "";
		
	},
	
    _elaboratePreFixHtml: function (prefix){
    	 return "";
	},
	
	_elaboratePostFixHtml: function (postfix){
		 return "";
	},
	
	_getAnnotationPrefix: function (annotation){
		return "";
	},
	
	_getAnnotationPostfix: function (annotation){
		return "";
	},
	
	_getAnnotationText: function (annotation){
		var textAnnotation =  annotation.exact.value;
		if (this._endsWith(textAnnotation, ".")){
			textAnnotation = textAnnotation.substr(0, textAnnotation.length-1);
		}
		
	   return  textAnnotation;
	},
	
	_getAnnotationProvider: function(){
		return "OpenTargets Platform";
	},
	
	_getAnnotationExactDetails: function (annotation){	
		if (this.opt.showDetailedItems==1){ 
			return annotation.tags[0].name + '-'+annotation.tags[1].name;
		}else{
			return '';
		}
		
	}
},{
	
});