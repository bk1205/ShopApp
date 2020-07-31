import moment from 'moment';
class Order {
    constructor(id, items, totalamount, date) {
        this.id = id;
        this.items = items;
        this.totalamount = totalamount;
        this.date = date 
    }

    get readableDate() {
        // return this.date.toLocaleDateString('en-En', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })
        return moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
    }
}

export default Order;