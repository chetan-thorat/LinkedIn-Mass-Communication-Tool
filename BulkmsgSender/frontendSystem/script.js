document.addEventListener("DOMContentLoaded", function() {
    // Sample follower data
    var followers = [
        { id: 1, name: "Mayur Thorat", username: "@iammayur" },
        { id: 2, name: "Kalyani Dusane", username: "@HRkalyaniDusane" },
        { id: 3, name: "Manish Thorat", username: "@CAmanishThort" },
        { id: 4, name: "Kalpesh Dusane", username: "@CEOkalpeshDusane" }

    ];
    function loginWithLinkedIn() {
        // Redirect user to LinkedIn authorization endpoint
        window.location.href = "https://www.linkedin.com/oauth/v2/authorization" +
            "?response_type=code" +
            "&client_id=YOUR_CLIENT_ID" +
            "&redirect_uri=YOUR_REDIRECT_URI" +
            "&scope=r_liteprofile%20r_emailaddress";
    }

    // Function to add followers to the followersList div
    function addFollowers() {
        var followersList = document.getElementById("followersList");

        // Clear existing content
        followersList.innerHTML = "";

        // Add each follower to the list
        followers.forEach(function(follower) {
            var followerElement = document.createElement("div");
            followerElement.textContent = follower.name + " " + follower.username;
            followerElement.setAttribute("data-follower-id", follower.id); // Set data attribute for follower ID
            followerElement.classList.add("follower"); // Add class for styling
            followersList.appendChild(followerElement);
        });

        // Event listener for selecting or deselecting a follower
        followersList.addEventListener("click", function(event) {
            var clickedFollower = event.target;
            if (clickedFollower.classList.contains("follower")) {
                var followerId = clickedFollower.getAttribute("data-follower-id");
                toggleSelectedFollower(followerId);
            }
        });
    }

    // Function to toggle selected/unselected state of a follower
    function toggleSelectedFollower(followerId) {
        var selectedFollowers = document.getElementById("selectedFollowers");

        // Check if follower is already selected
        var selectedFollowerElement = document.querySelector(`[data-selected-follower-id="${followerId}"]`);
        if (selectedFollowerElement) {
            // Follower is already selected, so deselect it
            selectedFollowers.removeChild(selectedFollowerElement);
        } else {
            // Follower is not selected, so select it
            var selectedFollower = followers.find(follower => follower.id == followerId);
            if (selectedFollower) {
                var selectedFollowerElement = document.createElement("div");
                selectedFollowerElement.textContent = selectedFollower.name + " " + selectedFollower.username;
                selectedFollowerElement.setAttribute("data-selected-follower-id", selectedFollower.id); // Set data attribute for selected follower ID
                selectedFollowers.appendChild(selectedFollowerElement);
            }
        }
    }

    // Call the addFollowers function when the page loads
    addFollowers();

    // Event listener for form submission
    document.getElementById("messageForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get message content
        var message = document.getElementById("message").value;

        // Simulate sending message (replace with actual logic)
        alert("Message sent: " + message);
    });
});
