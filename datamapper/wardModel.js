const addWard = (data) => ({
  ...data,
  usersId: data.usersId.map(({ value }) => value),
});

export const wardModel = {
  addWard,
};
