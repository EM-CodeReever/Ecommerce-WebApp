<template>
    <fieldset class="mt-3">
      <legend class="mb-1 text-sm font-medium">{{optionCategory}}</legend>
        <div class="flow-root">
        <div class="flex flex-wrap -m-0.5 ">
            <label :for="optionCategory + '_' + i" class="cursor-pointer p-0.5" v-for="i in optionArray.length" :key="i">
            <input type="radio" :name="optionCategory" :id="optionCategory + '_' + i" :value="optionArray[i-1].type" class="sr-only peer border-black" />

            <span class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-white peer-checked:text-black">
                {{optionArray[i-1].type}}
            </span>
            </label>

        </div>
        </div>
    </fieldset>              
</template>
<script>
export default {
    name:'AltProductOptionsComponent',
    props:['option'],
    data(){
        return{
            optionCategory : '',
            optionArray : []

        }
    },
    methods:{
        logger(){
            this.optionArray = Object.values(this.option)[0]
            console.log(this.option);
            for(var o in this.option){
                this.optionCategory = o
            }
        }
    },
    created(){
        this.logger()
    }
}
</script>