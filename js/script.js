
// Create the iframe
var iframeSource = 'https://jul4ajka.github.io/notify/';
var iframe = document.createElement('iframe');
iframe.setAttribute('src', iframeSource);
iframe.setAttribute('id', 'the_iframe');
iframe.style.width = 450 + 'px';
iframe.style.height = 200 + 'px';
document.body.appendChild(iframe);

// Send a message to the child iframe

//Create content window to what we will send the message and the button to send it
var iframeEl = document.getElementById('the_iframe').contentWindow,
    messageButton = document.getElementById('message_button');
 
 // addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener){
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
} 

// Send a message to the child iframe
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(msg, '*');
    iframeEl.postMessage(msg, '*');
};

  // Send random message data on every button click
bindEvent(messageButton, 'click', function (e) {
    e.preventDefault();
    sendMessage({
                type: "Jeeng InApp Notification",
                notification: {
                    title: "Test",
                    message: "This is test notification",
                    image_url: "img/icon.png",
                    url: "https://www.youtube.com/"}
                });
});

window.onmessage = function (event) {
   
    $.notify.addStyle('foo', {
        html: 
          "<div class='notification'>" +
            "<img src='"+ event.data.notification.image_url + "' class='img' />" + 
              "<h3 class='h3'>" + event.data.notification.title + "</h3>" + 
              "<p class='p'>" + event.data.notification.message + "</p>" +
              "<p class='p_url'>" + event.data.notification.url + "</p>" + 
               "<div class='exit'></div>" + 
          "</div>",
          classes: {
            base: {
                "width": "340px",
                "height": "100px",
                "background-color": "#000000",
                "animation": "fadeInRight 1s"
                },
            img: {
                    "position": "absolute",
                    "width": "50px",
                    "height": "50px",
                    "top": "25%",
                    "left": "5%",
                    "z-index": "2",
                },
            h3: {
                "font-size": "15px",
                "font-family": "Arial",
                "font-weight": "bold",
                "color": "white",
                "position": "absolute",
                "left": "25%",
                 "top": "5%",
            }
            }
            
        });

      $.notify(event.data.notification.title , { 
        style: 'foo',
        autoHide: true,
        clickToHide: true,
        hideAnimation: 'slideUp',
        position: 'bottom right',
        autoHideDelay: 50000,
       });

      $('.notifyjs-foo-base .exit').click(function (e) {
          $('notification').remove();
      });
}