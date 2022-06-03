    const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

    function service(url) {
        return fetch(url).then((response => response.json()))
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
        filteredItems = [];
        fetchGoods(callback) {
            service(GET_GOODS_ITEMS).then((data) => {
                this.items = data;
                this.filteredItems = data;
                callback()
            });
        }
        render() {
            const goods = this.filteredItems.map(item => {
                const goodItem = new GoodsItem(item);
                return goodItem.render()
            }).join('');

            document.querySelector('.catalog__products-list').innerHTML = goods;
        }
        filterItems(value) {
            this.filteredItems = this.items.filter(({
                product_name
            }) => {
                return product_name.match(new RegExp(value, 'gui'))
            })
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
            service(GET_BASKET_GOODS_ITEMS).then((data) => {
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

    document.getElementsByClassName('header__search-button')[0].addEventListener('click', () => {
        const value = document.getElementsByClassName('header__search')[0].value;
        list.filterItems(value);
        list.render();
    })