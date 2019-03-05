/* eslint-disable linebreak-style */
const appheaders = new Headers();
appheaders.append('Accept', 'application/json');
appheaders.append('Content-type', 'appliaction/json');
appheaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('userInfo'))).token}`);

const sendHeaders = new Headers();
sendHeaders.append('Accept', 'application/json');
sendHeaders.append('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('userInfo'))).token}`);

function getAllMeetups() {
  const allMeetups = document.getElementById('meetupsContainer');
  fetch('../../api/v1/meetups', { method: 'GET', headers: appheaders })
    .then(response => response.json())
    .then((data) => {
    //   console.log(data);
      let displayer = '';
      if (data.meetup.length > 0) {
        const { meetup } = data;
        meetup.forEach((meetupdata) => {
          displayer += `
            <div class="questionrow">
            <h3>Topic: ${meetupdata.topic}</h3>
            <p>Location: ${meetupdata.location}</p>
            <p>Happening on: ${meetupdata.happeningon}</p>
            <p class="tags">Tags: ${meetupdata.tags}</p>
            <hr>
            <br>
            <div class="icons">
            <a href="#" class="edit"><img src="./assets/edit.png">Edit</a>
            <a href="#" onclick="cancel()" class="delete"><img src="./assets/delete.png">Delete</a>
            </div>
            </div>
                `;
        });
      } else {
        displayer = 'No meetup found';
      }
      allMeetups.innerHTML = displayer;
    }).catch((error) => {

    });
}

function upcomingMeetups() {
  const allMeetups = document.getElementById('meetupsContainer');
  fetch('../../api/v1/meetups/upcoming', { method: 'GET', headers: appheaders })
    .then(response => response.json())
    .then((data) => {
    //   console.log(data);
      let displayer = '';
      if (data.upcoming.length > 0) {
        const { upcoming } = data;
        upcoming.forEach((upcomingMeetup) => {
          displayer += `
              <div class="questionrow">
              <h3>Topic: ${upcomingMeetup.topic}</h3>
              <p>Location: ${upcomingMeetup.location}</p>
              <p>Happening on: ${upcomingMeetup.hppeningon}</p>
              <p class="tags">${upcomingMeetup.tags}</p>
              <hr>
              <div class="rsvp">
              <form id="${upcomingMeetup.id}" method="POST">
              <br>
              <input type="hidden" value="${upcomingMeetup.id}" name="meetup">
              <input type="radio" name="rsvp" value="yes">Yes
              <input type="radio" name="rsvp" value="no">No
              <input type="radio" name="rsvp" value="maybe">Maybe
              <button onclick="rsvp(this)" name="${upcomingMeetup.id}">Rsvp</button>
              </form>
              </div>
              </div>
                  `;
        });
      } else {
        displayer = 'No meetup found';
      }
      allMeetups.innerHTML = displayer;
    }).catch((error) => {
      console.log(error);
    });
}
