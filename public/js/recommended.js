// DECLARTIONS
function getAnime(...arr) {
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
}

function modalClick() {
    $("#anime_grid").on("click", "a", function() {
        const info = $(this).data("info");
        // remove the last piece of the array

        // logs of info
        console.log("Object: ", info);

        console.log("Title: ", info.title);
        console.log("Rating: ", info.rating);
        // console.log("Synopsis: ", info.synopsis);
        console.log("Poster: ", info.poster);

        // MODAL

        // title
        $(".modal-title").text(info.title);

        // image
        $(".modal-image").attr("src", info.poster);
        // modal body text, removing the last part of the paragraph which says credits to who wrote it.
        $(".modal-synopsis").text(
            info.synopsis
                .split(".")
                .slice(0, -1)
                .join(". ") + "."
        );

        // modal video
        $(".modal-preview").attr(
            "src",
            "https://www.youtube.com/embed/" + info.preview
        );

        $("#released").text(info.released);
        $("#episodes").text(info.episodeCount);

        // assign data to the button
        $("#add-btn").data("anime", info);
    });
}

function addAnime() {
    $("#add-btn").on("click", function(event) {
        event.preventDefault();
        const info = $(this).data("anime");
        const anime = {
            name: info.title,
            api_number: parseInt(info.id)
        };

        // get a list of all the ids currently inside our list
        $.get("/user/watchList").then(function(response) {
            const currentList = response.map(anime => anime.api_number);

            // It only adds that anime if it doesn't already exists
            if (currentList.indexOf(anime.api_number) === -1) {
                $.post("/user/watchList", anime).then(function(data) {
                    console.log("data posted: ", data);

                    // window.location.href = "/watchList";
                    return;
                });
            } else {
                alert("you've already added this anime to the list");
                return;
            }
        });
    });
}

// calling out animes for recommendations
getAnime(
    "Dragon Ball Super",
    "Hunter vs Hunter",
    "Fairy Tail",
    "Attack on Titan",
    "Fullmetal Alchemist",
    "High School of Dead",
    "My Hero Academia",
    "Cowboy Bebop",
    "Angel Beats!",
    "Death Note",
    "Blood",
    "RWBY"
);

$("document").ready(function() {
    // modal clicks
    modalClick();
    // add button click
    addAnime();
});
