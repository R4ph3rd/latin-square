const Table = {
    data() {
      return {
        balancedConditions: []
      };
    },
    props:{
        'conditions': Array
    },
    computed:{
        balancedRows(){
            return this.conditions.length % 2 == 0 ? this.conditions : [...this.conditions, ...this.conditions];
        }
    },
    methods:{
        // code from @filiumbelli https://github.com/filiumbelli/balanced-latin-random-cognitive-def-generator/blob/master/main.js
        balancedLatinSquare(array, index) {
            let result = [];
            // Based on "Bradley, J. V. Complete counterbalancing of immediate sequential effects in a Latin square design. J. Amer. Statist. Ass.,.1958, 53, 525-528. "
            for (var i = 0, j = 0, h = 0; i < array.length; ++i) {
              var val = 0;
              if (i < 2 || i % 2 != 0) {
                val = j++;
              } else {
                val = array.length - h - 1;
                ++h;
              }
          
              var idx = (val + index) % array.length;
              result.push(array[idx]);
            }
          
            if (array.length % 2 != 0 && index % 2 != 0) {
              result = result.reverse();
            }

            return result;
        }
        
    },
    watch:{
        conditions(oldval, newval){
            this.balancedConditions = [];

            this.balancedRows.forEach((val, i) => {
                const row = this.balancedLatinSquare(this.conditions, i)
                this.balancedConditions.push(row);
            });

            this.$emit('setBalancedConditions', this.balancedConditions);
        }
    },
    template: `
      <table border="1">
        <thead>
          <tr>
            <th></th>
            <th v-for="condition in conditions" :key="'conditionCol-' + condition">{{condition}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in balancedConditions" :key="'row-' + i">
            <th>{{i}}</th>
            <th v-for="condition in row" :key="'condition-' + i + '_' + condition">{{condition}}</th>
          </tr>
        </tbody>
      </table>
    `
};

export default Table;