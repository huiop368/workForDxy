define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_Widget','dijit/_TemplatedMixin','dojox/dtl/_base','dojox/dtl/_DomTemplated','dojox/dtl/_Templated','dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_Widget,_TemplateMixin,_base,_DomTemplated,_Templated,on,lang){

		return declare('ah/configuration/testDTL',[_WidgetBase,_Templated],{
			templateString : '<div>I like eat {{ fruit }}</div>',
			
			postCreate : function(){
				this.fruit = 'apple';
				this.render();
			}
		});
});
