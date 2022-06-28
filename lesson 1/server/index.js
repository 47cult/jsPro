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

function basketReform() {
    return Promise.all([
        getGoods(),
        getBasket()
    ]).then(([goods, basket]) => {
        const result = basket.map((basketItem) => {
            const {id: _basketId } = basketItem
            const goodsItem = goods.find(({ id: _goodsId }) => _basketId == _goodsId);
            return {
                ...basketItem,
                ...goodsItem
            }
        })
        return result
    })
}

app.post('/basket', (res, req) => {
    getBasket().then((basket) => {
        const basketItem = basket.find(({id: _id}) => _id === res.body.id);
        if (!basketItem) {
            basket.push({
                id: res.body.id,
                count: 1,
            })
        } else  { 
            basket = basket.map((basketItem) => {
                if (basketItem.id === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return basketReform()
        }).then((result) => {
            req.send(result)
        })
    })

})

app.delete('/basket', (res, req) => {
    debugger
    getBasket().then((basket) => {
        const basketItem = basket.find(({id: _id}) => _id === res.body.id);
        
        if (basketItem.count <= 1) {
            basket = basket.filter((item) => item.id != basketItem.id)
        } else {
            basket = basket.map((basketItem) => {
                if (basketItem.id === res.body.id) {
                    return {
                        ...basketItem,
                            count: basketItem.count - 1
                        }
                } else {
                    return basketItem
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return basketReform()
        }).then((result) => {
            req.send(result)
        })
    })

})

app.get('/basket', (res, req) => {
    basketReform().then((result) => {
        req.send(JSON.stringify(result))
    })
})

app.listen('4747', () => {
    console.log('server is starting!')
})