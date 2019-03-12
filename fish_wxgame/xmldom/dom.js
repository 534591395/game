function copy(a,b){for(var c in a)b[c]=a[c]}function _extends(a,b){var c=a.prototype;if(Object.create){var d=Object.create(b.prototype);c.__proto__=d}c instanceof b||(d=function(){},d.prototype=b.prototype,d=new d,copy(c,d),a.prototype=c=d);c.constructor!=a&&("function"!=typeof a&&console.error("unknow Class:"+a),c.constructor=a)}var htmlns="http://www.w3.org/1999/xhtml",NodeType={},ELEMENT_NODE=NodeType.ELEMENT_NODE=1,ATTRIBUTE_NODE=NodeType.ATTRIBUTE_NODE=2,TEXT_NODE=NodeType.TEXT_NODE=3,CDATA_SECTION_NODE=NodeType.CDATA_SECTION_NODE=4,ENTITY_REFERENCE_NODE=NodeType.ENTITY_REFERENCE_NODE=5,ENTITY_NODE=NodeType.ENTITY_NODE=6,PROCESSING_INSTRUCTION_NODE=NodeType.PROCESSING_INSTRUCTION_NODE=7,COMMENT_NODE=NodeType.COMMENT_NODE=8,DOCUMENT_NODE=NodeType.DOCUMENT_NODE=9,DOCUMENT_TYPE_NODE=NodeType.DOCUMENT_TYPE_NODE=10,DOCUMENT_FRAGMENT_NODE=NodeType.DOCUMENT_FRAGMENT_NODE=11,NOTATION_NODE=NodeType.NOTATION_NODE=12,ExceptionCode={},ExceptionMessage={},INDEX_SIZE_ERR=ExceptionCode.INDEX_SIZE_ERR=(ExceptionMessage[1]="Index size error",1),DOMSTRING_SIZE_ERR=ExceptionCode.DOMSTRING_SIZE_ERR=(ExceptionMessage[2]="DOMString size error",2),HIERARCHY_REQUEST_ERR=ExceptionCode.HIERARCHY_REQUEST_ERR=(ExceptionMessage[3]="Hierarchy request error",3),WRONG_DOCUMENT_ERR=ExceptionCode.WRONG_DOCUMENT_ERR=(ExceptionMessage[4]="Wrong document",4),INVALID_CHARACTER_ERR=ExceptionCode.INVALID_CHARACTER_ERR=(ExceptionMessage[5]="Invalid character",5),NO_DATA_ALLOWED_ERR=ExceptionCode.NO_DATA_ALLOWED_ERR=(ExceptionMessage[6]="No data allowed",6),NO_MODIFICATION_ALLOWED_ERR=ExceptionCode.NO_MODIFICATION_ALLOWED_ERR=(ExceptionMessage[7]="No modification allowed",7),NOT_FOUND_ERR=ExceptionCode.NOT_FOUND_ERR=(ExceptionMessage[8]="Not found",8),NOT_SUPPORTED_ERR=ExceptionCode.NOT_SUPPORTED_ERR=(ExceptionMessage[9]="Not supported",9),INUSE_ATTRIBUTE_ERR=ExceptionCode.INUSE_ATTRIBUTE_ERR=(ExceptionMessage[10]="Attribute in use",10),INVALID_STATE_ERR=ExceptionCode.INVALID_STATE_ERR=(ExceptionMessage[11]="Invalid state",11),SYNTAX_ERR=ExceptionCode.SYNTAX_ERR=(ExceptionMessage[12]="Syntax error",12),INVALID_MODIFICATION_ERR=ExceptionCode.INVALID_MODIFICATION_ERR=(ExceptionMessage[13]="Invalid modification",13),NAMESPACE_ERR=ExceptionCode.NAMESPACE_ERR=(ExceptionMessage[14]="Invalid namespace",14),INVALID_ACCESS_ERR=ExceptionCode.INVALID_ACCESS_ERR=(ExceptionMessage[15]="Invalid access",15);function DOMException(a,b){if(b instanceof Error)var c=b;else c=this,Error.call(this,ExceptionMessage[a]),this.message=ExceptionMessage[a],Error.captureStackTrace&&Error.captureStackTrace(this,DOMException);c.code=a;b&&(this.message=this.message+": "+b);return c}DOMException.prototype=Error.prototype;copy(ExceptionCode,DOMException);function NodeList(){}NodeList.prototype={length:0,item:function(a){return this[a]||null},toString:function(a,b){for(var c=[],d=0;d<this.length;d++)serializeToString(this[d],c,a,b);return c.join("")}};function LiveNodeList(a,b){this._node=a;this._refresh=b;_updateLiveList(this)}function _updateLiveList(a){var b=a._node._inc||a._node.ownerDocument._inc;if(a._inc!=b){var c=a._refresh(a._node);__set__(a,"length",c.length);copy(c,a);a._inc=b}}LiveNodeList.prototype.item=function(a){_updateLiveList(this);return this[a]};_extends(LiveNodeList,NodeList);function NamedNodeMap(){}function _findNodeIndex(a,b){for(var c=a.length;c--;)if(a[c]===b)return c}function _addNamedNode(a,b,c,d){d?b[_findNodeIndex(b,d)]=c:b[b.length++]=c;a&&(c.ownerElement=a,b=a.ownerDocument)&&(d&&_onRemoveAttribute(b,a,d),_onAddAttribute(b,a,c))}function _removeNamedNode(a,b,c){var d=_findNodeIndex(b,c);if(0<=d){for(var e=b.length-1;d<e;)b[d]=b[++d];b.length=e;a&&(b=a.ownerDocument)&&(_onRemoveAttribute(b,a,c),c.ownerElement=null)}else throw DOMException(NOT_FOUND_ERR,Error(a.tagName+"@"+c));}NamedNodeMap.prototype={length:0,item:NodeList.prototype.item,getNamedItem:function(a){for(var b=this.length;b--;){var c=this[b];if(c.nodeName==a)return c}},setNamedItem:function(a){var b=a.ownerElement;if(b&&b!=this._ownerElement)throw new DOMException(INUSE_ATTRIBUTE_ERR);b=this.getNamedItem(a.nodeName);_addNamedNode(this._ownerElement,this,a,b);return b},setNamedItemNS:function(a){var b=a.ownerElement;if(b&&b!=this._ownerElement)throw new DOMException(INUSE_ATTRIBUTE_ERR);b=this.getNamedItemNS(a.namespaceURI,a.localName);_addNamedNode(this._ownerElement,this,a,b);return b},removeNamedItem:function(a){a=this.getNamedItem(a);_removeNamedNode(this._ownerElement,this,a);return a},removeNamedItemNS:function(a,b){var c=this.getNamedItemNS(a,b);_removeNamedNode(this._ownerElement,this,c);return c},getNamedItemNS:function(a,b){for(var c=this.length;c--;){var d=this[c];if(d.localName==b&&d.namespaceURI==a)return d}return null}};function DOMImplementation(a){this._features={};if(a)for(var b in a)this._features=a[b]}DOMImplementation.prototype={hasFeature:function(a,b){var c=this._features[a.toLowerCase()];return c&&(!b||b in c)?!0:!1},createDocument:function(a,b,c){var d=new Document;d.implementation=this;d.childNodes=new NodeList;(d.doctype=c)&&d.appendChild(c);b&&(a=d.createElementNS(a,b),d.appendChild(a));return d},createDocumentType:function(a,b,c){var d=new DocumentType;d.name=a;d.nodeName=a;d.publicId=b;d.systemId=c;return d}};function Node(){}Node.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(a,b){return _insertBefore(this,a,b)},replaceChild:function(a,b){this.insertBefore(a,b);b&&this.removeChild(b)},removeChild:function(a){return _removeChild(this,a)},appendChild:function(a){return this.insertBefore(a,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(a){return cloneNode(this.ownerDocument||this,this,a)},normalize:function(){for(var a=this.firstChild;a;){var b=a.nextSibling;b&&b.nodeType==TEXT_NODE&&a.nodeType==TEXT_NODE?(this.removeChild(b),a.appendData(b.data)):(a.normalize(),a=b)}},isSupported:function(a,b){return this.ownerDocument.implementation.hasFeature(a,b)},hasAttributes:function(){return 0<this.attributes.length},lookupPrefix:function(a){for(var b=this;b;){var c=b._nsMap;if(c)for(var d in c)if(c[d]==a)return d;b=b.nodeType==ATTRIBUTE_NODE?b.ownerDocument:b.parentNode}return null},lookupNamespaceURI:function(a){for(var b=this;b;){var c=b._nsMap;if(c&&a in c)return c[a];b=b.nodeType==ATTRIBUTE_NODE?b.ownerDocument:b.parentNode}return null},isDefaultNamespace:function(a){return null==this.lookupPrefix(a)}};function _xmlEncoder(a){return"\x3c"==a&&"\x26lt;"||"\x3e"==a&&"\x26gt;"||"\x26"==a&&"\x26amp;"||'"'==a&&"\x26quot;"||"\x26#"+a.charCodeAt()+";"}copy(NodeType,Node);copy(NodeType,Node.prototype);function _visitNode(a,b){if(b(a))return!0;if(a=a.firstChild){do if(_visitNode(a,b))return!0;while(a=a.nextSibling)}}function Document(){}function _onAddAttribute(a,b,c){a&&a._inc++;"http://www.w3.org/2000/xmlns/"==c.namespaceURI&&(b._nsMap[c.prefix?c.localName:""]=c.value)}function _onRemoveAttribute(a,b,c,d){a&&a._inc++;"http://www.w3.org/2000/xmlns/"==c.namespaceURI&&delete b._nsMap[c.prefix?c.localName:""]}function _onUpdateChild(a,b,c){if(a&&a._inc)if(a._inc++,a=b.childNodes,c)a[a.length++]=c;else{b=b.firstChild;for(c=0;b;)a[c++]=b,b=b.nextSibling;a.length=c}}function _removeChild(a,b){var c=b.previousSibling,d=b.nextSibling;c?c.nextSibling=d:a.firstChild=d;d?d.previousSibling=c:a.lastChild=c;_onUpdateChild(a.ownerDocument,a);return b}function _insertBefore(a,b,c){var d=b.parentNode;d&&d.removeChild(b);if(b.nodeType===DOCUMENT_FRAGMENT_NODE){d=b.firstChild;if(null==d)return b;var e=b.lastChild}else d=e=b;var f=c?c.previousSibling:a.lastChild;d.previousSibling=f;e.nextSibling=c;f?f.nextSibling=d:a.firstChild=d;null==c?a.lastChild=e:c.previousSibling=e;do d.parentNode=a;while(d!==e&&(d=d.nextSibling));_onUpdateChild(a.ownerDocument||a,a);b.nodeType==DOCUMENT_FRAGMENT_NODE&&(b.firstChild=b.lastChild=null);return b}function _appendSingleChild(a,b){var c=b.parentNode;c&&c.removeChild(b);c=a.lastChild;b.parentNode=a;b.previousSibling=c;b.nextSibling=null;c?c.nextSibling=b:a.firstChild=b;a.lastChild=b;_onUpdateChild(a.ownerDocument,a,b);return b}Document.prototype={nodeName:"#document",nodeType:DOCUMENT_NODE,doctype:null,documentElement:null,_inc:1,insertBefore:function(a,b){if(a.nodeType==DOCUMENT_FRAGMENT_NODE){for(var c=a.firstChild;c;){var d=c.nextSibling;this.insertBefore(c,b);c=d}return a}null==this.documentElement&&a.nodeType==ELEMENT_NODE&&(this.documentElement=a);return _insertBefore(this,a,b),a.ownerDocument=this,a},removeChild:function(a){this.documentElement==a&&(this.documentElement=null);return _removeChild(this,a)},importNode:function(a,b){return importNode(this,a,b)},getElementById:function(a){var b=null;_visitNode(this.documentElement,function(c){if(c.nodeType==ELEMENT_NODE&&c.getAttribute("id")==a)return b=c,!0});return b},createElement:function(a){var b=new Element;b.ownerDocument=this;b.nodeName=a;b.tagName=a;b.childNodes=new NodeList;return(b.attributes=new NamedNodeMap)._ownerElement=b},createDocumentFragment:function(){var a=new DocumentFragment;a.ownerDocument=this;a.childNodes=new NodeList;return a},createTextNode:function(a){var b=new Text;b.ownerDocument=this;b.appendData(a);return b},createComment:function(a){var b=new Comment;b.ownerDocument=this;b.appendData(a);return b},createCDATASection:function(a){var b=new CDATASection;b.ownerDocument=this;b.appendData(a);return b},createProcessingInstruction:function(a,b){var c=new ProcessingInstruction;c.ownerDocument=this;c.tagName=c.target=a;c.nodeValue=c.data=b;return c},createAttribute:function(a){var b=new Attr;b.ownerDocument=this;b.name=a;b.nodeName=a;b.localName=a;b.specified=!0;return b},createEntityReference:function(a){var b=new EntityReference;b.ownerDocument=this;b.nodeName=a;return b},createElementNS:function(a,b){var c=new Element,d=b.split(":"),e=c.attributes=new NamedNodeMap;c.childNodes=new NodeList;c.ownerDocument=this;c.nodeName=b;c.tagName=b;c.namespaceURI=a;2==d.length?(c.prefix=d[0],c.localName=d[1]):c.localName=b;return e._ownerElement=c},createAttributeNS:function(a,b){var c=new Attr,d=b.split(":");c.ownerDocument=this;c.nodeName=b;c.name=b;c.namespaceURI=a;c.specified=!0;2==d.length?(c.prefix=d[0],c.localName=d[1]):c.localName=b;return c}};_extends(Document,Node);function Element(){this._nsMap={}}Element.prototype={nodeType:ELEMENT_NODE,hasAttribute:function(a){return null!=this.getAttributeNode(a)},getAttribute:function(a){return(a=this.getAttributeNode(a))&&a.value||""},getAttributeNode:function(a){return this.attributes.getNamedItem(a)},setAttribute:function(a,b){var c=this.ownerDocument.createAttribute(a);c.value=c.nodeValue=""+b;this.setAttributeNode(c)},removeAttribute:function(a){(a=this.getAttributeNode(a))&&this.removeAttributeNode(a)},appendChild:function(a){return a.nodeType===DOCUMENT_FRAGMENT_NODE?this.insertBefore(a,null):_appendSingleChild(this,a)},setAttributeNode:function(a){return this.attributes.setNamedItem(a)},setAttributeNodeNS:function(a){return this.attributes.setNamedItemNS(a)},removeAttributeNode:function(a){return this.attributes.removeNamedItem(a.nodeName)},removeAttributeNS:function(a,b){var c=this.getAttributeNodeNS(a,b);c&&this.removeAttributeNode(c)},hasAttributeNS:function(a,b){return null!=this.getAttributeNodeNS(a,b)},getAttributeNS:function(a,b){var c=this.getAttributeNodeNS(a,b);return c&&c.value||""},setAttributeNS:function(a,b,c){a=this.ownerDocument.createAttributeNS(a,b);a.value=a.nodeValue=""+c;this.setAttributeNode(a)},getAttributeNodeNS:function(a,b){return this.attributes.getNamedItemNS(a,b)},getElementsByTagName:function(a){return new LiveNodeList(this,function(b){var c=[];_visitNode(b,function(d){d===b||d.nodeType!=ELEMENT_NODE||"*"!==a&&d.tagName!=a||c.push(d)});return c})},getElementsByTagNameNS:function(a,b){return new LiveNodeList(this,function(c){var d=[];_visitNode(c,function(e){e===c||e.nodeType!==ELEMENT_NODE||"*"!==a&&e.namespaceURI!==a||"*"!==b&&e.localName!=b||d.push(e)});return d})}};Document.prototype.getElementsByTagName=Element.prototype.getElementsByTagName;Document.prototype.getElementsByTagNameNS=Element.prototype.getElementsByTagNameNS;_extends(Element,Node);function Attr(){}Attr.prototype.nodeType=ATTRIBUTE_NODE;_extends(Attr,Node);function CharacterData(){}CharacterData.prototype={data:"",substringData:function(a,b){return this.data.substring(a,a+b)},appendData:function(a){this.nodeValue=this.data=a=this.data+a;this.length=a.length},insertData:function(a,b){this.replaceData(a,0,b)},appendChild:function(a){throw Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);},deleteData:function(a,b){this.replaceData(a,b,"")},replaceData:function(a,b,c){var d=this.data.substring(0,a);a=this.data.substring(a+b);this.nodeValue=this.data=c=d+c+a;this.length=c.length}};_extends(CharacterData,Node);function Text(){}Text.prototype={nodeName:"#text",nodeType:TEXT_NODE,splitText:function(a){var b=this.data,c=b.substring(a);this.data=this.nodeValue=b=b.substring(0,a);this.length=b.length;a=this.ownerDocument.createTextNode(c);this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling);return a}};_extends(Text,CharacterData);function Comment(){}Comment.prototype={nodeName:"#comment",nodeType:COMMENT_NODE};_extends(Comment,CharacterData);function CDATASection(){}CDATASection.prototype={nodeName:"#cdata-section",nodeType:CDATA_SECTION_NODE};_extends(CDATASection,CharacterData);function DocumentType(){}DocumentType.prototype.nodeType=DOCUMENT_TYPE_NODE;_extends(DocumentType,Node);function Notation(){}Notation.prototype.nodeType=NOTATION_NODE;_extends(Notation,Node);function Entity(){}Entity.prototype.nodeType=ENTITY_NODE;_extends(Entity,Node);function EntityReference(){}EntityReference.prototype.nodeType=ENTITY_REFERENCE_NODE;_extends(EntityReference,Node);function DocumentFragment(){}DocumentFragment.prototype.nodeName="#document-fragment";DocumentFragment.prototype.nodeType=DOCUMENT_FRAGMENT_NODE;_extends(DocumentFragment,Node);function ProcessingInstruction(){}ProcessingInstruction.prototype.nodeType=PROCESSING_INSTRUCTION_NODE;_extends(ProcessingInstruction,Node);function XMLSerializer(){}XMLSerializer.prototype.serializeToString=function(a,b,c){return nodeSerializeToString.call(a,b,c)};Node.prototype.toString=nodeSerializeToString;function nodeSerializeToString(a,b){var c=[],d=9==this.nodeType?this.documentElement:this,e=d.prefix,f=d.namespaceURI;if(f&&null==e&&(e=d.lookupPrefix(f),null==e))var h=[{namespace:f,prefix:null}];serializeToString(this,c,a,b,h);return c.join("")}function needNamespaceDefine(a,b,c){b=a.prefix||"";a=a.namespaceURI;if(!b&&!a||"xml"===b&&"http://www.w3.org/XML/1998/namespace"===a||"http://www.w3.org/2000/xmlns/"==a)return!1;for(var d=c.length;d--;){var e=c[d];if(e.prefix==b)return e.namespace!=a}return!0}function serializeToString(a,b,c,d,e){if(d)if(a=d(a)){if("string"==typeof a){b.push(a);return}}else return;switch(a.nodeType){case ELEMENT_NODE:e||(e=[]);var f=a.attributes,h=f.length,g=a.firstChild,p=a.tagName;c=htmlns===a.namespaceURI||c;b.push("\x3c",p);for(var l=0;l<h;l++){var k=f.item(l);"xmlns"==k.prefix?e.push({prefix:k.localName,namespace:k.value}):"xmlns"==k.nodeName&&e.push({prefix:"",namespace:k.value})}for(l=0;l<h;l++){k=f.item(l);if(needNamespaceDefine(k,c,e)){var m=k.prefix||"",n=k.namespaceURI;b.push(m?" xmlns:"+m:" xmlns",'\x3d"',n,'"');e.push({prefix:m,namespace:n})}serializeToString(k,b,c,d,e)}needNamespaceDefine(a,c,e)&&(m=a.prefix||"",n=a.namespaceURI,b.push(m?" xmlns:"+m:" xmlns",'\x3d"',n,'"'),e.push({prefix:m,namespace:n}));if(g||c&&!/^(?:meta|link|img|br|hr|input)$/i.test(p)){b.push("\x3e");if(c&&/^script$/i.test(p))for(;g;)g.data?b.push(g.data):serializeToString(g,b,c,d,e),g=g.nextSibling;else for(;g;)serializeToString(g,b,c,d,e),g=g.nextSibling;b.push("\x3c/",p,"\x3e")}else b.push("/\x3e");break;case DOCUMENT_NODE:case DOCUMENT_FRAGMENT_NODE:for(g=a.firstChild;g;)serializeToString(g,b,c,d,e),g=g.nextSibling;break;case ATTRIBUTE_NODE:return b.push(" ",a.name,'\x3d"',a.value.replace(/[<&"]/g,_xmlEncoder),'"');case TEXT_NODE:return b.push(a.data.replace(/[<&]/g,_xmlEncoder));case CDATA_SECTION_NODE:return b.push("\x3c![CDATA[",a.data,"]]\x3e");case COMMENT_NODE:return b.push("\x3c!--",a.data,"--\x3e");case DOCUMENT_TYPE_NODE:c=a.publicId;d=a.systemId;b.push("\x3c!DOCTYPE ",a.name);c?(b.push(' PUBLIC "',c),d&&"."!=d&&b.push('" "',d),b.push('"\x3e')):d&&"."!=d?b.push(' SYSTEM "',d,'"\x3e'):((a=a.internalSubset)&&b.push(" [",a,"]"),b.push("\x3e"));break;case PROCESSING_INSTRUCTION_NODE:return b.push("\x3c?",a.target," ",a.data,"?\x3e");case ENTITY_REFERENCE_NODE:return b.push("\x26",a.nodeName,";");default:b.push("??",a.nodeName)}}function importNode(a,b,c){var d;switch(b.nodeType){case ELEMENT_NODE:d=b.cloneNode(!1),d.ownerDocument=a;case DOCUMENT_FRAGMENT_NODE:break;case ATTRIBUTE_NODE:c=!0}d||(d=b.cloneNode(!1));d.ownerDocument=a;d.parentNode=null;if(c)for(b=b.firstChild;b;)d.appendChild(importNode(a,b,c)),b=b.nextSibling;return d}function cloneNode(a,b,c){var d=new b.constructor,e;for(e in b){var f=b[e];"object"!=typeof f&&f!=d[e]&&(d[e]=f)}b.childNodes&&(d.childNodes=new NodeList);d.ownerDocument=a;switch(d.nodeType){case ELEMENT_NODE:e=b.attributes;var h=d.attributes=new NamedNodeMap,f=e.length;h._ownerElement=d;for(h=0;h<f;h++)d.setAttributeNode(cloneNode(a,e.item(h),!0));break;case ATTRIBUTE_NODE:c=!0}if(c)for(b=b.firstChild;b;)d.appendChild(cloneNode(a,b,c)),b=b.nextSibling;return d}function __set__(a,b,c){a[b]=c}try{if(Object.defineProperty){var getTextContent=function(a){switch(a.nodeType){case ELEMENT_NODE:case DOCUMENT_FRAGMENT_NODE:var b=[];for(a=a.firstChild;a;)7!==a.nodeType&&8!==a.nodeType&&b.push(getTextContent(a)),a=a.nextSibling;return b.join("");default:return a.nodeValue}};Object.defineProperty(LiveNodeList.prototype,"length",{get:function(){_updateLiveList(this);return this.$$length}});Object.defineProperty(Node.prototype,"textContent",{get:function(){return getTextContent(this)},set:function(a){switch(this.nodeType){case ELEMENT_NODE:case DOCUMENT_FRAGMENT_NODE:for(;this.firstChild;)this.removeChild(this.firstChild);(a||String(a))&&this.appendChild(this.ownerDocument.createTextNode(a));break;default:this.nodeValue=this.value=this.data=a}}});__set__=function(a,b,c){a["$$"+b]=c}}}catch(a){}exports.DOMImplementation=DOMImplementation;exports.XMLSerializer=XMLSerializer;