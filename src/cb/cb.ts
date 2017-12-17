const cb = (next: any) => {
  return (err: any, data: any) => {
    if (err) {
      // console.log('true inside');
      return;
    }
    next(data);
  };
}; 

export default cb;
