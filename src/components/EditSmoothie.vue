<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }}</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div
        v-for="(ingredient, index) in smoothie.ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIngredient(ingredient)"
          >delete</i
        >
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="editIngredient"
          v-model="anotherIngredient"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      anotherIngredient: null,
      feedback: null
    };
  },
  created() {
    let refData = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    refData.get().then(snapshot => {
      snapshot.forEach(element => {
        this.smoothie = element.data();
        this.smoothie.id = element.id;
      });
    });
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        //create slug for the URL
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies").doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.feedback = "You must enter a title";
      }
    },
    editIngredient() {
      if (this.anotherIngredient) {
        this.smoothie.ingredients.push(this.anotherIngredient);
        this.anotherIngredient = null;
        this.feedback = null;
      } else {
        this.feedback = "You must add an Ingredient";
      }
    },
    deleteIngredient(id) {
      console.log("id: ", id);
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        element => element !== id
      );
    }
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  position: relative;
  margin: 20px auto;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
