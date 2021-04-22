import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';
import appConfig from 'config';
import { getParsedData, setData } from 'utils/localStorage';

const AUTH_TOKEN = 'auth_token';

export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;

const httpClient = axios.create({
    baseURL: appConfig.apiUrl,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    },
});

httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const { data } = config;

    if (!_.isEmpty(data) && data.token) {
        setData(AUTH_TOKEN, data.token);
    }

    if (!_.isEmpty(data) && data.withToken) {
        const token = getParsedData(AUTH_TOKEN);

        Reflect.deleteProperty(config.data, 'withToken');

        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
}, error => Promise.reject(error));

httpClient.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === UNAUTHORIZED) {
        throw {
            status: response.status,
            errors: response.data.original_errors.detail
        };
    }

    if (response.status === NOT_FOUND) {
        throw {
            status: response.status,
        };
    }

    if (response.status >= 400 && response.status !== NOT_FOUND) {
        const { data } = response;
        const errors = [];

        let errorType = '';

        if (Object.keys(data.original_errors).includes('non_field_errors')) {
            errorType = 'common';
            errors.push({
                status: response.status,
                url: response.config.url,
                field: 'all',
                errors: data.original_errors.non_field_errors
            });
        } else {
            Object.keys(data.original_errors).map(key => {
                errorType = 'field';
                errors.push({
                    status: response.status,
                    url: response.config.url,
                    field: key,
                    errors: data.original_errors[key],
                });
            });
        }

        throw {
            type: errorType,
            errors,
            errorDescr: data.errors //FIXME: This naming can be a source of confusion. Are parsed errors used anywhere?
        };
    }

    return response;
});

export default httpClient;
