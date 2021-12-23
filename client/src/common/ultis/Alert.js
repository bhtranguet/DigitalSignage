import $ from 'jquery';
var Alert = {
  showAlert: function (message, time = 3000, className = 'alert-success') {
    var alertHTML = $(`<div class='alert-wrap'>
                        <div class="alert ${className}" role="alert">
                          ${message}
                          <i class="fas fa-times"></i>
                        </div>
                      </div>`);
    $('body').append(alertHTML);

    alertHTML.find('i').click(function(){
      alertHTML.remove();
    })

    setTimeout(() => {
      alertHTML.remove();
    }, time);
  },

  success: function(message, time = 3000) {
    this.showAlert(message, time, 'alert-success');
  },

  error: function(message, time = 3000) {
    this.showAlert(message, time, 'alert-danger');
  }
}

export default Alert;