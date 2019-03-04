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
