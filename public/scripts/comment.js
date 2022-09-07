const btnComment = document.querySelector('.comment-icon');
const actionInput = document.querySelector('.action-input');

const addAndRemoveInput = () => {
  if (actionInput.innerHTML.length) return (actionInput.innerHTML = '');
  const div = document.createElement('div');
  const btnSend = document.createElement('button');
  Object.assign(btnSend, {
    textContent: 'Отправить',
    className: 'btn btn-purple',
  });
  div.innerHTML = `<textarea class=" text-comment form-control" id="w3review" name="w3review" rows="4" cols="50"></textarea> <br/>`;
  div.appendChild(btnSend);

  btnSend.addEventListener('click', btnSendEvent);

  actionInput.appendChild(div);
};

btnComment.addEventListener('click', () => addAndRemoveInput());

const addcomment = async (text) => {
  const res = await fetch(
    `${location.origin}/comment/addcomment?postId=${idPost}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    }
  );
  const data = await res.json();
  location.reload();
};

async function btnSendEvent(event) {
  const text = event.target.parentNode.querySelector('.text-comment').value;

  const data = await addcomment(text);
  console.log(data);
}
