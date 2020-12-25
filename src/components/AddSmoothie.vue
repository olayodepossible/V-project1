<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="field"
      >
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIngredient(ingredient)"
          >delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="anotherIngredient"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      anotherIngredient: null,
      feedback: null,
      slug: null,
      ingredients: []
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        //create slug for the URL
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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

    addIngredient() {
      if (this.anotherIngredient) {
        this.ingredients.push(this.anotherIngredient);
        this.anotherIngredient = null;
        this.feedback = null;
      } else {
        this.feedback = "You must add an Ingredient";
      }
    },
    deleteIngredient(id) {
      console.log("id: ", id)
      this.ingredients = this.ingredients.filter(element => element !== id)
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  position: relative;
  margin: 20px auto;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
