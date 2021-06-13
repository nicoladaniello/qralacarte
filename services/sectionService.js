import apiService from "./apiService";

const getPath = (menuId) => `menus/${menuId}/sections`;

const sectionService = {
  get: (menuId, sectionId) => apiService.get(getPath(menuId), sectionId),
  getAll: (menuId, options) => apiService.getAll(getPath(menuId), options),
  insert: (menuId, data) => apiService.insert(getPath(menuId), data),
  update: (menuId, data) => apiService.update(getPath(menuId), data),
  upsert: (menuId, data) => apiService.upsert(getPath(menuId), data),
};

export default sectionService;
