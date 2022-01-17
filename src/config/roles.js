const allRoles = {
  user: [],
  backoffice: ['getUsers', 'manageUsers', 'getItems', 'manageItems', 'getRentals', 'manageRentals'],
  manager: ['createUsers'],
};

allRoles.manager.push(...allRoles.backoffice);

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
