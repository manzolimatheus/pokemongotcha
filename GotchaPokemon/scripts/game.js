const Game = {
  data() {
    return {
      x: 0,
      y: 0,
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
      game_active: true,
      time: 0,
      view_timer: 0,
      score: 0,
      capturados: [],
      show_list: false,
      final_list: [],
    };
  },
  methods: {
    interval(speed) {
      let interval = setInterval(() => {
        if (this.time < 240) {
          this.timer();
          this.game();
        } else {
          clearInterval(interval);
          this.game_active = false;
          this.show_list = true;
          this.LoadData();
        }
      }, speed);
    },
    game() {
      const valores = document
        .getElementById("game_container")
        .getBoundingClientRect();
      const width = valores.width;
      const height = valores.height;
      this.y = `${Math.floor(Math.random() * height)}px`;
      this.x = `${Math.floor(Math.random() * width)}px`;
    },
    timer() {
      this.time += 1;
      this.view_timer = this.time/2
    },
    sprite() {
      this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(
        Math.random() * 800
      )}.png`;
    },
    UpdateScore() {
      this.score += 1;
      this.capturados.push(this.image.replace(/\D/g, ""));
      this.sprite();
    },
    LoadData() {
      let length = this.capturados.length;

      for (let i = 0; i < length; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.capturados[i]}`)
          .then((response) => response.json())
          .then((item) => {
            this.final_list.push([
              this.capturados[i],
              item.name,
              item.types[0].type.name,
            ]);
          });
      }
    },
    SaveResult() {
      const dados = {
        player: localStorage.getItem("auth_player"),
        score: this.score,
      };

      fetch("https://pokemongotcha-2f4f.restdb.io/rest/playerscore", {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "613affba43cedb6d1f97ef3f",
          "content-type": "application/json",
        },
        body: JSON.stringify(dados),
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Resultado salvo com sucesso!");
          window.location.href =
            "./score.html";
        })
        .catch((err) => {
          console.log(err);
          alert("Ocorreu um erro ao salvar, tente novamente mais tarde!");
        });
    },
    TryAgain() {
      this.show_list = false;
      this.game_active = true;
      this.time = 0;
      this.score = 0;
      this.capturados = [];
      this.final_list = [];
      this.interval(500);
    },
  },
  mounted() {
    const auth = localStorage.getItem("auth");
    this.sprite();
    this.interval(500);
    if (!auth) {
      window.location.href ="../index.html";
    }
  },
};

Vue.createApp(Game).mount("#app");
