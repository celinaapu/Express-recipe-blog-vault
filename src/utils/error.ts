interface ErrConstruct extends Error {
  status?: number;
}

export const createError = (status: number, message: string) => {
  const err: ErrConstruct = new Error();
  err.status;
  err.message;
  return err;
};
