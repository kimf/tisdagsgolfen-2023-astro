(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/rails-ujs/lib/assets/compiled/rails-ujs.js
  var require_rails_ujs = __commonJS({
    "node_modules/rails-ujs/lib/assets/compiled/rails-ujs.js"(exports, module) {
      (function() {
        var context = this;
        (function() {
          (function() {
            this.Rails = {
              linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
              buttonClickSelector: {
                selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                exclude: "form button"
              },
              inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
              formSubmitSelector: "form",
              formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
              formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
              formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
              fileInputSelector: "input[name][type=file]:not([disabled])",
              linkDisableSelector: "a[data-disable-with], a[data-disable]",
              buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            };
          }).call(this);
        }).call(context);
        var Rails2 = context.Rails;
        (function() {
          (function() {
            var nonce;
            nonce = null;
            Rails2.loadCSPNonce = function() {
              var ref;
              return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
            };
            Rails2.cspNonce = function() {
              return nonce != null ? nonce : Rails2.loadCSPNonce();
            };
          }).call(this);
          (function() {
            var expando, m;
            m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
            Rails2.matches = function(element, selector) {
              if (selector.exclude != null) {
                return m.call(element, selector.selector) && !m.call(element, selector.exclude);
              } else {
                return m.call(element, selector);
              }
            };
            expando = "_ujsData";
            Rails2.getData = function(element, key) {
              var ref;
              return (ref = element[expando]) != null ? ref[key] : void 0;
            };
            Rails2.setData = function(element, key, value) {
              if (element[expando] == null) {
                element[expando] = {};
              }
              return element[expando][key] = value;
            };
            Rails2.$ = function(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector));
            };
          }).call(this);
          (function() {
            var $2, csrfParam, csrfToken;
            $2 = Rails2.$;
            csrfToken = Rails2.csrfToken = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-token]");
              return meta && meta.content;
            };
            csrfParam = Rails2.csrfParam = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-param]");
              return meta && meta.content;
            };
            Rails2.CSRFProtection = function(xhr) {
              var token;
              token = csrfToken();
              if (token != null) {
                return xhr.setRequestHeader("X-CSRF-Token", token);
              }
            };
            Rails2.refreshCSRFTokens = function() {
              var param, token;
              token = csrfToken();
              param = csrfParam();
              if (token != null && param != null) {
                return $2('form input[name="' + param + '"]').forEach(function(input) {
                  return input.value = token;
                });
              }
            };
          }).call(this);
          (function() {
            var CustomEvent, fire, matches, preventDefault;
            matches = Rails2.matches;
            CustomEvent = window.CustomEvent;
            if (typeof CustomEvent !== "function") {
              CustomEvent = function(event, params) {
                var evt;
                evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
              };
              CustomEvent.prototype = window.Event.prototype;
              preventDefault = CustomEvent.prototype.preventDefault;
              CustomEvent.prototype.preventDefault = function() {
                var result;
                result = preventDefault.call(this);
                if (this.cancelable && !this.defaultPrevented) {
                  Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                      return true;
                    }
                  });
                }
                return result;
              };
            }
            fire = Rails2.fire = function(obj, name, data) {
              var event;
              event = new CustomEvent(name, {
                bubbles: true,
                cancelable: true,
                detail: data
              });
              obj.dispatchEvent(event);
              return !event.defaultPrevented;
            };
            Rails2.stopEverything = function(e) {
              fire(e.target, "ujs:everythingStopped");
              e.preventDefault();
              e.stopPropagation();
              return e.stopImmediatePropagation();
            };
            Rails2.delegate = function(element, selector, eventType, handler) {
              return element.addEventListener(eventType, function(e) {
                var target;
                target = e.target;
                while (!(!(target instanceof Element) || matches(target, selector))) {
                  target = target.parentNode;
                }
                if (target instanceof Element && handler.call(target, e) === false) {
                  e.preventDefault();
                  return e.stopPropagation();
                }
              });
            };
          }).call(this);
          (function() {
            var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;
            cspNonce = Rails2.cspNonce, CSRFProtection = Rails2.CSRFProtection, fire = Rails2.fire;
            AcceptHeaders = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            };
            Rails2.ajax = function(options) {
              var xhr;
              options = prepareOptions(options);
              xhr = createXHR(options, function() {
                var ref, response;
                response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader("Content-Type"));
                if (Math.floor(xhr.status / 100) === 2) {
                  if (typeof options.success === "function") {
                    options.success(response, xhr.statusText, xhr);
                  }
                } else {
                  if (typeof options.error === "function") {
                    options.error(response, xhr.statusText, xhr);
                  }
                }
                return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
              });
              if (options.beforeSend != null && !options.beforeSend(xhr, options)) {
                return false;
              }
              if (xhr.readyState === XMLHttpRequest.OPENED) {
                return xhr.send(options.data);
              }
            };
            prepareOptions = function(options) {
              options.url = options.url || location.href;
              options.type = options.type.toUpperCase();
              if (options.type === "GET" && options.data) {
                if (options.url.indexOf("?") < 0) {
                  options.url += "?" + options.data;
                } else {
                  options.url += "&" + options.data;
                }
              }
              if (AcceptHeaders[options.dataType] == null) {
                options.dataType = "*";
              }
              options.accept = AcceptHeaders[options.dataType];
              if (options.dataType !== "*") {
                options.accept += ", */*; q=0.01";
              }
              return options;
            };
            createXHR = function(options, done) {
              var xhr;
              xhr = new XMLHttpRequest();
              xhr.open(options.type, options.url, true);
              xhr.setRequestHeader("Accept", options.accept);
              if (typeof options.data === "string") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
              }
              if (!options.crossDomain) {
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                CSRFProtection(xhr);
              }
              xhr.withCredentials = !!options.withCredentials;
              xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  return done(xhr);
                }
              };
              return xhr;
            };
            processResponse = function(response, type) {
              var parser, script;
              if (typeof response === "string" && typeof type === "string") {
                if (type.match(/\bjson\b/)) {
                  try {
                    response = JSON.parse(response);
                  } catch (error) {
                  }
                } else if (type.match(/\b(?:java|ecma)script\b/)) {
                  script = document.createElement("script");
                  script.setAttribute("nonce", cspNonce());
                  script.text = response;
                  document.head.appendChild(script).parentNode.removeChild(script);
                } else if (type.match(/\b(xml|html|svg)\b/)) {
                  parser = new DOMParser();
                  type = type.replace(/;.+/, "");
                  try {
                    response = parser.parseFromString(response, type);
                  } catch (error) {
                  }
                }
              }
              return response;
            };
            Rails2.href = function(element) {
              return element.href;
            };
            Rails2.isCrossDomain = function(url) {
              var e, originAnchor, urlAnchor;
              originAnchor = document.createElement("a");
              originAnchor.href = location.href;
              urlAnchor = document.createElement("a");
              try {
                urlAnchor.href = url;
                return !((!urlAnchor.protocol || urlAnchor.protocol === ":") && !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host === urlAnchor.protocol + "//" + urlAnchor.host);
              } catch (error) {
                e = error;
                return true;
              }
            };
          }).call(this);
          (function() {
            var matches, toArray;
            matches = Rails2.matches;
            toArray = function(e) {
              return Array.prototype.slice.call(e);
            };
            Rails2.serializeElement = function(element, additionalParam) {
              var inputs, params;
              inputs = [element];
              if (matches(element, "form")) {
                inputs = toArray(element.elements);
              }
              params = [];
              inputs.forEach(function(input) {
                if (!input.name || input.disabled) {
                  return;
                }
                if (matches(input, "select")) {
                  return toArray(input.options).forEach(function(option) {
                    if (option.selected) {
                      return params.push({
                        name: input.name,
                        value: option.value
                      });
                    }
                  });
                } else if (input.checked || ["radio", "checkbox", "submit"].indexOf(input.type) === -1) {
                  return params.push({
                    name: input.name,
                    value: input.value
                  });
                }
              });
              if (additionalParam) {
                params.push(additionalParam);
              }
              return params.map(function(param) {
                if (param.name != null) {
                  return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
                } else {
                  return param;
                }
              }).join("&");
            };
            Rails2.formElements = function(form, selector) {
              if (matches(form, "form")) {
                return toArray(form.elements).filter(function(el) {
                  return matches(el, selector);
                });
              } else {
                return toArray(form.querySelectorAll(selector));
              }
            };
          }).call(this);
          (function() {
            var allowAction, fire, stopEverything;
            fire = Rails2.fire, stopEverything = Rails2.stopEverything;
            Rails2.handleConfirm = function(e) {
              if (!allowAction(this)) {
                return stopEverything(e);
              }
            };
            allowAction = function(element) {
              var answer, callback, message;
              message = element.getAttribute("data-confirm");
              if (!message) {
                return true;
              }
              answer = false;
              if (fire(element, "confirm")) {
                try {
                  answer = confirm(message);
                } catch (error) {
                }
                callback = fire(element, "confirm:complete", [answer]);
              }
              return answer && callback;
            };
          }).call(this);
          (function() {
            var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, stopEverything = Rails2.stopEverything, formElements = Rails2.formElements;
            Rails2.handleDisabledElement = function(e) {
              var element;
              element = this;
              if (element.disabled) {
                return stopEverything(e);
              }
            };
            Rails2.enableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails2.linkDisableSelector)) {
                return enableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formEnableSelector)) {
                return enableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
                return enableFormElements(element);
              }
            };
            Rails2.disableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails2.linkDisableSelector)) {
                return disableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formDisableSelector)) {
                return disableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
                return disableFormElements(element);
              }
            };
            disableLinkElement = function(element) {
              var replacement;
              replacement = element.getAttribute("data-disable-with");
              if (replacement != null) {
                setData(element, "ujs:enable-with", element.innerHTML);
                element.innerHTML = replacement;
              }
              element.addEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", true);
            };
            enableLinkElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
              if (originalText != null) {
                element.innerHTML = originalText;
                setData(element, "ujs:enable-with", null);
              }
              element.removeEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", null);
            };
            disableFormElements = function(form) {
              return formElements(form, Rails2.formDisableSelector).forEach(disableFormElement);
            };
            disableFormElement = function(element) {
              var replacement;
              replacement = element.getAttribute("data-disable-with");
              if (replacement != null) {
                if (matches(element, "button")) {
                  setData(element, "ujs:enable-with", element.innerHTML);
                  element.innerHTML = replacement;
                } else {
                  setData(element, "ujs:enable-with", element.value);
                  element.value = replacement;
                }
              }
              element.disabled = true;
              return setData(element, "ujs:disabled", true);
            };
            enableFormElements = function(form) {
              return formElements(form, Rails2.formEnableSelector).forEach(enableFormElement);
            };
            enableFormElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
              if (originalText != null) {
                if (matches(element, "button")) {
                  element.innerHTML = originalText;
                } else {
                  element.value = originalText;
                }
                setData(element, "ujs:enable-with", null);
              }
              element.disabled = false;
              return setData(element, "ujs:disabled", null);
            };
          }).call(this);
          (function() {
            var stopEverything;
            stopEverything = Rails2.stopEverything;
            Rails2.handleMethod = function(e) {
              var csrfParam, csrfToken, form, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails2.href(link);
              csrfToken = Rails2.csrfToken();
              csrfParam = Rails2.csrfParam();
              form = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails2.isCrossDomain(href)) {
                formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
              }
              formContent += '<input type="submit" />';
              form.method = "post";
              form.action = href;
              form.target = link.target;
              form.innerHTML = formContent;
              form.style.display = "none";
              document.body.appendChild(form);
              form.querySelector('[type="submit"]').click();
              return stopEverything(e);
            };
          }).call(this);
          (function() {
            var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything, slice = [].slice;
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, fire = Rails2.fire, stopEverything = Rails2.stopEverything, ajax = Rails2.ajax, isCrossDomain = Rails2.isCrossDomain, serializeElement = Rails2.serializeElement;
            isRemote = function(element) {
              var value;
              value = element.getAttribute("data-remote");
              return value != null && value !== "false";
            };
            Rails2.handleRemote = function(e) {
              var button, data, dataType, element, method, url, withCredentials;
              element = this;
              if (!isRemote(element)) {
                return true;
              }
              if (!fire(element, "ajax:before")) {
                fire(element, "ajax:stopped");
                return false;
              }
              withCredentials = element.getAttribute("data-with-credentials");
              dataType = element.getAttribute("data-type") || "script";
              if (matches(element, Rails2.formSubmitSelector)) {
                button = getData(element, "ujs:submit-button");
                method = getData(element, "ujs:submit-button-formmethod") || element.method;
                url = getData(element, "ujs:submit-button-formaction") || element.getAttribute("action") || location.href;
                if (method.toUpperCase() === "GET") {
                  url = url.replace(/\?.*$/, "");
                }
                if (element.enctype === "multipart/form-data") {
                  data = new FormData(element);
                  if (button != null) {
                    data.append(button.name, button.value);
                  }
                } else {
                  data = serializeElement(element, button);
                }
                setData(element, "ujs:submit-button", null);
                setData(element, "ujs:submit-button-formmethod", null);
                setData(element, "ujs:submit-button-formaction", null);
              } else if (matches(element, Rails2.buttonClickSelector) || matches(element, Rails2.inputChangeSelector)) {
                method = element.getAttribute("data-method");
                url = element.getAttribute("data-url");
                data = serializeElement(element, element.getAttribute("data-params"));
              } else {
                method = element.getAttribute("data-method");
                url = Rails2.href(element);
                data = element.getAttribute("data-params");
              }
              ajax({
                type: method || "GET",
                url,
                data,
                dataType,
                beforeSend: function(xhr, options) {
                  if (fire(element, "ajax:beforeSend", [xhr, options])) {
                    return fire(element, "ajax:send", [xhr]);
                  } else {
                    fire(element, "ajax:stopped");
                    return false;
                  }
                },
                success: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:success", args);
                },
                error: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:error", args);
                },
                complete: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:complete", args);
                },
                crossDomain: isCrossDomain(url),
                withCredentials: withCredentials != null && withCredentials !== "false"
              });
              return stopEverything(e);
            };
            Rails2.formSubmitButtonClick = function(e) {
              var button, form;
              button = this;
              form = button.form;
              if (!form) {
                return;
              }
              if (button.name) {
                setData(form, "ujs:submit-button", {
                  name: button.name,
                  value: button.value
                });
              }
              setData(form, "ujs:formnovalidate-button", button.formNoValidate);
              setData(form, "ujs:submit-button-formaction", button.getAttribute("formaction"));
              return setData(form, "ujs:submit-button-formmethod", button.getAttribute("formmethod"));
            };
            Rails2.preventInsignificantClick = function(e) {
              var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
              link = this;
              method = (link.getAttribute("data-method") || "GET").toUpperCase();
              data = link.getAttribute("data-params");
              metaClick = e.metaKey || e.ctrlKey;
              insignificantMetaClick = metaClick && method === "GET" && !data;
              nonPrimaryMouseClick = e.button != null && e.button !== 0;
              if (nonPrimaryMouseClick || insignificantMetaClick) {
                return e.stopImmediatePropagation();
              }
            };
          }).call(this);
          (function() {
            var $2, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;
            fire = Rails2.fire, delegate = Rails2.delegate, getData = Rails2.getData, $2 = Rails2.$, refreshCSRFTokens = Rails2.refreshCSRFTokens, CSRFProtection = Rails2.CSRFProtection, loadCSPNonce = Rails2.loadCSPNonce, enableElement = Rails2.enableElement, disableElement = Rails2.disableElement, handleDisabledElement = Rails2.handleDisabledElement, handleConfirm = Rails2.handleConfirm, preventInsignificantClick = Rails2.preventInsignificantClick, handleRemote = Rails2.handleRemote, formSubmitButtonClick = Rails2.formSubmitButtonClick, handleMethod = Rails2.handleMethod;
            if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
              if (jQuery.rails) {
                throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
              }
              jQuery.rails = Rails2;
              jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
                if (!options.crossDomain) {
                  return CSRFProtection(xhr);
                }
              });
            }
            Rails2.start = function() {
              if (window._rails_loaded) {
                throw new Error("rails-ujs has already been loaded!");
              }
              window.addEventListener("pageshow", function() {
                $2(Rails2.formEnableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
                return $2(Rails2.linkDisableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
              });
              delegate(document, Rails2.linkDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.linkDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.linkClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.linkClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.linkClickSelector, "click", handleConfirm);
              delegate(document, Rails2.linkClickSelector, "click", disableElement);
              delegate(document, Rails2.linkClickSelector, "click", handleRemote);
              delegate(document, Rails2.linkClickSelector, "click", handleMethod);
              delegate(document, Rails2.buttonClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.buttonClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleConfirm);
              delegate(document, Rails2.buttonClickSelector, "click", disableElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleRemote);
              delegate(document, Rails2.inputChangeSelector, "change", handleDisabledElement);
              delegate(document, Rails2.inputChangeSelector, "change", handleConfirm);
              delegate(document, Rails2.inputChangeSelector, "change", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", handleDisabledElement);
              delegate(document, Rails2.formSubmitSelector, "submit", handleConfirm);
              delegate(document, Rails2.formSubmitSelector, "submit", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", function(e) {
                return setTimeout(function() {
                  return disableElement(e);
                }, 13);
              });
              delegate(document, Rails2.formSubmitSelector, "ajax:send", disableElement);
              delegate(document, Rails2.formSubmitSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.formInputClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.formInputClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.formInputClickSelector, "click", handleConfirm);
              delegate(document, Rails2.formInputClickSelector, "click", formSubmitButtonClick);
              document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
              document.addEventListener("DOMContentLoaded", loadCSPNonce);
              return window._rails_loaded = true;
            };
            if (window.Rails === Rails2 && fire(document, "rails:attachBindings")) {
              Rails2.start();
            }
          }).call(this);
        }).call(this);
        if (typeof module === "object" && module.exports) {
          module.exports = Rails2;
        } else if (typeof define === "function" && define.amd) {
          define(Rails2);
        }
      }).call(exports);
    }
  });

  // node_modules/@rails/actioncable/app/assets/javascripts/action_cable.js
  var require_action_cable = __commonJS({
    "node_modules/@rails/actioncable/app/assets/javascripts/action_cable.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.ActionCable = {});
      })(exports, function(exports2) {
        "use strict";
        var adapters = {
          logger: self.console,
          WebSocket: self.WebSocket
        };
        var logger = {
          log: function log() {
            if (this.enabled) {
              var _adapters$logger;
              for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
                messages[_key] = arguments[_key];
              }
              messages.push(Date.now());
              (_adapters$logger = adapters.logger).log.apply(_adapters$logger, ["[ActionCable]"].concat(messages));
            }
          }
        };
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var classCallCheck = function(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
        var createClass = function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps)
              defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();
        var now = function now2() {
          return new Date().getTime();
        };
        var secondsSince = function secondsSince2(time) {
          return (now() - time) / 1e3;
        };
        var clamp = function clamp2(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };
        var ConnectionMonitor = function() {
          function ConnectionMonitor2(connection) {
            classCallCheck(this, ConnectionMonitor2);
            this.visibilityDidChange = this.visibilityDidChange.bind(this);
            this.connection = connection;
            this.reconnectAttempts = 0;
          }
          ConnectionMonitor2.prototype.start = function start() {
            if (!this.isRunning()) {
              this.startedAt = now();
              delete this.stoppedAt;
              this.startPolling();
              addEventListener("visibilitychange", this.visibilityDidChange);
              logger.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms");
            }
          };
          ConnectionMonitor2.prototype.stop = function stop() {
            if (this.isRunning()) {
              this.stoppedAt = now();
              this.stopPolling();
              removeEventListener("visibilitychange", this.visibilityDidChange);
              logger.log("ConnectionMonitor stopped");
            }
          };
          ConnectionMonitor2.prototype.isRunning = function isRunning() {
            return this.startedAt && !this.stoppedAt;
          };
          ConnectionMonitor2.prototype.recordPing = function recordPing() {
            this.pingedAt = now();
          };
          ConnectionMonitor2.prototype.recordConnect = function recordConnect() {
            this.reconnectAttempts = 0;
            this.recordPing();
            delete this.disconnectedAt;
            logger.log("ConnectionMonitor recorded connect");
          };
          ConnectionMonitor2.prototype.recordDisconnect = function recordDisconnect() {
            this.disconnectedAt = now();
            logger.log("ConnectionMonitor recorded disconnect");
          };
          ConnectionMonitor2.prototype.startPolling = function startPolling() {
            this.stopPolling();
            this.poll();
          };
          ConnectionMonitor2.prototype.stopPolling = function stopPolling() {
            clearTimeout(this.pollTimeout);
          };
          ConnectionMonitor2.prototype.poll = function poll() {
            var _this = this;
            this.pollTimeout = setTimeout(function() {
              _this.reconnectIfStale();
              _this.poll();
            }, this.getPollInterval());
          };
          ConnectionMonitor2.prototype.getPollInterval = function getPollInterval() {
            var _constructor$pollInte = this.constructor.pollInterval, min = _constructor$pollInte.min, max = _constructor$pollInte.max, multiplier = _constructor$pollInte.multiplier;
            var interval = multiplier * Math.log(this.reconnectAttempts + 1);
            return Math.round(clamp(interval, min, max) * 1e3);
          };
          ConnectionMonitor2.prototype.reconnectIfStale = function reconnectIfStale() {
            if (this.connectionIsStale()) {
              logger.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + secondsSince(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
              this.reconnectAttempts++;
              if (this.disconnectedRecently()) {
                logger.log("ConnectionMonitor skipping reopening recent disconnect");
              } else {
                logger.log("ConnectionMonitor reopening");
                this.connection.reopen();
              }
            }
          };
          ConnectionMonitor2.prototype.connectionIsStale = function connectionIsStale() {
            return secondsSince(this.pingedAt ? this.pingedAt : this.startedAt) > this.constructor.staleThreshold;
          };
          ConnectionMonitor2.prototype.disconnectedRecently = function disconnectedRecently() {
            return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
          };
          ConnectionMonitor2.prototype.visibilityDidChange = function visibilityDidChange() {
            var _this2 = this;
            if (document.visibilityState === "visible") {
              setTimeout(function() {
                if (_this2.connectionIsStale() || !_this2.connection.isOpen()) {
                  logger.log("ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = " + document.visibilityState);
                  _this2.connection.reopen();
                }
              }, 200);
            }
          };
          return ConnectionMonitor2;
        }();
        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30,
          multiplier: 5
        };
        ConnectionMonitor.staleThreshold = 6;
        var INTERNAL = {
          message_types: {
            welcome: "welcome",
            disconnect: "disconnect",
            ping: "ping",
            confirmation: "confirm_subscription",
            rejection: "reject_subscription"
          },
          disconnect_reasons: {
            unauthorized: "unauthorized",
            invalid_request: "invalid_request",
            server_restart: "server_restart"
          },
          default_mount_path: "/cable",
          protocols: ["actioncable-v1-json", "actioncable-unsupported"]
        };
        var message_types = INTERNAL.message_types, protocols = INTERNAL.protocols;
        var supportedProtocols = protocols.slice(0, protocols.length - 1);
        var indexOf = [].indexOf;
        var Connection = function() {
          function Connection2(consumer) {
            classCallCheck(this, Connection2);
            this.open = this.open.bind(this);
            this.consumer = consumer;
            this.subscriptions = this.consumer.subscriptions;
            this.monitor = new ConnectionMonitor(this);
            this.disconnected = true;
          }
          Connection2.prototype.send = function send(data) {
            if (this.isOpen()) {
              this.webSocket.send(JSON.stringify(data));
              return true;
            } else {
              return false;
            }
          };
          Connection2.prototype.open = function open() {
            if (this.isActive()) {
              logger.log("Attempted to open WebSocket, but existing socket is " + this.getState());
              return false;
            } else {
              logger.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + protocols);
              if (this.webSocket) {
                this.uninstallEventHandlers();
              }
              this.webSocket = new adapters.WebSocket(this.consumer.url, protocols);
              this.installEventHandlers();
              this.monitor.start();
              return true;
            }
          };
          Connection2.prototype.close = function close() {
            var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
              allowReconnect: true
            }, allowReconnect = _ref.allowReconnect;
            if (!allowReconnect) {
              this.monitor.stop();
            }
            if (this.isActive()) {
              return this.webSocket.close();
            }
          };
          Connection2.prototype.reopen = function reopen() {
            logger.log("Reopening WebSocket, current state is " + this.getState());
            if (this.isActive()) {
              try {
                return this.close();
              } catch (error) {
                logger.log("Failed to reopen WebSocket", error);
              } finally {
                logger.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
                setTimeout(this.open, this.constructor.reopenDelay);
              }
            } else {
              return this.open();
            }
          };
          Connection2.prototype.getProtocol = function getProtocol() {
            if (this.webSocket) {
              return this.webSocket.protocol;
            }
          };
          Connection2.prototype.isOpen = function isOpen() {
            return this.isState("open");
          };
          Connection2.prototype.isActive = function isActive() {
            return this.isState("open", "connecting");
          };
          Connection2.prototype.isProtocolSupported = function isProtocolSupported() {
            return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
          };
          Connection2.prototype.isState = function isState() {
            for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
              states[_key] = arguments[_key];
            }
            return indexOf.call(states, this.getState()) >= 0;
          };
          Connection2.prototype.getState = function getState() {
            if (this.webSocket) {
              for (var state in adapters.WebSocket) {
                if (adapters.WebSocket[state] === this.webSocket.readyState) {
                  return state.toLowerCase();
                }
              }
            }
            return null;
          };
          Connection2.prototype.installEventHandlers = function installEventHandlers() {
            for (var eventName in this.events) {
              var handler = this.events[eventName].bind(this);
              this.webSocket["on" + eventName] = handler;
            }
          };
          Connection2.prototype.uninstallEventHandlers = function uninstallEventHandlers() {
            for (var eventName in this.events) {
              this.webSocket["on" + eventName] = function() {
              };
            }
          };
          return Connection2;
        }();
        Connection.reopenDelay = 500;
        Connection.prototype.events = {
          message: function message(event) {
            if (!this.isProtocolSupported()) {
              return;
            }
            var _JSON$parse = JSON.parse(event.data), identifier = _JSON$parse.identifier, message2 = _JSON$parse.message, reason = _JSON$parse.reason, reconnect = _JSON$parse.reconnect, type = _JSON$parse.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.disconnect:
                logger.log("Disconnecting. Reason: " + reason);
                return this.close({
                  allowReconnect: reconnect
                });
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                this.subscriptions.confirmSubscription(identifier);
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message2);
            }
          },
          open: function open() {
            logger.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function close(event) {
            logger.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function error() {
            logger.log("WebSocket onerror event");
          }
        };
        var extend = function extend2(object, properties) {
          if (properties != null) {
            for (var key in properties) {
              var value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };
        var Subscription = function() {
          function Subscription2(consumer) {
            var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            var mixin = arguments[2];
            classCallCheck(this, Subscription2);
            this.consumer = consumer;
            this.identifier = JSON.stringify(params);
            extend(this, mixin);
          }
          Subscription2.prototype.perform = function perform(action) {
            var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            data.action = action;
            return this.send(data);
          };
          Subscription2.prototype.send = function send(data) {
            return this.consumer.send({
              command: "message",
              identifier: this.identifier,
              data: JSON.stringify(data)
            });
          };
          Subscription2.prototype.unsubscribe = function unsubscribe() {
            return this.consumer.subscriptions.remove(this);
          };
          return Subscription2;
        }();
        var SubscriptionGuarantor = function() {
          function SubscriptionGuarantor2(subscriptions) {
            classCallCheck(this, SubscriptionGuarantor2);
            this.subscriptions = subscriptions;
            this.pendingSubscriptions = [];
          }
          SubscriptionGuarantor2.prototype.guarantee = function guarantee(subscription) {
            if (this.pendingSubscriptions.indexOf(subscription) == -1) {
              logger.log("SubscriptionGuarantor guaranteeing " + subscription.identifier);
              this.pendingSubscriptions.push(subscription);
            } else {
              logger.log("SubscriptionGuarantor already guaranteeing " + subscription.identifier);
            }
            this.startGuaranteeing();
          };
          SubscriptionGuarantor2.prototype.forget = function forget(subscription) {
            logger.log("SubscriptionGuarantor forgetting " + subscription.identifier);
            this.pendingSubscriptions = this.pendingSubscriptions.filter(function(s) {
              return s !== subscription;
            });
          };
          SubscriptionGuarantor2.prototype.startGuaranteeing = function startGuaranteeing() {
            this.stopGuaranteeing();
            this.retrySubscribing();
          };
          SubscriptionGuarantor2.prototype.stopGuaranteeing = function stopGuaranteeing() {
            clearTimeout(this.retryTimeout);
          };
          SubscriptionGuarantor2.prototype.retrySubscribing = function retrySubscribing() {
            var _this = this;
            this.retryTimeout = setTimeout(function() {
              if (_this.subscriptions && typeof _this.subscriptions.subscribe === "function") {
                _this.pendingSubscriptions.map(function(subscription) {
                  logger.log("SubscriptionGuarantor resubscribing " + subscription.identifier);
                  _this.subscriptions.subscribe(subscription);
                });
              }
            }, 500);
          };
          return SubscriptionGuarantor2;
        }();
        var Subscriptions = function() {
          function Subscriptions2(consumer) {
            classCallCheck(this, Subscriptions2);
            this.consumer = consumer;
            this.guarantor = new SubscriptionGuarantor(this);
            this.subscriptions = [];
          }
          Subscriptions2.prototype.create = function create(channelName, mixin) {
            var channel = channelName;
            var params = (typeof channel === "undefined" ? "undefined" : _typeof(channel)) === "object" ? channel : {
              channel
            };
            var subscription = new Subscription(this.consumer, params, mixin);
            return this.add(subscription);
          };
          Subscriptions2.prototype.add = function add(subscription) {
            this.subscriptions.push(subscription);
            this.consumer.ensureActiveConnection();
            this.notify(subscription, "initialized");
            this.subscribe(subscription);
            return subscription;
          };
          Subscriptions2.prototype.remove = function remove(subscription) {
            this.forget(subscription);
            if (!this.findAll(subscription.identifier).length) {
              this.sendCommand(subscription, "unsubscribe");
            }
            return subscription;
          };
          Subscriptions2.prototype.reject = function reject(identifier) {
            var _this = this;
            return this.findAll(identifier).map(function(subscription) {
              _this.forget(subscription);
              _this.notify(subscription, "rejected");
              return subscription;
            });
          };
          Subscriptions2.prototype.forget = function forget(subscription) {
            this.guarantor.forget(subscription);
            this.subscriptions = this.subscriptions.filter(function(s) {
              return s !== subscription;
            });
            return subscription;
          };
          Subscriptions2.prototype.findAll = function findAll(identifier) {
            return this.subscriptions.filter(function(s) {
              return s.identifier === identifier;
            });
          };
          Subscriptions2.prototype.reload = function reload() {
            var _this2 = this;
            return this.subscriptions.map(function(subscription) {
              return _this2.subscribe(subscription);
            });
          };
          Subscriptions2.prototype.notifyAll = function notifyAll(callbackName) {
            var _this3 = this;
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            return this.subscriptions.map(function(subscription) {
              return _this3.notify.apply(_this3, [subscription, callbackName].concat(args));
            });
          };
          Subscriptions2.prototype.notify = function notify(subscription, callbackName) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }
            var subscriptions = void 0;
            if (typeof subscription === "string") {
              subscriptions = this.findAll(subscription);
            } else {
              subscriptions = [subscription];
            }
            return subscriptions.map(function(subscription2) {
              return typeof subscription2[callbackName] === "function" ? subscription2[callbackName].apply(subscription2, args) : void 0;
            });
          };
          Subscriptions2.prototype.subscribe = function subscribe(subscription) {
            if (this.sendCommand(subscription, "subscribe")) {
              this.guarantor.guarantee(subscription);
            }
          };
          Subscriptions2.prototype.confirmSubscription = function confirmSubscription(identifier) {
            var _this4 = this;
            logger.log("Subscription confirmed " + identifier);
            this.findAll(identifier).map(function(subscription) {
              return _this4.guarantor.forget(subscription);
            });
          };
          Subscriptions2.prototype.sendCommand = function sendCommand(subscription, command) {
            var identifier = subscription.identifier;
            return this.consumer.send({
              command,
              identifier
            });
          };
          return Subscriptions2;
        }();
        var Consumer = function() {
          function Consumer2(url) {
            classCallCheck(this, Consumer2);
            this._url = url;
            this.subscriptions = new Subscriptions(this);
            this.connection = new Connection(this);
          }
          Consumer2.prototype.send = function send(data) {
            return this.connection.send(data);
          };
          Consumer2.prototype.connect = function connect() {
            return this.connection.open();
          };
          Consumer2.prototype.disconnect = function disconnect() {
            return this.connection.close({
              allowReconnect: false
            });
          };
          Consumer2.prototype.ensureActiveConnection = function ensureActiveConnection() {
            if (!this.connection.isActive()) {
              return this.connection.open();
            }
          };
          createClass(Consumer2, [{
            key: "url",
            get: function get$$1() {
              return createWebSocketURL(this._url);
            }
          }]);
          return Consumer2;
        }();
        function createWebSocketURL(url) {
          if (typeof url === "function") {
            url = url();
          }
          if (url && !/^wss?:/i.test(url)) {
            var a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        }
        function createConsumer2() {
          var url = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getConfig("url") || INTERNAL.default_mount_path;
          return new Consumer(url);
        }
        function getConfig(name) {
          var element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          if (element) {
            return element.getAttribute("content");
          }
        }
        exports2.Connection = Connection;
        exports2.ConnectionMonitor = ConnectionMonitor;
        exports2.Consumer = Consumer;
        exports2.INTERNAL = INTERNAL;
        exports2.Subscription = Subscription;
        exports2.Subscriptions = Subscriptions;
        exports2.SubscriptionGuarantor = SubscriptionGuarantor;
        exports2.adapters = adapters;
        exports2.createWebSocketURL = createWebSocketURL;
        exports2.logger = logger;
        exports2.createConsumer = createConsumer2;
        exports2.getConfig = getConfig;
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
      });
    }
  });

  // node_modules/turbolinks/dist/turbolinks.js
  var require_turbolinks = __commonJS({
    "node_modules/turbolinks/dist/turbolinks.js"(exports, module) {
      (function() {
        var t = this;
        (function() {
          (function() {
            this.Turbolinks = { supported: function() {
              return null != window.history.pushState && null != window.requestAnimationFrame && null != window.addEventListener;
            }(), visit: function(t2, r) {
              return e.controller.visit(t2, r);
            }, clearCache: function() {
              return e.controller.clearCache();
            }, setProgressBarDelay: function(t2) {
              return e.controller.setProgressBarDelay(t2);
            } };
          }).call(this);
        }).call(t);
        var e = t.Turbolinks;
        (function() {
          (function() {
            var t2, r, n, o = [].slice;
            e.copyObject = function(t3) {
              var e2, r2, n2;
              r2 = {};
              for (e2 in t3)
                n2 = t3[e2], r2[e2] = n2;
              return r2;
            }, e.closest = function(e2, r2) {
              return t2.call(e2, r2);
            }, t2 = function() {
              var t3, e2;
              return t3 = document.documentElement, null != (e2 = t3.closest) ? e2 : function(t4) {
                var e3;
                for (e3 = this; e3; ) {
                  if (e3.nodeType === Node.ELEMENT_NODE && r.call(e3, t4))
                    return e3;
                  e3 = e3.parentNode;
                }
              };
            }(), e.defer = function(t3) {
              return setTimeout(t3, 1);
            }, e.throttle = function(t3) {
              var e2;
              return e2 = null, function() {
                var r2;
                return r2 = 1 <= arguments.length ? o.call(arguments, 0) : [], null != e2 ? e2 : e2 = requestAnimationFrame(function(n2) {
                  return function() {
                    return e2 = null, t3.apply(n2, r2);
                  };
                }(this));
              };
            }, e.dispatch = function(t3, e2) {
              var r2, o2, i, s, a, u;
              return a = null != e2 ? e2 : {}, u = a.target, r2 = a.cancelable, o2 = a.data, i = document.createEvent("Events"), i.initEvent(t3, true, r2 === true), i.data = null != o2 ? o2 : {}, i.cancelable && !n && (s = i.preventDefault, i.preventDefault = function() {
                return this.defaultPrevented || Object.defineProperty(this, "defaultPrevented", { get: function() {
                  return true;
                } }), s.call(this);
              }), (null != u ? u : document).dispatchEvent(i), i;
            }, n = function() {
              var t3;
              return t3 = document.createEvent("Events"), t3.initEvent("test", true, true), t3.preventDefault(), t3.defaultPrevented;
            }(), e.match = function(t3, e2) {
              return r.call(t3, e2);
            }, r = function() {
              var t3, e2, r2, n2;
              return t3 = document.documentElement, null != (e2 = null != (r2 = null != (n2 = t3.matchesSelector) ? n2 : t3.webkitMatchesSelector) ? r2 : t3.msMatchesSelector) ? e2 : t3.mozMatchesSelector;
            }(), e.uuid = function() {
              var t3, e2, r2;
              for (r2 = "", t3 = e2 = 1; 36 >= e2; t3 = ++e2)
                r2 += 9 === t3 || 14 === t3 || 19 === t3 || 24 === t3 ? "-" : 15 === t3 ? "4" : 20 === t3 ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
              return r2;
            };
          }).call(this), function() {
            e.Location = function() {
              function t2(t3) {
                var e3, r2;
                null == t3 && (t3 = ""), r2 = document.createElement("a"), r2.href = t3.toString(), this.absoluteURL = r2.href, e3 = r2.hash.length, 2 > e3 ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e3), this.anchor = r2.hash.slice(1));
              }
              var e2, r, n, o;
              return t2.wrap = function(t3) {
                return t3 instanceof this ? t3 : new this(t3);
              }, t2.prototype.getOrigin = function() {
                return this.absoluteURL.split("/", 3).join("/");
              }, t2.prototype.getPath = function() {
                var t3, e3;
                return null != (t3 = null != (e3 = this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e3[1] : void 0) ? t3 : "/";
              }, t2.prototype.getPathComponents = function() {
                return this.getPath().split("/").slice(1);
              }, t2.prototype.getLastPathComponent = function() {
                return this.getPathComponents().slice(-1)[0];
              }, t2.prototype.getExtension = function() {
                var t3, e3;
                return null != (t3 = null != (e3 = this.getLastPathComponent().match(/\.[^.]*$/)) ? e3[0] : void 0) ? t3 : "";
              }, t2.prototype.isHTML = function() {
                return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/);
              }, t2.prototype.isPrefixedBy = function(t3) {
                var e3;
                return e3 = r(t3), this.isEqualTo(t3) || o(this.absoluteURL, e3);
              }, t2.prototype.isEqualTo = function(t3) {
                return this.absoluteURL === (null != t3 ? t3.absoluteURL : void 0);
              }, t2.prototype.toCacheKey = function() {
                return this.requestURL;
              }, t2.prototype.toJSON = function() {
                return this.absoluteURL;
              }, t2.prototype.toString = function() {
                return this.absoluteURL;
              }, t2.prototype.valueOf = function() {
                return this.absoluteURL;
              }, r = function(t3) {
                return e2(t3.getOrigin() + t3.getPath());
              }, e2 = function(t3) {
                return n(t3, "/") ? t3 : t3 + "/";
              }, o = function(t3, e3) {
                return t3.slice(0, e3.length) === e3;
              }, n = function(t3, e3) {
                return t3.slice(-e3.length) === e3;
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.HttpRequest = function() {
              function r(r2, n, o) {
                this.delegate = r2, this.requestCanceled = t2(this.requestCanceled, this), this.requestTimedOut = t2(this.requestTimedOut, this), this.requestFailed = t2(this.requestFailed, this), this.requestLoaded = t2(this.requestLoaded, this), this.requestProgressed = t2(this.requestProgressed, this), this.url = e.Location.wrap(n).requestURL, this.referrer = e.Location.wrap(o).absoluteURL, this.createXHR();
              }
              return r.NETWORK_FAILURE = 0, r.TIMEOUT_FAILURE = -1, r.timeout = 60, r.prototype.send = function() {
                var t3;
                return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = true, "function" == typeof (t3 = this.delegate).requestStarted ? t3.requestStarted() : void 0) : void 0;
              }, r.prototype.cancel = function() {
                return this.xhr && this.sent ? this.xhr.abort() : void 0;
              }, r.prototype.requestProgressed = function(t3) {
                return t3.lengthComputable ? this.setProgress(t3.loaded / t3.total) : void 0;
              }, r.prototype.requestLoaded = function() {
                return this.endRequest(function(t3) {
                  return function() {
                    var e2;
                    return 200 <= (e2 = t3.xhr.status) && 300 > e2 ? t3.delegate.requestCompletedWithResponse(t3.xhr.responseText, t3.xhr.getResponseHeader("Turbolinks-Location")) : (t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.xhr.status, t3.xhr.responseText));
                  };
                }(this));
              }, r.prototype.requestFailed = function() {
                return this.endRequest(function(t3) {
                  return function() {
                    return t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.constructor.NETWORK_FAILURE);
                  };
                }(this));
              }, r.prototype.requestTimedOut = function() {
                return this.endRequest(function(t3) {
                  return function() {
                    return t3.failed = true, t3.delegate.requestFailedWithStatusCode(t3.constructor.TIMEOUT_FAILURE);
                  };
                }(this));
              }, r.prototype.requestCanceled = function() {
                return this.endRequest();
              }, r.prototype.notifyApplicationBeforeRequestStart = function() {
                return e.dispatch("turbolinks:request-start", { data: { url: this.url, xhr: this.xhr } });
              }, r.prototype.notifyApplicationAfterRequestEnd = function() {
                return e.dispatch("turbolinks:request-end", { data: { url: this.url, xhr: this.xhr } });
              }, r.prototype.createXHR = function() {
                return this.xhr = new XMLHttpRequest(), this.xhr.open("GET", this.url, true), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled;
              }, r.prototype.endRequest = function(t3) {
                return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t3 && t3.call(this), this.destroy()) : void 0;
              }, r.prototype.setProgress = function(t3) {
                var e2;
                return this.progress = t3, "function" == typeof (e2 = this.delegate).requestProgressed ? e2.requestProgressed(this.progress) : void 0;
              }, r.prototype.destroy = function() {
                var t3;
                return this.setProgress(1), "function" == typeof (t3 = this.delegate).requestFinished && t3.requestFinished(), this.delegate = null, this.xhr = null;
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.ProgressBar = function() {
              function e2() {
                this.trickle = t2(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement();
              }
              var r;
              return r = 300, e2.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + r + "ms ease-out, opacity " + r / 2 + "ms " + r / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", e2.prototype.show = function() {
                return this.visible ? void 0 : (this.visible = true, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling());
              }, e2.prototype.hide = function() {
                return this.visible && !this.hiding ? (this.hiding = true, this.fadeProgressElement(function(t3) {
                  return function() {
                    return t3.uninstallProgressElement(), t3.stopTrickling(), t3.visible = false, t3.hiding = false;
                  };
                }(this))) : void 0;
              }, e2.prototype.setValue = function(t3) {
                return this.value = t3, this.refresh();
              }, e2.prototype.installStylesheetElement = function() {
                return document.head.insertBefore(this.stylesheetElement, document.head.firstChild);
              }, e2.prototype.installProgressElement = function() {
                return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh();
              }, e2.prototype.fadeProgressElement = function(t3) {
                return this.progressElement.style.opacity = 0, setTimeout(t3, 1.5 * r);
              }, e2.prototype.uninstallProgressElement = function() {
                return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0;
              }, e2.prototype.startTrickling = function() {
                return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, r);
              }, e2.prototype.stopTrickling = function() {
                return clearInterval(this.trickleInterval), this.trickleInterval = null;
              }, e2.prototype.trickle = function() {
                return this.setValue(this.value + Math.random() / 100);
              }, e2.prototype.refresh = function() {
                return requestAnimationFrame(function(t3) {
                  return function() {
                    return t3.progressElement.style.width = 10 + 90 * t3.value + "%";
                  };
                }(this));
              }, e2.prototype.createStylesheetElement = function() {
                var t3;
                return t3 = document.createElement("style"), t3.type = "text/css", t3.textContent = this.constructor.defaultCSS, t3;
              }, e2.prototype.createProgressElement = function() {
                var t3;
                return t3 = document.createElement("div"), t3.className = "turbolinks-progress-bar", t3;
              }, e2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.BrowserAdapter = function() {
              function r(r2) {
                this.controller = r2, this.showProgressBar = t2(this.showProgressBar, this), this.progressBar = new e.ProgressBar();
              }
              var n, o, i;
              return i = e.HttpRequest, n = i.NETWORK_FAILURE, o = i.TIMEOUT_FAILURE, r.prototype.visitProposedToLocationWithAction = function(t3, e2) {
                return this.controller.startVisitToLocationWithAction(t3, e2);
              }, r.prototype.visitStarted = function(t3) {
                return t3.issueRequest(), t3.changeHistory(), t3.loadCachedSnapshot();
              }, r.prototype.visitRequestStarted = function(t3) {
                return this.progressBar.setValue(0), t3.hasCachedSnapshot() || "restore" !== t3.action ? this.showProgressBarAfterDelay() : this.showProgressBar();
              }, r.prototype.visitRequestProgressed = function(t3) {
                return this.progressBar.setValue(t3.progress);
              }, r.prototype.visitRequestCompleted = function(t3) {
                return t3.loadResponse();
              }, r.prototype.visitRequestFailedWithStatusCode = function(t3, e2) {
                switch (e2) {
                  case n:
                  case o:
                    return this.reload();
                  default:
                    return t3.loadResponse();
                }
              }, r.prototype.visitRequestFinished = function(t3) {
                return this.hideProgressBar();
              }, r.prototype.visitCompleted = function(t3) {
                return t3.followRedirect();
              }, r.prototype.pageInvalidated = function() {
                return this.reload();
              }, r.prototype.showProgressBarAfterDelay = function() {
                return this.progressBarTimeout = setTimeout(this.showProgressBar, this.controller.progressBarDelay);
              }, r.prototype.showProgressBar = function() {
                return this.progressBar.show();
              }, r.prototype.hideProgressBar = function() {
                return this.progressBar.hide(), clearTimeout(this.progressBarTimeout);
              }, r.prototype.reload = function() {
                return window.location.reload();
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.History = function() {
              function r(e2) {
                this.delegate = e2, this.onPageLoad = t2(this.onPageLoad, this), this.onPopState = t2(this.onPopState, this);
              }
              return r.prototype.start = function() {
                return this.started ? void 0 : (addEventListener("popstate", this.onPopState, false), addEventListener("load", this.onPageLoad, false), this.started = true);
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("popstate", this.onPopState, false), removeEventListener("load", this.onPageLoad, false), this.started = false) : void 0;
              }, r.prototype.push = function(t3, r2) {
                return t3 = e.Location.wrap(t3), this.update("push", t3, r2);
              }, r.prototype.replace = function(t3, r2) {
                return t3 = e.Location.wrap(t3), this.update("replace", t3, r2);
              }, r.prototype.onPopState = function(t3) {
                var r2, n, o, i;
                return this.shouldHandlePopState() && (i = null != (n = t3.state) ? n.turbolinks : void 0) ? (r2 = e.Location.wrap(window.location), o = i.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(r2, o)) : void 0;
              }, r.prototype.onPageLoad = function(t3) {
                return e.defer(function(t4) {
                  return function() {
                    return t4.pageLoaded = true;
                  };
                }(this));
              }, r.prototype.shouldHandlePopState = function() {
                return this.pageIsLoaded();
              }, r.prototype.pageIsLoaded = function() {
                return this.pageLoaded || "complete" === document.readyState;
              }, r.prototype.update = function(t3, e2, r2) {
                var n;
                return n = { turbolinks: { restorationIdentifier: r2 } }, history[t3 + "State"](n, null, e2);
              }, r;
            }();
          }.call(this), function() {
            e.HeadDetails = function() {
              function t2(t3) {
                var e3, r2, n2, s, a, u;
                for (this.elements = {}, n2 = 0, a = t3.length; a > n2; n2++)
                  u = t3[n2], u.nodeType === Node.ELEMENT_NODE && (s = u.outerHTML, r2 = null != (e3 = this.elements)[s] ? e3[s] : e3[s] = { type: i(u), tracked: o(u), elements: [] }, r2.elements.push(u));
              }
              var e2, r, n, o, i;
              return t2.fromHeadElement = function(t3) {
                var e3;
                return new this(null != (e3 = null != t3 ? t3.childNodes : void 0) ? e3 : []);
              }, t2.prototype.hasElementWithKey = function(t3) {
                return t3 in this.elements;
              }, t2.prototype.getTrackedElementSignature = function() {
                var t3, e3;
                return function() {
                  var r2, n2;
                  r2 = this.elements, n2 = [];
                  for (t3 in r2)
                    e3 = r2[t3].tracked, e3 && n2.push(t3);
                  return n2;
                }.call(this).join("");
              }, t2.prototype.getScriptElementsNotInDetails = function(t3) {
                return this.getElementsMatchingTypeNotInDetails("script", t3);
              }, t2.prototype.getStylesheetElementsNotInDetails = function(t3) {
                return this.getElementsMatchingTypeNotInDetails("stylesheet", t3);
              }, t2.prototype.getElementsMatchingTypeNotInDetails = function(t3, e3) {
                var r2, n2, o2, i2, s, a;
                o2 = this.elements, s = [];
                for (n2 in o2)
                  i2 = o2[n2], a = i2.type, r2 = i2.elements, a !== t3 || e3.hasElementWithKey(n2) || s.push(r2[0]);
                return s;
              }, t2.prototype.getProvisionalElements = function() {
                var t3, e3, r2, n2, o2, i2, s;
                r2 = [], n2 = this.elements;
                for (e3 in n2)
                  o2 = n2[e3], s = o2.type, i2 = o2.tracked, t3 = o2.elements, null != s || i2 ? t3.length > 1 && r2.push.apply(r2, t3.slice(1)) : r2.push.apply(r2, t3);
                return r2;
              }, t2.prototype.getMetaValue = function(t3) {
                var e3;
                return null != (e3 = this.findMetaElementByName(t3)) ? e3.getAttribute("content") : void 0;
              }, t2.prototype.findMetaElementByName = function(t3) {
                var r2, n2, o2, i2;
                r2 = void 0, i2 = this.elements;
                for (o2 in i2)
                  n2 = i2[o2].elements, e2(n2[0], t3) && (r2 = n2[0]);
                return r2;
              }, i = function(t3) {
                return r(t3) ? "script" : n(t3) ? "stylesheet" : void 0;
              }, o = function(t3) {
                return "reload" === t3.getAttribute("data-turbolinks-track");
              }, r = function(t3) {
                var e3;
                return e3 = t3.tagName.toLowerCase(), "script" === e3;
              }, n = function(t3) {
                var e3;
                return e3 = t3.tagName.toLowerCase(), "style" === e3 || "link" === e3 && "stylesheet" === t3.getAttribute("rel");
              }, e2 = function(t3, e3) {
                var r2;
                return r2 = t3.tagName.toLowerCase(), "meta" === r2 && t3.getAttribute("name") === e3;
              }, t2;
            }();
          }.call(this), function() {
            e.Snapshot = function() {
              function t2(t3, e2) {
                this.headDetails = t3, this.bodyElement = e2;
              }
              return t2.wrap = function(t3) {
                return t3 instanceof this ? t3 : "string" == typeof t3 ? this.fromHTMLString(t3) : this.fromHTMLElement(t3);
              }, t2.fromHTMLString = function(t3) {
                var e2;
                return e2 = document.createElement("html"), e2.innerHTML = t3, this.fromHTMLElement(e2);
              }, t2.fromHTMLElement = function(t3) {
                var r, n, o, i;
                return o = t3.querySelector("head"), r = null != (i = t3.querySelector("body")) ? i : document.createElement("body"), n = e.HeadDetails.fromHeadElement(o), new this(n, r);
              }, t2.prototype.clone = function() {
                return new this.constructor(this.headDetails, this.bodyElement.cloneNode(true));
              }, t2.prototype.getRootLocation = function() {
                var t3, r;
                return r = null != (t3 = this.getSetting("root")) ? t3 : "/", new e.Location(r);
              }, t2.prototype.getCacheControlValue = function() {
                return this.getSetting("cache-control");
              }, t2.prototype.getElementForAnchor = function(t3) {
                try {
                  return this.bodyElement.querySelector("[id='" + t3 + "'], a[name='" + t3 + "']");
                } catch (e2) {
                }
              }, t2.prototype.getPermanentElements = function() {
                return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]");
              }, t2.prototype.getPermanentElementById = function(t3) {
                return this.bodyElement.querySelector("#" + t3 + "[data-turbolinks-permanent]");
              }, t2.prototype.getPermanentElementsPresentInSnapshot = function(t3) {
                var e2, r, n, o, i;
                for (o = this.getPermanentElements(), i = [], r = 0, n = o.length; n > r; r++)
                  e2 = o[r], t3.getPermanentElementById(e2.id) && i.push(e2);
                return i;
              }, t2.prototype.findFirstAutofocusableElement = function() {
                return this.bodyElement.querySelector("[autofocus]");
              }, t2.prototype.hasAnchor = function(t3) {
                return null != this.getElementForAnchor(t3);
              }, t2.prototype.isPreviewable = function() {
                return "no-preview" !== this.getCacheControlValue();
              }, t2.prototype.isCacheable = function() {
                return "no-cache" !== this.getCacheControlValue();
              }, t2.prototype.isVisitable = function() {
                return "reload" !== this.getSetting("visit-control");
              }, t2.prototype.getSetting = function(t3) {
                return this.headDetails.getMetaValue("turbolinks-" + t3);
              }, t2;
            }();
          }.call(this), function() {
            var t2 = [].slice;
            e.Renderer = function() {
              function e2() {
              }
              var r;
              return e2.render = function() {
                var e3, r2, n, o;
                return n = arguments[0], r2 = arguments[1], e3 = 3 <= arguments.length ? t2.call(arguments, 2) : [], o = function(t3, e4, r3) {
                  r3.prototype = t3.prototype;
                  var n2 = new r3(), o2 = t3.apply(n2, e4);
                  return Object(o2) === o2 ? o2 : n2;
                }(this, e3, function() {
                }), o.delegate = n, o.render(r2), o;
              }, e2.prototype.renderView = function(t3) {
                return this.delegate.viewWillRender(this.newBody), t3(), this.delegate.viewRendered(this.newBody);
              }, e2.prototype.invalidateView = function() {
                return this.delegate.viewInvalidated();
              }, e2.prototype.createScriptElement = function(t3) {
                var e3;
                return "false" === t3.getAttribute("data-turbolinks-eval") ? t3 : (e3 = document.createElement("script"), e3.textContent = t3.textContent, e3.async = false, r(e3, t3), e3);
              }, r = function(t3, e3) {
                var r2, n, o, i, s, a, u;
                for (i = e3.attributes, a = [], r2 = 0, n = i.length; n > r2; r2++)
                  s = i[r2], o = s.name, u = s.value, a.push(t3.setAttribute(o, u));
                return a;
              }, e2;
            }();
          }.call(this), function() {
            var t2, r, n = function(t3, e2) {
              function r2() {
                this.constructor = t3;
              }
              for (var n2 in e2)
                o.call(e2, n2) && (t3[n2] = e2[n2]);
              return r2.prototype = e2.prototype, t3.prototype = new r2(), t3.__super__ = e2.prototype, t3;
            }, o = {}.hasOwnProperty;
            e.SnapshotRenderer = function(e2) {
              function o2(t3, e3, r2) {
                this.currentSnapshot = t3, this.newSnapshot = e3, this.isPreview = r2, this.currentHeadDetails = this.currentSnapshot.headDetails, this.newHeadDetails = this.newSnapshot.headDetails, this.currentBody = this.currentSnapshot.bodyElement, this.newBody = this.newSnapshot.bodyElement;
              }
              return n(o2, e2), o2.prototype.render = function(t3) {
                return this.shouldRender() ? (this.mergeHead(), this.renderView(function(e3) {
                  return function() {
                    return e3.replaceBody(), e3.isPreview || e3.focusFirstAutofocusableElement(), t3();
                  };
                }(this))) : this.invalidateView();
              }, o2.prototype.mergeHead = function() {
                return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements();
              }, o2.prototype.replaceBody = function() {
                var t3;
                return t3 = this.relocateCurrentBodyPermanentElements(), this.activateNewBodyScriptElements(), this.assignNewBody(), this.replacePlaceholderElementsWithClonedPermanentElements(t3);
              }, o2.prototype.shouldRender = function() {
                return this.newSnapshot.isVisitable() && this.trackedElementsAreIdentical();
              }, o2.prototype.trackedElementsAreIdentical = function() {
                return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature();
              }, o2.prototype.copyNewHeadStylesheetElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadStylesheetElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++)
                  t3 = n2[e3], o3.push(document.head.appendChild(t3));
                return o3;
              }, o2.prototype.copyNewHeadScriptElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadScriptElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++)
                  t3 = n2[e3], o3.push(document.head.appendChild(this.createScriptElement(t3)));
                return o3;
              }, o2.prototype.removeCurrentHeadProvisionalElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getCurrentHeadProvisionalElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++)
                  t3 = n2[e3], o3.push(document.head.removeChild(t3));
                return o3;
              }, o2.prototype.copyNewHeadProvisionalElements = function() {
                var t3, e3, r2, n2, o3;
                for (n2 = this.getNewHeadProvisionalElements(), o3 = [], e3 = 0, r2 = n2.length; r2 > e3; e3++)
                  t3 = n2[e3], o3.push(document.head.appendChild(t3));
                return o3;
              }, o2.prototype.relocateCurrentBodyPermanentElements = function() {
                var e3, n2, o3, i, s, a, u;
                for (a = this.getCurrentBodyPermanentElements(), u = [], e3 = 0, n2 = a.length; n2 > e3; e3++)
                  i = a[e3], s = t2(i), o3 = this.newSnapshot.getPermanentElementById(i.id), r(i, s.element), r(o3, i), u.push(s);
                return u;
              }, o2.prototype.replacePlaceholderElementsWithClonedPermanentElements = function(t3) {
                var e3, n2, o3, i, s, a, u;
                for (u = [], o3 = 0, i = t3.length; i > o3; o3++)
                  a = t3[o3], n2 = a.element, s = a.permanentElement, e3 = s.cloneNode(true), u.push(r(n2, e3));
                return u;
              }, o2.prototype.activateNewBodyScriptElements = function() {
                var t3, e3, n2, o3, i, s;
                for (i = this.getNewBodyScriptElements(), s = [], e3 = 0, o3 = i.length; o3 > e3; e3++)
                  n2 = i[e3], t3 = this.createScriptElement(n2), s.push(r(n2, t3));
                return s;
              }, o2.prototype.assignNewBody = function() {
                return document.body = this.newBody;
              }, o2.prototype.focusFirstAutofocusableElement = function() {
                var t3;
                return null != (t3 = this.newSnapshot.findFirstAutofocusableElement()) ? t3.focus() : void 0;
              }, o2.prototype.getNewHeadStylesheetElements = function() {
                return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails);
              }, o2.prototype.getNewHeadScriptElements = function() {
                return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails);
              }, o2.prototype.getCurrentHeadProvisionalElements = function() {
                return this.currentHeadDetails.getProvisionalElements();
              }, o2.prototype.getNewHeadProvisionalElements = function() {
                return this.newHeadDetails.getProvisionalElements();
              }, o2.prototype.getCurrentBodyPermanentElements = function() {
                return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot);
              }, o2.prototype.getNewBodyScriptElements = function() {
                return this.newBody.querySelectorAll("script");
              }, o2;
            }(e.Renderer), t2 = function(t3) {
              var e2;
              return e2 = document.createElement("meta"), e2.setAttribute("name", "turbolinks-permanent-placeholder"), e2.setAttribute("content", t3.id), { element: e2, permanentElement: t3 };
            }, r = function(t3, e2) {
              var r2;
              return (r2 = t3.parentNode) ? r2.replaceChild(e2, t3) : void 0;
            };
          }.call(this), function() {
            var t2 = function(t3, e2) {
              function n() {
                this.constructor = t3;
              }
              for (var o in e2)
                r.call(e2, o) && (t3[o] = e2[o]);
              return n.prototype = e2.prototype, t3.prototype = new n(), t3.__super__ = e2.prototype, t3;
            }, r = {}.hasOwnProperty;
            e.ErrorRenderer = function(e2) {
              function r2(t3) {
                var e3;
                e3 = document.createElement("html"), e3.innerHTML = t3, this.newHead = e3.querySelector("head"), this.newBody = e3.querySelector("body");
              }
              return t2(r2, e2), r2.prototype.render = function(t3) {
                return this.renderView(function(e3) {
                  return function() {
                    return e3.replaceHeadAndBody(), e3.activateBodyScriptElements(), t3();
                  };
                }(this));
              }, r2.prototype.replaceHeadAndBody = function() {
                var t3, e3;
                return e3 = document.head, t3 = document.body, e3.parentNode.replaceChild(this.newHead, e3), t3.parentNode.replaceChild(this.newBody, t3);
              }, r2.prototype.activateBodyScriptElements = function() {
                var t3, e3, r3, n, o, i;
                for (n = this.getScriptElements(), i = [], e3 = 0, r3 = n.length; r3 > e3; e3++)
                  o = n[e3], t3 = this.createScriptElement(o), i.push(o.parentNode.replaceChild(t3, o));
                return i;
              }, r2.prototype.getScriptElements = function() {
                return document.documentElement.querySelectorAll("script");
              }, r2;
            }(e.Renderer);
          }.call(this), function() {
            e.View = function() {
              function t2(t3) {
                this.delegate = t3, this.htmlElement = document.documentElement;
              }
              return t2.prototype.getRootLocation = function() {
                return this.getSnapshot().getRootLocation();
              }, t2.prototype.getElementForAnchor = function(t3) {
                return this.getSnapshot().getElementForAnchor(t3);
              }, t2.prototype.getSnapshot = function() {
                return e.Snapshot.fromHTMLElement(this.htmlElement);
              }, t2.prototype.render = function(t3, e2) {
                var r, n, o;
                return o = t3.snapshot, r = t3.error, n = t3.isPreview, this.markAsPreview(n), null != o ? this.renderSnapshot(o, n, e2) : this.renderError(r, e2);
              }, t2.prototype.markAsPreview = function(t3) {
                return t3 ? this.htmlElement.setAttribute("data-turbolinks-preview", "") : this.htmlElement.removeAttribute("data-turbolinks-preview");
              }, t2.prototype.renderSnapshot = function(t3, r, n) {
                return e.SnapshotRenderer.render(this.delegate, n, this.getSnapshot(), e.Snapshot.wrap(t3), r);
              }, t2.prototype.renderError = function(t3, r) {
                return e.ErrorRenderer.render(this.delegate, r, t3);
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.ScrollManager = function() {
              function r(r2) {
                this.delegate = r2, this.onScroll = t2(this.onScroll, this), this.onScroll = e.throttle(this.onScroll);
              }
              return r.prototype.start = function() {
                return this.started ? void 0 : (addEventListener("scroll", this.onScroll, false), this.onScroll(), this.started = true);
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("scroll", this.onScroll, false), this.started = false) : void 0;
              }, r.prototype.scrollToElement = function(t3) {
                return t3.scrollIntoView();
              }, r.prototype.scrollToPosition = function(t3) {
                var e2, r2;
                return e2 = t3.x, r2 = t3.y, window.scrollTo(e2, r2);
              }, r.prototype.onScroll = function(t3) {
                return this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
              }, r.prototype.updatePosition = function(t3) {
                var e2;
                return this.position = t3, null != (e2 = this.delegate) ? e2.scrollPositionChanged(this.position) : void 0;
              }, r;
            }();
          }.call(this), function() {
            e.SnapshotCache = function() {
              function t2(t3) {
                this.size = t3, this.keys = [], this.snapshots = {};
              }
              var r;
              return t2.prototype.has = function(t3) {
                var e2;
                return e2 = r(t3), e2 in this.snapshots;
              }, t2.prototype.get = function(t3) {
                var e2;
                if (this.has(t3))
                  return e2 = this.read(t3), this.touch(t3), e2;
              }, t2.prototype.put = function(t3, e2) {
                return this.write(t3, e2), this.touch(t3), e2;
              }, t2.prototype.read = function(t3) {
                var e2;
                return e2 = r(t3), this.snapshots[e2];
              }, t2.prototype.write = function(t3, e2) {
                var n;
                return n = r(t3), this.snapshots[n] = e2;
              }, t2.prototype.touch = function(t3) {
                var e2, n;
                return n = r(t3), e2 = this.keys.indexOf(n), e2 > -1 && this.keys.splice(e2, 1), this.keys.unshift(n), this.trim();
              }, t2.prototype.trim = function() {
                var t3, e2, r2, n, o;
                for (n = this.keys.splice(this.size), o = [], t3 = 0, r2 = n.length; r2 > t3; t3++)
                  e2 = n[t3], o.push(delete this.snapshots[e2]);
                return o;
              }, r = function(t3) {
                return e.Location.wrap(t3).toCacheKey();
              }, t2;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.Visit = function() {
              function r(r2, n2, o) {
                this.controller = r2, this.action = o, this.performScroll = t2(this.performScroll, this), this.identifier = e.uuid(), this.location = e.Location.wrap(n2), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {};
              }
              var n;
              return r.prototype.start = function() {
                return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0;
              }, r.prototype.cancel = function() {
                var t3;
                return "started" === this.state ? (null != (t3 = this.request) && t3.cancel(), this.cancelRender(), this.state = "canceled") : void 0;
              }, r.prototype.complete = function() {
                var t3;
                return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof (t3 = this.adapter).visitCompleted && t3.visitCompleted(this), this.controller.visitCompleted(this)) : void 0;
              }, r.prototype.fail = function() {
                var t3;
                return "started" === this.state ? (this.state = "failed", "function" == typeof (t3 = this.adapter).visitFailed ? t3.visitFailed(this) : void 0) : void 0;
              }, r.prototype.changeHistory = function() {
                var t3, e2;
                return this.historyChanged ? void 0 : (t3 = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e2 = n(t3), this.controller[e2](this.location, this.restorationIdentifier), this.historyChanged = true);
              }, r.prototype.issueRequest = function() {
                return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new e.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0;
              }, r.prototype.getCachedSnapshot = function() {
                var t3;
                return !(t3 = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t3.hasAnchor(this.location.anchor) || "restore" !== this.action && !t3.isPreviewable() ? void 0 : t3;
              }, r.prototype.hasCachedSnapshot = function() {
                return null != this.getCachedSnapshot();
              }, r.prototype.loadCachedSnapshot = function() {
                var t3, e2;
                return (e2 = this.getCachedSnapshot()) ? (t3 = this.shouldIssueRequest(), this.render(function() {
                  var r2;
                  return this.cacheSnapshot(), this.controller.render({ snapshot: e2, isPreview: t3 }, this.performScroll), "function" == typeof (r2 = this.adapter).visitRendered && r2.visitRendered(this), t3 ? void 0 : this.complete();
                })) : void 0;
              }, r.prototype.loadResponse = function() {
                return null != this.response ? this.render(function() {
                  var t3, e2;
                  return this.cacheSnapshot(), this.request.failed ? (this.controller.render({ error: this.response }, this.performScroll), "function" == typeof (t3 = this.adapter).visitRendered && t3.visitRendered(this), this.fail()) : (this.controller.render({ snapshot: this.response }, this.performScroll), "function" == typeof (e2 = this.adapter).visitRendered && e2.visitRendered(this), this.complete());
                }) : void 0;
              }, r.prototype.followRedirect = function() {
                return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = true) : void 0;
              }, r.prototype.requestStarted = function() {
                var t3;
                return this.recordTimingMetric("requestStart"), "function" == typeof (t3 = this.adapter).visitRequestStarted ? t3.visitRequestStarted(this) : void 0;
              }, r.prototype.requestProgressed = function(t3) {
                var e2;
                return this.progress = t3, "function" == typeof (e2 = this.adapter).visitRequestProgressed ? e2.visitRequestProgressed(this) : void 0;
              }, r.prototype.requestCompletedWithResponse = function(t3, r2) {
                return this.response = t3, null != r2 && (this.redirectedToLocation = e.Location.wrap(r2)), this.adapter.visitRequestCompleted(this);
              }, r.prototype.requestFailedWithStatusCode = function(t3, e2) {
                return this.response = e2, this.adapter.visitRequestFailedWithStatusCode(this, t3);
              }, r.prototype.requestFinished = function() {
                var t3;
                return this.recordTimingMetric("requestEnd"), "function" == typeof (t3 = this.adapter).visitRequestFinished ? t3.visitRequestFinished(this) : void 0;
              }, r.prototype.performScroll = function() {
                return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = true);
              }, r.prototype.scrollToRestoredPosition = function() {
                var t3, e2;
                return t3 = null != (e2 = this.restorationData) ? e2.scrollPosition : void 0, null != t3 ? (this.controller.scrollToPosition(t3), true) : void 0;
              }, r.prototype.scrollToAnchor = function() {
                return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), true) : void 0;
              }, r.prototype.scrollToTop = function() {
                return this.controller.scrollToPosition({ x: 0, y: 0 });
              }, r.prototype.recordTimingMetric = function(t3) {
                var e2;
                return null != (e2 = this.timingMetrics)[t3] ? e2[t3] : e2[t3] = new Date().getTime();
              }, r.prototype.getTimingMetrics = function() {
                return e.copyObject(this.timingMetrics);
              }, n = function(t3) {
                switch (t3) {
                  case "replace":
                    return "replaceHistoryWithLocationAndRestorationIdentifier";
                  case "advance":
                  case "restore":
                    return "pushHistoryWithLocationAndRestorationIdentifier";
                }
              }, r.prototype.shouldIssueRequest = function() {
                return "restore" === this.action ? !this.hasCachedSnapshot() : true;
              }, r.prototype.cacheSnapshot = function() {
                return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = true);
              }, r.prototype.render = function(t3) {
                return this.cancelRender(), this.frame = requestAnimationFrame(function(e2) {
                  return function() {
                    return e2.frame = null, t3.call(e2);
                  };
                }(this));
              }, r.prototype.cancelRender = function() {
                return this.frame ? cancelAnimationFrame(this.frame) : void 0;
              }, r;
            }();
          }.call(this), function() {
            var t2 = function(t3, e2) {
              return function() {
                return t3.apply(e2, arguments);
              };
            };
            e.Controller = function() {
              function r() {
                this.clickBubbled = t2(this.clickBubbled, this), this.clickCaptured = t2(this.clickCaptured, this), this.pageLoaded = t2(this.pageLoaded, this), this.history = new e.History(this), this.view = new e.View(this), this.scrollManager = new e.ScrollManager(this), this.restorationData = {}, this.clearCache(), this.setProgressBarDelay(500);
              }
              return r.prototype.start = function() {
                return e.supported && !this.started ? (addEventListener("click", this.clickCaptured, true), addEventListener("DOMContentLoaded", this.pageLoaded, false), this.scrollManager.start(), this.startHistory(), this.started = true, this.enabled = true) : void 0;
              }, r.prototype.disable = function() {
                return this.enabled = false;
              }, r.prototype.stop = function() {
                return this.started ? (removeEventListener("click", this.clickCaptured, true), removeEventListener("DOMContentLoaded", this.pageLoaded, false), this.scrollManager.stop(), this.stopHistory(), this.started = false) : void 0;
              }, r.prototype.clearCache = function() {
                return this.cache = new e.SnapshotCache(10);
              }, r.prototype.visit = function(t3, r2) {
                var n, o;
                return null == r2 && (r2 = {}), t3 = e.Location.wrap(t3), this.applicationAllowsVisitingLocation(t3) ? this.locationIsVisitable(t3) ? (n = null != (o = r2.action) ? o : "advance", this.adapter.visitProposedToLocationWithAction(t3, n)) : window.location = t3 : void 0;
              }, r.prototype.startVisitToLocationWithAction = function(t3, r2, n) {
                var o;
                return e.supported ? (o = this.getRestorationDataForIdentifier(n), this.startVisit(t3, r2, { restorationData: o })) : window.location = t3;
              }, r.prototype.setProgressBarDelay = function(t3) {
                return this.progressBarDelay = t3;
              }, r.prototype.startHistory = function() {
                return this.location = e.Location.wrap(window.location), this.restorationIdentifier = e.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier);
              }, r.prototype.stopHistory = function() {
                return this.history.stop();
              }, r.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(t3, r2) {
                return this.restorationIdentifier = r2, this.location = e.Location.wrap(t3), this.history.push(this.location, this.restorationIdentifier);
              }, r.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(t3, r2) {
                return this.restorationIdentifier = r2, this.location = e.Location.wrap(t3), this.history.replace(this.location, this.restorationIdentifier);
              }, r.prototype.historyPoppedToLocationWithRestorationIdentifier = function(t3, r2) {
                var n;
                return this.restorationIdentifier = r2, this.enabled ? (n = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(t3, "restore", { restorationIdentifier: this.restorationIdentifier, restorationData: n, historyChanged: true }), this.location = e.Location.wrap(t3)) : this.adapter.pageInvalidated();
              }, r.prototype.getCachedSnapshotForLocation = function(t3) {
                var e2;
                return null != (e2 = this.cache.get(t3)) ? e2.clone() : void 0;
              }, r.prototype.shouldCacheSnapshot = function() {
                return this.view.getSnapshot().isCacheable();
              }, r.prototype.cacheSnapshot = function() {
                var t3, r2;
                return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), r2 = this.view.getSnapshot(), t3 = this.lastRenderedLocation, e.defer(function(e2) {
                  return function() {
                    return e2.cache.put(t3, r2.clone());
                  };
                }(this))) : void 0;
              }, r.prototype.scrollToAnchor = function(t3) {
                var e2;
                return (e2 = this.view.getElementForAnchor(t3)) ? this.scrollToElement(e2) : this.scrollToPosition({ x: 0, y: 0 });
              }, r.prototype.scrollToElement = function(t3) {
                return this.scrollManager.scrollToElement(t3);
              }, r.prototype.scrollToPosition = function(t3) {
                return this.scrollManager.scrollToPosition(t3);
              }, r.prototype.scrollPositionChanged = function(t3) {
                var e2;
                return e2 = this.getCurrentRestorationData(), e2.scrollPosition = t3;
              }, r.prototype.render = function(t3, e2) {
                return this.view.render(t3, e2);
              }, r.prototype.viewInvalidated = function() {
                return this.adapter.pageInvalidated();
              }, r.prototype.viewWillRender = function(t3) {
                return this.notifyApplicationBeforeRender(t3);
              }, r.prototype.viewRendered = function() {
                return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender();
              }, r.prototype.pageLoaded = function() {
                return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad();
              }, r.prototype.clickCaptured = function() {
                return removeEventListener("click", this.clickBubbled, false), addEventListener("click", this.clickBubbled, false);
              }, r.prototype.clickBubbled = function(t3) {
                var e2, r2, n;
                return this.enabled && this.clickEventIsSignificant(t3) && (r2 = this.getVisitableLinkForNode(t3.target)) && (n = this.getVisitableLocationForLink(r2)) && this.applicationAllowsFollowingLinkToLocation(r2, n) ? (t3.preventDefault(), e2 = this.getActionForLink(r2), this.visit(n, { action: e2 })) : void 0;
              }, r.prototype.applicationAllowsFollowingLinkToLocation = function(t3, e2) {
                var r2;
                return r2 = this.notifyApplicationAfterClickingLinkToLocation(t3, e2), !r2.defaultPrevented;
              }, r.prototype.applicationAllowsVisitingLocation = function(t3) {
                var e2;
                return e2 = this.notifyApplicationBeforeVisitingLocation(t3), !e2.defaultPrevented;
              }, r.prototype.notifyApplicationAfterClickingLinkToLocation = function(t3, r2) {
                return e.dispatch("turbolinks:click", { target: t3, data: { url: r2.absoluteURL }, cancelable: true });
              }, r.prototype.notifyApplicationBeforeVisitingLocation = function(t3) {
                return e.dispatch("turbolinks:before-visit", { data: { url: t3.absoluteURL }, cancelable: true });
              }, r.prototype.notifyApplicationAfterVisitingLocation = function(t3) {
                return e.dispatch("turbolinks:visit", { data: { url: t3.absoluteURL } });
              }, r.prototype.notifyApplicationBeforeCachingSnapshot = function() {
                return e.dispatch("turbolinks:before-cache");
              }, r.prototype.notifyApplicationBeforeRender = function(t3) {
                return e.dispatch("turbolinks:before-render", { data: { newBody: t3 } });
              }, r.prototype.notifyApplicationAfterRender = function() {
                return e.dispatch("turbolinks:render");
              }, r.prototype.notifyApplicationAfterPageLoad = function(t3) {
                return null == t3 && (t3 = {}), e.dispatch("turbolinks:load", { data: { url: this.location.absoluteURL, timing: t3 } });
              }, r.prototype.startVisit = function(t3, e2, r2) {
                var n;
                return null != (n = this.currentVisit) && n.cancel(), this.currentVisit = this.createVisit(t3, e2, r2), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t3);
              }, r.prototype.createVisit = function(t3, r2, n) {
                var o, i, s, a, u;
                return i = null != n ? n : {}, a = i.restorationIdentifier, s = i.restorationData, o = i.historyChanged, u = new e.Visit(this, t3, r2), u.restorationIdentifier = null != a ? a : e.uuid(), u.restorationData = e.copyObject(s), u.historyChanged = o, u.referrer = this.location, u;
              }, r.prototype.visitCompleted = function(t3) {
                return this.notifyApplicationAfterPageLoad(t3.getTimingMetrics());
              }, r.prototype.clickEventIsSignificant = function(t3) {
                return !(t3.defaultPrevented || t3.target.isContentEditable || t3.which > 1 || t3.altKey || t3.ctrlKey || t3.metaKey || t3.shiftKey);
              }, r.prototype.getVisitableLinkForNode = function(t3) {
                return this.nodeIsVisitable(t3) ? e.closest(t3, "a[href]:not([target]):not([download])") : void 0;
              }, r.prototype.getVisitableLocationForLink = function(t3) {
                var r2;
                return r2 = new e.Location(t3.getAttribute("href")), this.locationIsVisitable(r2) ? r2 : void 0;
              }, r.prototype.getActionForLink = function(t3) {
                var e2;
                return null != (e2 = t3.getAttribute("data-turbolinks-action")) ? e2 : "advance";
              }, r.prototype.nodeIsVisitable = function(t3) {
                var r2;
                return (r2 = e.closest(t3, "[data-turbolinks]")) ? "false" !== r2.getAttribute("data-turbolinks") : true;
              }, r.prototype.locationIsVisitable = function(t3) {
                return t3.isPrefixedBy(this.view.getRootLocation()) && t3.isHTML();
              }, r.prototype.getCurrentRestorationData = function() {
                return this.getRestorationDataForIdentifier(this.restorationIdentifier);
              }, r.prototype.getRestorationDataForIdentifier = function(t3) {
                var e2;
                return null != (e2 = this.restorationData)[t3] ? e2[t3] : e2[t3] = {};
              }, r;
            }();
          }.call(this), function() {
            !function() {
              var t2, e2;
              if ((t2 = e2 = document.currentScript) && !e2.hasAttribute("data-turbolinks-suppress-warning")) {
                for (; t2 = t2.parentNode; )
                  if (t2 === document.body)
                    return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s", e2.outerHTML);
              }
            }();
          }.call(this), function() {
            var t2, r, n;
            e.start = function() {
              return r() ? (null == e.controller && (e.controller = t2()), e.controller.start()) : void 0;
            }, r = function() {
              return null == window.Turbolinks && (window.Turbolinks = e), n();
            }, t2 = function() {
              var t3;
              return t3 = new e.Controller(), t3.adapter = new e.BrowserAdapter(t3), t3;
            }, n = function() {
              return window.Turbolinks === e;
            }, n() && e.start();
          }.call(this);
        }).call(this), "object" == typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e);
      }).call(exports);
    }
  });

  // node_modules/nanoassert/index.js
  var require_nanoassert = __commonJS({
    "node_modules/nanoassert/index.js"(exports, module) {
      assert.notEqual = notEqual;
      assert.notOk = notOk;
      assert.equal = equal;
      assert.ok = assert;
      module.exports = assert;
      function equal(a, b, m) {
        assert(a == b, m);
      }
      function notEqual(a, b, m) {
        assert(a != b, m);
      }
      function notOk(t, m) {
        assert(!t, m);
      }
      function assert(t, m) {
        if (!t)
          throw new Error(m || "AssertionError");
      }
    }
  });

  // node_modules/nanomorph/lib/events.js
  var require_events = __commonJS({
    "node_modules/nanomorph/lib/events.js"(exports, module) {
      module.exports = [
        "onclick",
        "ondblclick",
        "onmousedown",
        "onmouseup",
        "onmouseover",
        "onmousemove",
        "onmouseout",
        "onmouseenter",
        "onmouseleave",
        "ontouchcancel",
        "ontouchend",
        "ontouchmove",
        "ontouchstart",
        "ondragstart",
        "ondrag",
        "ondragenter",
        "ondragleave",
        "ondragover",
        "ondrop",
        "ondragend",
        "onkeydown",
        "onkeypress",
        "onkeyup",
        "onunload",
        "onabort",
        "onerror",
        "onresize",
        "onscroll",
        "onselect",
        "onchange",
        "onsubmit",
        "onreset",
        "onfocus",
        "onblur",
        "oninput",
        "onanimationend",
        "onanimationiteration",
        "onanimationstart",
        "oncontextmenu",
        "onfocusin",
        "onfocusout"
      ];
    }
  });

  // node_modules/nanomorph/lib/morph.js
  var require_morph = __commonJS({
    "node_modules/nanomorph/lib/morph.js"(exports, module) {
      var events = require_events();
      var eventsLength = events.length;
      var ELEMENT_NODE = 1;
      var TEXT_NODE = 3;
      var COMMENT_NODE = 8;
      module.exports = morph;
      function morph(newNode, oldNode) {
        var nodeType = newNode.nodeType;
        var nodeName = newNode.nodeName;
        if (nodeType === ELEMENT_NODE) {
          copyAttrs(newNode, oldNode);
        }
        if (nodeType === TEXT_NODE || nodeType === COMMENT_NODE) {
          if (oldNode.nodeValue !== newNode.nodeValue) {
            oldNode.nodeValue = newNode.nodeValue;
          }
        }
        if (nodeName === "INPUT")
          updateInput(newNode, oldNode);
        else if (nodeName === "OPTION")
          updateOption(newNode, oldNode);
        else if (nodeName === "TEXTAREA")
          updateTextarea(newNode, oldNode);
        copyEvents(newNode, oldNode);
      }
      function copyAttrs(newNode, oldNode) {
        var oldAttrs = oldNode.attributes;
        var newAttrs = newNode.attributes;
        var attrNamespaceURI = null;
        var attrValue = null;
        var fromValue = null;
        var attrName = null;
        var attr = null;
        for (var i = newAttrs.length - 1; i >= 0; --i) {
          attr = newAttrs[i];
          attrName = attr.name;
          attrNamespaceURI = attr.namespaceURI;
          attrValue = attr.value;
          if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = oldNode.getAttributeNS(attrNamespaceURI, attrName);
            if (fromValue !== attrValue) {
              oldNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
          } else {
            if (!oldNode.hasAttribute(attrName)) {
              oldNode.setAttribute(attrName, attrValue);
            } else {
              fromValue = oldNode.getAttribute(attrName);
              if (fromValue !== attrValue) {
                if (attrValue === "null" || attrValue === "undefined") {
                  oldNode.removeAttribute(attrName);
                } else {
                  oldNode.setAttribute(attrName, attrValue);
                }
              }
            }
          }
        }
        for (var j = oldAttrs.length - 1; j >= 0; --j) {
          attr = oldAttrs[j];
          if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            if (attrNamespaceURI) {
              attrName = attr.localName || attrName;
              if (!newNode.hasAttributeNS(attrNamespaceURI, attrName)) {
                oldNode.removeAttributeNS(attrNamespaceURI, attrName);
              }
            } else {
              if (!newNode.hasAttributeNS(null, attrName)) {
                oldNode.removeAttribute(attrName);
              }
            }
          }
        }
      }
      function copyEvents(newNode, oldNode) {
        for (var i = 0; i < eventsLength; i++) {
          var ev = events[i];
          if (newNode[ev]) {
            oldNode[ev] = newNode[ev];
          } else if (oldNode[ev]) {
            oldNode[ev] = void 0;
          }
        }
      }
      function updateOption(newNode, oldNode) {
        updateAttribute(newNode, oldNode, "selected");
      }
      function updateInput(newNode, oldNode) {
        var newValue = newNode.value;
        var oldValue = oldNode.value;
        updateAttribute(newNode, oldNode, "checked");
        updateAttribute(newNode, oldNode, "disabled");
        if (newNode.indeterminate !== oldNode.indeterminate) {
          oldNode.indeterminate = newNode.indeterminate;
        }
        if (oldNode.type === "file")
          return;
        if (newValue !== oldValue) {
          oldNode.setAttribute("value", newValue);
          oldNode.value = newValue;
        }
        if (newValue === "null") {
          oldNode.value = "";
          oldNode.removeAttribute("value");
        }
        if (!newNode.hasAttributeNS(null, "value")) {
          oldNode.removeAttribute("value");
        } else if (oldNode.type === "range") {
          oldNode.value = newValue;
        }
      }
      function updateTextarea(newNode, oldNode) {
        var newValue = newNode.value;
        if (newValue !== oldNode.value) {
          oldNode.value = newValue;
        }
        if (oldNode.firstChild && oldNode.firstChild.nodeValue !== newValue) {
          if (newValue === "" && oldNode.firstChild.nodeValue === oldNode.placeholder) {
            return;
          }
          oldNode.firstChild.nodeValue = newValue;
        }
      }
      function updateAttribute(newNode, oldNode, name) {
        if (newNode[name] !== oldNode[name]) {
          oldNode[name] = newNode[name];
          if (newNode[name]) {
            oldNode.setAttribute(name, "");
          } else {
            oldNode.removeAttribute(name);
          }
        }
      }
    }
  });

  // node_modules/nanomorph/index.js
  var require_nanomorph = __commonJS({
    "node_modules/nanomorph/index.js"(exports, module) {
      var assert = require_nanoassert();
      var morph = require_morph();
      var TEXT_NODE = 3;
      module.exports = nanomorph2;
      function nanomorph2(oldTree, newTree, options) {
        assert.equal(typeof oldTree, "object", "nanomorph: oldTree should be an object");
        assert.equal(typeof newTree, "object", "nanomorph: newTree should be an object");
        if (options && options.childrenOnly) {
          updateChildren(newTree, oldTree);
          return oldTree;
        }
        assert.notEqual(
          newTree.nodeType,
          11,
          "nanomorph: newTree should have one root node (which is not a DocumentFragment)"
        );
        return walk(newTree, oldTree);
      }
      function walk(newNode, oldNode) {
        if (!oldNode) {
          return newNode;
        } else if (!newNode) {
          return null;
        } else if (newNode.isSameNode && newNode.isSameNode(oldNode)) {
          return oldNode;
        } else if (newNode.tagName !== oldNode.tagName || getComponentId(newNode) !== getComponentId(oldNode)) {
          return newNode;
        } else {
          morph(newNode, oldNode);
          updateChildren(newNode, oldNode);
          return oldNode;
        }
      }
      function getComponentId(node) {
        return node.dataset ? node.dataset.nanomorphComponentId : void 0;
      }
      function updateChildren(newNode, oldNode) {
        var oldChild, newChild, morphed, oldMatch;
        var offset = 0;
        for (var i = 0; ; i++) {
          oldChild = oldNode.childNodes[i];
          newChild = newNode.childNodes[i - offset];
          if (!oldChild && !newChild) {
            break;
          } else if (!newChild) {
            oldNode.removeChild(oldChild);
            i--;
          } else if (!oldChild) {
            oldNode.appendChild(newChild);
            offset++;
          } else if (same(newChild, oldChild)) {
            morphed = walk(newChild, oldChild);
            if (morphed !== oldChild) {
              oldNode.replaceChild(morphed, oldChild);
              offset++;
            }
          } else {
            oldMatch = null;
            for (var j = i; j < oldNode.childNodes.length; j++) {
              if (same(oldNode.childNodes[j], newChild)) {
                oldMatch = oldNode.childNodes[j];
                break;
              }
            }
            if (oldMatch) {
              morphed = walk(newChild, oldMatch);
              if (morphed !== oldMatch)
                offset++;
              oldNode.insertBefore(morphed, oldChild);
            } else if (!newChild.id && !oldChild.id) {
              morphed = walk(newChild, oldChild);
              if (morphed !== oldChild) {
                oldNode.replaceChild(morphed, oldChild);
                offset++;
              }
            } else {
              oldNode.insertBefore(newChild, oldChild);
              offset++;
            }
          }
        }
      }
      function same(a, b) {
        if (a.id)
          return a.id === b.id;
        if (a.isSameNode)
          return a.isSameNode(b);
        if (a.tagName !== b.tagName)
          return false;
        if (a.type === TEXT_NODE)
          return a.nodeValue === b.nodeValue;
        return false;
      }
    }
  });

  // node_modules/cash-dom/dist/cash.js
  var require_cash = __commonJS({
    "node_modules/cash-dom/dist/cash.js"(exports, module) {
      (function() {
        "use strict";
        var propMap = {
          "class": "className",
          contenteditable: "contentEditable",
          "for": "htmlFor",
          readonly: "readOnly",
          maxlength: "maxLength",
          tabindex: "tabIndex",
          colspan: "colSpan",
          rowspan: "rowSpan",
          usemap: "useMap"
        };
        function attempt(fn2, arg) {
          try {
            return fn2(arg);
          } catch (_a) {
            return arg;
          }
        }
        var doc = document, win = window, docEle = doc.documentElement, createElement = doc.createElement.bind(doc), div = createElement("div"), table = createElement("table"), tbody = createElement("tbody"), tr = createElement("tr"), isArray = Array.isArray, ArrayPrototype = Array.prototype, concat = ArrayPrototype.concat, filter = ArrayPrototype.filter, indexOf = ArrayPrototype.indexOf, map = ArrayPrototype.map, push = ArrayPrototype.push, slice = ArrayPrototype.slice, some = ArrayPrototype.some, splice = ArrayPrototype.splice;
        var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/, classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
        function find(selector, context) {
          var isFragment = isDocumentFragment(context);
          return !selector || !isFragment && !isDocument(context) && !isElement(context) ? [] : !isFragment && classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : !isFragment && tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
        }
        var Cash = function() {
          function Cash2(selector, context) {
            if (!selector)
              return;
            if (isCash(selector))
              return selector;
            var eles = selector;
            if (isString(selector)) {
              var ctx = (isCash(context) ? context[0] : context) || doc;
              eles = idRe.test(selector) && "getElementById" in ctx ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
              if (!eles)
                return;
            } else if (isFunction(selector)) {
              return this.ready(selector);
            }
            if (eles.nodeType || eles === win)
              eles = [eles];
            this.length = eles.length;
            for (var i = 0, l = this.length; i < l; i++) {
              this[i] = eles[i];
            }
          }
          Cash2.prototype.init = function(selector, context) {
            return new Cash2(selector, context);
          };
          return Cash2;
        }();
        var fn = Cash.prototype, cash = fn.init;
        cash.fn = cash.prototype = fn;
        fn.length = 0;
        fn.splice = splice;
        if (typeof Symbol === "function") {
          fn[Symbol["iterator"]] = ArrayPrototype[Symbol["iterator"]];
        }
        fn.map = function(callback) {
          return cash(concat.apply([], map.call(this, function(ele, i) {
            return callback.call(ele, i, ele);
          })));
        };
        fn.slice = function(start, end) {
          return cash(slice.call(this, start, end));
        };
        var dashAlphaRe = /-([a-z])/g;
        function camelCase(str) {
          return str.replace(dashAlphaRe, function(match, letter) {
            return letter.toUpperCase();
          });
        }
        cash.guid = 1;
        function matches(ele, selector) {
          var matches2 = ele && (ele["matches"] || ele["webkitMatchesSelector"] || ele["msMatchesSelector"]);
          return !!matches2 && !!selector && matches2.call(ele, selector);
        }
        function isCash(x) {
          return x instanceof Cash;
        }
        function isWindow(x) {
          return !!x && x === x.window;
        }
        function isDocument(x) {
          return !!x && x.nodeType === 9;
        }
        function isDocumentFragment(x) {
          return !!x && x.nodeType === 11;
        }
        function isElement(x) {
          return !!x && x.nodeType === 1;
        }
        function isBoolean(x) {
          return typeof x === "boolean";
        }
        function isFunction(x) {
          return typeof x === "function";
        }
        function isString(x) {
          return typeof x === "string";
        }
        function isUndefined(x) {
          return x === void 0;
        }
        function isNull(x) {
          return x === null;
        }
        function isNumeric(x) {
          return !isNaN(parseFloat(x)) && isFinite(x);
        }
        function isPlainObject(x) {
          if (typeof x !== "object" || x === null)
            return false;
          var proto = Object.getPrototypeOf(x);
          return proto === null || proto === Object.prototype;
        }
        cash.isWindow = isWindow;
        cash.isFunction = isFunction;
        cash.isArray = isArray;
        cash.isNumeric = isNumeric;
        cash.isPlainObject = isPlainObject;
        fn.get = function(index) {
          if (isUndefined(index))
            return slice.call(this);
          index = Number(index);
          return this[index < 0 ? index + this.length : index];
        };
        fn.eq = function(index) {
          return cash(this.get(index));
        };
        fn.first = function() {
          return this.eq(0);
        };
        fn.last = function() {
          return this.eq(-1);
        };
        function each(arr, callback, _reverse) {
          if (_reverse) {
            var i = arr.length;
            while (i--) {
              if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
            }
          } else if (isPlainObject(arr)) {
            var keys = Object.keys(arr);
            for (var i = 0, l = keys.length; i < l; i++) {
              var key = keys[i];
              if (callback.call(arr[key], key, arr[key]) === false)
                return arr;
            }
          } else {
            for (var i = 0, l = arr.length; i < l; i++) {
              if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
            }
          }
          return arr;
        }
        cash.each = each;
        fn.each = function(callback) {
          return each(this, callback);
        };
        fn.prop = function(prop, value) {
          if (!prop)
            return;
          if (isString(prop)) {
            prop = propMap[prop] || prop;
            if (arguments.length < 2)
              return this[0] && this[0][prop];
            return this.each(function(i, ele) {
              ele[prop] = value;
            });
          }
          for (var key in prop) {
            this.prop(key, prop[key]);
          }
          return this;
        };
        fn.removeProp = function(prop) {
          return this.each(function(i, ele) {
            delete ele[propMap[prop] || prop];
          });
        };
        function extend() {
          var sources = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
          }
          var deep = isBoolean(sources[0]) ? sources.shift() : false, target = sources.shift(), length = sources.length;
          if (!target)
            return {};
          if (!length)
            return extend(deep, cash, target);
          for (var i = 0; i < length; i++) {
            var source = sources[i];
            for (var key in source) {
              if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                if (!target[key] || target[key].constructor !== source[key].constructor)
                  target[key] = new source[key].constructor();
                extend(deep, target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
          return target;
        }
        cash.extend = extend;
        fn.extend = function(plugins) {
          return extend(fn, plugins);
        };
        function getCompareFunction(comparator) {
          return isString(comparator) ? function(i, ele) {
            return matches(ele, comparator);
          } : isFunction(comparator) ? comparator : isCash(comparator) ? function(i, ele) {
            return comparator.is(ele);
          } : !comparator ? function() {
            return false;
          } : function(i, ele) {
            return ele === comparator;
          };
        }
        fn.filter = function(comparator) {
          var compare = getCompareFunction(comparator);
          return cash(filter.call(this, function(ele, i) {
            return compare.call(ele, i, ele);
          }));
        };
        function filtered(collection, comparator) {
          return !comparator ? collection : collection.filter(comparator);
        }
        var splitValuesRe = /\S+/g;
        function getSplitValues(str) {
          return isString(str) ? str.match(splitValuesRe) || [] : [];
        }
        fn.hasClass = function(cls) {
          return !!cls && some.call(this, function(ele) {
            return isElement(ele) && ele.classList.contains(cls);
          });
        };
        fn.removeAttr = function(attr2) {
          var attrs = getSplitValues(attr2);
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            each(attrs, function(i2, a) {
              ele.removeAttribute(a);
            });
          });
        };
        function attr(attr2, value) {
          if (!attr2)
            return;
          if (isString(attr2)) {
            if (arguments.length < 2) {
              if (!this[0] || !isElement(this[0]))
                return;
              var value_1 = this[0].getAttribute(attr2);
              return isNull(value_1) ? void 0 : value_1;
            }
            if (isUndefined(value))
              return this;
            if (isNull(value))
              return this.removeAttr(attr2);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              ele.setAttribute(attr2, value);
            });
          }
          for (var key in attr2) {
            this.attr(key, attr2[key]);
          }
          return this;
        }
        fn.attr = attr;
        fn.toggleClass = function(cls, force) {
          var classes = getSplitValues(cls), isForce = !isUndefined(force);
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            each(classes, function(i2, c) {
              if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
              } else {
                ele.classList.toggle(c);
              }
            });
          });
        };
        fn.addClass = function(cls) {
          return this.toggleClass(cls, true);
        };
        fn.removeClass = function(cls) {
          if (arguments.length)
            return this.toggleClass(cls, false);
          return this.attr("class", "");
        };
        function pluck(arr, prop, deep, until) {
          var plucked = [], isCallback = isFunction(prop), compare = until && getCompareFunction(until);
          for (var i = 0, l = arr.length; i < l; i++) {
            if (isCallback) {
              var val_1 = prop(arr[i]);
              if (val_1.length)
                push.apply(plucked, val_1);
            } else {
              var val_2 = arr[i][prop];
              while (val_2 != null) {
                if (until && compare(-1, val_2))
                  break;
                plucked.push(val_2);
                val_2 = deep ? val_2[prop] : null;
              }
            }
          }
          return plucked;
        }
        function unique(arr) {
          return arr.length > 1 ? filter.call(arr, function(item, index, self2) {
            return indexOf.call(self2, item) === index;
          }) : arr;
        }
        cash.unique = unique;
        fn.add = function(selector, context) {
          return cash(unique(this.get().concat(cash(selector, context).get())));
        };
        function computeStyle(ele, prop, isVariable) {
          if (!isElement(ele))
            return;
          var style2 = win.getComputedStyle(ele, null);
          return isVariable ? style2.getPropertyValue(prop) || void 0 : style2[prop] || ele.style[prop];
        }
        function computeStyleInt(ele, prop) {
          return parseInt(computeStyle(ele, prop), 10) || 0;
        }
        var cssVariableRe = /^--/;
        function isCSSVariable(prop) {
          return cssVariableRe.test(prop);
        }
        var prefixedProps = {}, style = div.style, vendorsPrefixes = ["webkit", "moz", "ms"];
        function getPrefixedProp(prop, isVariable) {
          if (isVariable === void 0) {
            isVariable = isCSSVariable(prop);
          }
          if (isVariable)
            return prop;
          if (!prefixedProps[prop]) {
            var propCC = camelCase(prop), propUC = "" + propCC[0].toUpperCase() + propCC.slice(1), props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(" ");
            each(props, function(i, p) {
              if (p in style) {
                prefixedProps[prop] = p;
                return false;
              }
            });
          }
          return prefixedProps[prop];
        }
        ;
        var numericProps = {
          animationIterationCount: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          widows: true,
          zIndex: true
        };
        function getSuffixedValue(prop, value, isVariable) {
          if (isVariable === void 0) {
            isVariable = isCSSVariable(prop);
          }
          return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
        }
        function css(prop, value) {
          if (isString(prop)) {
            var isVariable_1 = isCSSVariable(prop);
            prop = getPrefixedProp(prop, isVariable_1);
            if (arguments.length < 2)
              return this[0] && computeStyle(this[0], prop, isVariable_1);
            if (!prop)
              return this;
            value = getSuffixedValue(prop, value, isVariable_1);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              if (isVariable_1) {
                ele.style.setProperty(prop, value);
              } else {
                ele.style[prop] = value;
              }
            });
          }
          for (var key in prop) {
            this.css(key, prop[key]);
          }
          return this;
        }
        ;
        fn.css = css;
        var JSONStringRe = /^\s+|\s+$/;
        function getData(ele, key) {
          var value = ele.dataset[key] || ele.dataset[camelCase(key)];
          if (JSONStringRe.test(value))
            return value;
          return attempt(JSON.parse, value);
        }
        function setData(ele, key, value) {
          value = attempt(JSON.stringify, value);
          ele.dataset[camelCase(key)] = value;
        }
        function data(name, value) {
          if (!name) {
            if (!this[0])
              return;
            var datas = {};
            for (var key in this[0].dataset) {
              datas[key] = getData(this[0], key);
            }
            return datas;
          }
          if (isString(name)) {
            if (arguments.length < 2)
              return this[0] && getData(this[0], name);
            if (isUndefined(value))
              return this;
            return this.each(function(i, ele) {
              setData(ele, name, value);
            });
          }
          for (var key in name) {
            this.data(key, name[key]);
          }
          return this;
        }
        fn.data = data;
        function getDocumentDimension(doc2, dimension) {
          var docEle2 = doc2.documentElement;
          return Math.max(doc2.body["scroll" + dimension], docEle2["scroll" + dimension], doc2.body["offset" + dimension], docEle2["offset" + dimension], docEle2["client" + dimension]);
        }
        function getExtraSpace(ele, xAxis) {
          return computeStyleInt(ele, "border" + (xAxis ? "Left" : "Top") + "Width") + computeStyleInt(ele, "padding" + (xAxis ? "Left" : "Top")) + computeStyleInt(ele, "padding" + (xAxis ? "Right" : "Bottom")) + computeStyleInt(ele, "border" + (xAxis ? "Right" : "Bottom") + "Width");
        }
        each([true, false], function(i, outer) {
          each(["Width", "Height"], function(i2, prop) {
            var name = (outer ? "outer" : "inner") + prop;
            fn[name] = function(includeMargins) {
              if (!this[0])
                return;
              if (isWindow(this[0]))
                return outer ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
              if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
              return this[0][(outer ? "offset" : "client") + prop] + (includeMargins && outer ? computeStyleInt(this[0], "margin" + (i2 ? "Top" : "Left")) + computeStyleInt(this[0], "margin" + (i2 ? "Bottom" : "Right")) : 0);
            };
          });
        });
        each(["Width", "Height"], function(index, prop) {
          var propLC = prop.toLowerCase();
          fn[propLC] = function(value) {
            if (!this[0])
              return isUndefined(value) ? void 0 : this;
            if (!arguments.length) {
              if (isWindow(this[0]))
                return this[0].document.documentElement["client" + prop];
              if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
              return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
            }
            var valueNumber = parseInt(value, 10);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              var boxSizing = computeStyle(ele, "boxSizing");
              ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === "border-box" ? getExtraSpace(ele, !index) : 0));
            });
          };
        });
        var defaultDisplay = {};
        function getDefaultDisplay(tagName) {
          if (defaultDisplay[tagName])
            return defaultDisplay[tagName];
          var ele = createElement(tagName);
          doc.body.insertBefore(ele, null);
          var display = computeStyle(ele, "display");
          doc.body.removeChild(ele);
          return defaultDisplay[tagName] = display !== "none" ? display : "block";
        }
        function isHidden(ele) {
          return computeStyle(ele, "display") === "none";
        }
        var displayProperty = "___cd";
        fn.toggle = function(force) {
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            var show = isUndefined(force) ? isHidden(ele) : force;
            if (show) {
              ele.style.display = ele[displayProperty] || "";
              if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
              }
            } else {
              ele[displayProperty] = computeStyle(ele, "display");
              ele.style.display = "none";
            }
          });
        };
        fn.hide = function() {
          return this.toggle(false);
        };
        fn.show = function() {
          return this.toggle(true);
        };
        function hasNamespaces(ns1, ns2) {
          return !ns2 || !some.call(ns2, function(ns) {
            return ns1.indexOf(ns) < 0;
          });
        }
        var eventsNamespace = "___ce", eventsNamespacesSeparator = ".", eventsFocus = {
          focus: "focusin",
          blur: "focusout"
        }, eventsHover = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        }, eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
        function getEventNameBubbling(name) {
          return eventsHover[name] || eventsFocus[name] || name;
        }
        function getEventsCache(ele) {
          return ele[eventsNamespace] = ele[eventsNamespace] || {};
        }
        function addEvent(ele, name, namespaces, selector, callback) {
          var eventCache = getEventsCache(ele);
          eventCache[name] = eventCache[name] || [];
          eventCache[name].push([namespaces, selector, callback]);
          ele.addEventListener(name, callback);
        }
        function parseEventName(eventName) {
          var parts = eventName.split(eventsNamespacesSeparator);
          return [parts[0], parts.slice(1).sort()];
        }
        function removeEvent(ele, name, namespaces, selector, callback) {
          var cache = getEventsCache(ele);
          if (!name) {
            for (name in cache) {
              removeEvent(ele, name, namespaces, selector, callback);
            }
          } else if (cache[name]) {
            cache[name] = cache[name].filter(function(_a) {
              var ns = _a[0], sel = _a[1], cb = _a[2];
              if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel)
                return true;
              ele.removeEventListener(name, cb);
            });
          }
        }
        fn.off = function(eventFullName, selector, callback) {
          var _this = this;
          if (isUndefined(eventFullName)) {
            this.each(function(i, ele) {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
              removeEvent(ele);
            });
          } else if (!isString(eventFullName)) {
            for (var key in eventFullName) {
              this.off(key, eventFullName[key]);
            }
          } else {
            if (isFunction(selector)) {
              callback = selector;
              selector = "";
            }
            each(getSplitValues(eventFullName), function(i, eventFullName2) {
              var _a = parseEventName(eventFullName2), nameOriginal = _a[0], namespaces = _a[1], name = getEventNameBubbling(nameOriginal);
              _this.each(function(i2, ele) {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                  return;
                removeEvent(ele, name, namespaces, selector, callback);
              });
            });
          }
          return this;
        };
        function on(eventFullName, selector, data2, callback, _one) {
          var _this = this;
          if (!isString(eventFullName)) {
            for (var key in eventFullName) {
              this.on(key, selector, data2, eventFullName[key], _one);
            }
            return this;
          }
          if (!isString(selector)) {
            if (isUndefined(selector) || isNull(selector)) {
              selector = "";
            } else if (isUndefined(data2)) {
              data2 = selector;
              selector = "";
            } else {
              callback = data2;
              data2 = selector;
              selector = "";
            }
          }
          if (!isFunction(callback)) {
            callback = data2;
            data2 = void 0;
          }
          if (!callback)
            return this;
          each(getSplitValues(eventFullName), function(i, eventFullName2) {
            var _a = parseEventName(eventFullName2), nameOriginal = _a[0], namespaces = _a[1], name = getEventNameBubbling(nameOriginal), isEventHover = nameOriginal in eventsHover, isEventFocus = nameOriginal in eventsFocus;
            if (!name)
              return;
            _this.each(function(i2, ele) {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
              var finalCallback = function finalCallback2(event) {
                if (event.target["___i" + event.type])
                  return event.stopImmediatePropagation();
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                  return;
                if (!selector && (isEventFocus && (event.target !== ele || event.___ot === name) || isEventHover && event.relatedTarget && ele.contains(event.relatedTarget)))
                  return;
                var thisArg = ele;
                if (selector) {
                  var target = event.target;
                  while (!matches(target, selector)) {
                    if (target === ele)
                      return;
                    target = target.parentNode;
                    if (!target)
                      return;
                  }
                  thisArg = target;
                }
                Object.defineProperty(event, "currentTarget", {
                  configurable: true,
                  get: function get() {
                    return thisArg;
                  }
                });
                Object.defineProperty(event, "delegateTarget", {
                  configurable: true,
                  get: function get() {
                    return ele;
                  }
                });
                Object.defineProperty(event, "data", {
                  configurable: true,
                  get: function get() {
                    return data2;
                  }
                });
                var returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                  removeEvent(ele, name, namespaces, selector, finalCallback2);
                }
                if (returnValue === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              };
              finalCallback.guid = callback.guid = callback.guid || cash.guid++;
              addEvent(ele, name, namespaces, selector, finalCallback);
            });
          });
          return this;
        }
        fn.on = on;
        function one(eventFullName, selector, data2, callback) {
          return this.on(eventFullName, selector, data2, callback, true);
        }
        ;
        fn.one = one;
        fn.ready = function(callback) {
          var cb = function cb2() {
            return setTimeout(callback, 0, cash);
          };
          if (doc.readyState !== "loading") {
            cb();
          } else {
            doc.addEventListener("DOMContentLoaded", cb);
          }
          return this;
        };
        fn.trigger = function(event, data2) {
          if (isString(event)) {
            var _a = parseEventName(event), nameOriginal = _a[0], namespaces = _a[1], name_1 = getEventNameBubbling(nameOriginal);
            if (!name_1)
              return this;
            var type = eventsMouseRe.test(name_1) ? "MouseEvents" : "HTMLEvents";
            event = doc.createEvent(type);
            event.initEvent(name_1, true, true);
            event.namespace = namespaces.join(eventsNamespacesSeparator);
            event.___ot = nameOriginal;
          }
          event.___td = data2;
          var isEventFocus = event.___ot in eventsFocus;
          return this.each(function(i, ele) {
            if (isEventFocus && isFunction(ele[event.___ot])) {
              ele["___i" + event.type] = true;
              ele[event.___ot]();
              ele["___i" + event.type] = false;
            }
            ele.dispatchEvent(event);
          });
        };
        function getValue(ele) {
          if (ele.multiple && ele.options)
            return pluck(filter.call(ele.options, function(option) {
              return option.selected && !option.disabled && !option.parentNode.disabled;
            }), "value");
          return ele.value || "";
        }
        var queryEncodeSpaceRe = /%20/g, queryEncodeCRLFRe = /\r?\n/g;
        function queryEncode(prop, value) {
          return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value.replace(queryEncodeCRLFRe, "\r\n")).replace(queryEncodeSpaceRe, "+");
        }
        var skippableRe = /file|reset|submit|button|image/i, checkableRe = /radio|checkbox/i;
        fn.serialize = function() {
          var query = "";
          this.each(function(i, ele) {
            each(ele.elements || [ele], function(i2, ele2) {
              if (ele2.disabled || !ele2.name || ele2.tagName === "FIELDSET" || skippableRe.test(ele2.type) || checkableRe.test(ele2.type) && !ele2.checked)
                return;
              var value = getValue(ele2);
              if (!isUndefined(value)) {
                var values = isArray(value) ? value : [value];
                each(values, function(i3, value2) {
                  query += queryEncode(ele2.name, value2);
                });
              }
            });
          });
          return query.slice(1);
        };
        function val(value) {
          if (!arguments.length)
            return this[0] && getValue(this[0]);
          return this.each(function(i, ele) {
            var isSelect = ele.multiple && ele.options;
            if (isSelect || checkableRe.test(ele.type)) {
              var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];
              if (isSelect) {
                each(ele.options, function(i2, option) {
                  option.selected = eleValue_1.indexOf(option.value) >= 0;
                }, true);
              } else {
                ele.checked = eleValue_1.indexOf(ele.value) >= 0;
              }
            } else {
              ele.value = isUndefined(value) || isNull(value) ? "" : value;
            }
          });
        }
        fn.val = val;
        fn.clone = function() {
          return this.map(function(i, ele) {
            return ele.cloneNode(true);
          });
        };
        fn.detach = function(comparator) {
          filtered(this, comparator).each(function(i, ele) {
            if (ele.parentNode) {
              ele.parentNode.removeChild(ele);
            }
          });
          return this;
        };
        var fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
        var containers = {
          "*": div,
          tr: tbody,
          td: tr,
          th: tr,
          thead: table,
          tbody: table,
          tfoot: table
        };
        function parseHTML(html2) {
          if (!isString(html2))
            return [];
          if (singleTagRe.test(html2))
            return [createElement(RegExp.$1)];
          var fragment = fragmentRe.test(html2) && RegExp.$1, container = containers[fragment] || containers["*"];
          container.innerHTML = html2;
          return cash(container.childNodes).detach().get();
        }
        cash.parseHTML = parseHTML;
        fn.empty = function() {
          return this.each(function(i, ele) {
            while (ele.firstChild) {
              ele.removeChild(ele.firstChild);
            }
          });
        };
        function html(html2) {
          if (!arguments.length)
            return this[0] && this[0].innerHTML;
          if (isUndefined(html2))
            return this;
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            ele.innerHTML = html2;
          });
        }
        fn.html = html;
        fn.remove = function(comparator) {
          filtered(this, comparator).detach().off();
          return this;
        };
        function text(text2) {
          if (isUndefined(text2))
            return this[0] ? this[0].textContent : "";
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            ele.textContent = text2;
          });
        }
        ;
        fn.text = text;
        fn.unwrap = function() {
          this.parent().each(function(i, ele) {
            if (ele.tagName === "BODY")
              return;
            var $ele = cash(ele);
            $ele.replaceWith($ele.children());
          });
          return this;
        };
        fn.offset = function() {
          var ele = this[0];
          if (!ele)
            return;
          var rect = ele.getBoundingClientRect();
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        };
        fn.offsetParent = function() {
          return this.map(function(i, ele) {
            var offsetParent = ele.offsetParent;
            while (offsetParent && computeStyle(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docEle;
          });
        };
        fn.position = function() {
          var ele = this[0];
          if (!ele)
            return;
          var isFixed = computeStyle(ele, "position") === "fixed", offset = isFixed ? ele.getBoundingClientRect() : this.offset();
          if (!isFixed) {
            var doc_1 = ele.ownerDocument;
            var offsetParent = ele.offsetParent || doc_1.documentElement;
            while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent !== ele && isElement(offsetParent)) {
              var parentOffset = cash(offsetParent).offset();
              offset.top -= parentOffset.top + computeStyleInt(offsetParent, "borderTopWidth");
              offset.left -= parentOffset.left + computeStyleInt(offsetParent, "borderLeftWidth");
            }
          }
          return {
            top: offset.top - computeStyleInt(ele, "marginTop"),
            left: offset.left - computeStyleInt(ele, "marginLeft")
          };
        };
        fn.children = function(comparator) {
          return filtered(cash(unique(pluck(this, function(ele) {
            return ele.children;
          }))), comparator);
        };
        fn.contents = function() {
          return cash(unique(pluck(this, function(ele) {
            return ele.tagName === "IFRAME" ? [ele.contentDocument] : ele.tagName === "TEMPLATE" ? ele.content.childNodes : ele.childNodes;
          })));
        };
        fn.find = function(selector) {
          return cash(unique(pluck(this, function(ele) {
            return find(selector, ele);
          })));
        };
        var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, scriptTypeRe = /^$|^module$|\/(java|ecma)script/i, scriptAttributes = ["type", "src", "nonce", "noModule"];
        function evalScripts(node, doc2) {
          var collection = cash(node);
          collection.filter("script").add(collection.find("script")).each(function(i, ele) {
            if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
              var script_1 = createElement("script");
              script_1.text = ele.textContent.replace(HTMLCDATARe, "");
              each(scriptAttributes, function(i2, attr2) {
                if (ele[attr2])
                  script_1[attr2] = ele[attr2];
              });
              doc2.head.insertBefore(script_1, null);
              doc2.head.removeChild(script_1);
            }
          });
        }
        function insertElement(anchor, target, left, inside, evaluate) {
          if (inside) {
            anchor.insertBefore(target, left ? anchor.firstChild : null);
          } else {
            if (anchor.nodeName === "HTML") {
              anchor.parentNode.replaceChild(target, anchor);
            } else {
              anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
            }
          }
          if (evaluate) {
            evalScripts(target, anchor.ownerDocument);
          }
        }
        function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
          each(selectors, function(si, selector) {
            each(cash(selector), function(ti, target) {
              each(cash(anchors), function(ai, anchor) {
                var anchorFinal = inverse ? target : anchor, targetFinal = inverse ? anchor : target, indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
              }, reverseLoop3);
            }, reverseLoop2);
          }, reverseLoop1);
          return anchors;
        }
        fn.after = function() {
          return insertSelectors(arguments, this, false, false, false, true, true);
        };
        fn.append = function() {
          return insertSelectors(arguments, this, false, false, true);
        };
        fn.appendTo = function(selector) {
          return insertSelectors(arguments, this, true, false, true);
        };
        fn.before = function() {
          return insertSelectors(arguments, this, false, true);
        };
        fn.insertAfter = function(selector) {
          return insertSelectors(arguments, this, true, false, false, false, false, true);
        };
        fn.insertBefore = function(selector) {
          return insertSelectors(arguments, this, true, true);
        };
        fn.prepend = function() {
          return insertSelectors(arguments, this, false, true, true, true, true);
        };
        fn.prependTo = function(selector) {
          return insertSelectors(arguments, this, true, true, true, false, false, true);
        };
        fn.replaceWith = function(selector) {
          return this.before(selector).remove();
        };
        fn.replaceAll = function(selector) {
          cash(selector).replaceWith(this);
          return this;
        };
        fn.wrapAll = function(selector) {
          var structure = cash(selector), wrapper = structure[0];
          while (wrapper.children.length) {
            wrapper = wrapper.firstElementChild;
          }
          this.first().before(structure);
          return this.appendTo(wrapper);
        };
        fn.wrap = function(selector) {
          return this.each(function(i, ele) {
            var wrapper = cash(selector)[0];
            cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
          });
        };
        fn.wrapInner = function(selector) {
          return this.each(function(i, ele) {
            var $ele = cash(ele), contents = $ele.contents();
            contents.length ? contents.wrapAll(selector) : $ele.append(selector);
          });
        };
        fn.has = function(selector) {
          var comparator = isString(selector) ? function(i, ele) {
            return find(selector, ele).length;
          } : function(i, ele) {
            return ele.contains(selector);
          };
          return this.filter(comparator);
        };
        fn.is = function(comparator) {
          var compare = getCompareFunction(comparator);
          return some.call(this, function(ele, i) {
            return compare.call(ele, i, ele);
          });
        };
        fn.next = function(comparator, _all, _until) {
          return filtered(cash(unique(pluck(this, "nextElementSibling", _all, _until))), comparator);
        };
        fn.nextAll = function(comparator) {
          return this.next(comparator, true);
        };
        fn.nextUntil = function(until, comparator) {
          return this.next(comparator, true, until);
        };
        fn.not = function(comparator) {
          var compare = getCompareFunction(comparator);
          return this.filter(function(i, ele) {
            return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
          });
        };
        fn.parent = function(comparator) {
          return filtered(cash(unique(pluck(this, "parentNode"))), comparator);
        };
        fn.index = function(selector) {
          var child = selector ? cash(selector)[0] : this[0], collection = selector ? this : cash(child).parent().children();
          return indexOf.call(collection, child);
        };
        fn.closest = function(comparator) {
          var filtered2 = this.filter(comparator);
          if (filtered2.length)
            return filtered2;
          var $parent = this.parent();
          if (!$parent.length)
            return filtered2;
          return $parent.closest(comparator);
        };
        fn.parents = function(comparator, _until) {
          return filtered(cash(unique(pluck(this, "parentElement", true, _until))), comparator);
        };
        fn.parentsUntil = function(until, comparator) {
          return this.parents(comparator, until);
        };
        fn.prev = function(comparator, _all, _until) {
          return filtered(cash(unique(pluck(this, "previousElementSibling", _all, _until))), comparator);
        };
        fn.prevAll = function(comparator) {
          return this.prev(comparator, true);
        };
        fn.prevUntil = function(until, comparator) {
          return this.prev(comparator, true, until);
        };
        fn.siblings = function(comparator) {
          return filtered(cash(unique(pluck(this, function(ele) {
            return cash(ele).parent().children().not(ele);
          }))), comparator);
        };
        if (typeof exports !== "undefined") {
          module.exports = cash;
        } else {
          win["cash"] = win["$"] = cash;
        }
      })();
    }
  });

  // app/javascript/application.js
  var import_rails_ujs = __toESM(require_rails_ujs());
  var import_actioncable = __toESM(require_action_cable());
  var import_turbolinks = __toESM(require_turbolinks());
  var import_nanomorph = __toESM(require_nanomorph());
  var import_cash_dom = __toESM(require_cash());
  window.$ = import_cash_dom.default;
  import_turbolinks.default.SnapshotRenderer.prototype.assignNewBody = function() {
    (0, import_nanomorph.default)(document.body, this.newBody);
  };
  var originalCacheSnapshot = import_turbolinks.default.Controller.prototype.cacheSnapshot;
  var originalDefer = import_turbolinks.default.defer;
  var noDefer = (callback) => callback();
  import_turbolinks.default.Controller.prototype.cacheSnapshot = function() {
    import_turbolinks.default.defer = noDefer;
    originalCacheSnapshot.call(this, ...arguments);
    import_turbolinks.default.defer = originalDefer;
  };
  import_turbolinks.default.BrowserAdapter.prototype.showProgressBarAfterDelay = function() {
    return this.progressBarTimeout = setTimeout(this.showProgressBar, 100);
  };
  import_rails_ujs.default.start();
  import_turbolinks.default.start();
  document.addEventListener("touchstart", () => {
  }, true);
  window.startListeningForEvents = () => {
    const consumer = (0, import_actioncable.createConsumer)();
    consumer.subscriptions.create(
      { channel: "ScoringNotificationsChannel" },
      {
        received() {
          import_turbolinks.default.visit(window.location.toString(), { action: "replace" });
        }
      }
    );
  };
  var fixSwitcher = (element, switcher) => {
    if (parseInt((0, import_cash_dom.default)(element).data("i"), 10) === 0) {
      switcher.removeClass("move");
    } else {
      switcher.addClass("move");
    }
  };
  var checkSelected = () => {
    if ((0, import_cash_dom.default)(".check_selection .mustmark").find(".field input:checked").length > 0) {
      (0, import_cash_dom.default)(".check_selection .bottom-btn").prop("disabled", false).removeClass("disabled");
    } else {
      (0, import_cash_dom.default)(".check_selection .bottom-btn").prop("disabled", true).addClass("disabled");
    }
  };
  (0, import_cash_dom.default)(document).on("ready, turbolinks:load", () => {
    if ((0, import_cash_dom.default)(".check_selection").length > 0) {
      checkSelected();
      (0, import_cash_dom.default)(".check_selection").on("change", checkSelected);
    }
    (0, import_cash_dom.default)(".switcher label").on("click", function() {
      const switcher = (0, import_cash_dom.default)(this).parents(".switcher");
      fixSwitcher(this, switcher);
    });
    (0, import_cash_dom.default)(".switcher input:checked").each((_key, element) => {
      const switcher = (0, import_cash_dom.default)(element).parents(".switcher");
      const label = (0, import_cash_dom.default)(element).siblings("label");
      fixSwitcher(label, switcher);
    });
    (0, import_cash_dom.default)(".singlemark .field").each((_key, element) => {
      const field = (0, import_cash_dom.default)(element);
      const checkbox = field.find("input");
      const siblings = field.siblings(".field");
      if (checkbox.is(":checked")) {
        field.addClass("selected");
      }
      checkbox.on("change", () => {
        siblings.each((_, el) => (0, import_cash_dom.default)(el).removeClass("selected"));
        field.toggleClass("selected");
      });
    });
    (0, import_cash_dom.default)(".multimark .field").each((_key, element) => {
      const field = (0, import_cash_dom.default)(element);
      const checkbox = field.find("input");
      if (checkbox.is(":checked")) {
        field.addClass("selected");
      }
      checkbox.on("change", () => {
        field.toggleClass("selected");
      });
    });
    (0, import_cash_dom.default)(".plusminus").each((_key, element) => {
      const picker = (0, import_cash_dom.default)(element);
      const p = picker.find("button:last-child");
      const m = picker.find("button:first-child");
      const input = picker.find("input");
      const min = parseInt(input.attr("min"), 10);
      const max = parseInt(input.attr("max"), 10) || 1e3;
      const inputFunc = () => {
        const i = parseInt(input.val(), 10);
        if (i <= min || !i) {
          input.val(min);
          p.prop("disabled", false);
          m.prop("disabled", true);
        } else if (i >= max) {
          input.val(max);
          p.prop("disabled", true);
          m.prop("disabled", false);
        } else {
          p.prop("disabled", false);
          m.prop("disabled", false);
        }
      };
      const changeFunc = (qty) => {
        const q = parseInt(qty, 10);
        const i = parseInt(input.val(), 10);
        if (i < max && q > 0 || i > min && !(q > 0)) {
          input.val(i + q);
          inputFunc();
        }
      };
      m.on("click", (e) => {
        e.preventDefault();
        changeFunc(-1);
      });
      p.on("click", (e) => {
        e.preventDefault();
        changeFunc(1);
      });
      input.on("change", () => {
        inputFunc();
      });
      inputFunc();
    });
  });
})();


//# sourceMappingURL=application.js-485ecf3af2fab65e6a42e931dee9e9931a61a9d46f66153fed8901851d6e49f0.map
