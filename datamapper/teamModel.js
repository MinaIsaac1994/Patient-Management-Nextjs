const addTeam = (data) => ({
  ...data,
  usersId: data.usersId.map(({ value }) => value),
  wardsId: data.wardsId.map(({ value }) => value),
});

export const TeamModel = {
  addTeam,
};
