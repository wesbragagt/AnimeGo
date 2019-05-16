// create a modal popup with info and dynamic button for adding or deleting from list
function modalClick(btnType) {
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
        $("#" + btnType).data("anime", info);
    });
}
// adding anime to database
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
require("./getAnimes")("Dragon Ball Super",
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
"RWBY");

$("document").ready(function() {
    // modal clicks
    modalClick("add-btn");
    // add button click
    addAnime();
});
