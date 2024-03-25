import Table from './components/table.js'
import Adder from './components/adder.js'
import DownloadButton from './components/download.js'

Vue.component('vue-table', Table);
Vue.component('vue-adder', Adder);
Vue.component('vue-download', DownloadButton);

new Vue({
  el: '#app',
  data(){
    return{
        conditions: [],
        balancedConditions: []
    }
  },
  template: `
    <div>
        <div class="buttons">
            <vue-adder @updateConditionsValue="updateTable" @cleanConditions="cleanConditions"></vue-adder>
            <vue-download class="download" :data="balancedConditions" :key="'dl-' + conditions.length"></vue-download>
        </div>
        
        <vue-table :conditions="conditions" @setBalancedConditions="updateBalancedConditions"></vue-table>
    </div>
  `,
  methods:{
    updateBalancedConditions(conditions){
        this.balancedConditions = conditions;
    },
    updateTable(conditions){
        this.conditions.push(...conditions);
    },
    cleanConditions(){
        this.conditions = [];
    }
  }
});