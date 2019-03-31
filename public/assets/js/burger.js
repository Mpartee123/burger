// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-eaten").on("click", function (event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("devoured");

        var newDevouredState = {
            devoured: newDevoured
        };
        console.log('this is the new devoured state:'+ newDevouredState.devoured);
console.log('this is the type of newdevouredstate variable'+typeof newDevouredState.devoured);
        if (newDevouredState.devoured === false) {
            newDevouredState = 1;
            console.log('newdevouredstate was = to 0 and was changed to '+newDevouredState);
        } else {
            newDevouredState = 0;
            console.log('newdevouredstate was = 1 and changed to '+newDevouredState);
        }

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {
                devoured: newDevouredState
            }
        }).then(
            function () {
                console.log("changed devoured to", newDevoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var selectValue = $("#inputGroupSelect01").val();

        if (!selectValue) {
            return;
        }

        var newBurger = {
            burger_name: $("#ca").val().trim(),
            devoured: parseInt(selectValue)
        };
        console.log(newBurger);

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
