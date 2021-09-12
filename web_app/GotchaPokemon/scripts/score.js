const score = {
  data() {
    return {
      players: null,
      loading: true
    };
  },
  mounted() {
    fetch(
      'https://pokemongotcha-2f4f.restdb.io/rest/playerscore?&h={"$orderby":{"score":-1}}',
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
        this.players = item
        this.loading = false
      });
    
  },
};

Vue.createApp(score).mount("#app");
