const ENGINE_BD = process.env.ENGINE_DB;
// const pathModels = (ENGINE_BD === 'nosql') ? './nosql' : "./mysql";
const pathModels = './nosql';

console.log(pathModels);
const models = {
    userModel: require(`${pathModels}/users`),
    tracksModel: require(`${pathModels}/tracks`),
    storageModel: require(`${pathModels}/storage`)
}


module.exports = models