#!/usr/bin/env node

const dns = require('dns');

const required = Symbol("REQUIRED");

const defaults = {
    "backend": required,
    "purgers": ({backend})=>[backend],
    "backend_port": 80
};

const env = Object.keys(process.env).reduce((out, key)=>Object.assign(out, {[key.toLowerCase()]: process.env[key]}), {});

const settings = Object.keys(defaults).reduce((out, key)=>Object.assign(out, {
    [key]: env.hasOwnProperty(key) ? env[key] : defaults[key]
}), {});


if (Object.entries(settings).reduce((out, [key,value])=> {
        const isError = value == required;
        if (isError) {
            console.error(`${key.toUpperCase()} is a required Env-Variable!`);
        }
        return out || isError;
    }, false)) {
    process.exit(1);
}

Object.entries(settings).forEach(([key,value])=> {
    if (typeof value == "function") {
        settings[key] = value(settings);
    }
});

const resolve = (domain)=>new Promise(resolve=> {
    dns.resolve4(domain, (err, addresses) => {
        if (err) {
            resolve([]);
        } else {
            resolve(addresses);
        }
    });
});


let modifiers = {
    backend: async(value)=> {
        return (await resolve(value))[0];
    },
    purgers: async(value)=> {
        if (typeof value == "string") {
            value = value.split(",").map(ip=>ip.trim());
        }
        return (await Promise.all(value.map(ip=>resolve(ip)))).reduce((out, ips)=>out.concat(ips), []).map(ip=> {
            let [a,b,c,d]=ip.split(".");
            d = "0";
            return [a, b, c, d].join(".");
        });
    },
};

Promise.all(Object.entries(modifiers).map(async([key, fnc])=> {
    settings[key] = await fnc(settings[key]);
})).then(
    ()=> {
        let config = require("./config")(settings);
        require("fs").writeFileSync("default.vcl", config);
    }
);