const { updateOrderStatus_sql, showState} = require("../models/orders")

const updateOrderStatus =  async (io) =>{
    console.log(
        "Socket is ready.... waiting for connection!"
    )
    io.on('connection', (socket) => {
        console.log('New client connected');  
        socket.on('show_order_status', async ({orderId, newState}) => {
            console.log("show_order_status")
            // code to update order Status 
                const status = await showState(orderId)
            //
            console.log(`Order ${orderId} status: ${status}`);
            io.emit('show_order_status', { orderId, status });
        });
        socket.on('update_order_Status', async ({orderId, newState}) => {
            // code to update order Status 
                const update = await updateOrderStatus_sql(orderId, newState)
            //
            console.log(`Order ${orderId} state updated to ${newState}`);
            io.emit('order_updated', { update});
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    })
}


module.exports = updateOrderStatus