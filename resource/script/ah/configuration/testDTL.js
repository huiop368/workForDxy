define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang',
		'dojo/store/Memory','dojo/data/ObjectStore'
		],
	function(declare,_WidgetBase,_TemplateMixin,on,lang,Memory,ObjectStore){

		return declare('ah/configuration/testDTL',[_WidgetBase],{

			postCreate : function(){
				var data = [
					{id : '1',name:'wp'},
					{id : '2',name:'nn'},
					{id : '3',name:'xx'}
				],
				memory = new Memory({data : data}),
				store = new ObjectStore({
					objectStore : memory
				});

				console.log(store);

				store.save({id:'2',name : 'cjn'});

				console.log(store);

				store.changing({id:'2',name : 'cjn'});
				
				console.log(store);
			}
			
		});
});
