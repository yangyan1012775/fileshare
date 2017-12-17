const cb = (next: any) => {
  return (err: any, data: any) => {
    if (err) {
      return;
    }
    next(data);
  };
};

export default cb;
