    import '../style/reset.css';
    import '../style/style.css';
    import {BASE_URL, GET_GOODS_ITEMS, GOODS, GET_BASKET_GOODS_ITEMS} from '../constants';
    import {service, serviceWithBody} from '../services';
    import '../components/headerButton';
    import '../components/basketGoods';
    import '../components/basketItem';
    import '../components/goodItem';
    import '../components/searchInput';
 
    


    function init() {
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