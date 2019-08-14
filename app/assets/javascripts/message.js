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
    $(".form__submit").removeAttr("disabled");

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
    })
    .fail(function(){
      alert('エラー');
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id');
    var href =  'api/messages'
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildPost(message);
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    });
  }
};
  setInterval(reloadMessages, 5000);
});