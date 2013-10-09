define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,on,lang){

		return declare('ah/unit/IPObject',[_WidgetBase,_TemplateMixin],{

			templateString : '<div class="">'+
							'<p><input type="text" class="" data-dojo-attach-point="ipEl" /></p>'+
							'<div data-dojo-attach-point="ipList"></div>'+
							'</div>',
			name : '',

			postCreate : function(){
				console.log('postCreate');	
				this.inherited(arguments);

				this.own(
					on(this.ipEl,'keyup',lang.hitch(this,this._handleKeyup))	
				);
			},

			_handleKeyup : function(e){
				this.set('name','hello');
				console.log(this.get('name'));
			},

			_setNameAttr : function(){
				console.log('set name');
			}

		});
});
