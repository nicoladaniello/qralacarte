import { useDispatch, useSelector } from "react-redux";
import {
  createMenuAction,
  getMenuAction,
  updateMenuAction,
  updateMenuProductsAction,
  updateMenuSectionsAction,
} from "./slice";

const useMenus = () => {
  const { ids, entities, _meta } = useSelector((state) => state.menus);
  const dispatch = useDispatch();

  /**
   * Get the menu data of a venue.
   *
   * @param {string} slug - The venue slug.
   */
  const getMenu = (slug) => dispatch(getMenuAction(slug));

  /**
   * Create a new menu for the venue.
   *
   * @param {object} data - The menu data. Must include the restaurant slug.
   */
  const createMenu = (data) =>
    dispatch(createMenuAction({ user: currentUser, data }));

  /**
   * Updates an existing menu.
   *
   * @param {object} data - The menu data. Must include the restaurant slug.
   */
  const updateMenu = (data) => dispatch(updateMenuAction(data));

  /**
   * Updates the sections of an existing menu.
   *
   * @param {object} slug - The restaurant slug.
   * @param {object} sections - The sections data.
   */
  const updateMenuSections = (slug, sections) =>
    dispatch(updateMenuSectionsAction({ slug, sections }));

  /**
   * Updates the products of an existing menu.
   *
   * @param {object} slug - The restaurant slug.
   * @param {object} data - The products data.
   */
  const updateMenuProducts = (slug, data) =>
    dispatch(updateMenuProductsAction({ slug, data }));

  return {
    ids,
    entities,
    _meta,
    getMenu,
    createMenu,
    updateMenu,
    updateMenuSections,
    updateMenuProducts,
  };
};

export default useMenus;
