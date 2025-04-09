// socket.js
let ioInstance = null;

export const initSocket = (io) => {
  ioInstance = io;
};

export const getSocketInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO no ha sido inicializado");
  }
  return ioInstance;
};