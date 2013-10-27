define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,on,lang){

		return declare('ah/unit/TextboxList_bit',[_WidgetBase,_TemplateMixin],{
			
			templateString : '<div class="${prefix}" data-dojo-attach-point="tagContainer">'+
								'<ul class="${prefix}-tags" data-dojo-attach-point="tagList">'+
									'<li class="${prefix}-tag ${prefix}-tag-editable" data-dojo-attach-point="tagInputBox">'+
											'<input type="text" class="${prefix}-tag-editable-input" data-dojo-attach-point="tagInput" />'+
										'</li>'+
									'</ul>'+
								'</div>',

			prefix : 'textboxlist',

			value : '',

			//_focused : false,

			//_tags : [],

			//_cur : null,

			postCreate : function(){
				this.inherited(arguments);

				// Rend UI
				this._rendUI();

				// Bind Events
				this._bindUI();
			},

			_rendUI : function(){
				var arr;

				this._tags = [];
				this._focused = false;
				this._cur = null;

				if(this.value){
					arr = this.value.split(',');
				}

				dojo.forEach(arr,lang.hitch(this,this.addTag));

			},

			_bindUI : function(){
				this.own(
					on(this.tagContainer,'click',lang.hitch(this,this._handleContainerClick)),	
					on(document,'click',lang.hitch(this,this._handleDocClick)),
					on(this.tagInput,'keydown',lang.hitch(this,this._handleKeydown))/*,
				);
			},

			/**
			 *@The main method for tag
			 */
			_handleKeydown : function(e){
				var key = e.keyCode,
					v = lang.trim(this.tagInput.value),
					charNum = this._getCaret(this.tagInput),
					estop = function(){e.preventDefault();e.stopPropagation()};

				switch(key){
					case 13 : 
						estop();
						this.addTag(v);
						break;
					case 8 : 
						if(charNum != 0 || v != '') return;
						estop();
						this._cur ? this.removeTag(this._cur) : 
							this._makeCur();
						break;
					default :
						break;
				}
			},

			_handleContainerClick : function(e){
				if(e.target.className.indexOf(this.prefix+'-tag-box') !== -1) return;
				this.tagInput.focus();
			},

			_handleDocClick : function(e){
				var t = e.target;

				if(!this._cur || this._cur === t) return;

				this._makeTagFocus(this._cur,false);
				this._cur = null;
			},

			addTag : function(v){
				if(v == '') return;
				
				var tag = dojo.create('li',
						{
							'class' : this.prefix+'-tag '+this.prefix+'-tag-box '+this.prefix+'-tag-box-deletable',
							'innerHTML' : v+'<a href="#" class="'+this.prefix+'-tag-box-deletebutton"></a>'
						});
				
				this._tags.push(tag);
				dojo.place(tag,this.tagInputBox,'before');

				// empty the tagInput El
				this._setValue();
			},

			removeTag : function(obj){
				var that = this;

				dojo.forEach(this._tags,function(o,i){
					if(obj === o){
						dojo.destroy(o);
						that._tags.splice(i,1);
						return false;
					}
				});

				//this.tagInput.focus();
				this._cur = null;
			},

			_makeCur : function(){
				if(!this._tags.length) return;

				this._makeTagFocus(this._cur = this._tags[this._tags.length-1],true);
				//this.tagInput.blur();
			},

			_setValue : function(v){
				this.tagInput.value = v || '';
			},

			_makeTagFocus : function(cur,f){
				var method = f ? 'addClass' : 'removeClass';
				
				dojo[method](cur,this.prefix+'-tag-box-focus');
			},

			/**
			 *@Helps
			 *@Get the caret
			 */
			_getCaret : function(el){
				var r;

				if (el.createTextRange){
		    	 	r = document.selection.createRange().duplicate();		
		  			r.moveEnd('character', el.value.length);

		  			if (r.text === '') return el.value.length;
					
		  			return el.value.lastIndexOf(r.text);
		  		} else {
					return el.selectionStart;
				}
			}
			
		});
});
