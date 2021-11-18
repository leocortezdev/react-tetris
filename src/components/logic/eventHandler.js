const Events = (name, callback, ...data) => {
  const listeners = new Set();

  const listen = (name, callback) => {
    return listeners.add({
      name,
      callback
    });
  };

  const emit = (name, ...data) => {
    listeners.forEach((listener) => {
      if (listener.name === name) {
        listener.callback(...data);
      }
    });
  };

  return [emit, listen, listeners];
};

export default Events;
