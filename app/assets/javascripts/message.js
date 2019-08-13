$(function(){

  function buildPost(message){
    var addImage = (message.image.url !== null)? `<img class="lower-message__content__image" src="${message.image.url}">`:"";

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${addImage}
                    </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast','swing');
      $(".form__submit").prop("disabled",false);
    })
    .fail(function(){
      alert('エラー');
    });
  })
})