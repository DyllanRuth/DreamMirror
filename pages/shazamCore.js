import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: () => {
            headers.set('X-RapidAPI-Key', '551c44197cmshb44031ca2b33afcp1e885ejsne7eb8a55d5b6');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: '/charts/world'
        }),
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;

