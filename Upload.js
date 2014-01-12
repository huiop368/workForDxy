define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin',
        'dojo/on','dojo/_base/lang','dojo/query',
         "dojo/dom-class","dojo/dom-style","dojo/dom-construct"   
        ],function(declare,_WidgetBase,_TemplateMixin,on,lang,query,domClass, domStyle, domConstruct){

        var UploadHandlerXhr = function(o){
            this._options = {
                // url of the server-side upload script,
                // should be on the same domain
                action: '/upload',
                onProgress: function(id, fileName, loaded, total){},
                onComplete: function(id, fileName, response){}
            };
            lang.mixin(this._options, o);

            this._files = [];
            this._xhrs = [];
        };

        // static method
        UploadHandlerXhr.isSupported = function(){
            return typeof File != "undefined" &&
                typeof (new XMLHttpRequest()).upload != "undefined";    
        };

        UploadHandlerXhr.prototype = {
            /**
             * Adds file to the queue
             * Returns id to use with upload, cancel
             **/    
            add: function(file){
                return this._files.push(file) - 1;        
            },
            /**
             * Sends the file identified by id and additional query params to the server
             * @param {Object} params name-value string pairs
             */    
            upload: function(id, params){
                var file = this._files[id],
                    name = this.getName(id),
                    size = this.getSize(id);
                
                if (!file){
                    throw new Error('file with passed id was not added, or already uploaded or cancelled');   
                }
                                
                var xhr = this._xhrs[id] = new XMLHttpRequest();
                var self = this;
                                                
                xhr.upload.onprogress = function(e){
                    if (e.lengthComputable){
                        self._options.onProgress(id, name, e.loaded, e.total);
                    }
                };

                xhr.onreadystatechange = function(){
                    // the request was aborted/cancelled
                    if (!self._files[id]){
                        return;
                    }
                    
                    if (xhr.readyState == 4){
                                        
                        self._options.onProgress(id, name, size, size);
                        
                        if (xhr.status == 200){
                            var response;
                            
                            try {
                                response = eval("(" + $.trim(xhr.responseText) + ")");
                            } catch(err){
                                response = {};
                            }

                            self._options.onComplete(id, name, response);
                                
                        } else {                   
                            self._options.onComplete(id, name, {});
                        }
                        
                        self._files[id] = null;
                        self._xhrs[id] = null;                
                    }
                };

                // build query string
                var queryString = '?file=' + encodeURIComponent(name);
                for (var key in params){
                    queryString += '&' + key + '=' + encodeURIComponent(params[key]);
                }

                xhr.open("POST", this._options.action + queryString, true);
                xhr.send(file);        
            },
            cancel: function(id){
                this._files[id] = null;
                
                if (this._xhrs[id]){
                    this._xhrs[id].abort();
                    this._xhrs[id] = null;                                   
                }
            },
            getName: function(id){
                // fix missing name in Safari 4
                var file = this._files[id];
                return file.fileName != null ? file.fileName : file.name;       
            },
            getSize: function(id){
                // fix missing size in Safari 4
                var file = this._files[id];
                return file.fileSize != null ? file.fileSize : file.size;
            }
        };



        /**
          *@Button Class for upload
          */
        var UploadButton = function(o){
            this._options = {
                element: null,  
                // if set to true adds multiple attribute to file input      
                multiple: false,
                // name attribute of file input
                name: 'file',
                onChange: function(input){},
                hoverClass: 'ui-upload-button-hover',
                focusClass: 'ui-upload-button-focus'                       
            };
            
            lang.mixin(this._options, o);
                
            this._element = this._options.element;
            
            // make button suitable container for input
            domStyle.set(this._element,{
                position: 'relative',
                overflow: 'hidden',
                // Make sure browse button is in the right side
                // in Internet Explorer
                direction: 'ltr'
            });

            
            this._input = this._createInput();
        };

        UploadButton.prototype = {
            /* returns file input element */    
            getInput: function(){
                return this._input;
            },
            /* cleans/recreates the file input */
            reset: function(){
                this.destroy();
                this._input = this._createInput();
            },    
            _createInput: function(){                
                var input = dojo.create("input"),
                    self = this;
                
                if (this._options.multiple){
                    input.setAttribute('multiple','multiple')
                }
                        
                input.setAttribute('type','file');
                input.setAttribute('name',this._options.name);
                
                domStyle.set(input,{
                    position: 'absolute',
                    // in Opera only 'browse' button
                    // is clickable and it is located at
                    // the right side of the input
                    right: 0,
                    top: 0,
                    zIndex: 1,
                    fontSize: '460px',
                    margin: 0,
                    padding: 0,
                    cursor: 'pointer',
                    opacity: 0
                });
                
                this._element.appendChild(input);
            
                this.ons(
                    on(input,'change',function(){
                        self._options.onChange(this);
                    }),
                    on(input,'mouseover',function(){
                         domClass.addClass(self._element,self._options.hoverClass);
                    }),
                    on(input,'mouseout',function(){
                         domClass.removeClass(self._element,self._options.hoverClass);
                    }),
                    on(input,'focus',function(){
                         domClass.addClass(self._element,self._options.focusClass);
                    }),
                    on(input,'blur',function(){
                        domClass.removeClass(self._element,self._options.focusClass);
                    })
                );

                // IE and Opera, unfortunately have 2 tab stops on file input
                // which is unacceptable in our case, disable keyboard access
                if (window.attachEvent){
                    // it is IE or Opera
                    input.setAttribute('tabIndex','-1');
                }

                return input;            
            },

            ons : function(){
                var _self = this;
                this._events || (this._events = []);
                dojo.forEach(arguments,function(handle){
                    _self._events.push(handle);
                });
            },

            destroy : function(){
                dojo.destroy(this._input);  
                dojo.forEach(this._events,function(handle){
                    handle.remove();
                });
                domClass.removeClass(this._element,this._options.focusClass);
                this._input = null;
            }        
        };


        /**
          *@File item list
          */
        var Item = declare(['_WidgetBase','_TemplateMixin'],{

            templateString : '<li>' +
                        '<span class="ui-upload-file"></span>' +
                        '<span class="ui-upload-spinner"></span>' +
                        '<span class="ui-upload-size" data-dojo-attach-point="sizeEl"></span>' +
                        '<a class="ui-upload-del" href="#" data-dojo-attach-point="del">&#10005;</a>' +
                        '<a class="ui-upload-cancel" href="#" data-dojo-attach-point="cancel">${cancel}</a>' +
                        '<span class="ui-upload-failed-text" data-dojo-attach-point="failEl">${failText}</span>' +
                    '</li>',

            'cancel' : 'Cancel',

            'failText' : 'Failed',

            postCreate : function(){
                this._bindUI();
            },

            _bindUI : function(){
                this.own(

                );
            }

        });


        /**
          *@FileUpload core class
          */
        var FileUploader = declare(['_WidgetBase','_TemplateMixin'],{

            templateString : '<div class="ui-uploader">' + 
                            '<div class="ui-upload-drop-area"><span>Drop files here to upload</span></div>' +
                            '<div class="ui-upload-button" data-dojo-attach-point="btnEl">${btnText}</div>' +
                            '<ul class="ui-upload-list" data-dojo-attach-point="listEl"></ul>' + 
                         '</div>',

            btnText : 'Upload a file',

            action: '/server/upload',
            // additional data to send, name-value pairs
            params: {},
            // ex. ['jpg', 'jpeg', 'png', 'gif'] or []
            allowedExtensions: [],        
            // size limit in bytes, 0 - no limit
            // this option isn't supported in all browsers
            sizeLimit: 0,

            multiple : false,

            limit : 1,

            onSubmit: function(id, fileName){},

            onComplete: function(id, fileName, responseJSON){},

            onDelete : function(){},

            showMessage : function(message){
                alert(message);
            },

           // main programm

            postCreate : function(){
                this._rendUI();
                this._bindUI();
            },

            _rendUI : function(){
                var self = this;
                 // number of files being uploaded
                this._filesInProgress = 0;
                
                // number of files uploaded
                this._filesUploaded = 0;

                this._handler = this._createUploadHandler(); 

                this._button = new UploadButton({
                    element: this.btnEl,
                    multiple: this.multiple,//UploadHandlerXhr.isSupported(),
                    onChange: function(input){
                        self._onInputChange(input);
                    },
                    name : this.name || 'file'
                });        
            },

            _bindUI : function(){
                this.own(

                );
            },

            setParams: function(params){
                this._options.params = params;
            },
           
            isUploading: function(){
                return !!this._filesInProgress;
            }, 

            _createUploadHandler : function(){
                var self = this,
                    handlerClass;        
                
                if(UploadHandlerXhr.isSupported()){           
                    handlerClass = UploadHandlerXhr;      
                } else {
                    handlerClass = UploadHandlerForm;
                }

                var handler = new handlerClass({
                    action: this.action,            
                    onProgress: function(id, fileName, loaded, total){
                        // is only called for xhr upload
                        self._updateProgress(id, loaded, total);                    
                    },
                    onComplete: function(id, fileName, result){
                        self._filesInProgress--;
                        console.log('complete');
                        // mark completed
                       /* var item = self._getItemByFileId(id);                
                       
                       self._getElement(item,'cancel').remove();
                       self._getElement(item,'spinner').remove();
                       self._getElement(item,'del').show();
                        
                        if (result.status){  
                            item.addClass(self._classes.success);
                        } else {
                           item.addClass(self._classes.fail);
                            
                            if (result.message){
                               self._options.showMessage(result.message); 
                            }
                        }
                            
                        self._options.onComplete(id, fileName, result, self._options);       */                         
                    }
                });

                return handler;
            },

            _updateProgress : function(id, fileName, loaded, total){
                console.log('progressing...');
            },

            _onInputChange : function(input){
                if (this._handler instanceof UploadHandlerXhr){     
                    
                    this._uploadFileList(input.files);       
                    
                } else {
                     
                    if (this._validateFile(input)){                
                        this._uploadFile(input);                                    
                    }
                              
                }        
                
                this._button.reset(); 
            },

            _uploadFileList : function(){
                var valid = true;

                var i = files.length;
                while (i--){         
                    if (!this._validateFile(files[i])){
                        valid = false;
                        break;
                    }
                }  
                
                if (valid){                                      
                    var i = files.length;
                    while (i--){ this._uploadFile(files[i]); }  
                }
            },

            _uploadFile : function(file){
                var id = this._handler.add(file),
                    name = this._handler.getName(id);
                
                // validate limit files
                if(++this._filesUploaded > this._limit){
                    //this._error('countError',name); 
                    return false;
                }
                this.onSubmit(id, name);        
                this._addToList(id, name);
                this._handler.upload(id, this.params);     
            },


            /**
              *@Helps
              */
            _validateFile : function(file){
                return true;
            },

            _addToList : function(id,name){

            }

        });

        // finally got this Class
        return FileUploader;

});



