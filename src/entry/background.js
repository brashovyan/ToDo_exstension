// При установке отправляю уведомление с инфой об расширении
chrome.runtime.onInstalled.addListener(() => {
    var options = {
        title: "Thanks for installing!",
        message: "To get started, register in our extension.",
        iconUrl: "icons/128.png",
        type: "basic",
      };
      chrome.notifications.create("", options);
  });

// запускаю таймер, который периодично будет вызывать функцию для проверки задач
setInterval(check_tasks, 30000);

function check_tasks(){
    // посылаю post запрос
    console.log("Отправил запрос");
    chrome.storage.local.get(["user_id"]).then((result) => {

        fetch('https://d41b-130-0-219-137.ngrok-free.app/check_tasks', {
        method: 'POST',
        body: JSON.stringify({
                user_id : result['user_id'].toString(),
            })
        }).then(function(response) {
            // Стоит проверить код ответа.
            if (!response.ok) {
                // Сервер вернул код ответа за границами диапазона [200, 299]
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
        
            // Далее будем использовать только JSON из тела ответа.
            return response.json();
        }).then(function(data) {
            check_response(data.task);
        }).catch(function(error) {
            console.log(error);
        });
        
    });
}

function check_response(received_response){
    // если в ответ че то приходит - посылаю уведомление
    let myNotificationID = null;
    if(received_response){
        var options = {
            title: received_response.header.toString(),
            message: received_response.text.toString(),
            iconUrl: "icons/128.png",
            buttons: [
                { title: 'Done' },
                { title: 'Dismiss' }
              ],
            type: "basic",
          };
          chrome.notifications.create("", options, function(id) {myNotificationID = id;});

            chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
            if (notifId === myNotificationID) {
                if (btnIdx === 0) {
                    // выполнить
                    fetch('https://d41b-130-0-219-137.ngrok-free.app/change_task_status', {
                    method: 'POST',
                    body: JSON.stringify({
                            task_id : received_response.id,
                            status : "done",
                        })
                    }).then(function(response) {
                        // Стоит проверить код ответа.
                        if (!response.ok) {
                            // Сервер вернул код ответа за границами диапазона [200, 299]
                            return Promise.reject(new Error(
                                'Response failed: ' + response.status + ' (' + response.statusText + ')'
                            ));
                        }
                    
                        // Далее будем использовать только JSON из тела ответа.
                        return response.json();
                    }).then(function(data) {
                        console.log(data);
                    }).catch(function(error) {
                        console.log(error);
                    });

                    chrome.notifications.clear(myNotificationID);
                } else if (btnIdx === 1) {
                    // отклонить
                    fetch('https://d41b-130-0-219-137.ngrok-free.app/change_task_status', {
                    method: 'POST',
                    body: JSON.stringify({
                                task_id : received_response.id,
                                status : "cancel",
                        })
                    }).then(function(response) {
                        // Стоит проверить код ответа.
                        if (!response.ok) {
                            // Сервер вернул код ответа за границами диапазона [200, 299]
                            return Promise.reject(new Error(
                                'Response failed: ' + response.status + ' (' + response.statusText + ')'
                            ));
                        }
                    
                        // Далее будем использовать только JSON из тела ответа.
                        return response.json();
                    }).then(function(data) {
                        console.log(data);
                    }).catch(function(error) {
                        console.log(error);
                    });

                    chrome.notifications.clear(myNotificationID);
                }
            }
        });
    }

    else{
        console.log("Ошибка");
    }
}