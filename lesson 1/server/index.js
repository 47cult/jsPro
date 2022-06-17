import {
    writeFile,
    readFile
} from 'fs/promises';
import express from 'express';
import cors from 'cors';

const GOODS = './public/goods.json';
const BASKET = './public/basket-goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

function getGoods() {
    return readFile(GOODS, 'utf-8').then((goodsFile) => JSON.parse(goodsFile))
}

function getBasket() {
    return readFile(BASKET, 'utf-8').then((basketFile) => JSON.parse(basketFile))
}

app.get('/basket', (res, req) => {
    Promise.all([
        getGoods(),
        getBasket()
    ]).then(([goods, basket]) => {
        const result = basket.map((basketItem) => {
            const goodsItem = goods.find(({ id: _goodsId }) => {
                return _goodsId === basketItem.id
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        })
        req.send(JSON.stringify(result))
    })
});

app.listen('4747', () => {
    console.log('server is starting!')
})