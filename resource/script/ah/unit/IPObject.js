define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang'],
	function(declare,_WidgetBase,_TemplateMixin,on,lang){

		return declare('ah/unit/IPObject',[_WidgetBase,_TemplateMixin],{

			templateString : '<div class="ui-ip">'+
							'<p data-dojo-attach-point="ipElWrap"><input type="text" class="ui-ip-input" data-dojo-attach-point="ipEl" />'+
							'<span class="ui-ip-sta ui-ip-edit" data-dojo-attach-point="ipSta"></span>'+
							'<span class="ui-ip-mark ui-ip-inactive" data-dojo-attach-point="ipMark"></span></p>'+
							'<div class="ui-ip-list" data-dojo-attach-point="ipList">'+
							'</div>'+
							'</div>',
			
			_cache : {},

			data : {
				data : [
					{ip : '10.2.3.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.1.3.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.2.4.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.3.5.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.3.5.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.1.5.1',type : '0',label : 'IP Address or Hostname'},
					{ip : '10.2.3.1 - 10.2.3.100',type : '1',label : 'IP Range'},
					{ip : '10.2.4.1 - 10.2.4.100',type : '1',label : 'IP Range'},
					{ip : '10.2.5.1 - 10.2.5.100',type : '1',label : 'IP Range'},
					{ip : '10.2.3.1 / 255.255.255.0',type : '2',label : 'Network'}
				]
			},

			ipsta : '0',

			ipmark : '0',

			postCreate : function(){
				this.inherited(arguments);

				this._rendUI();

				this._bindUI();
			},

			_rendUI : function(){
				var	w = dojo.position(this.ipEl).w,
					h = dojo.position(this.ipEl).h;	  
				
				// init ui style

				dojo.setStyle(this.ipElWrap,{
					width : w + 'px',
					position : 'relative'
				});

				dojo.setStyle(this.ipList,{
					left : '0',
					top : h - 1 +'px'
				});

				this.ipSta.style.display = 'none';
				this.ipList.style.display = 'none';


				// normalize data to our need just for no match
				//this.data.data = this.normalizeData(this.data);
			},

			_bindUI: function(){
				this.own(
					on(this.ipEl,'keyup',lang.hitch(this,this._handleKeyup)),
					on(this.domNode,'.J-ip-item:click',lang.hitch(this,this._handleClickItem))	
				);		 

				// watch attributes 
				this.watch('ipmark',lang.hitch(this,this._watchIpmark));
				this.watch('ipsta',lang.hitch(this,this._watchIpsta));
			},

			_handleKeyup : function(e){
				//this.set('name','hello');
				//console.log(this.get('name'));
				var t = e.target,
					val = lang.trim(t.value),
					isEmpty = val == '',
					s = !isEmpty ? 1 : 0;
				
				// for cache
				if(this._cache[val]){
					this._setList(this._cache[val]);
					return;
				}
				
				// for ajax interface
				if(this.url){
					this._syncList(val);
					return;
				}

				// for local data
				if(this.data.data){
					// this._setList(this._cache[val] = this.makeListTmpl(this.data.data));
					this._setList(this._cache[val] = this.makeListTmpl(this.normalizeData(this.matchData(val))));
				}
				
				
				// set status for ipMark
				this.set('ipsta',s); 
			},

			_handleClickItem : function(e){
				var t = e.target,
					f = dojo.hasClass(t,'J-ip-item');				   

				if(f){
					this.ipEl.value = t.innerHTML;
					this._toggleList(0);
					this.set('ipsta',2);
				}
			},

			_watchIpmark : function(attr,oldVal,newVal){
				//dojo.toggleClass(this.ipMark,'ui-ip-inactive');			
				//dojo.toggleClass(this.ipMark,'ui-ip-active');
				var f = newVal == 1,
					s1,s2;
				
				f ? (s1 = 'ui-ip-inactive',s2 = 'ui-ip-active') : 
					(s2 = 'ui-ip-inactive',s1 = 'ui-ip-active')
				
				dojo.removeClass(this.ipMark,s1);
				dojo.addClass(this.ipMark,s2);
			},

			_watchIpsta : function(attr,oldVal,newVal){
				var isZero = newVal == 0,
					isOne = newVal == 1,
					isTwo = newVal == 2,
					s1,s2;

				isOne && (s1 = 'ui-ip-edit',s2 = 'ui-ip-save');
				isTwo && (s2 = 'ui-ip-edit',s1 = 'ui-ip-save');

				this.ipSta.style.display = isZero ? 'none' : '';

				if(!isZero){
					dojo.removeClass(this.ipSta,s1);
					dojo.addClass(this.ipSta,s2);
				}
			},

			_setList : function(html){
				this._toggleList(html != '' ? 1 : 0);
				this.ipList.innerHTML = html;				  
			},

			_toggleList : function(n){
				this.ipList.style.display = n== 0 ? 'none' : '';			  
				this.set('ipmark',n);
			},

			_syncList : function(val){
				/**
				 *@Example by jquery, would be replaced with dojo later
				 *  var _self = this;
				 *
				 *  $.ajax({
				 *  	type : 'POST',
				 *		url : this.url,
				 *		data : {keyword : val}		
				 *  }).done(function(d){
				 *  	if(d.data.length){
				 *			d.data = _self.normalizeData(d.data); 
				 *  		_self._setList(_self._cache[val] = _self.makeListTmpl(d.data));
				 *  	}
				 *  });
				 */			
			},

			/**
			 *@Helps
			 *@Comments : you can override these methods by configs
			 */
			normalizeData : function(data){
					//arr = [];
				var	obj = {};

				dojo.forEach(data,function(o,i){
					var type = o.type,label = o.label;

					//arr[type] || (arr[type] = {});
					//(arr[type][label] || (arr[type][label] = [])).push(o);
					(obj[label] || (obj[label] = [])).push(o);
				});
				//console.log(obj);
				return obj;
			},

			matchData : function(val){
				var arr = [],
					reg = new RegExp(val);

				if(val == ''){
					return [];
				}
				
				dojo.forEach(this.data.data,function(item){
					  //if(type != 0 || (type == 0 && reg.test(item.ip))){
					  if(reg.test(item.ip)){
					  	arr.push(item);
					  }
				});			
				//console.log(arr);
				return arr;
			},

			makeListTmpl : function(data){
				var str = '', i,dd;

				for(i in data){
					dd = data[i];
					if(dd.length){
						str += '<div class="ui-ip-list-item">';
						str += '<p class="item-title-wrap"><span class="item-title">'+i+'</span><a href="#" class="item-new">New</a></p>';
						str += '<ul class="item-area">';
						dojo.forEach(dd,function(o,i){
							str += '<li class="J-ip-item">'+o.ip+'</li>';
						});
						str += '</ul></div>';
					}
				}

				return str;
			}

		});
});
