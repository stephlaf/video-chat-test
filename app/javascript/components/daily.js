const dailyApiKey = process.env.DAILY_API_KEY;
console.log('Form daily.js, DAILY_API_KEY: ', dailyApiKey);

const resetDailyVideoChatTriggering = (button) => {
  button.innerText = 'Start Video Chat';
  dailyVideoChatTriggering();
};

const startVideo = (button, callFrame) => {
  console.log('From startVideo, daily url: ', process.env.DAILY_URL);
  // callFrame.join({ url: 'https://projects.daily.co/Main_test_room' });
  callFrame.join({ url: process.env.DAILY_URL });

  button.addEventListener('click', () => {
    callFrame.destroy();
    resetDailyVideoChatTriggering(button);
  });
};

const createRoom = (button, callFrame) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dailyApiKey}`
    }
  };

  fetch('https://api.daily.co/v1/rooms', options)
    .then((response) => {
      console.log(response.body)
    })
    .then(startVideo(button, callFrame))
    .catch(err => console.error(err));
};

const showHideDailyVideoChat = () => {
  const button = event.currentTarget;
  button.removeEventListener('click', showHideDailyVideoChat);
  button.innerText = 'Stop Video Chat';

  const videoContainer = document.getElementById('videoContainer');

  const callFrame = window.DailyIframe.createFrame(videoContainer, {
    showLeaveButton: true
    // iframeStyle: {
        // position: 'fixed',
        // width: '80%',
        // height: '100%'
    // }
  });

  // Calling daily API to create room
  createRoom(button, callFrame);
};

const dailyVideoChatTriggering = () => {
  const button = document.getElementById('dailyTrigger');
  if (button) {
    button.addEventListener('click', showHideDailyVideoChat);
  };
};

const deleteRooms = () => {
  console.log('from deleteRooms');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${dailyApiKey}`
    }
  };

  fetch('https://api.daily.co/v1/rooms', options)
    .then(response => console.log(response.body))
    .catch(err => console.error(err));
};

const deleteRoomsButtonTriggering = () => {
  const deleteButton = document.getElementById('deleteTrigger');
  if (deleteButton) {
    deleteButton.addEventListener('click', deleteRooms);
  };
};

export { dailyVideoChatTriggering, deleteRoomsButtonTriggering };
