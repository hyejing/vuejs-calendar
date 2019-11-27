<template>
    <div class='inputBox shadow'>
        <input type='text' v-model="newDateYear">년
        <input type='text' v-model="newDateMonth">월
        <input type='text' v-model="newDateDay">일
       일정 :<input type='text' v-model="newTodoItem" v-on:keyup.enter="addTodo">
       <span class="addContainer"  v-on:click="addTodo">
        +
        </span>
    </div>
</template>

<script>


export default {
    data:function(){
        return{
            newTodoItem: "",
            newDateYear: "",
            newDateMonth: "",
            newDateDay: ""
        }
    },
   methods:{
        addTodo: function(){
            var obj = {completed: false, year: this.newDateYear, month: this.newDateMonth,day: this.newDateDay,item: this.newTodoItem};
            //localStorage.setItem(this.newTodoItem, obj);
            localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
            //localStorage.setItem(this.newTodoItem, this.newTodoItem);
            this.clearInput();
        },
        clearInput:function(){
               this.newTodoItem = '';
               this.newDateYear = '';
               this.newDateMonth = '';
               this.newDateDay = '';
        }
    },
    components:{
      
    }
}
</script>

<style scoped>
input:focus{
    outline:none;
}
.inputBox{
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input{
    border-style:none;
    font-size:0.9rem;
    background-color: cornsilk;
}

.addContainer{
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display:block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn{
    color: white;
    vertical-align: middle;
}
.closeModalBtn{
    color: #42b983
}
</style>
