<template>
  <div>
    <h2>
      <a href="#" v-on:click="onClickPrev(currentMonth)">◀</a>
      {{currentYear}}년 {{currentMonth}}월
      <a href="#" v-on:click="onClickNext(currentMonth)">▶</a>
    </h2>
    <h5>
      <a href="#" v-on:click="return_today()">오늘</a>
    </h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <td v-for="(weekName, index) in weekNames" v-bind:key="index">
            {{weekName}}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in currentCalendarMatrix" :key="index" >
          <td v-for="(day, index2) in row" :key="index2" style="padding:30px;">
           
            <span v-if="isToday(currentYear, currentMonth, day)" >
              <span class="rounded">
                {{day}}
              </span>
              <span v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item">
                
                <span v-if="isScehedule(currentYear, currentMonth, day) == ((todoItem.year)+(todoItem.month)+(todoItem.day))">
                  <div  class="shadow">
                    <span v-bind:class="{textCompleted:todoItem.completed}">{{ todoItem.item }}</span>
                  </div>
                </span>
              </span>
            </span>

            <span v-else>
              {{day}}
              <span v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item">
                <span v-if="isScehedule(currentYear, currentMonth, day) == ((todoItem.year)+(todoItem.month)+(todoItem.day))">
                  <div  class="shadow">
                    <span v-bind:class="{textCompleted:todoItem.completed}">{{ todoItem.item }}</span>
                  </div>
                </span>
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>  
     <ul>
        <div v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
          <div v-if="todoItem.modify == false">
            <li v-if="isScehedule(currentYear, currentMonth,'') == ((todoItem.year)+(todoItem.month))">
              <div v-bind:class="{checkBtnCompleted: todoItem.completed}"  v-on:click="toggleComplete(todoItem, index)">✔</div>
              <span v-bind:class="{textCompleted:todoItem.completed}">{{ todoItem.item }}</span>
              <span class="modifyBtn" v-on:click="modifyItem(todoItem, index)">
                <div>(수정)</div>
              </span>
              <span class="removeBtn" v-on:click="removeTodo(todoItem,index)">
                <div>X</div>
              </span>
            </li>
            <!--v-for 랑 v-if랑은 같이못쓰겠지,,,-->
            <li v-else class="hidden"></li>
          </div>
          <div v-else>{{ todoItem.item }} -> 
            <input value="" >
            <span class="modifyBtn" v-on:click="modifyItem(todoItem, index)">
                (취소)
              </span>
          </div>
        </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props:['propsdata'],
  data () {
    
    return {
      weekNames: [ "일요일", "월요일", "화요일", "수요일","목요일", "금요일", "토요일"],
      rootYear: 1904,
      rootDayOfWeekIndex: 5,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()+1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [], 
      todoItems:[]

    }
  },
  mounted(){
      this.init();
  },
  methods: {
    
      init:function(){
        this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
      initCalendar:function(){
        this.currentCalendarMatrix = [];
        let day=1;
        for(let i=0; i<6; i++){
          let calendarRow = [];
          for(let j=0; j<7; j++){
            if(i==0 && j<this.currentMonthStartWeekIndex){
              calendarRow.push("");
            }
            else if(day<=this.endOfDay){
              calendarRow.push(day);
              day++;
            }
            else{
              calendarRow.push("");
            }
          }
          this.currentCalendarMatrix.push(calendarRow);
        }
      },
      getEndOfDay: function(year, month){
          switch(month){
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                return 31;
                break;
              case 4:
              case 6:
              case 9:
              case 11:
                return 30;
                break;
              case 2:
                if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                return 29;   
                }
                else{
                    return 28;
                }
                break;
              default:
                console.log("unknown month " + month);
                return 0;
                break;
          }
      },
      getStartWeek: function(targetYear, targetMonth){
        let year = this.rootYear;
        let month = 1;
        let sumOfDay = this.rootDayOfWeekIndex;
        while(true){
          if(targetYear > year){
            for(let i=0; i<12; i++){
              sumOfDay += this.getEndOfDay(year, month+i);
            }
            year++;
          }
          else if(targetYear == year){
            if(targetMonth > month){
              sumOfDay += this.getEndOfDay(year, month);
              month++;
            }
            else if(targetMonth == month){
              return (sumOfDay)%7;
            }
          }
        }
      },
      onClickPrev: function(month){
        month--;
        if(month<=0){
          this.currentMonth = 12;
          this.currentYear -= 1;
        }
        else{
          this.currentMonth -= 1;
        }
        this.init();
      },
      onClickNext: function(month){
        month++;
        if(month>12){
          this.currentMonth = 1;
          this.currentYear += 1;
        }
        else{
          this.currentMonth += 1;
        }
        this.init();
      },
      isToday: function(year, month, day){
        let date = new Date();
        return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
      },
      isScehedule: function(year, month, day){
        let resultDate = String(year) + String(month) + String(day);
        return resultDate ;
      },
      return_today: function(){
        this.currentMonth = new Date().getMonth()+1;
        this.currentYear = new Date().getFullYear();
        this.currentDay =  new Date().getDate();
        this.currentMonthStartWeekIndex= null;
        this.endOfDay= null;
        this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
        removeTodo:function(todoItem,index){
            this.$emit('removeItem', todoItem, index);
        },
        toggleComplete: function(todoItem,index){
            this.$emit('toggleItem', todoItem, index);
        },
        modifyItem: function(todoItem,index){
            this.$emit('modifyItem', todoItem, index);
        },
  },
}
</script>

<style type="text/css">
    .rounded {
      -moz-border-radius:20px 20px 20px 20px; 
      border-radius:20px 20px 20px 20px;
      border:solid 1px #ffffff;
      background-color: #aeb1c6;
      padding:10px;
      color:#ffffff;
    }
ul{
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
    
}

li{
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin:0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}
.removeBtn{
    margin-left: auto;
    color:#de4343;
}
.modifyBtn{
    color:green;
}
.checkBtn{
    line-height: 45px;
    color:#62acde;
    margin-right: 5px;
}
.checkBtnCompleted{
    color:#b3adad;
}
.textCompleted{
    text-decoration: line-through;
    color:#b3adad;
}

.list-enter-active, .list-leave-active{
    transition: all 1s;
}
.list-enter, .list-leave-to{
    opacity:0;
    transform: translateY(30px);
}




</style>