const axios = require("axios");
const moment = require("moment");

// const search = process.arg[2];
const term = process.argv.slice(2).join("%20");

const apiPath = "https://kitsu.io/api/edge/anime?filter[text]=";

axios
    .get(apiPath + term + "&page[limit]=1")
    .then(response => {
        const anime = {
            title: response.data.data[0].attributes.titles.en,
            plot: response.data.data[0].attributes.synopsis,
            Img: response.data.data[0].attributes.posterImage.medium
        };
        // const animeObj = response.data.data[0].attributes;

        console.log(
            ` Title: ${anime.title} \n Plot: ${anime.plot} \n \n link to img: ${
                anime.Img
            } `
        );
    })
    .catch(() => "error please provide an anime");
