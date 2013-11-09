window.addEventListener('load', function(){
  var form = document.getElementById('letterbox');
      msg = document.getElementById('letterbox-message');
  form.addEventListener('submit', function(e) {
    e.preventDefault && e.preventDefault();
    var request = new XMLHttpRequest(),
        data = new FormData(form);
    request.open('POST', 'http://localhost:3000/letterbox/1');
    if (msg) {
      request.onload = function(e) {
        if (this.status == 200) {
          msg.style.display = "block";
          msg.innerHTML = "Form sent successfully";
        } else {
          msg.style.display = "block";
          msg.className = "error";
          msg.innerHTML = "There was an error sending this form.";
        }
      };
    }
    request.send(data);
  });
});
