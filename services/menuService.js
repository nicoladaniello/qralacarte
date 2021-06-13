import apiService from "./apiService";
import storageService from "./storageService";

const path = "menus";

// Handle image upload
const insert = async (data) => {
  const finalData = { ...data };

  if (data.image) {
    const url = await storageService.upload(
      `${path}/${data._key}/${data.image.name}`,
      data.image.file,
      metadata
    );
    finalData.image = url;
  }

  return apiService.insert(path, finalData);
};

const menusService = {
  get: (key) => apiService.get(path, key),
  getAll: (options) => apiService.getAll(path, options),
  insert,
  update: (data) => apiService.update(path, data),
  upsert: (data) => apiService.upsert(path, data),
};

export default menusService;
