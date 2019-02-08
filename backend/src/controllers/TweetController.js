const Tweet = require('../models/Tweet')

module.exports = {
    async index(req, res) {
        const tweets = await Tweet.find({}).sort('-createdAt');
        return res.json(tweets);
    },

    async store(req, res) {
        const tweet = await Tweet.create(req.body);
        req.io.emit('tweet', tweet); //É o que vai emitir para o resto da aplicação que um novo tweet foi criado. Isso faz com que a webpage nao precise ser atualizado. Isso da orque o io foi inserido no req
        return res.json(tweet);
    },

    async like(req, res) {
        const tweet = await Tweet.findById(req.params.id); //aqui ele vai pegar o paramentro criado na rota.
        tweet.set({
            likes: tweet.likes + 1
        });
        await tweet.save();
        req.io.emit('like', tweet); //É o que vai emitir para o resto da aplicação que um novo tweet foi criado. Isso faz com que a webpage nao precise ser atualizado.
        return res.json(tweet);
    },
};