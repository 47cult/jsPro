    const goods = [{
            title: 'Shirt',
            price: 150
        },
        {
            title: 'Socks',
            price: 50
        },
        {
            title: 'Jacket',
            price: 350
        },
        {
            title: 'Shoes',
            price: 250
        },
    ];

    const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

    function service(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = () => {
            callback(JSON.parse(xhr.response))
        }
    }

    class GoodsItem {
        constructor({
            product_name,
            price
        }) {
            this.product_name = product_name;
            this.price = price;
        }
        render() {
            return `
            <div class="goods-item">
                <div class="catalog__item-img">product</div>
                <h3>${this.product_name}</h3><p>${this.price}</p>
            </div>`;
        }
    }

    class GoodsList {
        items = [];
        fetchGoods(callback) {
            service(GET_GOODS_ITEMS, (data) => {
                this.items = data;
                callback()
            });
        }
        render() {
            const goods = this.items.map(item => {
                const goodItem = new GoodsItem(item);
                return goodItem.render()
            }).join('');

            document.querySelector('.catalog__products-list').innerHTML = goods;
        }
        calculate() {
            return this.items.reduce((prev, {
                price
            }) => {
                return prev + price
            }, 0)
        }
    }

    class GoodsBasket {
        products = [];
        getBasket() {
            service(GET_BASKET_GOODS_ITEMS, (data) => {
                this.products = data.contents;
                console.log(this.products);
            })
        }
    }

    const list = new GoodsList();
    list.fetchGoods(() => {
        list.render();
        console.log(list.calculate());
    });
    const basket = new GoodsBasket();
    basket.getBasket();