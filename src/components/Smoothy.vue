<template>
  <div class="smoothy container">
    <div class="card" v-for="data in smoothies" :key="data.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(data.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ data.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in data.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: data.slug }
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Smoothy",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(element => element.id !== id);
        });
    }
  },
  created() {
    // fetch data from firestore
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(element => {
          let smoothie = element.data();
          smoothie.id = element.id;
          this.smoothies.push(smoothie);
        });
      });
  }
};
</script>

<style>
.smoothy {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.smoothy h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.smoothy .ingredients {
  margin: 30px auto;
}
.smoothy .ingredients li {
  display: inline-block;
}

.smoothy .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
