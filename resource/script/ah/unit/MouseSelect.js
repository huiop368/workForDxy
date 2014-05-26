define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/dom-class",
        "dojo/dom-attr",
        "dojo/dom-geometry",
        "dojo/dom-construct",
        "dojo/dom-style",
        "dojo/on"],function(declare, lang, array, domClass, domAttr, domGeom, domCon, domStyle, on){
		
		return declare('ah/util/form/MouseSelect',[],{

			postscript : function(el,opts){
				this.el = el;

				this._bindUI();
			},

			_bindUI : function(){
				this._own(
					on(this.el,'mousedown',lang.hitch(this,this._mouseStart)),	
					on(document,'mousemove',lang.hitch(this,this._mouseDrag)),	
					on(document,'mouseup',lang.hitch(this,this._mouseStop))	
				);
			},

			_mouseStart : function(e){
				this.dragable = true;

				this.ops = [e.pageX,e.pageY];
				
				this.helper = this._createHelper();
				domStyle.set(this.helper,{
					width : 0,
					height : 0,
					left : e.pageX + 'px',
					top : e.pageY + 'px'
				});
			},

			_mouseDrag : function(e){
				if(!this.dragable) return;
				console.log('move');
				var x1 = this.ops[0],
					y1 = this.ops[1],
					x2 = e.pageX,
					y2 = e.pageY,tmp;

				if(x1 > x2){tmp = x2; x2 = x1; x1 = tmp;}	
				if(y1 > y2){tmp = y2; y2 = y1; y1 = tmp;}

				domStyle.set(this.helper,{
					width : x2 - x1 + 'px',
					height : y2 - y1 + 'px',
					left : x1 + 'px',
					top : y1 + 'px'
				});
			},

			_mouseStop : function(e){
				
				this._destroyHelper();
				this.dragable = false;
				console.log('up');
			},

			_createHelper : function(){
				var help = domCon.create('div',{className : 'ui-selectable-helper'});

				document.body.appendChild(help);

				return help;
			},

			_destroyHelper : function(){
				domCon.destroy(this.helper);
			},

			_own : function(){
				this._events = [].slice.apply(arguments);
			}
			
		});

});
