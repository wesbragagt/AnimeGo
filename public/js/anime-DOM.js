// naruto api call
$.ajax("/api/naruto").then(function(response) {
    console.log("naruto ", response.data[0]);

    const info = {
        title: response.data[0].attributes.titles.en,
        genre: response.data[0].attributes.genre,
        poster: response.data[0].attributes.posterImage.original,
        synopsis: response.data[0].attributes.synopsis
    };
    $("#title_one").text(info.title);
    $("#grid_one").attr("src", info.poster);
});

// totoro api call
$.ajax("/api/totoro").then(function(response) {
    const info = {
        title: response.data[0].attributes.titles.en,
        genre: response.data[0].attributes.genre,
        poster: response.data[0].attributes.posterImage.original,
        synopsis: response.data[0].attributes.synopsis
    };
    $("#title_two").text(info.title);
    $("#grid_two").attr("src", info.poster);
});
// bleach
$.ajax("/api/my%20hero%20academia").then(function(response) {
    const info = {
        title: response.data[0].attributes.titles.en,
        genre: response.data[0].attributes.genre,
        poster: response.data[0].attributes.posterImage.original,
        synopsis: response.data[0].attributes.synopsis
    };
    $("#title_three").text(info.title);
    $("#grid_three").attr("src", info.poster);
});
