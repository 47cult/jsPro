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

const renderGoodsItem = (title = 'product', price = 100) => `<div class="goods-item"><div class="catalog__item-img">product</div><h3>${title}</h3><p>${price}</p></div>`;
const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
    document.querySelector('.catalog__products-list').innerHTML = goodsList;
}
renderGoodsList(goods);