<template>
    <span>
      <div class="rating">
            <input type="radio" :name="`rating-${radioId}`" :class="`mask mask-star-2 bg-orange-400`" v-for="index in 5" :key="index" :disabled="!editable" :checked="index == rating"/>
        </div>                     
    </span>
</template>
<script>
export default {
    name: 'StarRatingComponent',
    props: ['editable', 'rating','radioId'],
    data() {
        return {
            
        }
    },
}
</script>