const Gotcha = {
  data() {
    return {
      player: null,
      password: null,
      msg: false,
    };
  },
  methods: {
    Login() {
      event.preventDefault();

      const dados = {
        player: this.player,
        password: this.password,
      };

      fetch(
        `https://pokemongotcha-2f4f.restdb.io/rest/players?q={"player":"${this.player}"}`,
        {
          method: "GET",
          headers: {
            "cache-control": "no-cache",
            "x-apikey": "613affba43cedb6d1f97ef3f",
          },
        }
      )
        .then((response) => response.json())
        .then((item) => {
          if (item.length > 0 && this.password !== item[0].password) {
            this.msg = true;
          } else {
            localStorage.setItem("auth_player", this.player);
            localStorage.setItem("auth_player_password", this.password);
            localStorage.setItem("auth", true);
            fetch("https://pokemongotcha-2f4f.restdb.io/rest/players", {
              method: "POST",
              headers: {
                "cache-control": "no-cache",
                "x-apikey": "613affba43cedb6d1f97ef3f",
                "content-type": "application/json",
              },
              body: JSON.stringify(dados),
            })
              .then((response) => response.json())
              .then((json) => console.log(json))
              .catch((err) => console.log(err));
            window.location.href ="./pages/game.html";
          }
        });
    },
    Get() {
      fetch("https://pokemongotcha-2f4f.restdb.io/rest/players", {
        method: "GET",
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "613affba43cedb6d1f97ef3f",
        },
      })
        .then((response) => response.json())
        .then((item) => {
          this.player_list = item;
        });
    },
  },
  created() {
    const auth = localStorage.getItem("auth");

    if (auth) {
      this.player = localStorage.getItem("auth_player");
      this.password = localStorage.getItem("auth_player_password");
    }
  },
};

Vue.createApp(Gotcha).mount("#app");
