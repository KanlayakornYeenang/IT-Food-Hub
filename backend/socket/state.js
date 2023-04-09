import socketIo from 'socket.io';
const io = socketIo(4114,{ 
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
      },
  });
    io.on('connection', (socket) => {
      console.log('New client connected');
      socket.on('update_order_Status', async ({orderId, newState}) => {
          const [update, field] =  await pool.query(
            `update orders set order_status= '${newState }' where orders_id = '${orderId}';`
          )
          console.log(`Order ${orderId} state updated to ${newState}`);
          io.emit('order_updated', { orderId, newState });
        });
        io.emit('update_order_Status', { orderId: 1, newState: 'delivered' });  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
  });

module.exports = io