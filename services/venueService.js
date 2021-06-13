import apiService from "./apiService";

const path = "venues";

const venuesService = {
  get: (key) => apiService.get(path, key),
  getAll: (options) => apiService.getAll(path, options),
  insert: (data) => apiService.insert(path, data),
  update: (data) => apiService.update(path, data),
  upsert: (data) => apiService.upsert(path, data),
};

export default venuesService;
