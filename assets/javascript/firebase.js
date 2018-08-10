$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPtaTELYp2qWeoyfOF3aIXnz_WLEphxB0",
    authDomain: "project1-92fc5.firebaseapp.com",
    databaseURL: "https://project1-92fc5.firebaseio.com",
    projectId: "project1-92fc5",
    storageBucket: "project1-92fc5.appspot.com",
    messagingSenderId: "568021023423"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();


  $(document).on("click", "#formSubmit", function (event) {

    event.preventDefault();

    var userName = $("#userName").val().trim();
    var trailName = $("#trailInput").val().trim();
    var rating = $("#rating").val().trim();
    var comments = $("#userComments").val().trim();

    database.ref().push({
      userName: userName,
      trailName: trailName,
      rating: rating,
      comments: comments,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    })
    $("input").val("");
    $("textarea").val("");
  });

  database.ref().on("child_added", function (childSnapshot) {

    var userName = childSnapshot.val().userName;
    var trailName = childSnapshot.val().trailName;
    var rating = childSnapshot.val().rating;
    var comments = childSnapshot.val().comments;

    $("#firebaseTable").append(
      `
    <tr>
      <td>${userName}</td>
      <td>${trailName}</td>
      <td>${rating}</td>
      <td>${comments}</td>
    </tr>
    `
    )

    // Handle any errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


  });

});
