function addToLocalStorageLastSeenProducts(item) {
    if (JSON.parse(localStorage.getItem('last_seen_product_ids') === null)) {
        localStorage.setItem('last_seen_product_ids', '[]');
    }

    const oldData = JSON.parse(localStorage.getItem('last_seen_product_ids'))
    const index = oldData.findIndex(prodId => prodId === item._id);

    if (index !== -1) {
        oldData.splice(index, 1);
        oldData.unshift(item._id);
    } else {
        oldData.unshift(item._id);
    }

    localStorage.setItem('last_seen_product_ids', JSON.stringify(oldData));
}


export {
    addToLocalStorageLastSeenProducts
}