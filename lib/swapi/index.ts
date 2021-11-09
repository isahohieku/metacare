import axios, { AxiosResponse } from 'axios';
import { FilmsI } from 'models/films';
import { PeopleI } from 'models/people';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

export enum SwapiResource {
    people = 'people',
    films = 'films'
};

export enum Order {
    ascending = '1',
    descending = '-1'
};

export enum SortOptions {
    name = 'name',
    height = 'height',
    gender = 'gender'
}

export enum OtherPeopleProperties {
    birthYear = 'birth_year',
    eyeColor = 'eye_color',
    hairColor = 'hair_color',
    skinColor = 'skin_color'
}

export const sortedItems = (
    data: PeopleI[],
    sort: SortOptions | OtherPeopleProperties = SortOptions.name,
    order: Order = Order.ascending
): PeopleI[] => {
    return data.sort((a, b): number => {
        if (a[sort] < b[sort]) {
            return order === Order.ascending ? -1 : 1;
        }
        if (a[sort] > b[sort]) {
            return order === Order.ascending ? 1 : -1;
        }
        return 0;
    });
};

export const sumData = (data: number[]): number => {
    return data.reduce((a, b): number => a + b, 0);
};

export const convertCmToInches = (total: number): string => {
    const cmToInch = 0.3937;
    const realFeet = ((total * cmToInch) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return `${feet}ft and ${inches}inches`;
};

export const getPeopleRequest = (id: string = ''): Promise<AxiosResponse<{ results: PeopleI[] }>> => {
    return axios.get(`${SWAPI_BASE_URL}${SwapiResource.people}/${id}`);
};

export const getFilmsRequest = (id: string = ''): Promise<AxiosResponse<FilmsI>> => {
    return axios.get(`${SWAPI_BASE_URL}${SwapiResource.films}/${id}`);
};