function environmentConfig(){
    const development = {
        port: 3000
    };

    const production = {
        port: 4000
    }

    if(process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production'){
        return production;
    }
    return development;
}

module.exports = environmentConfig();