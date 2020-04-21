/**
 * @class Ajax
 * @author A.C. {@link https://github.com/acoquoin}
 * @classdesc Ajax is a wrapper for fetch requests
 */
class Ajax {
    /**
     * Instanciate mapping of locales
     * @param {string} url - Location of the ressource
     * @param {Object} [options=Object] - init object from fetch, see documentation at
     *      {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch}
     */
    constructor(url, options = {}) {
        this.url = new URL(url, window.location.href);
        this.options = Object.assign({
            method: 'GET',
            credentials: 'same-origin',
            timeout: 30E4,
            cache: 'default',
            headers: {},
        }, options || {});
        this.prepare();
    }

    /**
     * Make "sure" body and request are correctly set
     * @private
     * @return {void 0}
     */
    prepare() {
        this.options.headers['X-Requested-With'] = 'XMLHttpRequest';
        this.options.method = this.options.method.toUpperCase();
        if (['POST', 'PUT'].includes(this.options.method)) {
            if (
                'string' === typeof this.options.body ||
                this.options.body instanceof FormData ||
                this.options.body instanceof URLSearchParams
            ) {
                this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            } else {
                this.options.headers['Content-Type'] = 'application/json; charset=UTF-8';
                this.options.body = JSON.stringify(this.options.body);
            }
        } else {
            delete this.options.body;
        }
    }

    /**
     * Fetch
     * @return {Promise}
     */
    execute() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Timeout for fetching ressource "${this.url}"`));
            }, this.options.timeout);
            fetch(this.url, this.options)
                .then(e => {
                    Ajax.response = e;
                    return e[e.headers.get('content-type').indexOf('application/json') !== -1 ? 'json' : 'text']();
                })
                .then(resolve, reject);
        });
    }
}

export default Ajax;
