    const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

    function service(url) {
        return fetch(url).then((response => response.json()))
    }

    function init() {
        const app = new Vue({
            el: '#root',
            data: {
                items: [],
                filteredItems: [],
                products: [],
                search: '',
                isVisibleCart: false
            },

            methods: {
                fetchGoods() {
                    service(GET_GOODS_ITEMS).then((data) => {
                        this.items = data;
                        this.filteredItems = data;
                    });
                },
                filterItems() {
                    this.filteredItems = this.items.filter(({
                        product_name
                    }) => {
                        return product_name.match(new RegExp(this.search, 'gui'))
                    })
                },
                getBasket() {
                    service(GET_BASKET_GOODS_ITEMS).then((data) => {
                        this.products = data.contents;

                    })
                },
            },

            computed: {
                calculate() {
                    return this.items.reduce((prev, {
                        price
                    }) => {
                        return prev + price
                    }, 0)
                }
            },

            mounted() {
                this.fetchGoods();
                this.getBasket();
            }
        })
    }

    window.onload = init