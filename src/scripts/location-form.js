'use strict';

const errorText = {
  name: {
    required: 'Вкажіть своє імʼя, будь ласка',
    minlength: 'Імʼя повинно бути не коротшим, ніж 2 символи',
    maxlength: 'Імʼя не повинно бути довшим, ніж 30 символів',
  },
  phone: {
    required: 'Вкажіть свій номер, будь ласка',
    length: 'Вкажіть коректний номер телефону, будь ласка',
  },
  message: {
    maxlength: 'Повідомлення не повинно бути довшим, ніж 150 символів',
  },
};

$(document).ready(function() {
   function disableScroll() {
    $('body').css({ 'overflow-y': 'hidden' });
  }

  function clearForm() {
    $('.location__form')[0].reset();
    $('body').css({ 'overflow-y': 'visible' });
  }

  $('.location__form-popup-button').click(function (event) {
    event.preventDefault();
    $.fancybox.close();
  });

  $('.location__form-popup').fancybox({
    autoSize: false,
    autoResize: false,
    padding: 0,
    fitToView: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    beforeShow: disableScroll,
    afterClose: clearForm,
    smallBtn: false,
    toolbar: false,
    scrolling: 'hidden',
    helpers: {
      overlay: {
        locked: true,
      },
    },
  });

  $('#phone').mask('(00) 00 00 000');

  $('#form')
    .submit(function(e) {
      e.preventDefault();
    })
    .validate({
      errorElement: "span",
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 30,
        },
        phone: {
          required: true,
          minlength: 14,
          maxlength: 14,
        },
        message: {
          maxlength: 150,
        },
      },
      messages: {
        name: {
          required: errorText.name.required,
          minlength: errorText.name.minlength,
          maxlength: errorText.name.maxlength,
        },
        phone: {
          required: errorText.phone.required,
          minlength: errorText.phone.length,
          maxlength: errorText.phone.length,
        },
        message: {
          maxlength: errorText.message.maxlength,
        },
      },

      highlight: function(element) {
        $(element)
          .closest('.location__form-input-label-container')
          .find('.location__form-input-error')
          .removeClass('location__form-has-error')
          .addClass('location__form-has-success');
      },

      unhighlight: function(element) {
        $(element)
          .closest('.location__form-input-label-container')
          .find('.location__form-input-error')
          .removeClass('location__form-has-success')
          .addClass('location__form-has-error');
      },

      submitHandler: function(form) {
        // Show the popup
        //$('#popup').show();
        event.preventDefault();
        $('.location__form-popup').trigger('click'); // Prevent the form from being submitted
      },
    });
});
