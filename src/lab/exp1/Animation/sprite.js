(function (data) {
    /**
     * 过滤空格
     */
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+/, "").replace(/\s+$/, "");
        }
    }
    
    /*
     * 命名空间
     */
    var st = st || {};
    
    /*
     * <p>
     * 为方便查找，用键值对儿形式存储placeObject数据
     * </p>
     * @property hash
     * @type object
     */
    st.hash = {};
    
    /*
     * <p>
     * 为方便查找，用键值对儿形式在内存中存储创建过的DOM节点
     * </p>
     * @property hash
     * @type object 
     */
    st.defineShapes = {};
    
    /*
     * <p>
     * 初始化方法
     * </p>
     * @method init
     */
    st.init = function() {
        var d = data;
        st.initRoot();
        st.initDefs();
        st.initShapes();
    
        st.interval = Math.floor(1000 / d.Fr);
//		console.log( st.interval);
    };
    
    /*
     * <p>
     * document.createElementNS的快捷方式
     * </p>
     * @method createTag
     */
    st.createTag = function(tag) {
        return document.createElementNS("http://www.w3.org/2000/svg", tag);
    };
    
    /*
     * <p>
     * DOM根节点(svg)的初始化
     * </p>
     * @method initRoot
     */
    st.initRoot = function() {
        var d = data,
            rect = d.Ft;
        st.root = st.createTag('svg');
        st.root.setAttribute('width', (rect.xm - rect.xi));
        st.root.setAttribute('height', (rect.ym - rect.yi));
    
        st.root.setAttribute('viewBox', rect.xi + ' ' + rect.yi + ' ' + d.Fw + ' ' + d.Fh);
        st.scene = document.createElement('div');
        st.scene.style.position = 'relative';
        st.scene.style.left = '0';
        st.scene.style.top = '0';
        st.scene.appendChild(st.root);
        document.body.appendChild(st.scene);
    };
    
    /*
     * <p>
     * defs节点的初始化
     * defs节点中用来存放公用的填充信息 包括字形定义 渐变填充节点 图片节点
     * </p>
     * @method initDefs
     */
    st.initDefs = function() {
        var g = st.createTag('g');
        var defs = st.createTag('defs');
        g.appendChild(defs);
        st.root.appendChild(g);
    
        st.defs = defs;
    };
    
    /*
     * <p>
     * 各种类型节点的初始化
     * 根据placeobject数据创建所有类型的节点
     * </p>
     * @method initShapes
     */
    st.initShapes = function() {
        var d = data;
        var tags = d.tg;
        for (var i = 0, j = tags.length; i < j; i++) {
            var tag = tags[i];
            switch (tag.tp) {
            case 2:
                st.processShape(tag);
                break;
            case 10:
                st.processFont(tag);
                break;
            case 11:
                st.processText(tag);
                break;
            case 39:
                st.processSprite(tag);
                break;
            case 7:
                st.processButton(tag);
                break;
            }
            st.hash[tag.id] = tag;
        }
    };
    
    /*
     * <p>
     * 创建font节点
     * 用于存放自定义字形
     * 方便以后的text进行引用
     * </p>
     * @method processFont
     * @param {Object} placeObject数据 
     */
    st.processFont = function(j) {
        var font = st.createTag('font');
        font.setAttribute('id', 'ft' + j.id);
        font.setAttribute("horiz-adv-x", 1024);
    
        var fontFace = st.createTag('font-face');
        fontFace.setAttribute('font-family', 'ft' + j.id);
        fontFace.setAttribute("line-height", "1.15");
        fontFace.setAttribute("units-per-em", j.us);
        fontFace.setAttribute("font-weight", "bold");
        font.appendChild(fontFace);
    
        for (var i = 0, k = j.fo.length; i < k; i++) {
            var glyphObject = j.fo[i];
            var glyph = st.createTag('glyph');
            glyph.setAttribute('d', glyphObject.da);
            glyph.setAttribute('unicode', glyphObject.co);
            if ('ad' in glyphObject) {
                glyph.setAttribute('horiz-adv-x', glyphObject.ad);
            }
            font.appendChild(glyph);
        }
    
        st.defs.appendChild(font);
    };
    
    /*
     * <p>
     * 创建text节点
     * 分为自定义字形的text和html类型的text
     * </p>
     * @method processText
     * @param {Object} placeObject数据 
     */
    st.processText = function (j) {
        var G = st.createTag('g');
        var defs = st.createTag('defs');
        var g = st.createTag('g');
		
        if ('rs' in j) {
            for (var i = 0; j.rs[i]; i++) {
                var r = j.rs[i];
                // html text
                if (j.tt == "html") {
                    var bound = j.bd;
					
                    var textNode = document.createTextNode(r.tx);
                    var text_span = document.createElement('span');
                    text_span.style['fontSize'] = r.fs + 'px';
                    text_span.style['color'] = r.c;
                    text_span.style['fontFamily'] = r.fd;
                    text_span.appendChild(textNode);
                    if (i == 0) {
                        text_p = document.createElement('p');
                        // text_p.style.cssText = 'margin-top: 0px; margin-right: 0px; margin-: 0px; margin-left: 0px; text-align: left;';
                        text_div = document.createElement('div');
                        text_div.style['textAlign'] = 'left';
                        // text_div.style.cssText = 'font-family:' + r.fid + '; font-size: 12px; color: rgb(240, 78, 35); opacity: 1; text-align: left; white-space: nowrap; word-wrap: break-word; text-indent: 0px; margin-left: 0px; margin-right: 0px; line-height: 24px; padding-top: 22px;';
                        text_body = document.createElement('body');
            
                        var text_foreignobject = st.createTag('foreignObject');
                        text_foreignobject.setAttribute('x', bound.l);
                        text_foreignobject.setAttribute('y', bound.t);
                        text_foreignobject.setAttribute('width', bound.r - bound.l);
                        text_foreignobject.setAttribute('height', bound.b - bound.t);
                    
                        var text_g = st.createTag('g');
                        text_g.setAttribute('transform', j.tf);
                        text_g.setAttribute('translate', r.translate);
                        text_g.appendChild(text_foreignobject);
                        text_foreignobject.appendChild(text_body);
                        text_body.appendChild(text_div);
                        text_div.appendChild(text_p);
                        text_p.appendChild(text_span);
                        g.appendChild(text_g);
                        
                        var lastSpan = text_span;
                    } else {
                        lastSpan.appendChild(text_span);
                        lastSpan = text_span;
                    }
                } else {
					
                    var text = st.createTag('text');
                    if (r.psd === true) {
						
                        var s = '';
                        for (var m = 0,
                            n = r.tx.length; m < n; m++) {
                            s += '*';
                        }
                        r.tx = s;
                    }
					
                    var textNode = document.createTextNode(r.tx);
                    text.appendChild(textNode);
                    if (r.b) {
                        text.setAttribute('font-weight', 'bold');
                    }
                    text.setAttribute('font-size', r.h);
        
                    // 系统字体/自定义字体
                    if (r.fd.toString().match(/\d/)) {
                        text.setAttribute('font-family', 'ft' + r.fd);
                    } else {
                        text.setAttribute('font-family', r.fd);
                    }
                   
                    text.setAttribute('fill', r.c);
                    text.setAttribute('x', r.x);
                    text.setAttribute('y', r.y);
                    text.setAttribute('fill-rule', "nonzero");
                    text.setAttribute("style", "white-space:pre");
					
                    text.setAttribute('transform', j.tf);
                    g.appendChild(text);
                }
            }
        }
        G.appendChild(defs);
        G.appendChild(g);
        G.setAttribute('type', 'text');
        st.defineShapes[j.id] = G;
    };
    
    /*
     * <p>
     * 创建sprite的容器节点
     * 存放于st.defineShapes中方便以后复制和插入
     * </p>
     * @method processSprite
     * @param {Object} placeObject数据 
     */
    st.processSprite = function(j) {
        var g = st.createTag('g');
        var defs = st.createTag('defs');
        var childsHolder = st.createTag('g');
        g.setAttribute('type', 'sprite');
        g.appendChild(defs);
        g.appendChild(childsHolder);
        st.defineShapes[j.id] = g;
    };
    
    /*
     * <p>
     * 创建button的容器节点
     * 存放于st.defineShapes中方便以后复制和插入
     * </p>
     * @method processButton
     * @param {Object} placeObject数据 
     */
    st.processButton = function(tag) {
        var button = st.createTag('g');
        var defs = st.createTag('defs');
        var childsHolder = st.createTag('g');
        
        button.setAttribute('type', 'button');
        button.appendChild(defs);
        button.appendChild(childsHolder);
        
        st.defineShapes[tag.id] = button;
    };
    
    /*
     * <p>
     * 创建完整的shape节点
     * 存放于st.defineShapes中方便以后复制和插入
     * </p>
     * @method processButton
     * @param {Object} placeObject数据 
     */
    st.processShape = (function() {
        /*
        * <p>
        * 添加线性渐变节点
        * </p>
        * @function addLinear
        * @param {Object} 填充对象 在placeObject里面取
        * @param {str} 填充id 设置后被填充对象通过url引用该填充
        * @private
        */
        var addLinear = function(fillObject, fid) {
            return addGradient(fillObject, fid, 'linearGradient');
        };
        
        /*
        * <p>
        * 添加放射性渐变节点
        * </p>
        * @function addRadial
        * @param {Object}
        * @param {str}
        * @private
        */
        var addRadial = function(fillObject, fid) {
            return addGradient(fillObject, fid, 'radialGradient');
        };
        
        /*
        * <p>
        * 添加渐变节点
        * </p>
        * @function addGradient
        * @param {Object}
        * @param {str} 
        * @param {str} 填充类型
        * @private
        */
        var addGradient = function(fillObject, fid, str) {
            if (document.getElementById(fid)) return fid;
            var G = st.createTag(str);
            for (var key in fillObject) {
                if ((typeof fillObject[key] == 'object') || (key == 'type')) {
                    continue;
                }
                G.setAttribute(key, fillObject[key]);
            }
    
            var stops = fillObject.sp;
            for (var i = 0, j = stops.length; i < j; i++) {
                var o = stops[i];
                var s = st.createTag('stop');
                for (var k in o) {
                    s.setAttribute(k, o[k]);
                }
    
                G.appendChild(s);
            }
    
            G.setAttribute('id', fid);
            st.defs.appendChild(G);
            return fid;
        };
        
        /*
        * <p>
        * 添加图片节点
        * </p>
        * @function addImage
        * @param {Object}
        * @param {str} 
        * @private
        */
        var addImage = function(fillObject, fid) {
			
			
            if (document.getElementById(fid)) return fid;
		
            var pattern = st.createTag('pattern');
//			console.log(pattern);
            for (var key in fillObject) {
                if ((typeof fillObject[key] == 'object') || (key == 'type')) {
                    continue;
                }
//				console.log(key);
                pattern.setAttribute(key, fillObject[key]);
            }
    
            var image = st.createTag('image');
            for (var key in fillObject.image) {
				
                if (key == 'xlink:href') {
                    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", fillObject.image[key]);
                    continue;
                }
                image.setAttribute(key, fillObject.image[key]);
            }
    
            pattern.appendChild(image);
            pattern.setAttribute('id', fid);
            st.defs.appendChild(pattern);
            return fid;
        };
    
        /*
        * <p>
        * 为shape中的路径设置填充
        * 分为简单填充和渐变填充和图片填充
        * </p>
        * @function setColor
        * @param {Object} dom path element
        * @param {Object}
        * @param {str}
        * @param {int} 用于标记不同的颜色填充
        * @private
        */
        var setColor = function(path, fillObject, shapeId, colorIndex) {
            var type = fillObject.tp;
			
            if (type == 1) {
                
				
                path.setAttribute('fill', fillObject.c);
                path.setAttribute('fill-opacity', (typeof fillObject['fill-opacity'] == 'undefined') ? 1 : fillObject['fill-opacity']);
            } else {
				
                var fid = 'f' + shapeId + ':' + colorIndex;
				
                var cid = '';
                switch (type) {
                case 2:
                    cid = addLinear(fillObject, fid);

                    break;
                case 3:
                    cid = addRadial(fillObject, fid);
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    cid = addImage(fillObject, fid);
                    break;
                }
                path.setAttribute("fill", "url(#" + cid + ")");
            }
        };
        
        /*
        * <p>
        * 设置描边
        * </p>
        * @method setLine
        * @param {Object} dom path element
        * @param {Object}
        * @param {str}
        * @param {int} 标记描边index 用于区分
        * @private
        */
        var setLine = function(path, lineObject, shapeId, lineIndex) {
            for (var key in lineObject) {
                if (typeof lineObject[key] != 'object') {
                    path.setAttribute(key, lineObject[key]);
                }
            }
    
            if ('fi' in lineObject) {
                var type = lineObject.fi.tp;
			
                var lid = 'l' + shapeId + ':' + lineIndex;
                var cid = '';
                
                switch (type) {
                case 2:
                    cid = addLinear(lineObject.fi, lid);
                    break;
                case 3:
                    cid = addRadial(lineObject.fi, lid);
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    cid = addImage(lineObject.fi, lid);
                    break;
                }
                
                path.setAttribute("stroke", "url(#" + cid + ")");
            }
            path.setAttribute('fill', 'none');
        };
    
        return function(j) {
            var g = st.createTag('g');
            var defs = st.createTag('defs');
            var childsHolder = st.createTag('g');
            g.appendChild(defs);
            g.appendChild(childsHolder);
            
            var p = j.pt;
            
            if (p) { 
                for (var i = 0, k = p.length; i < k; i++) {
                    var pn = p[i];
                    var path = st.createTag('path');
                    path.setAttribute('d', pn.da);
        
                    if (typeof pn['fi'] !== 'undefined') {
                        var c = j.Fs;
                        var fillObject = c[pn['fi']];
                        var shapeId = j.id;
                        var colorIndex = pn['fi'];
                        if (fillObject) {
                            setColor(path, fillObject, shapeId, colorIndex);
                        }
                    }
        
                    if (typeof pn['ln'] !== 'undefined') {
                        var l = j.Ls;
                        var lineData = l[pn['ln']];
                        var shapeId = j.id;
                        var lineIndex = pn['ln'];
                        setLine(path, lineData, shapeId, lineIndex);
                    }
                    childsHolder.appendChild(path);
                }
            }
            g.setAttribute('type', 'shape');
            st.defineShapes[j.id] = g;
//			console.log(st.defineShapes);
        };
    })();
    
    /* 
     * <p>
     * filter类 处理filter并添加到对应的shape&sprite中
     * 本类中的部分方法涉及到的参数我是按照导出的SVG结构照搬而来
     * 没有详细描述具体意义 可以咨询王少君
     * </p>
     * @constructor filterElement
     * @param {object} shape&sprite对应的dom element
     * @param {object} filter数据 (placeobject上有对应属性)
     */
    st.filterElement = function(g, filters) {
        var maps = {
            '0' : 'Shadow',
            '1' : 'Blur',
            '2' : 'Glow',
            '3' : 'Bevel'
        };
        
        /*
         * <p>
         * filter中in属性（理解为基于某上层效果）参数格式的简单转换
         * </p>
         * @function baseAdapter
         * @param {int}
         * @private
         */
        var baseAdapter = function(n) {
            return ((n == 0) ? 'SourceGraphic' : n);
        };
        
        this.defs = g.firstChild;
        this.target = g.firstChild.nextSibling;
        this.id = 'filter_' + g.getAttribute('id');
        this.base = 0;
        this.filters = filters;
        this.element = st.createTag('filter'); // 创建filter节点
        this.defs.appendChild(this.element); // 插入filter节点
        
        /*
         * <p>
         * 处理feComponentTransfer节点
         * </p>
         * @method Rgb
         * @param {int}
         */
        this.Rgb = function(in1) {
            var rgb = ['R', 'G', 'B'];
            var fc = st.createTag('feComponentTransfer');
            fc.setAttribute('in', in1);
            this.element.appendChild(fc);
            for (var i = 0; i < rgb.length; i ++) {
                var ff = st.createTag('feFunc' + rgb[i]);
                ff.setAttribute('type', 'linear');
                ff.setAttribute('slope', 0);
                fc.appendChild(ff);
            }
            
            return this;
        };
        
        /*
         * <p>
         * 处理带有feFuncA节点的feComponentTransfer节点
         * </p>
         * @method Rgba
         * @param {str} slope属性
         * @param {object} 颜色码
         * @param {int} 输出的特效ID 为后面的特效引用
         */
        this.Rgba = function(slope, color, result) {
            var rgb = ['R', 'G', 'B'];
            var code = [color.r, color.g, color.b, color.a];
            var fc = st.createTag('feComponentTransfer');
            fc.setAttribute('result', result);
            this.element.appendChild(fc);
            for (var i = 0; i < rgb.length; i ++) {
                var ff = st.createTag('feFunc' + rgb[i]);
                ff.setAttribute('type', 'linear');
                ff.setAttribute('intercept', code[i]);
                
                
                ff.setAttribute('Ue', 0);
              
                fc.appendChild(ff);
            }
            
            var ffa = st.createTag('feFuncA');
            ffa.setAttribute('type', 'linear');
            ffa.setAttribute('slope', slope);
            ffa.setAttribute('xh', 0);
            fc.appendChild(ffa);
            return this;
        };
        
        /*
         * <p>
         * 处理feOffset节点
         * </p>
         * @method Fo
         * @param {int}
         * @param {int}
         * @param {int}
         */
        this.Fo = function(x, y, result) {
            var fo = st.createTag('feOffset');
            fo.setAttribute('dx', x);
            fo.setAttribute('dy', y);
            if (result !== false)
                fo.setAttribute('result', result);
            this.element.appendChild(fo);
            
            return this;
        };
        
        /*
         * <p>
         * 处理feGaussianBlur节点
         * </p>
         * @method Fo
         * @param {int}
         * @param {int}
         */
        this.Fg = function(x, y) {
            var fg = st.createTag('feGaussianBlur');
            fg.setAttribute('stdDeviation', [x, y].join(' '));
            this.element.appendChild(fg);
            
            return this;
        };
        
        /*
         * <p>
         * 处理feComposite节点
         * </p>
         * @method Com
         * @param {str}
         * @param {int}
         * @param {int}
         */
        this.Com = function(operator, in1, in2, k2, k3, result) {
            var composite = st.createTag('feComposite');
            if (in1 !== false)
                composite.setAttribute('in', in1);
            if (in2 !== false)
                composite.setAttribute('in2', in2);
            
            composite.setAttribute('operator', operator);
            if (k2 != 0) 
                composite.setAttribute('k2', k2);
            if (k3 != 0)
                composite.setAttribute('k3', k3);
            
            if (result) {
                composite.setAttribute('result', result);
            }
            this.element.appendChild(composite);
            
            return this;
        };
        
        /*
         * <p>
         * 处理shadow类型的filter
         * </p>
         *
         * @method Shadow
         * @param {object} filter数据对象
         */
        this.Shadow = function(filter) {
            if (filter.op & 0x80) {
                var ff = st.createTag('feFlood');
                ff.setAttribute('result', ++ this.base);
                this.element.appendChild(ff);
            }
            
            if (filter.op & 0x80) {
                this.Rgb(baseAdapter(this.base - 1));
            } else {
                this.Rgb(baseAdapter(this.base));
            }
            
            this.Fg(filter.bx, filter.by)
            .Fo(filter.dx, filter.dy, false);
            
            if (filter.op & 0x80) {
                this.Com('arithmetic', false, baseAdapter(this.base), -1, 1);
            }
            this.Rgba(filter.st, filter.c, ++ this.base);
            
            
            if (!(filter.op & 0x20)) {
                
                if (filter.op & 0x80) {
                    this.Com('in', baseAdapter(this.base), baseAdapter(this.base - 2), 0, 0, ++ this.base);
                } else if (filter.op & 0x40) {
                    this.Com('out', baseAdapter(this.base), baseAdapter(this.base - 1), 0, 0, ++ this.base);
                }
            } else {
                if ((filter.op & 0x40) && (filter.op & 0x80)) {
                    this.Com('in', baseAdapter(this.base), baseAdapter(this.base - 2), 0, 0, ++ this.base);
                } else if (filter.op & 0x40) {
                    this.Com('out', baseAdapter(this.base), baseAdapter(this.base - 1), 0, 0, ++ this.base);
                } else if (filter.op & 0x80) {
                    this.Com('atop', baseAdapter(this.base), baseAdapter(this.base - 2), 0, 0, ++ this.base);
                } else {
                    this.Com('over', baseAdapter(this.base - 1), baseAdapter(this.base), 0, 0, ++ this.base);
                }
            }
        };
        
        /*
         * <p>
         * 处理blur类型的filter
         * </p>
         *
         * @method Blur
         * @param {object} filter数据对象
         */
        this.Blur = function(filter) {
            var blurElement = st.createTag('feGaussianBlur');
            blurElement.setAttribute('in', baseAdapter(this.base));
            blurElement.setAttribute('result', ++ this.base);
            blurElement.setAttribute('stdDeviation', [filter.bx, filter.by].join(' '));
            
            this.element.appendChild(blurElement);
        };
        
        /*
         * <p>
         * 处理glow类型的filter
         * </p>
         *
         * @method Glow
         * @param {object} filter数据对象
         */
        this.Glow = function(filter) {
            //this.Rgb(baseAdapter(this.base))
            //.Fg(filter.bx, filter.by)
            //.Rgba(filter.str, filter.color, ++ this.base)
            //.Com('over', baseAdapter(this.base - 1), this.base, ++ this.base);
            if (filter.op & 0x80) {
                var ff = st.createTag('feFlood');
                ff.setAttribute('result', ++ this.base);
                this.element.appendChild(ff);
            }
            if (filter.op & 0x80) {
                this.Rgb(baseAdapter(this.base - 1));
            } else {
                this.Rgb(baseAdapter(this.base));
            }
            
            this.Fg(filter.bx, filter.by);
            
            if (filter.op & 0x80) {
                this.Com('arithmetic', false, baseAdapter(this.base), -1, 1);
            }
           
            if (filter.op & 0x80) {
                this.Rgba(filter.st, filter.c, baseAdapter(this.base));
            } else {
                this.Rgba(filter.st, filter.c, ++ this.base);
            }
            
            if (filter.op & 0x40 && filter.op & 0x80) {
                this.Com('in', baseAdapter(this.base), baseAdapter(this.base - 1), 0, 0, ++this.base);
            } else if (filter.op & 0x40) {
                this.Com('out', baseAdapter(this.base), baseAdapter(this.base - 1), 0, 0, ++this.base);
            } else if (filter.op & 0x80) {
                this.Com('atop', baseAdapter(this.base), baseAdapter(this.base - 1), 0, 0, ++this.base);
            } else {
                this.Com('over', baseAdapter(this.base - 1), baseAdapter(this.base), 0, 0, ++this.base);
            }
        };
        
        /*
         * <p>
         * 处理Bevel类型的filter
         * </p>
         *
         * @method Bevel
         * @param {object} filter数据对象
         */
        this.Bevel = function(filter) {
            this.Rgb(baseAdapter(this.base))
            .Fg(filter.bx, filter.by)
            .Fo('-' + filter.dx, '-' + filter.dy, ++ this.base)
            .Rgb(baseAdapter(this.base - 1))
            .Fg(filter.bx, filter.by)
            .Fo(filter.dx, filter.dy, ++ this.base)
            .Com('arithmetic', baseAdapter(this.base - 1), baseAdapter(this.base), 1, -1)
            .Rgba(filter.st, filter.highlightColor, ++ this.base)
            .Com('arithmetic', baseAdapter(this.base - 1), baseAdapter(this.base - 2), 1, -1)
            .Rgba(filter.st, filter.c, ++ this.base)
            .Com('arithmetic', baseAdapter(this.base - 1), baseAdapter(this.base), 1, 1, ++ this.base);
            
            //if (!(filter.op & 0x40)) {
            //    if (filter.op & 0x80) {
            //        this.Com('atop', this.base, baseAdapter(this.base - 5), 0, 0, ++ this.base);
            //    } else {
            //        this.Com('over', this.base, baseAdapter(this.base - 5), 0, 0, ++ this.base);
            //    }
            //}
            
            if (filter.op & 0x40) {
                if (!(filter.op & 0x10)) {
                    if (filter.op & 0x80) {
                        this.Com('in', this.base, baseAdapter(this.base - 5), 0, 0, ++this.base);
                    } else {
                        this.Com('out', this.base, baseAdapter(this.base - 5), 0, 0, ++this.base);
                    }
                }
            } else {
                if (filter.op & 0x80) {
                    this.Com('atop', this.base, baseAdapter(this.base - 5), 0, 0, ++this.base);
                } else {
                    if (filter.op & 0x10) {
                        this.Com('over', this.base, baseAdapter(this.base - 5), 0, 0, ++this.base);
                    } else {
                        this.Com('over', baseAdapter(this.base - 5), this.base, 0, 0, ++this.base);
                    }
                }
            }
    
        };
    
        /*
         * <p>
         * 初始化 设置filter的根节点
         * </p>
         *
         * @method init
         */
        this.init = function() {
            var rect = this.filters.rt;
            var record = this.filters.rc;
            
            this.element.setAttribute('width', rect.w);
            this.element.setAttribute('height', rect.h);
            this.element.setAttribute('x', rect.x);
            this.element.setAttribute('y', rect.y);
            this.element.setAttribute('id', this.id);
            
            for (var i = 0; i < record.length; i ++) {
                this.filterDom(record[i]);
            }
            
            this.attachFilter();
        };
        
        /*
         * <p>
         * 刷新filter节点结构（变化的filter）
         * </p>
         *
         * @method reset
         * @param {object}
         */
        this.reset = function(filters) {
            // 清空filter节点
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
            this.base = 0;
            this.filters = filters;
            this.init();
        };
        
        /*
         * <p>
         * 根据filter类型调用对应的方法
         * </p>
         * @method filterDom
         * @param {object}
         */
        this.filterDom = function(filter) {
            if (maps[filter.tp]) {
                this[maps[filter.tp]](filter);
            }
        };
        
        /*
         * <p>
         * 将filter效果添加到对应的shape上
         * </p>
         * @method filterDom
         */
        this.attachFilter = function() {
            if (this.element.childNodes.length > 0) {
                this.target.setAttribute('filter', 'url(#' + this.id + ')');
            }
        };
        
        this.init();
    };

	var inArray = function(element, arr) {
		for(var i=0; i<arr.length; i++) {
			if (arr[i]==element) {
				return true;
			}
		}
		return false;
	}
    
    /*
    * <p>
    * sprite类 程序核心部分
    *
    * 用于处理动画效果 包括mx transform ,cx tranform 等
    * </p>
    * @constructor sprite
    * @param {Object} placeObject数据
    * @param {Object} dom element 该动画所在的DOM节点（父节点）
    */
	

    st.sprite = function(j, par) {
        // 构造函数中把placeObject集合拆成单独的帧 
        this.placeObjects = j.Sf;
        this.sprites = {};
        this.depths = {};
        this.arrayIndex = 0;
        this.frame = 0;
        this.par = par;
		this.firstFrame = null;
		this.diff = null;
		this.pIdArr = [];
      
		if(j==data.Mf) {
			this.diff = "Mf";
		} else {
			this.diff = "Tag";
		}
        // 整理成帧数组
        this.frames = [];
        var frame = [];
		//设置临时数组
		
		var tempArr = [];
		var removeObj = [];
        var currentDepths = [];
		var removeObjLater = [];
		var removeObjDepths = []
          //作为sort的参数,使其可以按照key的数字大小进行排列
		function sortNumber(a,b) {
			return a - b
		}

		   // 可将传入的对象按depth的大小生成一个数组
		
        function createArrByDepth(obj) {
			var arr = [], arrSorted = [];
			for(var key in obj) {
				arr.push(key);
			}
			arr.sort(sortNumber);
			for(var i=0; i<arr.length; i++) {
				arrSorted.push(obj[arr[i]]);
			}
			return arrSorted;
        }

      
        var tempObj = {};
	  
        for (var i = 0, k = this.placeObjects.length; i < k; i++) {
          
            var placeObject = this.placeObjects[i];
			
            if (placeObject.tp == 14 || placeObject.tp == 43) { // 暂不支持的placeObject类型
                continue;
            }

			var depth = placeObject.d;

			if(!placeObject.remove && depth) {
				currentDepths.push(depth);
			}
            
			if(placeObject.remove) {
				removeObjDepths.push(depth);
			}

			
//			当节点存在remove属性时，缓存此节点
			if(placeObject.remove) {
				removeObj.push(placeObject);
			}

            if (placeObject.tp == 1) {
 
			    tempArr = createArrByDepth(tempObj);
			
				if(removeObj) {
                     for(var m=0; m<removeObj.length; m++) {
						if(!inArray(removeObj[m].d, currentDepths)) {
							removeObjLater.push(removeObj[m]);
						} else {
							
						}              
				     }
					 tempArr = tempArr.concat(removeObjLater);
				}
//				if(placeObject.frameindex == 17) {
//					console.log(removeObjLater);
//				}
				//深度复制temp,可在改变frame的同时不改变其内存
				frame = tempArr.slice();
				
				frame.push(placeObject);
                
				//不让tempObj中的remove传到下一帧,并删除d已经存在的placeObject
				if(removeObjLater.length>0) {
					for(var j=0; j<removeObjLater.length; j++) {
						for(var key in tempObj) {
							if(removeObjLater[j] == tempObj[key] || removeObjLater[j].d == tempObj[key].d) {
								delete tempObj[key];
							}
						}
					}
				}

 
                this.frames.push(frame);	    
                frame = [];
                removeObj = [];
                currentDepths = [];
				removeObjLater = [];
                removeObjDepths = [];
            } else {
				if(depth) {
					if(!placeObject.remove) {
						if(depth in tempObj) { 
							var lastObj = tempObj[depth];
//							if(tempObj[depth].id == placeObject.id ) {
//								tempObj[depth] = placeObject;
//							}
							if(true) {	
                                var newObj = {};
								newObj.id =  placeObject.id;
								newObj.d = placeObject.d;
//								newObj.ma = placeObject.ma ?  placeObject.ma : lastObj.ma;
								if(placeObject.ma) {
                                    newObj.ma = placeObject.ma;
								}
								if(!placeObject.ma && lastObj.ma) {
									if(!inArray(placeObject.d, removeObjDepths)) {
										newObj.ma = lastObj.ma;
									}       
								}
								if(placeObject.cD) {
                                    newObj.cD = placeObject.cD;
								}
								if(!placeObject.cD && lastObj.cD) {
									if(!inArray(placeObject.d, removeObjDepths)) {
										newObj.cD = lastObj.cD;
									}       
								}
								if(placeObject.cx) {
                                    newObj.cx = placeObject.cx;
								}
                                if(!placeObject.cx && lastObj.cx) {
									if(!inArray(placeObject.d, removeObjDepths)) {
										newObj.cx = lastObj.cx;
									}       
								}
								if(placeObject.fl) {
                                    newObj.fl = placeObject.fl;
								}
								if(!placeObject.fl && lastObj.fl) {
									if(!inArray(placeObject.d, removeObjDepths)) {
										newObj.fl = lastObj.fl;
									}       
								}
								if(placeObject.opacity) {
                                    newObj.opacity = placeObject.opacity;
								}
								if(!placeObject.opacity && lastObj.opacity) {
									if(!inArray(placeObject.d, removeObjDepths)) {
										newObj.opacity = lastObj.opacity;
									}       
								}
								if(placeObject.opacity==0.0) {
                                    newObj.opacity = 0.0;
								}
								if(placeObject.rp) {
									newObj.rp = true;
								}
								if(placeObject.tp) {
									newObj.tp = placeObject.tp;
								}
                                tempObj[depth] = newObj;
							}
							
						} else {
							tempObj[depth] = placeObject;
						}
//                        tempObj[depth] = placeObject;
					}  
				}
				 	
			}
        }
        
        // 缓存实例
        st.sprite.instances.push(this);  
		
//       console.log(this.frames);  
        this.debugId = j.id;
    };
    
    /*
    * <p>
    * sprite实例集合 方便sprite实例的存取
    * </p>
    */
    
    st.sprite.instances = [];
    
    /*
    * <p>
    * 显示当前帧
    * </p>
    * @method showFrame
    */
    st.sprite.prototype.showFrame = function() {
   
	

    //每隔new一个sprite对象则进行showFrame操作。
        var pls = this.frames[this.frame],
            showFrameTag = pls[pls.length - 1],
            pl = null;

//        if(this.diff=="Mf") {
//			if(this.frame<50) {
//				console.log(this.frame);
//				console.log(pls);
//			    
//			}
//		}
      //对每一帖所有的内容进行循环解析
        for (var i = 0, k = pls.length - 1; i < k; i ++) {
            pl = pls[i];
            this.renderShape(pl);
            this.lastDepth = pl.d;
            
        }
        
   

        this.lastDepth = null;
      
        if ('ac' in showFrameTag) {
            this.handleAction(showFrameTag['ac']);
        }
        
        if (!this.pause) {
            this.frame ++;
        }

        if (this.frame == this.frames.length) {
		    this.frame = 0;
        }
        
    };
    

    /*
    * <p>
    * 循环处理当前帧上附带的AS
    * </p>
    * @method handleAction
    * @param {object} as二维数组，取自placeObject
    */
    st.sprite.prototype.handleAction = function(actions) {
        for (var i = 0, j = actions.length; i < j; i ++) {
            this.action(actions[i]);
        }
    };
    
    /*
    * <p>
    * 处理当前帧上附带的AS
    * </p>
    * @method action
    * @param {object} as数组
    */
    st.sprite.prototype.action = function(action) {
        var aslist = action.as,
            code = 0;
        for (var i = 0, j = aslist.length; i < j; i ++) {       
            code = aslist[i].code;
            
            switch (code) {
                case 7:
                    this.stop();
                    break;
                case 129:
                    this.gotoFrame(aslist[i].frame);
                    break;
                case 6:
                    this.play();
                    break;
            }
        }
    };
    
    /*
    * <p>
    * 暂停当前sprite的播放
    * </p>
    * @method stop
    */
    st.sprite.prototype.stop = function() {
        this.pause = true;
    };
    
	st.sprite.prototype.start = function() {
        this.pause = false;
    };
    /*
    * <p>
    * 跳到某一帧继续播放
    * </p>
    * @method gotoFrame
    */
    st.sprite.prototype.gotoFrame = function(frame) {
        this.frame = frame;
        //this.pause = true;
    };
    
    /*
    * <p>
    * 跳到某一帧后停止
    * </p>
    * @method gotoAndStop
    */
    st.sprite.prototype.gotoAndStop = function(frame) {
        if (!this.frames[frame]) {
            return;
        }
        this.frame = frame;
        this.pause = true;
    };
    
    /*
    * <p>
    * 继续播放
    * </p>
    * @method play
    */
    st.sprite.prototype.play = function() {
        this.pause = false;
    };
    
    /*
    * <p>
    * 绘制shape
    * 添加，删除或替换相应的shape
    * </p>
    * @method renderShape
    */
    st.sprite.prototype.renderShape = function(placeObject) {

        if ('nm' in placeObject) {
            this.name = placeObject['nm'];
        }
        
        var p = placeObject, o;
        if ('remove' in p) {
            return this.removeShape(p.d);

        }

        if ('rp' in p) {
			o = this.replaceShape(p);
			this.afterRender(o, p);
        } else {
            o = this.getShape(p);
            if(o) {
				this.afterRender(o, p);
			}
        }
        return true;
    };
    
    /*
    * <p>
    * 替换shape
    * 替换或加入新的shape
    * </p>
    * @method replaceShape
    * @param {object} placeObject
    */
    st.sprite.prototype.replaceShape = function(j) {

	//可在初始化的时候调用，也可在afterRender的时候调用.为一帧中的若干个动作

        var parentNode = this.par.firstChild.nextSibling;  
       
        var nshape = this.createShape(j);
//		console.log(nshape);
		var depth = j.d;
	   
        if (this.depths[depth]) {
		
            var oldNodeId = this.par.getAttribute('id') + ':' + depth + ':' + this.depths[depth];
			
            var oldNode = document.getElementById(oldNodeId);
            
			 	

            if (oldNodeId == nshape.id) {
			
                return oldNode;
            }
            
			//此帧前可能会有remove操作，则需判断oldNode是否在dom中
			
			parentNode.replaceChild(nshape, oldNode);
			
    
            if (this.sprites[depth + ':' + this.depths[depth]]) {
                this.sprites[depth + ':' + this.depths[depth]] = null;
                delete this.sprites[depth + ':' + this.depths[depth]];
            }
            
            if (this.buttons) {
                if (this.buttons[depth + ':' + this.depths[depth]]) {
                    this.buttons[depth + ':' + this.depths[depth]] = null;
                    delete this.buttons[depth + ':' + this.depths[depth]];
                }
            }
        } else {
	       
            if (this.lastDepth) {
     	//判断同一帧里面，是否有相同depth的节点存在
		       
                var nodeId = this.par.getAttribute('id') + ':' + this.lastDepth + ':' + this.depths[this.lastDepth]; //上一帧
				
                var node = document.getElementById(nodeId);
                
				if(node) {
                //如果depth相同的节点下面是否别的节点
                var sibling = node.nextSibling;
                }
                

                if (sibling) {
					
                    parentNode.insertBefore(nshape, sibling);
					
                } else {
				
                    parentNode.appendChild(nshape);
					
                }
            } else {
           
                var firstNode = parentNode.firstChild;
                if (firstNode) {
					parentNode.insertBefore(nshape, firstNode);
                } else {
                    parentNode.appendChild(nshape);
                }
            }
        }
	
	// 每次进行render的时候，将id放入depths数组中
  
        this.depths[depth] = j.id;
        return nshape;
    };
    
    /*
     * <p>
     * 删除指定层上的sprite动画
     * 同时删除DOM节点和sprite对象
     * </p>
     * @method removeShape
     * @param {int} 层号
     */
    st.sprite.prototype.removeShape = function(depth) {
        if (this.depths[depth]) {
            var removeId = this.depths[depth];
            var parentNode = this.par.firstChild.nextSibling;
            var nodeId = this.par.getAttribute('id') + ':' + depth + ':' + removeId;
            var node = document.getElementById(nodeId);
            parentNode.removeChild(node);
            if (this.sprites[depth + ':' + this.depths[depth]]) {
                this.sprites[depth + ':' + this.depths[depth]] = null;
                delete this.sprites[depth + ':' + this.depths[depth]];
            }
            if (this.buttons) {
                if (this.buttons[depth + ':' + this.depths[depth]]) {
                    this.buttons[depth + ':' + this.depths[depth]] = null;
                    delete this.buttons[depth + ':' + this.depths[depth]];
                }
            }
            delete this.depths[depth];
        }
        return depth;
    };
    
    /*
     * <p>
     * 根据ID从页面上获取已经插入的dom节点
     * </p>
     * @method getShape
     * @param {object} placeObject
     */
    st.sprite.prototype.getShape = function(j) {
        var sid = this.par.getAttribute('id');
        var id = sid + ':' + j.d + ':' + j.id;
		
        var shape = document.getElementById(id);
        return shape;
    };
    
    /*
     * <p>
     * dom结构改变完成
     * dom样式改变开始
     * </p>
     * @method afterRender
     * @param {object} html dom element 刚插入的shape或sprite
     * @param {object} placeObject，根据上面的属性处理各种变化
     */
    st.sprite.prototype.afterRender = function(shape, placeObject) {

        this.mxTransform(shape, placeObject);
        this.cxTransform(shape, placeObject);
        this.changeOpacity(shape, placeObject);
//		console.log(shape);
        this.addFilters(shape, placeObject);
    };
    
    /*
     * <p>
     * 设置矩阵变换
     * </p>
     * @method mxTransform
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.prototype.mxTransform = function(shape, placeObject) {
		
        var map = {
            'mask':'moveShape',
            'shape':'moveShape',
            'text':'moveText',
            'sprite':'moveSprite',
            'button':'moveButton'
        };
        

        if ('ma' in placeObject) {
			if(shape.getAttribute('type')) {
            var type = shape.getAttribute('type');
            var method = map[type];
            this[method](shape, placeObject);
			}
        }
    };
    
    /*
     * <p>
     * 设置简单shape的矩阵变换
     * </p>
     * @method moveShape
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.prototype.moveShape = function(shape, placeObject) {

        var mx = placeObject['ma'];

        if (shape.nodeName.toLowerCase() == 'g') {
            // move shape
            var rs = shape.firstChild.nextSibling;
            rs.setAttribute('transform', 'matrix(' + mx + ')');
        } else {
            // move mask
            var paths = shape.childNodes;
            for (var i = 0, j = paths.length; i < j; i++) {
                paths[i].setAttribute('transform', 'matrix(' + mx + ')');
            }
        }
    };
    
    /*
     * <p>
     * 设置文字的矩阵变换
     * </p>
     * @method moveText
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.prototype.moveText = function(shape, placeObject) {
        var txts = shape.firstChild.nextSibling.childNodes,
            mx = placeObject['ma'];
        for (var i = 0; txts[i]; i++) {
            var mx1 = txts[i].getAttribute('transform');
    
            txts[i].oriMx = txts[i].oriMx || mx1;
            var cmx = txts[i].oriMx.match(/matrix\(([^(]+)\)/)[1];
            var newMx = st.sprite.concatMatrix(cmx, mx);
    
            txts[i].setAttribute('transform', 'matrix(' + newMx + ')');
        }
    };
    
    /*
     * <p>
     * 设置动画的矩阵变换
     * </p>
     * @method moveSprite
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.prototype.moveSprite = function(shape, placeObject) {
        var p = placeObject,
            mx = p['ma'],
            key = p.d + ':' + p.id;
		
       //找到相应的tag ID来对应p.id(tagID无引号)
        this.sprites[key] = this.sprites[key] || (new st.sprite(st.hash[p.id], shape));

        // 递归调用
        this.sprites[key].showFrame();
        shape.firstChild.nextSibling.setAttribute('transform', 'matrix(' + mx + ')');
    };
    
    /*
     * <p>
     * 处理按钮并 设置按钮的矩阵变换
     * </p>
     * @method moveButton
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.prototype.moveButton = function(shape, placeObject) {
        var depth = placeObject.d;
        var id = this.depths[placeObject.d];
        var mx = placeObject['ma'];
        var tag = st.hash[placeObject['id']];

        if (!this.buttons) {	
            this.buttons = {};
        }
        if (!this.buttons[depth + ':' + id]) {
            this.buttons[depth + ':' + id] = new st.sprite.Button(shape, tag);
        } else {
            var o = this.buttons[depth + ':' + id];
            var s = o.sprites;
            
            for (var k in s) {
                s[k].showFrame();
            }
        }
        
        this.buttons[depth + ':' + id].element.setAttribute('transform', 'matrix(' + mx + ')');
    };
    
    // 在监听器中保存this指针正确
    st.bindAsEventListener = function(o, method) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);    
        return function(e) {
            method.apply(o, [e || window.event].concat(args));
        };
    };
    
    /*
     * <p>
     * Button类
     * </p>
     * @constructor Button 
     * @param {object} html dom element
     * @param {object} placeObject
     */
    st.sprite.Button = function(shape, tag) {
        this.pid = shape.getAttribute('id');
        this.element = shape.firstChild.nextSibling;
        this.states = {};
        this.sprites = {};
        this.init(tag);
        
        this.element.style['cursor'] = 'pointer';
       
    };
    
    st.sprite.Button.prototype = {
        /*
        * <p>
        * 初始化方法，处理button的各种状态
        * </p>
        * @method init
        * @param {object} placeObject
        */
        init: function(tag) {
			
            var record = tag.rc,
                rec,
                shape,
                state;
            
            for (var i = record.length - 1; i >= 0; i --) {
                rec = record[i];
                state = rec.s;
				
                shape = st.defineShapes[rec.id].cloneNode(true);
                shape.setAttribute('transform', rec['tf']);
				
                shape.setAttribute('sid', rec.id);
                
                shape.setAttribute('id', this.pid.concat(':', rec.id, '_', i));
                    
                if (!this.states[state]) {
                    this.states[state] = [];
                }
                
                this.states[state].push([shape, rec]);
            }
            
            var p = this.element,
                states = this.states,
                sprites = this.sprites;
            
            function handleState(type) {
                var s = null,
                    i = 0,
                    j = states[type].length;
                    
                for (; i < j; i ++) {
                    s = states[type][i][0].cloneNode(true);
                    s.style['display'] = (type == 'up' || type == 'hit') ? 'block' : 'none';
                    s.setAttribute('state', type);
                    
                    if (type == 'hit') {
                        s.style['opacity'] = 0;
                    }
                    
                    p.appendChild(s);
                    
                    var rec = states[type][i][1];
                    if ('opacity' in rec) {
                        st.sprite.prototype.changeOpacity(s, rec);               
                    }
                    
                    if ('cx' in rec) {
                        st.sprite.prototype.colorTransform(s, rec['cx']);
                    }
                    
                    if ('fl' in rec) {
                        st.sprite.prototype.addFilters(s, rec);
                    }
                    
                    if (s.getAttribute('type') == 'sprite') {
                        var sid = s.getAttribute('sid');
                        var key = type.concat(i);
                        
                        sprites[key] = sprites[key] || new st.sprite(st.hash[sid], s);
                        sprites[key].showFrame();
                    }
                }
            }
            
            // 最初状态
            if ('up' in this.states) {
                handleState('up');
            }
            
            if ('hit' in this.states) {
                handleState('hit');
            }
            
            if ('down' in this.states) {
                handleState('down');
            }
            
            if ('over' in this.states) {
                handleState('over');
            }
            
            this.normalEvents();     
            if ('ac' in tag) {
                this.handleAction(tag.ac);
            }
        },
        
        /*
        * <p>
        * 四种基本状态的事件处理
        * </p>
        * @method normalEvents
        */
        normalEvents: function() {
            this.element.addEventListener('mousedown', st.bindAsEventListener(this, this.mousedownHandler), false);
            
            this.element.addEventListener('mouseup', st.bindAsEventListener(this, this.mouseupHandler), false);
            
            this.element.addEventListener('mouseover', st.bindAsEventListener(this, this.mouseoverHandler), false);
            
            this.element.addEventListener('mouseout', st.bindAsEventListener(this, this.mouseoutHandler), false);
        },
        
        /*
        * <p>
        * 处理支持的as
        * </p>
        * @method handleAction
        * @param {Array} 
        */
        handleAction: function(acts) {        
            for (var i = 0, j = acts.length; i < j; i ++) {
                var act = acts[i];
                switch (act.cd) {
                    case 'OverDownToOverUp':
                    case 'IdleToOverUp':
                        this.handleRelease(act.as);
                        break;
                }
            }
        },
        /*
        * <p>
        * 处理AS上的点击事件
        * </p>
        * @method handleRelease
        * @param {Array} 
        */
        handleRelease: function(as) {
            //console.log(st.sprite.instances);
            //console.log(as);
            //
            //var statement = as.statement.split('.');
            //var o = statement[0];
            //var index = statement[1].indexOf('(');
            //var m = statement[1].substr(0, index);
            //
            //this.element.addEventListener('mouseup', function(e) {
            //    var objs = st.sprite.instances, obj;            
            //    for (var i = 0, j = objs.length; i < j; i ++) {
            //        obj = objs[i];
            //        if (obj.name != o) {
            //            if (!obj.pause) obj.stop();
            //        }
            //    }
            //}, false);
            //
            for (var i = 0, j = as.length; i < j; i ++) {
                if ('u' in as[i]) {
                    (function(element, url) {
                        element.addEventListener('mouseup', function(e) {
                            window.open(url);
                        }, false);
                    }(this.element, as[i].u));
                }
                var statement = as[i].sm;
                if (/^\S+$/.test(statement) && statement.indexOf('.') == -1) {
                    var temp = statement.match(/^([^\(]+)\(([^\(]*)\)$/);
                    var method = temp[1].trim();
                    var args = temp[2];
                    var mainMovie = st.sprite.instances[0];
                    (function(o, element, m, a){
                        element.addEventListener('mouseup', function(e) {
                            //console.log('method: ' + m);
                            //console.log('args: ' + a);
                            if (m in o) {
                                o[m](a);
                            }
                        }, false);
                    }(mainMovie, this.element, method, args));
                }
            }
        },
        /*
        * <p>
        * 鼠标离开状态
        * </p>
        * @method mouseoutHandler
        * @param {object} 浏览器原生的eventObject 
        */
        mouseoutHandler: function(e) {
            //if ('up' in this.states) {
                this.changeState('up');
            //}
        },
        /*
        * <p>
        * 鼠标悬停状态
        * </p>
        * @method mouseoverHandler
        * @param {object} 浏览器原生的eventObject 
        */
        mouseoverHandler: function(e) {
            //if ('over' in this.states) {
                this.changeState('over');
            //}
        },
        /*
        * <p>
        * 鼠标按下状态
        * </p>
        * @method mousedownHandler
        * @param {object} 浏览器原生的eventObject 
        */
        mousedownHandler: function(e) {
            if ('down' in this.states) {
                this.changeState('down');
            }
        },
        /*
        * <p>
        * 鼠标松开状态
        * </p>
        * @method mouseupHandler
        * @param {object} 浏览器原生的eventObject 
        */
        mouseupHandler: function(e) {
            //if ('up' in this.states) {
                this.changeState('up');
            //}
        },
        /*
        * <p>
        * 处理鼠标状态改变
        * </p>
        * @method changeState
        * @param {string} 状态名称
        */
        changeState: function(type) {
            //if (type in this.states) {
                var els = this.element.childNodes;
                for (var i = 0, el; el = els[i]; i ++) {
                    
                    if (el.getAttribute('state') == 'hit' || el.getAttribute('state') == type) {
                        el.style.display = 'block';
                    } else {
                        el.style.display = 'none';
                    }
                }
            //}
        }
    };
    /*
    * <p>
    * 进行cxform变换
    * </p>
    * @method cxTransform
    * @param {object} html dom element
    * @param {object} placeObject
    */
    st.sprite.prototype.cxTransform = function(shape, placeObject) {
        if ('cx' in placeObject) {
            this.colorTransform(shape, placeObject['cx']);
        }
    };
    /*
    * <p>
    * 进行cxform变换
    * </p>
    * @method colorTransform
    * @param {object} html dom element
    * @param {object} placeObject
    */
    st.sprite.prototype.colorTransform = (function() {
        /*
        * <p>
        * 判断填充类型 是简单颜色填充或渐变色填充
        * </p>
        * @method transform
        * @param {object} html dom element
        * @param {object} cx变换相关参数
        * @pravite
        */
        function transform(node, cx) {
            var way = node.hasAttribute('stroke') ? 'stroke': 'fill';
			
            var color = node.getAttribute(way);
            if (!color) return;
            var type = color.match(/^\S{3}/)[0];
          
            switch (type) {
                case 'rgb':
                    transformPath(color, node, cx, way);
                    break;
                case 'url':
					
                    transformGradient(color, node, cx, way);
                    break;
            }
        }
        
        /*
        * <p>
        * 简单颜色填充的cxform
        * </p>
        * @method transformPath
        * @param {string} 当前填充的属性值
        * @param {object} html dom element
        * @param {object} 变换参数
        * @param {object} 填充/描边
        * @pravite
        */
        // simple CX
        function transformPath(color, node, cx, way) {
            node.oriC = node.oriC || color;
            var a = _transform(node.oriC, cx);
			
            node.setAttribute(way, 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
        }
    
        /*
        * <p>
        * 渐变颜色填充的cxform
        * </p>
        * @method transformGradient
        * @param {string} 当前填充的属性值
        * @param {object} html dom element
        * @param {object} 变换参数
        * @param {object} 填充/描边
        * @pravite
        */
        // gradient CX
        function transformGradient(color, node, cx, way) {
            var gid = color.match(/url\(#([^(]+)\)/)[1];
            var keyword = '';
            switch (way) {
                case 'stroke':
                    keyword = 'l';
                    break;
                case 'fill':
                    keyword = 'f';
                    break;
            }
            var findex = gid.indexOf(keyword);
            if (findex !== 0) {
                gid = gid.substr(findex);
            }
            
            var topGradient = document.getElementById(gid);
            
            if (topGradient.nodeName == 'pattern') return; // 图片cx暂不处理
            
            var shape = node.parentNode.parentNode; // shape
            var defs = node.parentNode.previousSibling; // shape自己的defs节点
            
            var selfGradientId = shape.getAttribute('id') + gid;
            
            if (document.getElementById(selfGradientId)) {
                var selfGradient = document.getElementById(selfGradientId);
            } else {
                var selfGradient = topGradient.cloneNode(true);
                selfGradient.setAttribute('id', selfGradientId);
                defs.appendChild(selfGradient);
            }
            
            var topStops = topGradient.childNodes, selfStops = selfGradient.childNodes;
            for (var i = 0, j = topStops.length; i < j; i++) {
                
                var stopColor = topStops[i].getAttribute('stop-color');
                var a = _transform(stopColor, cx);
                selfStops[i].setAttribute('stop-color', 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
            }
            
            node.setAttribute(way, 'url(#' + selfGradientId + ')');
        }
    
        /*
        * <p>
        * CXFORM计算公式
        * </p>
        * @method _transform
        * @param {string} 当前填充的属性值
        * @param {object} 变换参数
        * @pravite
        */
        function _transform(color, cx) {
            var rgbString = color.match(/rgb\(([^(]+)\)/)[1];
    
            var rgbArray = rgbString.split(',');
            var r = rgbArray[0] - 0;
            var g = rgbArray[1] - 0;
            var b = rgbArray[2] - 0;
    
            var R = Math.max(0, Math.min(((r * cx.Rm) / 256) + cx.Ra, 255));
            var G = Math.max(0, Math.min(((g * cx.Gm) / 256) + cx.Ga, 255));
            var B = Math.max(0, Math.min(((b * cx.Bm) / 256) + cx.Ba, 255));
    
            R = parseInt(R);
            G = parseInt(G);
            B = parseInt(B);
    
            return [R, G, B];
        }
    
        /*
        * <p>
        * 对于sprite进行cxform变换
        * 原理是对其中包含的shape中的填充逐个变换
        * </p>
        * @method cxSprite
        * @param {object} html dom element
        * @param {string} 当前填充的属性值
        * @param {object} 变换参数
        * @pravite
        */
        function cxSprite(shape, cx, spriteInstance) {
            var childs = shape.firstChild.nextSibling.childNodes;
            for (var i = 0, j = childs.length; i < j; i ++) {
                spriteInstance.colorTransform(childs[i], cx);
            }
        }
        
        return function(shape, cx) {
            var type = shape.getAttribute('type');
            if ((type == 'shape' || type == 'text') && (shape.nodeName.toLowerCase() != 'clippath')) {
                var rs = shape.firstChild.nextSibling;
                
                try {
                    for (var i = 0, j = rs.childNodes.length; i < j; i++) {
                        var path = rs.childNodes[i];
                        transform(path, cx);
                    }
                } catch(e) {
                    
                }
            } else if (type == 'sprite') { // 如果是sprite类型 则递归的调用colorTransform方法
                cxSprite(shape, cx, this);
            }
        }
    } ());
    /*
    * <p>
    * 处理透明度的改变
    * </p>
    * @method changeOpacity
    * @param {object} html dom element
    * @param {object} placeObject
    */
    st.sprite.prototype.changeOpacity = function(shape, placeObject) {
      
        var opacityValue = 1;

        if ('opacity' in placeObject) {
            opacityValue = placeObject['opacity'];
			shape.setAttribute('opacity', opacityValue);
        }
		
      
    };
    /*
    * <p>
    * 调用filterElement类处理滤镜
    * </p>
    * @method addFilters
    * @param {object} html dom element
    * @param {object} placeObject
    */
    st.sprite.prototype.addFilters = function(shape, placeObject) {
        if ('fl' in placeObject) {
            var filters = placeObject['fl'];
            if (shape.filter) {
                shape.filter.reset(filters);
            } else {
                shape.filter = new st.filterElement(shape, filters);
            }
        }
    };
    /*
    * <p>
    * 从缓存的shape集合里面取对应ID的shape克隆后返回
    * </p>
    * @method getNode
    * @param {object} html dom element
    * @param {object} placeObject
    */
    st.sprite.prototype.getNode = function(j) {
        return st.defineShapes[j.id].cloneNode(true);
    };
    /*
    * <p>
    * 创建需要插入到页面上的shape节点
    * </p>
    * @method createShape
    * @param {object} placeObject
    */
    st.sprite.prototype.createShape = function(j) {
        var shape = this.getNode(j);
		
        var id = this.par.getAttribute('id') + ':' + j.d + ':' + j.id;
        if ('cD' in j) {
		
            this.clipDepthId = id;
            this.clipDepth = j.cD;
            this.clipDepthDepth = j.d;
            shape = this.createClip(j);
        } else {
            // 添加遮罩
//		    console.log(this.clipDepthId);
            if (this.clipDepthId) {
                if (j.d > this.clipDepthDepth && j.d <= this.clipDepth) {
                    shape.setAttribute('clip-path', 'url(#' + this.clipDepthId + ')');
                }
            }
        }
        shape.setAttribute('id', id);
        return shape;
    };
    /*
    * <p>
    * 创建遮罩即clipPath节点
    * </p>
    * @method createClip
    * @param {object} placeObject
    */
    st.sprite.prototype.createClip = function(placeObject) {
		
        var shape = this.getNode(placeObject);

        var clipType = shape.getAttribute('type');
        switch (clipType) {
            case 'shape':
				
                return this.createSimpleClip(shape); // 普通的mask
            case 'sprite':
                return this.createComplexClip(placeObject); // sprite作为mask
        }
    };
    /*
    * <p>
    * 创建遮罩即clipPath节点
    * </p>
    * @method createClip
    * @param {object} placeObject
    */
    st.sprite.prototype.createSimpleClip = function(shape) {
		
        var cp = st.createTag('clipPath');
        var paths = shape.firstChild.nextSibling.childNodes;
        for (var i = 0, j = paths.length; i < j; i++) {
            var p = paths[i].cloneNode(true);
            cp.appendChild(p);
        }
    
        cp.setAttribute('clippathunits', 'userSpaceOnUse');
        cp.setAttribute('type', 'shape');
        
        return cp;
    };
    /*
    * <p>
    * 创建遮罩即clipPath节点
    * </p>
    * @method createClip
    * @param {object} placeObject
    */
    st.sprite.prototype.createComplexClip = function(placeObject) {
		
        var tag = st.hash[placeObject.id];
		var sortTag = [];
		for(var i=0; i< tag['Sf'].length; i++) {
			if(!tag['Sf'][i].remove) {
				sortTag.push(tag['Sf'][i]);
			}
		}
        var o = sortTag[0];
		
		var rshape = st.defineShapes[o.id];
		return this.createSimpleClip(rshape);
	
    };
    /*
    * <p>
    * matrix乘法公式
    * </p>
    * @static method concatMatrix
    * @param {Array} 矩阵一
    * @param {Array} 矩阵二
    */
    st.sprite.concatMatrix = function(m1, m2) {
        var res = [];
        m1 = m1.split(',');
        m2 = m2.split(',');
    
        for (var i = 0; m1[i]; i++) {
            m1[i] = m1[i] - 0;
            m2[i] = m2[i] - 0;
        }
    
        res.push(m1[0] * m2[0] + m1[1] * m2[1]);
        res.push(m1[0] * m2[1] + m1[1] * m2[3]);
        res.push(m1[1] * m2[0] + m1[3] * m2[1]);
        res.push(m1[1] * m2[1] + m1[3] * m2[3]);
        res.push(m2[4] * m1[0] + m2[5] * m1[1] + m1[4]);
        res.push(m2[4] * m1[1] + m2[5] * m1[3] + m1[5]);
    
        return res.join(',');
    };
    /*
    * <p>
    * 根节点中创建两个容器
    * 容器一用来放共用的渐变色节点 图片节点 字形节点等
    * 容器二是mainMovie的容器节点
    *
    * 并设置计时器开始动画
    * 用setTimeout而不是setInterval的原因是setInterval不保证时间间隔长度 而且会自动跳帧
    * </p>
    * @static method start
    */

    st.start = function() {
        var root = st.createTag('g'), d = data;
        st.setBackground(st.root);
        root.setAttribute('id', '0');
        root.appendChild(st.createTag('defs'));
        root.appendChild(st.createTag('g'));
        st.root.appendChild(root);
		//console.log(root);
        var mainMovie = new st.sprite(d.Mf, root);


        st.timer = setTimeout(function() {
            mainMovie.showFrame();
            st.timer = setTimeout(arguments.callee, st.interval);
        }, st.interval);

        
		function _StartAndStop() {
			var control = document.createElement("button");
			control.innerHTML = "stop";
			control.id = "control";
			document.body.appendChild(control);
			if(control) {
				control.onclick = function() {
					if(control.innerHTML=="stop") {
						control.innerHTML = 'start';
						mainMovie.stop();
						st.stop();
					} else {
						control.innerHTML = 'stop';
						mainMovie.start();
						st.timer = setTimeout(function() {
							mainMovie.showFrame();
							st.timer = setTimeout(arguments.callee, st.interval);
						}, st.interval);
						
					}
				}
			}
		}

        function _goToFrame() {
             var wrap = document.createElement("div"),
				 span = document.createElement("span"),
				 input = document.createElement("input"),
				 button = document.createElement("button");
			 wrap.id = "toFrame";
             document.body.appendChild(wrap);
			 input.type = "text";
			 input.size = "2";
			 button.innerHTML = "Go";
			 span.innerHTML = "All " + (mainMovie.frames.length-1) + " frames, go to ";
             wrap.appendChild(span);
			 wrap.appendChild(input);
			 wrap.appendChild(button);
			 button.onclick = function() {
				var frame = input.value;
				if(frame > mainMovie.frames.length) {
					alert("Invalid number!");
					return;
				} 
                mainMovie.gotoFrame(frame);

			 }
		}
		 _StartAndStop();
//		 _goToFrame();
        /*
        st.timer = setInterval(function() {
            mainMovie.showFrame();
        }, st.interval);
        */  
        
    };
    /*
    * <p>
    * 外部调用停止mainMovie的方法 已经废弃
    * 可以调用mainMovie.stop
    * </p>
    * @method stop
    */
    st.stop = function() {
        clearTimeout(st.timer);
    };
    /*
    * <p>
    * 外部调用继续播放mainMovie的方法 已经废弃
    * 可以调用mainMovie.play
    * </p>
    * @method resume
    */
    st.resume = function() {
        st.timer = setTimeout(function() {
            mainMovie.showFrame();
            setTimeout(arguments.callee, st.interval);
        }, st.interval);
    };
    /*
    * <p>
    * 用于设置动画的背景色
    * </p>
    * @static method setBackground
    * @param {object} placeObject
    */
    st.setBackground = function(root) {
        var d = data;
		
        var bg = st.createTag('rect');
        var bound = {
            x: d.Ft.xi,
            y: d.Ft.yi,
            width: d.Fw,
            height: d.Fh,
            fill: d.Bg
        };
        for (var k in bound) {
            bg.setAttribute(k, bound[k]);
        }
        root.appendChild(bg);
    };
    
    st.init();
    st.start();
}(data));