<template>
  <div>
    <ArticleItem
      v-if="article.urlToImage"
      v-for="article in articles"
      :key="article.title"
      :article="article"
    />
    <Trigger @triggerIntersected="loadMore"/>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import Trigger from "./Trigger";
import axios from "axios";

export default {
  name: "ArticlesList",
  data() {
    return {
      articles: [],
      page: 1
    };
  },

  components: {
    ArticleItem,
    Trigger
  },

  async mounted() {
    try {
      const { data } = await axios.get(
        "?country=us&page=1&pageSize=3&category=business&apiKey=065703927c66462286554ada16a686a1"
      );
      this.articles = data.articles;
    } catch (error) {
      throw error;
    }
  },

  methods: {
    async loadMore() {
      this.page += 1;

      const { data } = await axios.get(
        `?country=us&page=${
          this.page
        }&pageSize=3&category=business&apiKey=065703927c66462286554ada16a686a1`
      );

      this.articles = [...this.articles, ...data.articles];
    }
  }
};
</script>
