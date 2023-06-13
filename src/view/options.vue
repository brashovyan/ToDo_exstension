<template>
  <div class="main_app">
    <h1>Settings</h1>
    <div class="buttons">
      <button class="google__btn" @click="add_google"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g>
                  </svg>
      </button>
              
      <button class="google__btn" @click="add_notion">
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="12 0.18999999999999906 487.619 510.941"><path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fill-rule="evenodd"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios, {isCancel, AxiosError} from 'axios';

export default {
  name: 'optionsView',
  data () {
    return {
      user_id: "",
    }
  },

  methods: {
    add_google(){
      chrome.storage.local.get(["user_id"]).then((result) => {
          if(result['user_id']){
            this.user_id = result['user_id'].toString();
          }
          else{
            console.log("Да ты че...");
          }
        });

      chrome.identity.getAuthToken({ interactive: true },  (token) => {
        this.google_token = token;

        let article = { user_id: this.user_id,
                        auth_token: this.google_token,
                      };
        axios.post("https://d10e-130-0-219-137.ngrok-free.app/add_google_data", article)
          .then(response => { console.log("Ураа"); })
          .catch(error => { console.log(error.message); });
      }); 
    },

    add_notion(){
      chrome.storage.local.get(["user_id"]).then((result) => {
          if(result['user_id']){
            this.user_id = result['user_id'].toString();
          }
          else{
            console.log("Да ты че...");
          }
        });

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
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.google__btn{
  width:50px;
  height: 50px;
  border: none;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
  margin: 10px;
}

.google__btn:hover{
  background-color: rgb(222, 222, 222);
}

.buttons{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
