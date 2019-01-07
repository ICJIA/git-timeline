<template>
  <article class="article-item">
    <header>
      <h1>{{article.title}}</h1>
      <p v-if="article.author">By
        <span>{{article.author}}</span>
      </p>
    </header>

    <section class="article-item__content">
      <p class="article-item__description">{{article.description}}</p>
      <img class="article-item__image" v-if="article.urlToImage" :src="article.urlToImage">
    </section>

    <footer>
      <a :href="article.url">Link</a>
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.article-item {
  padding: 40px 10px;
  border-bottom: 1px solid #000;

  &__content {
    display: flex;
  }

  &__description {
    font-size: 14px;
    width: 50%;
  }

  &__image {
    width: 50%;
    height: 50%;
    margin-left: 10px;
  }
}
</style>
