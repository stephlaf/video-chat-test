const resetDailyVideoChatTriggering = (button) => {
  button.innerText = 'Start Video Chat';
  dailyVideoChatTriggering();
};

const showHideDailyVideoChat = () => {
  const button = event.currentTarget;
  button.removeEventListener('click', showHideDailyVideoChat);
  button.innerText = 'Stop Video Chat';

  const callFrame = window.DailyIframe.createFrame({
    showLeaveButton: true
    // iframeStyle: {
        // position: 'fixed',
        // width: '80%',
        // height: '100%'
    // }
  });

  callFrame.join({ url: process.env.DAILY_URL });

  button.addEventListener('click', () => {
    callFrame.destroy();
    resetDailyVideoChatTriggering(button);
  });
};

const dailyVideoChatTriggering = () => {
  const button = document.getElementById('dailyTrigger');
  if (button) {
    button.addEventListener('click', showHideDailyVideoChat);
  };
};

export { dailyVideoChatTriggering };
