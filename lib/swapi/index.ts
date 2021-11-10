import axios, { AxiosResponse } from 'axios';
import * as Joi from 'joi';
import { FilmsI } from '../../models/films';
import { PeopleI } from '../../models/people';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

export enum SwapiResource {
    people = 'people',
    films = 'films'
};

export enum Order {
    ascending = '1',
    descending = '-1'
};

export enum SortPeopleOptions {
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

export enum SortFilmsOptions {
    title = 'title',
    releaseDate = 'release_date',
}

export enum OtherFilmsProperties {
    producer = 'producer',
    director = 'director',
    openingCrawl = 'opening_crawl',
}

const isValidDate = (sample): number => {
    return !isNaN(Date.parse(sample)) ? Date.parse(sample) : 0;
};

export const sortedItems = (
    data,
    sort: SortPeopleOptions | OtherPeopleProperties | SortFilmsOptions | OtherFilmsProperties = SortPeopleOptions.name,
    order: Order = Order.ascending
): any[] => {
    return data.sort((a, b): number => {
        if ((Number(a[sort]) || isValidDate(a[sort]) || a[sort])
            < (Number(b[sort]) || isValidDate(b[sort]) || b[sort])) return order === Order.ascending ? -1 : 1;
        if ((Number(a[sort]) || isValidDate(a[sort]) || a[sort])
            > (Number(b[sort]) || isValidDate(b[sort]) || b[sort])) return order === Order.ascending ? 1 : -1;
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

export const getFilmsRequest = (id: string = ''): Promise<AxiosResponse<{ results: FilmsI[] }>> => {
    return axios.get(`${SWAPI_BASE_URL}${SwapiResource.films}/${id}`);
};