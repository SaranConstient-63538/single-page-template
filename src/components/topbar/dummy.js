import axios from "axios";
import {
  GetAccessToken,
  GetContestApi,
  GetSkilltronApi,
} from "../../helper/StorageHelper";

const apiRequest = (options) => {
  const defaultHeader = () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Token": GetAccessToken(),
  });

  const getBaseUrl = () => {
    let base_url = GetContestApi();
    if (options?.isSkilltronApi) {
      base_url = GetSkilltronApi();
    }
    return base_url;
  };

  const client = axios.create({
    baseURL: getBaseUrl(),
    headers: defaultHeader(),
  });

  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default apiRequest;
import apiRequest from "./axios/apiRequest";
import { REQUEST_TYPES } from "../common/constant";
export const getUdfList = () => {
  return apiRequest({
    url: "api/admin/getUserDefinedFieldsSummary",
    method: REQUEST_TYPES.GET,
    isSkilltronApi: true,
  })
    .then((res) => {
      const filtereddata = _.filter(res, { fieldType: "List" });
      var filteredResult = [];
      if (filtereddata && filtereddata.length > 0) {
        filteredResult = _.map(filtereddata, function(element) {
          return _.extend({}, element, {
            label: element.fieldName,
            value: element.fieldId,
          });
        });
      }
      return filteredResult;
    })
    .catch((error) => {
      return [];
    });
};
