define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,lang){
		return declare('ah/unit/IPObject',[_WidgetBase,_TemplateMixin],{
			templateString : '<div class="">'+
							'<p><input type="text" class="" data-dojo-attach-point="ipEl" /></p>'+
							'<div data-dojo-attach-point="ipList"></div>'+
							'</div>'
		});
});
