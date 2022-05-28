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

    class GoodsItem {
        constructor({
            title,
            price
        }) {
            this.title = title;
            this.price = price;
        }
        render() {
            return `
            <div class="goods-item">
                <div class="catalog__item-img">product</div>
                <h3>${this.title}</h3><p>${this.price}</p>
            </div>`;
        }
    }

    class GoodsList {
        items = [];
        fetchGoods() {
            this.items = goods;
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

    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    console.log(list.calculate());