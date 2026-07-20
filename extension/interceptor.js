(function () {
    function parseResponse(response) {
        if (this.readyState !== 4) {
            return;
        }

        const source = "flsheetifier-interceptor";

        if(response.currentTarget.responseURL.includes("/api/character/myself")){
            window.postMessage({
                source: source,
                payload: {
                    type: "myself",
                    data: this.response
                }
            }, "*");
        }

        if(response.currentTarget.responseURL.includes("/api/storylet/choosebranch")){
            window.postMessage({
                source: source,
                payload: {
                    type: "branch",
                    data: this.response
                }
            }, "*");
        }

        if(response.currentTarget.responseURL.includes("/api/agents/branch")){
            window.postMessage({
                source: source,
                payload: {
                    type: "branch",
                    data: this.response
                }
            }, "*");
        }

        if(response.currentTarget.responseURL.includes("/api/agents")){
            window.postMessage({
                source: source,
                payload: {
                    type: "agents",
                    data: this.response
                }
            }, "*");
        }

        if(response.currentTarget.responseURL.includes("/api/exchange/sell")){
            window.postMessage({
                source: source,
                payload: {
                    type: "exchange",
                    data: this.response
                }
            }, "*");
        }

        if(response.currentTarget.responseURL.includes("/api/exchange/buy")){
            window.postMessage({
                source: source,
                payload: {
                    type: "exchange",
                    data: this.response
                }
            }, "*");
        }
    }

    function openBypass(original_function) {
        return function () {
            this.addEventListener("readystatechange", parseResponse);
            return original_function.apply(this, arguments);
        };
    }

    XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
}())