interface ErrConstruct extends Error {
  status?: number;
}

export const createError = (status: number, message: string) => {
  const err: ErrConstruct = new Error();
  console.log(err.message);
  err.status;
  err.message;
  return err;
};
