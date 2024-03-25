const Adder = {
    methods: {
        addCondition() {
          const conditions = this.$el.children[0].value
            .split(';').filter(str => str.trim().length > 0);

          this.$el.children[0].value = '';
          this.$emit('updateConditionsValue', conditions);
        },
        handleKeyPress(event) {
          if (event.key === 'Enter') {
              this.addCondition();
          }
        },
        clean(){
          this.$emit('cleanConditions');
        }
    },
    mounted(){
      this.$emit('updateConditionsValue', ['cool', 'super', 'banane', 'pomme']);

      this.$el.children[0].addEventListener('keypress', this.handleKeyPress);
    },
    beforeDestroy() {
        this.$el.children[0].removeEventListener('keypress', this.handleKeyPress);
    },
    template: `
      <div>
        <input type="text" placeholder="Write conditions one by one or separated by a dot-coma"/>
        <button @click="addCondition">Add</button>
        <button @click="clean">Clean</button>
      </div>
    `
};

export default Adder;