define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,on,lang){

		/**
		 *@Inner Class Bit
		 *@Made this for later
		 */

		var Bit = declare([_WidgetBase,_TemplateMixin],{
			
			templateString : '<li data-dojo-attach-point="tagBox" class="${prefix}-tag ${prefix}-tag-box ${prefix}-tag-box-deletable">${value}'+
								'<a href="#" class="${prefix}-tag-box-deletebutton" data-dojo-attach-point="del"></a></li>',

			focused : false,

			_setFocusedAttr : function(value){
				var method = value ? 'addClass' : 'removeClass';
				
				dojo[method](this.tagBox,this.prefix+'-tag-box-focus');

				// set the list cur
				this.list._cur = value ? this : null;
				
				// set the focused value
				this._set('focused',value);
			},

			postCreate : function(){
				this.inherited(arguments);
				this._bindUI();
			},

			_bindUI : function(){
				this.own(
					on(this.del,'click',lang.hitch(this,this._delSelf))
				)		
			},

			_delSelf : function(e){
				e.preventDefault();
				e.stopPropagation();
				//this.destroy();
				this.list.removeTag(this);
			},

			toElement : function(){
				return this.domNode;
			}

		});

		return declare('ah/unit/TextboxList',[_WidgetBase,_TemplateMixin],{
			
			templateString : '<div class="${prefix}" data-dojo-attach-point="tagContainer">'+
								'<ul class="${prefix}-tags" data-dojo-attach-point="tagList">'+
									'<li class="${prefix}-tag ${prefix}-tag-editable" data-dojo-attach-point="tagInputBox">'+
											'<input type="text" class="${prefix}-tag-editable-input" data-dojo-attach-point="tagInput" />'+
										'</li>'+
									'</ul>'+
								'</div>',

			prefix : 'textboxlist',

			value : '',

			postCreate : function(){
				this.inherited(arguments);

				// Rend UI
				this._rendUI();

				// Bind Events
				this._bindUI();
			},

			_rendUI : function(){
				var arr;
				
				// avoid the prototype property
				this._tags = [];
				this._focused = false;
				this._cur = null;
				
				// initialize the value
				if(this.value){
					arr = this.value.split(',');
				}

				dojo.forEach(arr,lang.hitch(this,this.addTag));
			},

			_bindUI : function(){
				this.own(
					on(document,'keydown',lang.hitch(this,this._handleKeydown)),
					on(this.tagContainer,'click',lang.hitch(this,this._handleContainerClick)),	
					on(document,'click',lang.hitch(this,this._handleDocClick)),
					on(this.tagInput,'focus',lang.hitch(this,function(){this._focused = true})),
					on(this.tagInput,'blur',lang.hitch(this,function(){this._focused = false}))
				);
			},

			/**
			 *@The main method for tag
			 */
			_handleKeydown : function(e){
				if(!this._focused && !this._cur) return;
				
				var key = e.keyCode,
					v = lang.trim(this.tagInput.value),
					charNum = this._getCaret(this.tagInput),
					estop = function(){e.preventDefault();e.stopPropagation()};

				// avoid the delete key default action
				/*if(!this._focused && !this._cur) {
					key === 8 && estop();
					return;
				}*/

				switch(key){
					case 13 : 
						estop();
						this.addTag(v);
						break;
					case 8 : 
						if(charNum == 0 && v == ''){
							estop();
							this._cur ? this.removeTag(this._cur) : 
								(this._focused && this._makeCur());
						}
						break;
					default :
						break;
				}
			},

			_handleContainerClick : function(e){
				//e.stopPropagation();
				if(e.target.className.indexOf(this.prefix+'-tag-box') !== -1) return;
				this.tagInput.focus();
			},

			_handleDocClick : function(e){
				var t = e.target;

				if(!this._cur || this._cur.toElement() === t) return;

				this._cur.set('focused',false);
				//this._cur = null;
			},

			addTag : function(v){
				if(v == '') return;
				
				var tag = new Bit({value : v, prefix : this.prefix , list : this});

				this._tags.push(tag);
				dojo.place(tag.domNode,this.tagInputBox,'before');

				// empty the tagInput El
				this._setValue();
			},

			removeTag : function(obj){
				var that = this;
				dojo.forEach(this._tags,function(o,i){
					if(obj === o){
						obj.destroy();
						that._tags.splice(i,1);
						return false;
					}
				});

				this.tagInput.focus();
				this._cur = null;
			},

			_makeCur : function(){
				if(!this._tags.length) return;
				//(this._cur = this._tags[this._tags.length-1]).set('focused',true);
				this._tags[this._tags.length-1].set('focused',true);
				this.tagInput.blur();
			},

			_setValue : function(v){
				this.tagInput.value = v || '';
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
