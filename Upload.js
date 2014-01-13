define(['dojo/_base/declare','dijit/_WidgetBase','dijit/_TemplatedMixin','dojo/on','dojo/_base/lang','dojo/query'],
    function(declare,_WidgetBase,_TemplateMixin,on,lang,query){

        /**
          *@For uniqueID
          */
        var getUniqueId = (function(){
            var id = 0;
            return function(){
                return id++;
            };
        })(),
        $ = query;

        var FileUploader = function(o){
            this._options = {
                // container element DOM node (ex. $(selector)[0] for jQuery users)
                element: null,
                // url of the server-side upload script, should be on the same domain
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

                //
                // UI customizations

                template: function(txt){
                    return '<div class="ui-uploader">' + 
                            '<div class="ui-upload-drop-area"><span>Drop files here to upload</span></div>' +
                            '<div class="ui-upload-button">'+(txt || 'Upload a file')+'</div>' +
                            '<ul class="ui-upload-list"></ul>' + 
                         '</div>';
                },          

                // template for one item in file list
                fileTemplate: '<li>' +
                        '<span class="ui-upload-file"></span>' +
                        '<span class="ui-upload-spinner"></span>' +
                        '<span class="ui-upload-size"></span>' +
                        '<a class="ui-upload-del" href="#">&#10005;</a>' +
                        '<a class="ui-upload-cancel" href="#">Cancel</a>' +
                        '<span class="ui-upload-failed-text">' + GDATA.messages.failedStatus + '</span>' +
                    '</li>',

                classes: {
                    // used to get elements from templates
                    button: 'ui-upload-button',
                    drop: 'ui-upload-drop-area',
                    dropActive: 'ui-upload-drop-area-active',
                    list: 'ui-upload-list',
                                
                    file: 'ui-upload-file',
                    spinner: 'ui-upload-spinner',
                    size: 'ui-upload-size',
                    cancel: 'ui-upload-cancel',
                    del : 'ui-upload-del',

                    // added to list item when upload completes
                    // used in css to hide progress spinner
                    success: 'ui-upload-success',
                    fail: 'ui-upload-fail'
                },
                messages: {
                    //serverError: "Some files were not uploaded, please contact support and/or try again.",
                    typeError: 'file type error',
                    sizeError: 'file size error',
                    emptyError: 'file empty error',
                    countError : 'file count error'
                },
                showMessage: function(message){
                    alert(message);
                }
            };

            lang.mixin(this._options, o);       
            
            this._element = $(this._options.element);

            if (this._element[0].nodeType != 1){
                throw new Error('element param of FileUploader should be dom node');
            }
            
            this._element[0].innerHTML = this._options.template(this._options.buttonText);
            
            // number of files being uploaded
            this._filesInProgress = 0;
            
            // number of files uploaded
            this._filesUploaded = 0;
            
            this._limit = this._options.limit;
            // easier access
            this._classes = this._options.classes;
            
            this._handler = this._createUploadHandler();    
            
            this._bindCancelEvent();
            
            this._bindDelEvent();
            
            var self = this;
            this._button = new UploadButton({
                element: this._getElement('button'),
                multiple: this._options.multiple,//UploadHandlerXhr.isSupported(),
                onChange: function(input){
                    self._onInputChange(input);
                },
                name : this._options.name || 'file'
            });        
            
            this.options.dnd && this._setupDragDrop();
        };

        FileUploader.prototype = {
            setParams: function(params){
                this._options.params = params;
            },
            /**
             * Returns true if some files are being uploaded, false otherwise
             */
            isUploading: function(){
                return !!this._filesInProgress;
            },  
            /**
             * Gets one of the elements listed in this._options.classes
             * 
             * First optional element is root for search,
             * this._element is default value.
             *
             * Usage
             *  1. this._getElement('button');
             *  2. this._getElement(item, 'file'); 
             **/
            _getElement: function(parent, type){                        
                if (typeof parent == 'string'){
                    // parent was not passed
                    type = parent;
                    parent = this._element;                   
                }
                
                var element = $('.'+this._options.classes[type],parent);
                
                if (!element.length){
                    throw new Error('element not found ' + type);
                }
                
                return element;
            },
            _error: function(code, fileName){
                var message = this._options.messages[code];
                message = message.replace('{file}', this._formatFileName(fileName));
                message = message.replace('{extensions}', this._options.allowedExtensions.join(', '));
                message = message.replace('{sizeLimit}', this._formatSize(this._options.sizeLimit));
                message = message.replace('{limit}',this._limit);
                this._options.showMessage(message);                
            },
            _formatFileName: function(name){
                if (name.length > 33){
                    name = name.slice(0, 19) + '...' + name.slice(-13);    
                }
                return name;
            },
            _isAllowedExtension: function(fileName){
                var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
                var allowed = this._options.allowedExtensions;
                
                if (!allowed.length){return true;}        
                
                for (var i=0; i<allowed.length; i++){
                    if (allowed[i].toLowerCase() == ext){
                        return true;
                    }    
                }
                
                return false;
            },
            _setupDragDrop: function(){
                function isValidDrag(e){            
                    var dt = e.dataTransfer,
                        // do not check dt.types.contains in webkit, because it crashes safari 4            
                        isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;                        

                    // dt.effectAllowed is none in Safari 5
                    // dt.types.contains check is for firefox            
                    return dt && dt.effectAllowed != 'none' && 
                        (dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));
                }
                
                var self = this,
                    dropArea = this._getElement('drop');                        

                dropArea.hide();
                
                var hideTimeout;        
               /* qq.attach(document, 'dragenter', function(e){            
                    e.preventDefault(); 
                });        

                qq.attach(document, 'dragover', function(e){
                    if (isValidDrag(e)){
                                 
                        if (hideTimeout){
                            clearTimeout(hideTimeout);
                        }
                        
                        if (dropArea == e.target || qq.contains(dropArea,e.target)){
                            var effect = e.dataTransfer.effectAllowed;
                            if (effect == 'move' || effect == 'linkMove'){
                                e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)    
                            } else {                    
                                e.dataTransfer.dropEffect = 'copy'; // for Chrome
                            }                                                                                    
                            qq.addClass(dropArea, self._classes.dropActive);     
                            e.stopPropagation();                                                           
                        } else {
                            dropArea.style.display = 'block';
                            e.dataTransfer.dropEffect = 'none';    
                        }
                                        
                        e.preventDefault();                
                    }            
                });         
                
                qq.attach(document, 'dragleave', function(e){  
                    if (isValidDrag(e)){
                                        
                        if (dropArea == e.target || qq.contains(dropArea,e.target)){                                        
                            qq.removeClass(dropArea, self._classes.dropActive);      
                            e.stopPropagation();                                       
                        } else {
                                                
                            if (hideTimeout){
                                clearTimeout(hideTimeout);
                            }
                            
                            hideTimeout = setTimeout(function(){                                                
                                dropArea.style.display = 'none';                            
                            }, 77);
                        }   
                    }            
                });
                
                qq.attach(dropArea, 'drop', function(e){            
                    dropArea.style.display = 'none';
                    self._uploadFileList(e.dataTransfer.files);            
                    e.preventDefault();
                });           */           
            },
            _createUploadHandler: function(){
                var self = this,
                    handlerClass;        
                
                if(UploadHandlerXhr.isSupported()){           
                    handlerClass = UploadHandlerXhr;      
                } else {
                    handlerClass = UploadHandlerForm;
                }

                var handler = new handlerClass({
                    action: this._options.action,            
                    onProgress: function(id, fileName, loaded, total){
                        // is only called for xhr upload
                        self._updateProgress(id, loaded, total);                    
                    },
                    onComplete: function(id, fileName, result){
                        self._filesInProgress--;

                        // mark completed
                        var item = self._getItemByFileId(id);                
                       
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
                            
                        self._options.onComplete(id, fileName, result, self._options);                                
                    }
                });

                return handler;
            },
            _onInputChange: function(input){

                if (this._handler instanceof UploadHandlerXhr){     
                    
                    this._uploadFileList(input.files);       
                    
                } else {
                     
                    if (this._validateFile(input)){                
                        this._uploadFile(input);                                    
                    }
                              
                }        
                
                this._button.reset();   
            },  
            _uploadFileList: function(files){
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
            _uploadFile: function(fileContainer){            
                var id = this._handler.add(fileContainer);
                var name = this._handler.getName(id);
                
                // validate limit files
                if(++this._filesUploaded > this._limit){
                    this._error('countError',name); 
                    return false;
                }
                this._options.onSubmit(id, name);        
                this._addToList(id, name);
                this._handler.upload(id, this._options.params);        
            },      
            _validateFile: function(file){
                var name,size;
         
                if (file.value){
                    // it is a file input            
                    // get input value and remove path to normalize
                    name = file.value.replace(/.*(\/|\\)/, "");
                } else {
                    // fix missing properties in Safari
                    name = file.fileName != null ? file.fileName : file.name;
                    size = file.fileSize != null ? file.fileSize : file.size;
                }
                
                if(this._filesUploaded >= this._limit){
                    this._error('countError',name); 
                    return false;
                }
                            
                if (! this._isAllowedExtension(name)){            
                    this._error('typeError',name);
                    return false;
                    
                } else if (size === 0){            
                    this._error('emptyError',name);
                    return false;
                                                             
                } else if (size && this._options.sizeLimit && size > this._options.sizeLimit){            
                    this._error('sizeError',name);
                    return false;            
                }
                
                return true;                
            },
            _addToList: function(id, fileName){
                var item = $(this._options.fileTemplate);
                item.data('fileId',id);

                var fileElement = this._getElement(item, 'file');        

                fileElement.text(this._formatFileName(fileName));
                this._getElement(item, 'size').hide();
                this._getElement(item, 'del').hide();        

                this._getElement('list').append(item);

                this._filesInProgress++;
            },
            _updateProgress: function(id, loaded, total){
                var item = this._getItemByFileId(id);
                var size = this._getElement(item, 'size');
                size.show();
                
                var text; 
                if (loaded != total){
                    text = Math.round(loaded / total * 100) + '% (' + this._formatSize(total) + ')';
                } else {                                   
                    text = this._formatSize(total);
                }          
                
               size.text(text);
            },
            _formatSize: function(bytes){
                var i = -1;                                    
                do {
                    bytes = bytes / 1024;
                    i++;  
                } while (bytes > 99);
                
                return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];          
            },
            _getItemByFileId: function(id){
                var item;
                this._getElement('list').find('li').each(function(){
                    var t = $(this);
                    
                    if(t.data('fileId') == id){
                        item = t;
                        return false;
                    }
                });
                
                return item;
            },
            /**
             * delegate click event for cancel link 
             **/
            _bindCancelEvent: function(){
                var self = this,
                    list = this._getElement('list');            
                
                list.on('click',function(e){
                    
                    var t = $(e.target),item;
                    
                    if(t.hasClass(self._classes.cancel)){
                        e.preventDefault();
                        item = t.parent();
                        self._handler.cancel(item.data('fileId'));
                        item.remove();
                        self._filesUploaded--;
                    }
                });

            },

            _bindDelEvent : function(){
                var self = this,
                    list = this._getElement('list');            
                
                list.on('click',function(e){
                    
                    var t = $(e.target),item;
                    
                    if(t.hasClass(self._classes.del)){
                        e.preventDefault();
                        item = t.parent();
                        item.remove();
                        self._filesUploaded--;
                        self._options.onDelete(self._options);
                    }
                });
            }
        };

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

            this._element.css({
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
                this._input.remove()          
                
                this._element.removeClass( this._options.focusClass );
                this._input = this._createInput();
            },    
            _createInput: function(){                
                var input = $("<input />"),
                    self = this;
                
                if (this._options.multiple){
                    input.attr("multiple", "multiple");
                }
                        
                input.attr("type", "file");
                input.attr("name", this._options.name);
                
                input.css({
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
                
                this._element.append(input);
            
                input.on('change',function(){
                    self._options.onChange(this);
                }).on('mouseover',function(){
                     self._element.addClass( self._options.hoverClass );
                }).on('mouseout',function(){
                     self._element.removeClass( self._options.hoverClass );
                }).on('focus',function(){
                     self._element.addClass( self._options.focusClass );
                }).on('blur',function(){
                     self._element.removeClass( self._options.focusClass );
                })

                // IE and Opera, unfortunately have 2 tab stops on file input
                // which is unacceptable in our case, disable keyboard access
                if (window.attachEvent){
                    // it is IE or Opera
                    input.attr('tabIndex', "-1");
                }

                return input;            
            }        
        };

        /**
         * Class for uploading files using form and iframe
         */
        var UploadHandlerForm = function(o){
            this._options = {
                // URL of the server-side upload script,
                // should be on the same domain to get response
                action: '/upload',
                // fires for each file, when iframe finishes loading
                onComplete: function(id, fileName, response){}
            };
            lang.mixin(this._options, o);
               
            this._inputs = {};
        };
        UploadHandlerForm.prototype = {
            /**
             * Adds file input to the queue
             * Returns id to use with upload, cancel
             **/    
            add: function(fileInput){
                var input = $(fileInput),
                    id = 'ui-upload-handler-iframe' + getUniqueId();        
                
                input.attr('name','ahfile');
                this._inputs[id] = input;
                
                input.remove();
                        
                return id;
            },
            /**
             * Sends the file identified by id and additional query params to the server
             * @param {Object} params name-value string pairs
             */
            upload: function(id, params){                        
                var input = this._inputs[id];
                
                if (!input.length){
                    throw new Error('file with passed id was not added, or already uploaded or cancelled');
                }                
                
                var fileName = this.getName(id);
                
                var iframe = this._createIframe(id);
                var form = this._createForm(iframe, params);
                form.append(input);

                var self = this;
                this._attachLoadEvent(iframe, function(){            
                    self._options.onComplete(id, fileName, self._getIframeContentJSON(iframe[0]));
                    
                    delete self._inputs[id];
                    // timeout added to fix busy state in FF3.6
                    setTimeout(function(){
                        iframe.remove();
                    }, 1);
                });

                form.submit().remove();        

                return id;
            },
            cancel: function(id){        
                if (id in this._inputs){
                    delete this._inputs[id];
                }        

                var iframe = $('#'+id);
                if (iframe.length){
                    // to cancel request set src to something else
                    // we use src="javascript:false;" because it doesn't
                    // trigger ie6 prompt on https
                    iframe[0].setAttribute('src', 'javascript:false;');

                    iframe.remove();
                }
            },
            getName: function(id){
                // get input value and remove path to normalize
                return this._inputs[id][0].value.replace(/.*(\/|\\)/, "");
            },  
            _attachLoadEvent: function(iframe, callback){       
                iframe.on('load',function(){
                    if(!this.parentNode) return;
                    
                    if (this.contentDocument &&
                        this.contentDocument.body &&
                        this.contentDocument.body.innerHTML == "false"){

                        return;
                    }
                    
                    callback();
                });
            },
            /**
             * Returns json object received by iframe from server.
             */
            _getIframeContentJSON: function(iframe){
                // iframe.contentWindow.document - for IE<7
                var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
                    response;

                try{
                    response = eval("(" + doc.body.innerHTML + ")");
                } catch(err){
                    response = {};
                }

                return response;
            },
            /**
             * Creates iframe with unique name
             */
            _createIframe: function(id){
                // We can't use following code as the name attribute
                // won't be properly registered in IE6, and new window
                // on form submit will open
                // var iframe = document.createElement('iframe');
                // iframe.setAttribute('name', id);

                // src="javascript:false;" removes ie6 prompt on https
                var iframe = $('<iframe src="javascript:false;" name="' + id + '" />');

                iframe[0].setAttribute('id', id);
                iframe.hide();
                $('body').append(iframe);
                
                return iframe;
            },
            /**
             * Creates form, that will be submitted to iframe
             */
            _createForm: function(iframe, params){
                // We can't use the following code in IE6
                // var form = document.createElement('form');
                // form.setAttribute('method', 'post');
                // form.setAttribute('enctype', 'multipart/form-data');
                // Because in this case file won't be attached to request
                var form = $('<form method="post" enctype="multipart/form-data"></form>');

                var queryString = '?';
                for (var key in params){
                    queryString += '&' + key + '=' + encodeURIComponent(params[key]);
                }
                
                form[0].setAttribute('action', this._options.action + queryString);
                form[0].setAttribute('target', iframe[0].name);
                form.hide();
                $('body').append(form);

                return form;
            }
        };

        /**
         * Class for uploading files using xhr
         */
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


        return FileUploader;
});



