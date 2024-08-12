import { url } from '@/constant/network-url-mono';
import { errorData } from '@/utils/ErrorHandler';
import api from '@/utils/api';
import { getOrgId } from './ServiceUtil';

const {
  ADD_PRODUCT_CATEGORY_URL,
  GET_ALL_PRODUCT_CATEGORY_URL,
  GET_ALL_PRODUCT_CATEGORY_KEY_VALUE_URL,
  UPDATE_PRODUCT_CATEGORY_URL,
  DELETE_PRODUCT_CATEGORY_URL,
} = url.category.product_category;

const {
  ADD_MATERIAL_CATEGORY_URL,
  GET_ALL_MATERIAL_CATEGORY_URL,
  GET_ALL_MATERIAL_CATEGORY_KEY_VALUE_URL,
  UPDATE_MATERIAL_CATEGORY_URL,
  DELETE_MATERIAL_CATEGORY_URL,
} = url.category.material_category;

const {
  ADD_DESIGNATION_URL,
  GET_ALL_DESIGNATION_URL,
  GET_ALL_DESIGNATION_KEY_VALUE_URL,
  UPDATE_DESIGNATION_URL,
  DELETE_DESIGNATION_URL,
} = url.category.designation;

const {
  ADD_PRODUCTION_STATUS_URL,
  GET_ALL_PRODUCTION_STATUS_URL,
  GET_ALL_PRODUCTION_STATUS_KEY_VALUE_URL,
  UPDATE_PRODUCTION_STATUS_CATEGORY_URL,
  DELETE_PRODUCTION_STATUS_URL,
} = url.category.production_status;

export const addProductCategory = (category) => {
  return api
    .post(`${ADD_PRODUCT_CATEGORY_URL}`, { ...category, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllProductCategory = () => {
  return api
    .get(`${GET_ALL_PRODUCT_CATEGORY_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateProductCategory = (category) => {
  return api
    .put(`${UPDATE_PRODUCT_CATEGORY_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const deleteProductCategory = (category) => {
  return api
    .delete(`${DELETE_PRODUCT_CATEGORY_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllProductCategoryKeyValue = () => {
  return api
    .get(`${GET_ALL_PRODUCT_CATEGORY_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const addMaterialCategory = (category) => {
  return api
    .post(`${ADD_MATERIAL_CATEGORY_URL}`, { ...category, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateMaterialCategory = (category) => {
  return api
    .put(`${UPDATE_MATERIAL_CATEGORY_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const deleteMaterialCategory = (category) => {
  return api
    .delete(`${DELETE_MATERIAL_CATEGORY_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllMaterialCategoryKeyValue = () => {
  return api
    .get(`${GET_ALL_MATERIAL_CATEGORY_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllMaterialCategory = () => {
  return api
    .get(`${GET_ALL_MATERIAL_CATEGORY_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const addDesignation = (designation) => {
  return api
    .post(`${ADD_DESIGNATION_URL}`, { ...designation, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateDesignation = (designation) => {
  return api
    .put(`${UPDATE_DESIGNATION_URL}${designation.id}`, designation)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const deleteDesignation = (category) => {
  return api
    .delete(`${DELETE_DESIGNATION_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllDesignation = () => {
  return api
    .get(`${GET_ALL_DESIGNATION_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllDesignationKeyValue = () => {
  return api
    .get(`${GET_ALL_DESIGNATION_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const addProductionStatus = (category) => {
  return api
    .post(`${ADD_PRODUCTION_STATUS_URL}`, { ...category, orgId: getOrgId() })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const updateProductionStatus = (productionStatus) => {
  return api
    .put(
      `${UPDATE_PRODUCTION_STATUS_CATEGORY_URL}${productionStatus.id}`,
      productionStatus
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const deleteProductionStatus = (category) => {
  return api
    .delete(`${DELETE_PRODUCTION_STATUS_URL}${category.id}`, category)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllProductionStatus = () => {
  return api
    .get(`${GET_ALL_PRODUCTION_STATUS_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};

export const getAllProductionStatusKeyValue = () => {
  return api
    .get(`${GET_ALL_PRODUCTION_STATUS_KEY_VALUE_URL}${getOrgId()}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return errorData(error);
    });
};
