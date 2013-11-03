define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin',"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./template/TestIPObject.html",'dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,_WidgetsInTemplateMixin,template,on,lang){

		return declare('ah/configuration/TestIPObject',[_WidgetBase,_TemplateMixin,_WidgetsInTemplateMixin],{
			templateString : template,

			startup : function(){
				this.inherited(arguments);

				this.testSomething();
			},

			testSomething : function(){
				console.log(this.testBox);
			}
		});
})
