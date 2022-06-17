    const BASE_URL = `http://localhost:4747/`;
    const GET_GOODS_ITEMS = `${BASE_URL}goods.json`;
    const GET_BASKET_GOODS_ITEMS = `${BASE_URL}basket`;

    function service(url) {
        return fetch(url).then((res => res.json()))
    }



    function init() {

        const headerButton = Vue.component('custom-button', {
            template: `
                <button class = "header__button" type = "button" @click="$emit('click')">
                    <slot></slot>
                </button>
            `
        })

        const basketGoods = Vue.component('basket-goods', {
            data() {
                return {
                    basketGoodsItems: []
                }
            },
            template: `
                <div class="fixed-area">
                    <div class="basket-card">
                        <div class="basket-card__header">
                            <h1 class="basket-card__header__title">basket card</h1>
                            <div class="basket-card__header__delete-icon" @click="$emit('click')"></div>
                        </div>
                        <div class="basket-card__content">
                        <ul class="basket__list">
                        <basket-items v-for="item in basketGoodsItems" :item="item"></basket-items>
                        </ul>
                        </div>
                    </div>
                </div>
                `,
                mounted() {
                        service(GET_BASKET_GOODS_ITEMS).then((data) => {
                            this.basketGoodsItems = data;
                        })
                    }
                
        })

        const basketItems = Vue.component('basket-items', {
            props: [
                'item'
            ],
            template: `
            <li class="basket__item">
                <h2>{{ item.product_name }}</h2>
                <h3>{{ item.price }} руб.</h3>
                <button>+</button>
                <p>{{ item.count }} шт.</p>
                <button>-</button>
            </li>
            `
        })

        const goodItem = Vue.component('good-item', {
            props: [
                'item'
            ],
            template: `
            <div class="catalog__item">
                <div class="catalog__item-img">product</div>
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }}</p>
            </div>
            `
        })

        const searchInput = Vue.component('search-input', {
            model: {
                prop: 'value',
                event: 'input'
            },
            props: {
                value: String
            },
            template: `
            <input type="text"
                    class="header__search"
                    :value="value"
                    @input="$emit('input', $event.target.value)"
            />
            `
        })

        const app = new Vue({
            el: '#root',
            data: {
                items: [],
                filteredItems: [],
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
            }
        })
    }

    window.onload = init