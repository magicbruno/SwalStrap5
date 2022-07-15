/**********************************************
 * SWALSTRAP 5
 * Sweetalert for Boostrap 5.x.x
 * (c) Bruno Migliaretti 2022
 * https://github.com/magicbruno/SwalStrap5
 * 
 **********************************************/
(function (doc, win) {
    "use strict";

    /************************************************************************************************
     * CONSTANTS
     */
    // errors
    const NO_BOOTSTRAP = 1;
    const INVALID_PARAMETER = 2;
    const INVALID_OPTION = 3;
    const NO_BOOTSTRAP_MODAL = 4;
    const NO_BOOTSTRAP_TOAST = 5;
    const VERSION_WARNING = 6;
    const JAVASCRIPT_ERROR = -1;

    // icons
    const ICON_SUCCESS = `<div class="swal2-icon swal2-success swal2-icon-show d-flex" hidden>
                                <div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div>
                                <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
                                <div class="swal2-success-ring"></div> 
                                <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div>
                                <div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div>
                           </div>`;
    const ICON_ERROR = `<div class="swal2-icon swal2-error swal2-icon-show d-flex" hidden>
                                <span class="swal2-x-mark">
                                    <span class="swal2-x-mark-line-left"></span>
                                    <span class="swal2-x-mark-line-right"></span>
                                </span>
                           </div>`;
    const ICON_WARNING = `<div class="swal2-icon swal2-warning swal2-icon-show d-flex" hidden>
                                <div class="swal2-icon-content">!</div>
                           </div>`;
    const ICON_INFO = `<div class="swal2-icon swal2-info swal2-icon-show d-flex" hidden>
                                <div class="swal2-icon-content">i</div>
                           </div>`;
    const ICON_QUESTION = `<div class="swal2-icon swal2-question swal2-icon-show d-flex" hidden>
                                <div class="swal2-icon-content">?</div>
                           </div>`;
    const ICON_SUCCESS_ALT =   `<svg xmlns="http://www.w3.org/2000/svg" width="2.2rem" height="2.2rem" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>`                      

    const DismissReason = Object.freeze({
        cancel: 'cancel',
        backdrop: 'backdrop',
        close: 'close',
        esc: 'esc',
        timer: 'timer'
    });

    /**
     * Main class
     */
    class Swalstrap {
        /**
         * 
         * @param {Object} options 
         */
        constructor(options) {
            const opt = options || {};
            //this.config = new SwalOptions(opt);
            // Create unique token to construct modal ids
            this.currentId = this.createId();
            this.DismissReason = DismissReason;
            this.defaultOptions = opt;
        }

        config = null;              // Current dialog configuration
        currentId = '';             // Generated part of dialog element ids
        modal = null;               // Current dialog bootstrap modal object
        modalElement = null;        // Current dialog modal DOM element      
        currentButton = null;       // Current dialog/toast clicked nutton
        modalResult = null;         // Current dialog/toast result
        defaultOptions = null;
        customClass = {};
        toastStyle = '';

        get VERSION () { return '1.0.0' };

        get defaultClasses() {
            return {
                container: '',
                popup: '',
                header: 'py-0 border-0 px-3 mt-3 mb-1',
                title: 'text-center h2 mt-3 mb-3',
                toastTitle: 'my-0 h5',
                closeButton: 'btn-close',
                icon: '',
                image: 'img-fluid mx-auto mt-4 mb-3',
                htmlContainer: 'text-center lead',
                toastHtml: '',
                input: 'mt-3 mb-1',
                inputLabel: '',
                validationMessage: 'justify-content-center d-flex rounded-0 align-items-center border-0 py-2 px-4 mt-3 mb-1 alert alert-danger',
                actions: 'justify-content-center border-0 py-0 px-4 mt-3 mb-1',
                confirmButton: 'btn btn-primary',
                denyButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary',
                loader: '',
                footer: 'justify-content-center py-0 pt-2 px-4 mt-3 mb-1',
                timerProgressBar: ''
            }
        }

        resetCustomClasses() {
            let defaults = this.defaultClasses;
            let custom = this.config.customClass;
            for (const key in defaults) {
                if (typeof custom[key] !== 'undefined' && custom[key] !== null) {
                    this.customClass[key] = custom[key];
                } else {
                    this.customClass[key] = defaults[key];
                }
            }
        }

        /**
         * Create unique token
         * @returns token string
         */
        createId() {
            return new Date().toISOString().replace(/[^\d]/g, '') + Math.floor(Math.random() * 10);
        }

        /**
         * Handle error mesage
         * @param {Number} errorId error type
         * @param {String} message error mesage
         */
        error(errorId, message = '') {

            switch (errorId) {
                case NO_BOOTSTRAP:
                    console.error('Error: Bootstrap 5.x.x not found!');
                    break;
                case INVALID_PARAMETER:
                    console.error('Error: Invalid parameter!');
                    break;
                case INVALID_OPTION:
                    console.warn(`Warning: Invalid option! ${message}`);
                    break;
                case NO_BOOTSTRAP_MODAL:
                    console.error('Error: Bootstrap Modal 5.x.x not found!');
                    break;
                case NO_BOOTSTRAP_TOAST:
                    console.warn('Warning: Bootstrap Toast 5.x.x not found!');
                    break;
                case VERSION_WARNING:
                    console.warn('Warning: Found not tested Bootstrap Version!');
                    break;
                default:
                    console.error(`Javascript error ${message}`);
                    break;
            }
        }

        /**
         * property: modal html content based on config
         */
        get modalContent() {
            // TODO: popolare select e radio
            this.currentId = this.createId();
            return `<div class="modal fade ${this.customClass.container}" id="modal_${this.currentId}" tabindex="-1" role="dialog" aria-labelledby="${this.config.title}" 
                        aria-hidden="true">
                        <div class="modal-dialog ${this.customClass.popup} ${this.config.position == 'top' || this.config.position == 'top-center' ? '' : 'modal-dialog-centered'}" role="document">
                            <div class="modal-content pb-3 px-0">
                                <div class="modal-header ${this.customClass.header} ${this.display('btn-close')}">
                                    <button data-swalstrap="btn-close" type="button" class="${this.customClass.closeButton}" 
                                        data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body px-4 py-0">
                                    <div class="container-fluid d-flex flex-column">
                                        <div class="swal-bs-icon-container ${this.display('icon')}" data-swalstrap="icon">
                                            ${this.currentIcon}
                                        </div>
                                        <img data-swalstrap="image" src="${this.config.imageUrl}" alt="${this.config.imageAlt}"
                                            class="${this.customClass.image} ${this.display('image')}">
                                        <div data-swalstrap="title" class="${this.customClass.title} ${this.display('title')}">
                                            ${this.config.title || this.config.titleText}</div>
                                        <div data-swalstrap="text" class="${this.customClass.htmlContainer} ${this.display('text')}">
                                            ${this.config.html || this.config.text}</div>
                                        <input data-swalstrap="input" class="form-control form-control-lg  ${this.customClass.input} ${this.display('input')}" 
                                            placeholder="${this.config.inputLabel || this.config.inputPlaceholder}" type="${this.config.input}"
                                            value="${this.config.inputValue}">
                                        <select data-swalstrap="select" class="form select form-select-lg ${this.customClass.input} ${this.display('select')}">
                                        </select>
                                        <div class="form-check form-check-inline ${this.customClass.input} lead d-flex justify-content-center ${this.display('checkbox')}"
                                            data-swalstrap="checkbox" >
                                            <input class="form-check-input" type="checkbox" id="ckbox_${this.currentId}" 
                                                ${this.config.inputValue == true ? 'checked' : ''} >
                                            <label class="form-check-label ms-2" for="ckbox_${this.currentId}">
                                                ${this.config.inputLabel || this.config.inputPlaceholder}</label>
                                        </div>
                                        <div class="row justify-content-center ${this.customClass.input} lead ${this.display('radio')}" data-swalstrap="radio">
                                            
                                        </div>
                                        <textarea class="form-control form-control-lg  ${this.customClass.input} ${this.display('textarea')}" rows="3" 
                                            placeholder="${this.config.inputLabel || this.config.inputPlaceholder}" 
                                            data-swalstrap="textarea">${this.config.inputValue}</textarea>
                                    </div>
                                </div>
                                <div data-swalstrap="alert" hidden
                                    class="${this.customClass.validationMessage}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                    <span class="ps-2"></span> 
                                </div>
                                <div data-swalstrap="actions" 
                                    class="modal-footer ${this.customClass.actions} ${this.display('actions')}">
                                    <button data-swalstrap="btn-confirm" type="button" class="${this.customClass.confirmButton} ${this.display('btn-confirm')}">
                                        ${this.config.confirmButtonText}</button>
                                    <button data-swalstrap="btn-deny" type="button" class="btn ${this.customClass.denyButton} ${this.display('btn-deny')}">
                                        ${this.config.denyButtonText}</button>
                                    <button data-swalstrap="btn-cancel" type="button" class="${this.customClass.cancelButton} ${this.display('btn-cancel')}"
                                        data-bs-dismiss="modal">${this.config.cancelButtonText}</button>
                                </div>
                                <div class="modal-footer ${this.customClass.footer} ${this.display('footer')}" 
                                    data-swalstrap="footer">
                                    ${this.config.footer}
                                </div>
                                <div class="swal2-timer-progress-bar-container">
                                    <div class="swal2-timer-progress-bar ${this.customClass.timerProgressBar} d-none" data-swalstrap="progress-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        };

        get toastContent() {
            return `<div class="toast position-absolute align-items-center ${this.toastBackground} py-1 pe-2 m-3 ${this.customClass.popup} ${this.toastPosition}" role="alert" 
                        aria-live="assertive" aria-atomic="true" id="toast_${this.currentId}">
                        <div class="d-flex align-items-center">
                            <div class="toast-icon-container ${this.display('icon')} ${!this.toastBackground && this.config.icon == 'success' ? 'text-success' : ''}" data-swalstrap="icon">
                                ${this.currentIcon}
                            </div>
                            <div class="toast-body">
                                <div  data-swalstrap="title"  class="${this.customClass.toastTitle}  ${this.display('title')}"> 
                                    ${this.config.title || this.config.titleText}
                                </div>
                                <span  data-swalstrap="text" class="${this.display('text')}">
                                    ${this.config.html || this.config.text}
                                </span>
                            </div>
                            <button data-swalstrap="btn-close" type="button" class="btn-close ${this.toastBackground ? 'btn-close-white' : ''}  me-2 m-auto" 
                            data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;
        }

        /**
         * Property: icon template based on modal config
         */
        get currentIcon() {
            switch (this.config.icon) {
                case 'warning':
                    return ICON_WARNING;
                case 'error':
                    return ICON_ERROR;
                case 'success':
                    return this.config.toast ? ICON_SUCCESS_ALT : ICON_SUCCESS;
                case 'info':
                    return ICON_INFO;
                case 'question':
                    return ICON_QUESTION;
                default:
                    return '';
            }
        }

        // propery: Array of strings imput types that behave like 'text'
        get textLikeInputs() {
            return 'text,email,password,number,tel,url'.split(',');
        }

        // property: Modal input value
        get modalInputValue() {
            let value = 'Not implemented yet';
            if (this.textLikeInputs.indexOf(this.config.input) > -1)
                value = this.modalElement.querySelector('[data-swalstrap="input"]').value;
            else if (this.config.input == 'select') {
                value = this.modalElement.querySelector('[data-swalstrap="select"]').value;
            } else if (this.config.input == 'radio') {
                let radios = this.modalElement.querySelectorAll('input[type="radio"]');
                let selected = Array.from(radios).find(radio => radio.checked);
                if (selected)
                    value = selected.value;
                else
                    value = 'No selections';
            } else if (this.config.input == 'checkbox')
                value = this.modalElement.querySelector('[data-swalstrap="checkbox"] > input').checked;
            else if (this.config.input == 'textarea')
                value = this.modalElement.querySelector('[data-swalstrap="textarea"]').value;
            return value;
        }

        get toastPosition() {
            switch (this.config.position) {
                case 'top-start':
                    return 'top-0 start-0';
                case 'top':
                case 'top-center':
                    return 'top-0 start-50 translate-middle-x';
                case 'top-end':
                    return 'top-0 end-0';
                case 'center-start':
                    return 'top-50 start-0 translate-middle-y';
                case 'center':
                    return 'top-50 start-50 translate-middle';
                case 'center-end':
                    return 'top-50 end-0 translate-middle-y';
                case 'bottom-start':
                    return 'bottom-0 start-0';
                case 'bottom':
                    return 'bottom-0 start-50 translate-middle-x';
                case 'bottom-end':
                    return 'bottom-0 end-0';
                default:
                    break;
            }
        }

        get toastBackground() {
            let style = this.config.toastStyle;
            let icon = this.config.icon;
            if (style == 'auto') {
                if (icon == 'error')
                    style = 'danger';
                else if (icon == 'question')
                    style = 'secondary';
                else 
                    style = icon;
            }
                
            if (style) {
                return `text-bg-${style} border-0`;
            }
            return '';
        }

        /**
         * Validation message (if not empty blocks dialog confirm action)
         */
        _validationMessage = '';
        set validationMessage(message) {
            if (this.modalElement != null) {
                this.modalElement.querySelector('[data-swalstrap="alert"] > span').innerText = message;
                if (message)
                    this.modalElement.querySelector('[data-swalstrap="alert"]').removeAttribute('hidden');
                else
                    this.modalElement.querySelector('[data-swalstrap="alert"]').setAttribute('hidden', '');
                this._validationMessage = message;
            }
        }
        get validationMessage() {
            return this._validationMessage;
        }

        get isToast() {
            if(bootstrap.Toast)
                return this.modal instanceof bootstrap.Toast;
            return false;
        }

        getRadioTemplate(text, value, id) {
            let html = `<div class="form-check form-check-inline col-auto">
                            <input class="form-check-input" type="radio" name="radio${this.currentId}" id="r${this.currentId}${id}" value="${value}">
                            <label class="form-check-label" for="r${this.currentId}${id}">${text}</label>
                        </div>`;
            let temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.firstChild;
        }

        /**
         * Show/hide html nodes in modal html element
         * @param {String} swalElement element type (value of data-swalstrap attribute)  
         * @returns 'd-none' or ''
         */
        display(swalElement) {
            switch (swalElement) {
                case 'btn-close':
                    if (!this.config.showCloseButton)
                        return 'd-none';
                    break;
                case 'icon':
                    let validIcons = 'success,warning,error,info,question'.split(',');
                    if (!this.config.icon)
                        return 'd-none';
                    else if (validIcons.indexOf(this.config.icon) == -1) {
                        this.error(INVALID_OPTION, this.config.icon);
                        return 'd-none';
                    }
                    break;
                case 'image':
                    if (!this.config.imageUrl)
                        return 'd-none';
                    break;
                case 'title':
                    if (!(this.config.title || this.config.titleText))
                        return 'd-none';
                    break;
                case 'text':
                    if (!(this.config.html || this.config.text))
                        return 'd-none';
                    break;
                case 'input':

                    if (this.textLikeInputs.indexOf(this.config.input) == -1)
                        return 'd-none';
                    break;
                case 'select':
                    if (this.config.input != 'select')
                        return 'd-none';
                    break;
                case 'checkbox':
                    if (this.config.input != 'checkbox')
                        return 'd-none';
                    break;
                case 'radio':
                    if (this.config.input != 'radio')
                        return 'd-none';
                    break;
                case 'textarea':
                    if (this.config.input != 'textarea')
                        return 'd-none';
                    break;
                case 'actions':
                    if (!(this.config.showDenyButton || this.config.showCancelButton || this.config.showConfirmButton))
                        return 'd-none';
                    break;
                case 'btn-confirm':
                    if (!this.config.showConfirmButton)
                        return 'd-none';
                    break;
                case 'btn-cancel':
                    if (!this.config.showCancelButton)
                        return 'd-none';
                    break;
                case 'btn-deny':
                    if (!this.config.showDenyButton)
                        return 'd-none';
                    break;
                case 'footer':
                    if (!this.config.footer)
                        return 'd-none';
                    break;
                default:
                    break;
            }
            return '';
        }



        /**
         * Dispose current modal and html element
         */
        disposeCurrentModal() {
            try {
                if (this.modal != null) {
                    this.modal.dispose();
                    this.modalElement.remove();
                }
                this.currentButton = null;
                this.modalResult = new SweetAlertResult(false, false, false);
                this.modalResult.dismiss = null;
            } catch (error) {
                this.error(JAVASCRIPT_ERROR, error);
            }
        }

        /**
         * Create modal html element form modal html content
         * @returns modal html element
         */
        createModalElement() {
            let temp = document.createElement('div');
            if (this.config.toast)
                temp.innerHTML = this.toastContent;
            else
                temp.innerHTML = this.modalContent;
            return temp.firstChild;
        }

        checkBootstrap() {

            if (!bootstrap) {
                this.error(NO_BOOTSTRAP);
                return false;
            };
            if (!bootstrap.Modal) {
                this.error(NO_BOOTSTRAP_MODAL);
                return false;
            };
            if (!bootstrap.Modal.VERSION) {
                this.error(NO_BOOTSTRAP_MODAL);
                return false;
            };
            if (this.config.toast && !bootstrap.Toast) {
                this.error(NO_BOOTSTRAP_TOAST);
                return false;
            };
            if (parseInt(bootstrap.Modal.VERSION) != 5)
                this.error(VERSION_WARNING);
            return true;
        }

        initCallbacks() {
            if (!this.modal)
                return;
            const self = this;
            const isToast = this.isToast;
            if (typeof this.config.willOpen === 'function') {
                let eventName = isToast ? 'show.bs.toast' : 'show.bs.modal';
                this.modalElement.addEventListener(eventName, event => {
                    self.config.willOpen(self.modalElement);
                }, { once: true });
            }
            if (typeof this.config.didOpen === 'function') {
                let eventName = isToast ? 'shown.bs.toast' : 'shown.bs.modal';
                this.modalElement.addEventListener(eventName, event => {
                    self.config.didOpen(self.modalElement);
                }, { once: true });
            }
            if (typeof this.config.willClose === 'function') {
                let eventName = isToast ? 'hide.bs.toast' : 'hide.bs.modal';
                this.modalElement.addEventListener(eventName, event => {
                    self.config.willClose(self.modalElement);
                }, { once: true });
            }
            if (typeof this.config.didClose === 'function') {
                let eventName = isToast ? 'hidden.bs.toast' : 'hidden.bs.modal';
                this.modalElement.addEventListener(eventName, event => {
                    self.config.didClose(self.modalElement);
                }, { once: true });
            }
        }

        /**
         * Create and open current modal
         * @param {SwalOptions} options Modal options
         * @returns Promise resolving a SweetAlertResult object
         */
        fire() {
            let options = {};
            if (typeof arguments[0] === 'string') {
                options.title = arguments[0];
                if (arguments[1])
                    options.html = arguments[1];
                if (arguments[2])
                    options.icon = arguments[2];
            } else if (typeof arguments[0] === 'object') {
                options = arguments[0];
            }

            this.config = new SwalOptions(options, this.defaultOptions);

            if (!this.checkBootstrap())
                return;

            this.disposeCurrentModal();
            this.resetCustomClasses();
            this.modalElement = this.createModalElement();
            document.body.appendChild(this.modalElement);

            if (!this.config.toast)
                return this.doBootstrapModal();
            else
                return this.doBootrapToast();
        }

        doBootrapToast() {
            const self = this;
             // Bootstrap modal options
             let bsOptions = {};
             let delay = parseInt(this.config.timer);
             if(delay){
                bsOptions.delay = delay;
                bsOptions.autohide = true;
             }  
             else {
                bsOptions.autohide = false;
             }
             this.modal = new bootstrap.Toast(this.modalElement, bsOptions);  
             this.initCallbacks();

            // Icons
            if (this.config.icon) {
                this.modalElement.addEventListener('show.bs.toast', event => {
                    // Icon animation start
                    let icon = self.modalElement.querySelector('.swal2-icon');
                    if (icon)
                        icon.removeAttribute('hidden');

                }, { once: true });
            }

            this.modal.show();
            return new Promise((resolve, reject) => {
                self.modalElement.addEventListener('hidden.bs.modal', event => {
                    try {
                        resolve(self.modalResult);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }

        doBootstrapModal() {
            const self = this;
            // Bootstrap modal options
            let bsOptions = {};
            if (!this.config.allowOutsideClick)
                bsOptions.backdrop = 'static';
            else if (this.config.backdrop === false)
                bsOptions.backdrop = false;

            else
                bsOptions.backdrop = true;
            bsOptions.keyboard = this.config.allowEscapeKey;

            this.modal = new bootstrap.Modal(this.modalElement, bsOptions);

            // Init Swal callbacks
            this.initCallbacks();

            // Icons
            if (this.config.icon) {
                this.modalElement.addEventListener('show.bs.modal', event => {
                    // Icon animation start
                    self.modalElement.querySelector('.swal2-icon').removeAttribute('hidden');
                }, { once: true });
            }

            // Input select
            if (self.config.input == 'select') {
                const selectElement = this.modalElement.querySelector('[data-swalstrap="select"]');
                const inputOptions = this.config.inputOptions || {};
                for (const key in inputOptions) {
                    let opt = new Option(inputOptions[key], key);
                    selectElement.add(opt);
                }
            }

            // Input radio
            if (self.config.input == 'radio') {
                const radioContainer = this.modalElement.querySelector('[data-swalstrap="radio"]');
                const inputOptions = this.config.inputOptions || {};
                let n = 0;
                for (const key in inputOptions) {
                    let radio = self.getRadioTemplate(inputOptions[key], key, n);
                    radioContainer.appendChild(radio);
                    n++;
                }
            }

            // Actions block
            if (this.config.showCloseButton) {
                this.modalElement.querySelector('.btn-close').addEventListener('click', event => {
                    self.currentButton = event.target;
                    self.modalResult = new SweetAlertResult(false, false, false);
                    self.modalResult.dismiss = DismissReason.close;
                });
            }
            if (this.config.showCancelButton) {
                this.modalElement.querySelector('[data-swalstrap="btn-cancel"]').addEventListener('click', event => {
                    self.currentButton = event.target;
                    self.modalResult = new SweetAlertResult(false, false, false);
                    self.modalResult.dismiss = DismissReason.cancel;
                });
            }
            if (this.config.showDenyButton) {
                this.modalElement.querySelector('[data-swalstrap="btn-deny"]').addEventListener('click', event => {
                    self.currentButton = event.target;
                    self.modalResult = new SweetAlertResult(false, true, false);
                    self.modal.hide();
                });
            }
            if (this.config.showConfirmButton) {
                this.modalElement.querySelector('[data-swalstrap="btn-confirm"]').addEventListener('click', event => {
                    self.currentButton = event.target;
                    self.validationMessage = '';
                    if (self.config.input == 'email' && !self.modalInputValue) {
                        self.validationMessage = 'Invalid email';
                        return;
                    }
                    if (self.config.input == 'url' && !self.modalInputValue) {
                        self.validationMessage = 'Invalid url';
                        return;
                    }
                    const preConfirm = self.config.preConfirm;
                    if (typeof (preConfirm) === 'function') {
                        let result = preConfirm(self.modalInputValue);
                        if (result && typeof (result) === 'object' && typeof (result.then) === 'function') {
                            result.then(data => {
                                self.modalResult = new SweetAlertResult(true, false, data);
                                self.modal.hide();
                            });
                        } else if (!(result === false || self.validationMessage)) {
                            self.modalResult = new SweetAlertResult(true, false, result || self.modalInputValue);
                            self.modal.hide();
                        }
                    } else if (!self.validationMessage) {
                        self.modalResult = new SweetAlertResult(true, false, self.modalInputValue);
                        self.modal.hide();
                    }

                });
            }
            if (this.config.timer > 0) {
                this.initTimer();
            }
            this.modal.show();
            return new Promise((resolve, reject) => {
                self.modalElement.addEventListener('hidden.bs.modal', event => {
                    try {
                        this.stopTimer();
                        this.clearTimerProgressBar();
                        resolve(self.modalResult);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }

        showValidationMessage(message) {
            this.validationMessage = message;
        }

        isVisible() {
            if (this.modal)
                return this.modal._isShown;
            return false;
        }

        close(isTimer = false) {
            if (isTimer) {
                this.modalResult = new SweetAlertResult(false, false, this.modalInputValue || null);
                this.modalResult.dismiss = DismissReason.timer;
            }
            this.modal.hide();
        }

        getContainer() {
            return this.modalElement;
        }

        getTitle() {
            return this.modalElement.querySelector('[data-swalstrap="title"]');
        }

        getCloseButton() {
            return this.modalElement.querySelector('[data-swalstrap="btn-close"]');
        }

        getIcon() {
            return this.modalElement.querySelector('[data-swalstrap="icon"] > div');
        }

        getHtmlContainer() {
            return this.modalElement.querySelector('[data-swalstrap="text"]');
        }

        getImage() {
            return this.modalElement.querySelector('[data-swalstrap="image"]');
        }

        getFooter() {
            return this.modalElement.querySelector('[data-swalstrap="footer"]');
        }

        getConfirmButton() {
            return this.modalElement.querySelector('[data-swalstrap="btn-confirm"]');
        }

        getDenyButton() {
            return this.modalElement.querySelector('[data-swalstrap="btn-deny"]');
        }

        getCancelButton() {
            return this.modalElement.querySelector('[data-swalstrap="btn-cancel"]');
        }

        showLoading() {
            let actions = this.modalElement.querySelector('[data-swalstrap="actions"]');
            actions.classList.add('loading-spin');
            actions.removeAttribute('hidden');
        }

        hideLoading() {
            let actions = this.modalElement.querySelector('[data-swalstrap="actions"]');
            actions.classList.remove('loading-spin');
            if (!(this.config.showCancelButton || this.config.showConfirmButton || this.config.showDenyButton))
                actions.setAttribute('hidden', '');
        }

        isLoading() {
            return this.modalElement.querySelector('.modal-dialog').classList.contains('loading-spin');
        }

        getInput() {
            if (this.textLikeInputs.indexOf(this.config.input) > -1)
                return this.modalElement.querySelector('[data-swalstrap="input"]');
            else if (this.config.input == 'select') {
                return this.modalElement.querySelector('[data-swalstrap="select"]');
            } else if (this.config.input == 'radio') {
                return this.modalElement.querySelectorAll('input[type="radio"]');
            } else if (this.config.input == 'checkbox')
                return this.modalElement.querySelector('[data-swalstrap="checkbox"] > input');
            else if (this.config.input == 'textarea')
                return this.modalElement.querySelector('[data-swalstrap="textarea"]');
        }

        getValidationMessage() {
            return this.modalElement.querySelector('[data-swalstrap="alert"]');
        }

        initTimer() {
            this.timer = new Timer(() => { this.close(true); }, this.config.timer);
            if (this.config.timerProgressBar === true) {
                this.timer.progressBar = this.modalElement.querySelector('[data-swalstrap="progress-bar"]');
            }
        }

        getTimerLeft() {
            if (this.timer)
                return this.timer.getTimerLeft();
            return 0;
        }

        stopTimer() {
            if (this.timer)
                return this.timer.stop();
            return 0;
        }

        resumeTimer() {
            if (!this.timer) return 0;
            return this.timer.start();
        }

        toggleTimer() {
            if (!this.timer) return 0;
            if (this.timer.isRunning())
                this.timer.stop();
            else
                this.timer.start();
        }

        isTimerRunning() {
            if (!this.timer) return false;
            return this.timer.isRunning();
        }

        increaseTimer(n) {
            if (!this.timer) return 0;
            return this.timer.increase(n);
        }

        clearTimerProgressBar() {
            if (!this.timer) return;
            this.timer.clearProgressBar();
        }

    }

    /**
     * Handle dialog config 
     */
    class SwalOptions {
        constructor(options, defaults) {
            let opt = options || {};
            this.mergeDefaults(defaults || {});
            this.reset();
            for (const key in opt) {
                if (typeof this[key] !== 'undefined') {
                    this[key] = opt[key];
                }
            }
        }

        title = '';
        _titleText = '';
        get titleText() {
            return this._titleText;
        };
        set titleText(value) {
            let el = doc.createElement('div');
            el.innerHTML = value;
            this._titleText = el.innerText;
        }
        html = '';
        _text = '';
        get text() {
            return this._text;
        };
        set text(value) {
            let el = doc.createElement('div');
            el.innerHTML = value;
            this._text = el.innerText;
        }
        icon = '';
        // iconColor = '';
        iconHtml = '';
        //showClass = '';
        //hideClass = '';
        footer = '';
        backdrop = true;
        toast = false;

        input = '';
        //width = '';
        //padding = '';
        //color = '';
        //background = '';
        position = 'center';
        //grow = '';
        customClass = {};
        timer = 0;
        timerProgressBar = false;
        //heightAuto = '';
        allowOutsideClick = true;
        allowEscapeKey = true;
        //allowEnterKey = '';
        stopKeydownPropagation = true;
        //keydownListenerCapture = '';
        showConfirmButton = true;
        showDenyButton = false;
        showCancelButton = false;
        confirmButtonText = 'Ok';
        denyButtonText = 'No';
        cancelButtonText = 'Cancel';
        confirmButtonAriaLabel = '';
        denyButtonAriaLabel = '';
        cancelButtonAriaLabel = '';
        focusConfirm = true;
        returnFocus = true;
        focusDeny = false;
        focusCancel = false;
        showCloseButton = false;
        closeButtonAriaLabel = 'Close this dialog';
        //loaderHtml = '';
        showLoaderOnConfirm = false;
        showLoaderOnDeny = false;
        preConfirm = null;
        preDeny = null;
        returnInputValueOnDeny = false;
        imageUrl = '';
        //imageWidth = '';
        //imageHeight = '';
        imageAlt = '';
        inputLabel = '';
        inputPlaceholder = '';
        inputValue = '';
        inputOptions = {};
        inputAutoTrim = true;
        inputAttributes = {};
        //inputValidator = null;
        validationMessage = '';
        // progressSteps = [];
        // currentProgressStep = null;
        // progressStepsDistance = '';
        willOpen = null;
        didOpen = null;
        //didRender = '';
        willClose = null;
        didClose = null;
        toastStyle = '';
        //didDestroy = '';

        _defaults = {
            allowEscapeKey: true,
            allowOutsideClick: true,
            backdrop: true,
            cancelButtonAriaLabel: '',
            cancelButtonText: 'Cancel',
            closeButtonAriaLabel: 'Close this dialog',
            confirmButtonAriaLabel: '',
            confirmButtonText: 'Ok',
            currentProgressStep: null,
            customClass: {},
            denyButtonAriaLabel: '',
            denyButtonText: 'No',
            focusCancel: false,
            focusConfirm: true,
            focusDeny: false,
            footer: '',
            html: '',
            icon: '',
            iconHtml: '',
            imageAlt: '',
            imageUrl: '',
            input: '',
            inputAttributes: {},
            inputAutoTrim: true,
            inputLabel: '',
            inputOptions: {},
            inputPlaceholder: '',
            inputValidator: null,
            inputValue: '',
            position: 'center',
            preConfirm: null,
            preDeny: null,
            progressSteps: [],
            progressStepsDistance: '',
            returnFocus: true,
            returnInputValueOnDeny: false,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: true,
            showDenyButton: false,
            showLoaderOnConfirm: false,
            showLoaderOnDeny: false,
            stopKeydownPropagation: true,
            text: '',
            timer: 0,
            timerProgressBar: false,
            title: '',
            toast: false,
            toastStyle: '',
            validationMessage: ''
        }

        get defaults() {
            return this._defaults;
        }

        mergeDefaults(value) {
            value = value || {};
            for (const key in value) {
                if (Object.hasOwnProperty.call(this._defaults, key)) {
                    this._defaults[key] = value[key];
                }
            }
        }

        update(options) {
            this.reset();
            this._update(options);
        }

        reset() {
            this._update(this.defaults);
        }

        _update(options) {
            options = options || {};
            for (const key in options) {
                this[key] = options[key];
            }
        }
    }

    /**
     * Handle dialog results
     */
    class SweetAlertResult {
        constructor(isConfirmed, isDenied, value) {
            if (isConfirmed)
                this.isConfirmed = true;
            else if (isDenied)
                this.isDenied = true;
            else
                this.isDismissed = true;
            this.value = value;
            this.dismiss = null;
        }

        isConfirmed = false;
        isDenied = false;
        isDismissed = false;
        value = null;

        // Not implemented yet
        dismiss = null;
    }


    class Timer {
        constructor(callback, delay) {
            this.callback = callback;
            this.remaining = delay;
            this.running = false;
            this.delay = delay;

            this.start()
        }
        callback = null;
        remaining = 0;
        running = false;
        id = 0;
        delay = 0;
        _progressBar = null;
        progressBarTimer = 0;

        set progressBar(el) {
            const self = this;
            this._progressBar = el;
            this.progressBar.classList.remove('d-none');
            this.progressBarTimer = setInterval(() => {
                let percent = self.getTimerLeftPercent();
                self.progressBar.style.width = `${percent}%`;
                if (percent < 1) {
                    clearInterval(self.progressBarTimer);
                    self.progressBarTimer = 0;
                    self.progressBar.classList.add('d-none');
                }
            }, 50)
        }

        get progressBar() {
            return this._progressBar;
        }

        clearProgressBar() {
            if (this.progressBarTimer > 0) {
                clearInterval(this.progressBarTimer);
                this.progressBarTimer = 0;
                this.progressBar.classList.add('d-none');
            }
        }

        start() {
            if (!this.running) {
                this.running = true
                this.started = new Date()
                this.id = setTimeout(this.callback, this.remaining)
            }
            return this.remaining
        }

        stop() {
            if (this.running) {
                this.running = false
                clearTimeout(this.id)
                this.remaining -= new Date().getTime() - this.started.getTime()
            }
            return this.remaining
        }

        increase(n) {
            const running = this.running
            if (running) {
                this.stop()
            }
            this.remaining += n
            this.delay += n
            if (running) {
                this.start()
            }
            return this.remaining
        }

        getTimerLeft() {
            if (this.running) {
                this.stop()
                this.start()
            }
            return this.remaining
        }

        getTimerLeftPercent() {
            return this.getTimerLeft() / parseFloat(this.delay) * 100;
        }

        isRunning() {
            return this.running
        }
    };
    win.Swalstrap = Swalstrap;
})(document, window);