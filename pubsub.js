// export const pubSub = {
//   channels: {},
//   subscribe(event, callback) {
//       if (!subscribers[event]) {
//           subscribers[event] = [];
//       }
//       subscribers[event].push(callback);
//   },
//   publish(event, data) {
//       if (!subscribers[event]) return;
//       subscribers[event].forEach(subscriberCallback =>
//           subscriberCallback(data));
//   }
// }