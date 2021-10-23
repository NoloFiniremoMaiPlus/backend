const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageItems'],
};

// TODO add funzionario e mangare

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
