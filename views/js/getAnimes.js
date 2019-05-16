module.exports = function getAnimes(...arr){
    for (let i = 0; i < arr.length; i++) {
        // ajax call is made for each anime passed as an argument and it sends the anime data to each img tag
        $.ajax("/api/" + arr[i]).then(function(response) {
            const info = {
                id: response.data[0].id,
                title: response.data[0].attributes.titles.en,
                ageRating: response.data[0].attributes.ageRating,
                released: response.data[0].attributes.startDate,
                poster: response.data[0].attributes.posterImage.original,
                synopsis: response.data[0].attributes.synopsis,
                status: response.data[0].attributes.status,
                episodeCount: response.data[0].attributes.episodeCount,
                length: response.data[0].attributes.episodeLength,
                preview: response.data[0].attributes.youtubeVideoId,
                apiLink: response.data[0].links
            };

            // create clickable elements that will hold the animes
            const newPoster = $(
                "<a href='#' data-toggle='modal' data-target='#mymodal'></a>"
            );
            newPoster.attr("id", "poster" + i);
            newPoster.attr("data-info", JSON.stringify(info));
            newPoster.addClass("col-2 card bg-danger p-1 mb-1 badge-danger");

            const newPosterBody = $("<div class='card-body'></div>");
            // create anime title
            const title = $("<h5 class='card-title'></h5>");
            title.text(info.title);

            // const text = $("<p class='card-text'></p>");
            // text.text(info.synopsis.substring(0, 150));

            const ul = $("<ul></ul>");
            // age rating
            const rated = $("<li ></li>");
            rated.text("Rated: " + info.ageRating);

            // how long are the episodes
            const episodes = $("<li ></li>");
            episodes.text(info.length + "min");

            const status = $("<li ></li>");
            status.text(info.status);

            ul.append(rated, episodes, status);

            // append title and text to card body
            newPosterBody.append(title, ul);
            // create image
            const img = $("<img/>");
            img.attr({
                id: "grid_" + i,
                style: "max-height:50%;",
                src: info.poster
            });

            // store the info object into a data attribute to be accessed later
            img.addClass("img-fluid card-img-top");

            // appending elements
            newPoster.append(img, newPosterBody);

            $("#anime_grid").append(newPoster);
        });
    }
};