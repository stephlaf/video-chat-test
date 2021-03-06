const dailyApiKey = process.env.DAILY_API_KEY;

const resetDailyVideoChatTriggering = (button) => {
  button.innerText = 'Start Video Chat';
  button.classList.add('btn-success');
  button.classList.remove('btn-warning');
  dailyVideoChatTriggering();
};

const startVideo = (button, callFrame) => {
  callFrame.join({ url: button.dataset.videoUrl });

  button.addEventListener('click', () => {
    callFrame.destroy();
    resetDailyVideoChatTriggering(button);
  });
};

const showHideDailyVideoChat = () => {
  const button = event.currentTarget;
  button.removeEventListener('click', showHideDailyVideoChat);
  button.innerText = 'Stop Video Chat';
  button.classList.remove('btn-success');
  button.classList.add('btn-warning');  

  const videoContainer = document.getElementById('videoContainer');

  const callFrame = window.DailyIframe.createFrame(videoContainer, {
    showLeaveButton: true
    // iframeStyle: {
        // position: 'fixed',
        // width: '80%',
        // height: '100%'
    // }
  });

  startVideo(button, callFrame);
};

const dailyVideoChatTriggering = () => {
  const button = document.getElementById('dailyTrigger');
  if (button) {
    button.addEventListener('click', showHideDailyVideoChat);
  };
};

export { dailyVideoChatTriggering };
