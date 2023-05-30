<template>
  <div class="main__div">

    <!-- Логин -->
    <template v-if="login_status == false && login == true">
      <div class="login">
        <input type="email" placeholder="Email" v-model="login_email" class="input__login">
        <input type="password" placeholder="Password" v-model="login_password" class="input__login">
        <button @click="login_try" class="btn__login">Войти</button>
        <button class="google__btn" @click="login_try_google"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g>
                </svg>
            </button>
        <button @click="register_show" class="btn__login">Зарегистрироваться</button>
      </div>
    </template>

    <!-- Регистрация -->
    <template v-if="login_status == false && register == true">
      <div class="login">
        <input type="email" placeholder="Email" v-model="register_email" class="input__login">
        <input type="password" placeholder="Password" v-model="register_password" class="input__login">
        <button @click="register_func" class="btn__login">Регистрация</button>
        <button @click="login_show" class="btn__login">Назад</button>
      </div>
    </template>

    <!-- Приветственное окно -->
    <template v-if="login_status == true && welcome == true">
      <div class="login">
        <h1 class="welcome__h1">Добро пожаловать в Shiva!</h1>
        <p class="welcome__p">У нас есть интеграция с Google календарём и Notion</p>
        <p class="welcome__p">Для этого войдите в свои аккаунты:</p>
        <template v-if="google_token.length < 1">
          <div style="display: flex;">
            <button class="google__btn" @click="add_google"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g>
                </svg>
            </button>
            
            <button class="google__btn" @click="add_notion"><svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="12 0.18999999999999906 487.619 510.941"><path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <p class="welcome__ps">P.s. входить нужно будет через ранее зарегистрированный аккаунт,а не через Google или Notion</p>
        </template>
        <template v-if="google_token.length > 1">
          <div style="display: flex;">
          
            <button class="google__btn"><svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="12 0.18999999999999906 487.619 510.941"><path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <p class="welcome__ps">P.s. входить нужно будет через Google</p>
        </template>
        <p class="welcome__p">Вы сможете это сделать в любой момент в настройках расширения</p>
        <button @click="login_func" class="btn__task" style="width: auto; height: 40px;">Далее</button>
      </div>
    </template>

    <!-- Формочка добавления задачи -->
    <template v-if="login_status == true && add_task == true">
      <button class="login__back" @click="list_task_show">Назад</button>
      <div class="calendar__main__div">
        <div class="calendar__div">
          <DatePicker v-model="date" mode="dateTime" :min-date='new Date()' is24hr/>
        </div>

        <div class="add__task">
          <textarea cols="29" rows="8" name="user_task" class="user__task" v-model="user_task"></textarea>
          <button @click="create_task" class="btn__task">Создать</button>
        </div>
      </div>

      <div id="my-modal" class="modal">
        <div class="modal-content">
          <div class="modal-body">
            <p>В процессе...</p>
            <p>Ваша задача обрабатывается нейронной сетью. Это может занять до 30 секунд. Пожалуйста, подождите и не закрывайте расширение. Когда мы закончим, то перебросим вас на список задач.</p>
            <div class="loader">
              <div class="inner one"></div>
              <div class="inner two"></div>
              <div class="inner three"></div>
            </div>
          </div>
        </div>
      </div>

      
    </template>

    <!-- Список задач (главная) -->
    <template v-if="login_status == true && list_task == true ">
      <div class="main__buttons">
        <button class="main__btn" @click="logout_func">Выйти</button>
        <button class="main__btn" @click="add_task_show">Добавить задачу</button>
        <button class="main__btn" @click="statistic_show">Статистика</button>
        <button class="main__btn" @click="show_settings">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
      <div class="list__task__main">
        <template v-for="(task, index) in received_tasks.tasks" :key="index">
          <div class="task__div">
            <p>{{ task.header }}</p>
            <p>{{ task.text }}</p>
            <p>{{ task.start_time }}</p>
            <P>{{ task.status }}</P>
          </div>
        </template>
      </div>
    </template>

    <!-- Статистика -->
    <template v-if="login_status == true && statistics == true ">
      <button class="login__back" @click="list_task_show">Назад</button>
      <p>Статистика</p>
    </template>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios, {isCancel, AxiosError} from 'axios';

export default {
  components: {
    DatePicker,
  },
  name: 'popupView',
  data () {
    return {
      // переменные для навигации
      login_status: false,
      add_task: false,
      list_task: false,
      statistics: false,
      register: false,
      login: false,
      welcome: false,

      // переменные для регистрации
      register_email: "",
      register_password: "",

      // переменные для логина
      login_email: "",
      login_password: "",
      user_id: "",
      google_token: "",
      google_email: "",
      google_id: "",
      register_status: "",

      // переменные для создания задачи
      date: new Date(),
      user_task: "",
      answer: "",
      answer_error: "",
      response_message: "",

      // переменные для списка задач
      received_tasks: [],
      tasks_error: "",
    }
  },

  mounted() {
      // при открытии расширения
      this.login_func();
      //this.list_task_show();
  },

  methods: {
    // здесь проверяю залогинен ли чувак
    // получается у него должен быть user_id либо в localStorage, либо в глобальной пременной user_id
    // если ни того, ни другого, то показываю ему окно логина
    login_func(){
      if(this.user_id != "" && this.user_id){
          this.list_task_show();
      }
      else{
        chrome.storage.local.get(["user_id"]).then((result) => {
          if(result['user_id']){
            this.user_id = result['user_id'].toString();
            this.list_task_show();
          }
          else{
            this.login_show();
          }
        });
      }
    },

    // здесь чел пытается залогиниться
    login_try(){
      let article = { email: this.login_email,
                      password: this.login_password,
                    };
      axios.post("https://d10e-130-0-219-137.ngrok-free.app/login_user", article)
        .then(response => {this.user_id = response.data.user_id; this.save_user();})
        .catch(error => { console.log(error.message); });
    },

    login_try_google(){

      chrome.identity.getAuthToken({ interactive: true },  (token) => {
        this.google_token = token;

        chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (user_info) => {
        this.google_email = user_info.email;
        this.google_id = user_info.id;

        // при регистрации я посылю ему post запрос
        let article = { email: this.google_email,
                        password: this.google_id,
                        auth_token: this.google_token,
                      };
        axios.post("https://d10e-130-0-219-137.ngrok-free.app/create_user", article)
          .then(response => {
                              if(response.data.status == "user_exist"){

                                let article = { email: this.google_email,
                                                  password: this.google_id, 
                                              };
                                axios.post("https://d10e-130-0-219-137.ngrok-free.app/login_user", article)
                                  .then(response => {this.user_id = response.data.user_id; this.save_user();})
                                  .catch(error => { console.log(error.message);
                                });
                              }
                              else{
                                this.user_id = response.data.user_id;
                                this.check_for_welcome();
                              }
                            })
          .catch(error => { console.log(error.message); });
        }); 
      }); 
    },

    // регистрация
    register_func(){
      // при регистрации я посылю ему post запрос
      let article = { email: this.register_email,
                      password: this.register_password,
                    };
      axios.post("https://d10e-130-0-219-137.ngrok-free.app/create_user", article)
        .then(response => {this.user_id = response.data.user_id; this.check_for_welcome(); })
        .catch(error => { console.log(error.message); });
    },

    check_for_welcome(){
      if(Number(this.user_id) > 0){
        chrome.storage.local.set({ user_id: this.user_id.toString() }).then(() => {
          console.log(`Добавлен user_id ${this.user_id}`);
        });
        this.welcome_show();
      }
    },

    save_user(){
      if(Number(this.user_id) > 0){
          chrome.storage.local.set({ user_id: this.user_id.toString() }).then(() => {
          console.log(`Добавлен user_id ${this.user_id}`);
        });
        this.login_func();
      }
    },

    add_google(){
      chrome.identity.getAuthToken({ interactive: true },  (token) => {
        this.google_token = token;

        let article = { user_id: this.user_id,
                        auth_token: this.google_token,
                      };
        axios.post("https://d10e-130-0-219-137.ngrok-free.app/add_google_data", article)
          .then(response => { this.save_user(); })
          .catch(error => { console.log(error.message); });
      }); 
    },

    add_notion(){
      let article = { user_id: this.user_id,
                    };
      axios.post("https://d10e-130-0-219-137.ngrok-free.app/redirect_to_notion", article)
        .then(response => { console.log("Тяжело... Тяжело...");
                              chrome.tabs.create({
                              url: `${response.data.url}`,
                              active: true
                            }); 
      
                          })
        .catch(error => { console.log(error.message); });

              
    },

    settings(){
      console.log("Заглушка");
    },

    logout_func(){
      this.user_id = "";
      chrome.storage.local.clear();
      this.login_show();
    },

    welcome_show(){
      this.login_status = true;
      this.list_task = false;
      this.add_task = false;
      this.statistics = false;
      this.register = false;
      this.login = false;
      this.welcome = true;
    },

    login_show(){
      this.login_status = false;
      this.list_task = false;
      this.add_task = false;
      this.statistics = false;
      this.register = false;
      this.login = true;
      this.welcome = false;
    },

    add_task_show(){
      this.login_status = true;
      this.list_task = false;
      this.add_task = true;
      this.statistics = false;
      this.register = false;
      this.login = false;
      this.welcome = false;
    },

    statistic_show(){
      this.login_status = true;
      this.list_task = false;
      this.add_task = false;
      this.statistics = true;
      this.register = false;
      this.login = false;
      this.welcome = false;
    },

    register_show(){
      this.login_status = false;
      this.list_task = true;
      this.add_task = false;
      this.statistics = false;
      this.register = true;
      this.login = false;
      this.welcome = false;
    },

    show_settings(){
      chrome.runtime.openOptionsPage();
    },

    list_task_show(){
      this.login_status = true;
      this.list_task = true;
      this.add_task = false;
      this.statistics = false;
      this.register = false;
      this.login = false;
      this.welcome = false;

      try{
        let modal = document.querySelector('#my-modal');
        modal.style.display = 'none';
      }
      catch{
        console.log("Костыль");
      };
      

      // здесь я получаю список задач
      let article = { user_id: this.user_id,
                    };
      axios.post("https://d10e-130-0-219-137.ngrok-free.app/get_user_tasks", article)
        .then(response => {this.received_tasks = response.data;})
        .catch(error => { console.log(error.message); });
    },

    // создать задачу
    create_task(){
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();
     
      // getHours не работает, поэтому костыли
      let s = this.date.toString();
      s = s.split(":");
      let hours = s[0].slice(-2);
      let minutes = s[1]

      // дата задачи (строка) в формате %Y-%m-%d %H:%M:%S
      let task_date = `${year}-${month}-${day} ${hours}:${minutes}:00`;

      // текст задачи
      let task_text = this.user_task;

      // post запрос бэку
      let article = { user_id: this.user_id,
                        header: task_text,
                        start_time: task_date,
                      };
      axios.post("https://d10e-130-0-219-137.ngrok-free.app/create_task", article)
        .then(response => {this.response_message = response.data; this.list_task_show(); })
        .catch(error => { this.response_message = error.message; this.list_task_show(); });
      
        let modal = document.querySelector('#my-modal');
        modal.style.display = 'block';
    },
  },
}
</script>

<style>
body{
  background: linear-gradient(rgb(164, 164, 254), rgb(189, 255, 191));
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 350px;
  height: 100%;
  
  margin: 0;
  padding: 0;
}

.app{
  width: 350px;
  height: 100%;
}

.main__div{
  width: 350px;
  height: 100%;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 450px;
  flex-direction: column;
}

.calendar__main__div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.calendar__div{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
}

.add__task{
  width: 250px;
  height: 100%;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 0.5rem;
}

.user__task{
  margin: 7px;
}

.btn__task{
  margin-left: 7px;
  margin-bottom: 7px;
  background-color: rgb(218, 218, 255);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn__task:hover{
  background-color: rgb(194, 194, 255);
}

.login__back{
  margin-top: 10px;
  margin-left: 10px;
  margin-left: 7px;
  margin-bottom: 7px;
  background-color: rgb(207, 255, 185);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.login__back:hover{
  background-color: rgb(152, 255, 159);
}

.main__buttons{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.main__btn{
  background-color: rgb(207, 255, 185);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 25px;
}

.main__btn:hover{
  background-color: rgb(152, 255, 159);
}

.list__task__main{
  height: 100%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 5px;
}

.task__div{
  background-color: rgb(240, 240, 240);
  border-radius: 0.5rem;
  margin: 5px;
  padding: 5px;
}

.welcome__h1{
  color: white;
}

.welcome__p{
  margin: 10px;
  font-size: 16px;
  text-align: center;
}

.welcome__ps{
  margin: 10px;
  font-size: 12px;
  text-align: center;
}

.google__btn{
  width:50px;
  height: 50px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin: 10px;
}

.google__btn:hover{
  background-color: rgb(222, 222, 222);
}

.input__login{
  margin: 5px;
}

.btn__login{
  margin: 5px;
  background-color: rgb(218, 218, 255);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 20px;
}

.btn__login:hover{
  background-color: rgb(194, 194, 255);
}



.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  margin: 10% auto;
  width: 60%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  animation-name: modalopen;
  animation-duration: var(--modal-duration);
}


.modal-body {
  padding: 10px 20px;
  border-radius: 5px;
  background: #fff;
  margin-top: 195px;
  height: 235px;
}

@keyframes modalopen {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loader {
  position: absolute;
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
}


.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;  
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #808080;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #808080;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #808080;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

</style>
