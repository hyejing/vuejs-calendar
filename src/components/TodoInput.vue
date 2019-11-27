<template>
    <div class='inputBox shadow'>
        <input type='text' v-model="newDateYear">년
        <input type='text' v-model="newDateMonth">월
        <input type='text' v-model="newDateDay">일
       일정 :<input type='text' v-model="newTodoItem" v-on:keyup.enter="addTodo">
       <span class="addContainer"  v-on:click="addTodo">
        +
        </span>


          <Modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">경고!
                <span @click="showModal = false"> X </span>
            </h3>
            <div slot="body">빈칸을 채워주세요!</div>
        </Modal>
    </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
    data:function(){
        return{
            newTodoItem: "",
            newDateYear: "",
            newDateMonth: "",
            newDateDay: "",
            showModal:false
        }
    },
   methods:{
        addTodo: function(){
            //var obj = {completed: false, year: this.newDateYear, month: this.newDateMonth,day: this.newDateDay,item: this.newTodoItem};
           //localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
            if(this.newTodoItem !== ''){
                this.$emit('addTodoItem',this.newTodoItem,this.newDateYear,this.newDateMonth,this.newDateDay);
                this.clearInput();
            }else{
                this.showModal = !this.showModal;
            }
        },
        clearInput:function(){
               this.newTodoItem = '';
               this.newDateYear = '';
               this.newDateMonth = '';
               this.newDateDay = '';
        }
    },
    components:{
      Modal
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
