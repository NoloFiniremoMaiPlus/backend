const allRoles = {
  user: [],
  backoffice: [],
  manager: ['getUsers', 'manageUsers', 'getItems', 'manageItems'],
};

// TODO add funzionario e manager

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
