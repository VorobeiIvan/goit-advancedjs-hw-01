import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const feedbackStorageKey = 'feedback-form-state';

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(feedbackStorageKey, JSON.stringify(formState));
}

function loadFormState() {
  const storedState = localStorage.getItem(feedbackStorageKey);
  if (storedState) {
    const formState = JSON.parse(storedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
}

emailInput.addEventListener('input', throttle(saveFormState, 500));
messageTextarea.addEventListener('input', throttle(saveFormState, 500));

loadFormState();

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  emailInput.value="";
  messageTextarea.value="";
  localStorage.removeItem(feedbackStorageKey);
loadFormState();
});
